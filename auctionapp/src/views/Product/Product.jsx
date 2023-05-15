import "./product.scss";
import axios from "axios";
import vector from "assets/Vector.svg";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    extractDate,
    findHighestBid,
    getRelativeTime,
    hasBid,
    isAuctionOngoing,
} from "utils/utils";
import { Col, Row, Input, Table, Tag, message } from "antd";
import Tabs from "components/Tabs/Tabs";
import Navbar from "components/Navbar/Navbar";
import Spinner from "components/LoadingSpinner/Spinner";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import ProductOverviewTabs from "components/ProductOverviewTabs/ProductOverviewTabs";
import BidMessage from "components/BidMessage/BidMessage";
import { API_ALL_PRODUCTS_URL } from "utils/constants";

const Product = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [sellerId, setSellerId] = useState("");
    const [product, setProduct] = useState(null);
    const [bids, setBids] = useState([]);
    const [bidInput, setBidInput] = useState(0);
    const [highestBid, setHighestBid] = useState(0);
    const [isHighest, setIsHighest] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [isBidEnabled, setIsBidEnabled] = useState(true);
    const [totalBids, setTotalBids] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [productId, setProductId] = useState(searchParams.get("product-id"));
    const [activeImg, setActiveImg] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(true);

    const messages = {
        highest: { regular: "Congrats! You are the highest bider!" },
        notHighest: {
            regular:
                "There are higher bids than yours. You could give a second try!",
        },
        winner: { bold: "Congratulations! ", regular: "You outbid the competition." },
        invalid: {
            bold: "Invalid!",
            regular: "Your bid input is not valid. Try again!",
        },
        expired: {
            bold: "Invalid!",
            regular: "Your session has expired. Please reload the page.",
        },
    };

    const columns = [
        {
            title: "Bidder",
            dataIndex: "name",
            width: "60%",
        },
        {
            title: "Date",
            dataIndex: "createdAt",
        },
        {
            title: "Bid",
            dataIndex: "price",
            render: (_, { price }) => (
                <>
                    <Tag color={price === highestBid ? "green" : "default"}>
                        ${price}
                    </Tag>
                </>
            ),
        },
    ];

    useEffect(() => {
        axios
            .get(`${API_ALL_PRODUCTS_URL}/${productId}`)
            .then((response) => {
                const { data } = response;
                setProduct(data);
                if (
                    data.productAuction &&
                    !isAuctionOngoing(
                        data.productAuction.startDate,
                        data.productAuction.endDate
                    )
                ) {
                    setIsBidEnabled(false);
                }

                if (
                    !auth.userId ||
                    (auth.userId && auth.userId === data.userId)
                ) {
                    setIsBidEnabled(false);
                }
                setSellerId(data.userId);
                setActiveImg(response.data.productImages[0].imageUrl);
                return data;
            })
            .then((data) => {
                if (auth.userId && data.userId === auth.userId) {
                    axios
                        .get(
                            `/backend/api/v1/bids/by-product?product-id=${productId}`,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    withCredentials: true,
                                    Authorization: `Bearer ${auth.accessToken}`,
                                },
                            }
                        )
                        .then((response) => {
                            const highest = Number(
                                findHighestBid(
                                    response?.data?.content,
                                    product
                                ).replace("$", "")
                            );
                            const { data } = response;
                            const { content } = data;
                            setTotalBids(data?.totalElements);
                            setBids(extractDate(content));
                            setHighestBid(highest);
                            if (
                                auth.userId &&
                                hasBid(auth.userId, content) &&
                                content?.length !== 0 &&
                                auth.userId ===
                                    content.filter(
                                        (el) => el.price === highest
                                    )[0].userId
                            )
                                setIsHighest(true);
                        })
                        .catch((err) => {
                            if (err.status === 404) setBids([]);
                        });
                } else {
                    axios
                        .get(
                            `backend/api/v1/bids/highest-by-product/${productId}`,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    withCredentials: true,
                                    Authorization: `Bearer ${auth.accessToken}`,
                                },
                            }
                        )
                        .then((response) => {
                            setHighestBid(
                                response.data.highestPrice === 0
                                    ? data.price
                                    : response.data.highestPrice
                            );
                            setTotalBids(response.data.numberOfBids);
                            if (
                                auth.userId &&
                                response.data.userId === auth.userId
                            )
                                setIsHighest(true);
                        })
                        .catch((err) => {
                            if (err.response.data.code === 6) {
                                const highest = Number(
                                    findHighestBid([], data).replace("$", "")
                                );
                                setHighestBid(
                                    highest === 0 ? data.price : highest
                                );
                            }
                        });
                }
            })
            .finally(() => setIsLoading(false));
    }, [isTokenValid]);

    const useSetActiveImg = (event) => {
        setActiveImg(event.target.src);
    };

    const useChangeInput = (event) => {
        setBidInput(event.target.value);
    };

    const useSubmitBid = (event) => {
        if (bidInput - 1 < highestBid || bidInput >= 10000000) {
            setIsValid(false);
            return;
        }

        axios
            .post(
                `/backend/api/v1/bids`,
                {
                    productId: productId,
                    price: bidInput
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        withCredentials: true,
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) navigate(0);
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setIsValid(false);
                    setIsTokenValid(false);
                    return;
                }
            });
    };

    if (product === null || product === undefined) return <></>;
    return (
        <>
            <Navbar showSearch={true} />
            {isLoading ? (
                <Spinner />
            ) : (
                <div id='page-container'>
                    <Breadcrumb
                        title={product.productName}
                        path={`product/${product.id}`}
                        currentPage='Single Product'
                    />
                    {auth.userId && sellerId !== auth.userId ? (
                        <BidMessage
                            type={
                                !isValid
                                    ? "invalid"
                                    : isWinner
                                    ? "win"
                                    : isHighest
                                    ? "topbid"
                                    : "outbid"
                            }
                            bold={
                                !isTokenValid
                                    ? message.expired.bold
                                    : !isValid
                                    ? messages.invalid.bold
                                    : isWinner
                                    ? messages.winner.bold
                                    : ""
                            }
                            regular={
                                !isTokenValid
                                    ? messages.expired.regular
                                    : !isValid
                                    ? messages.invalid.regular
                                    : isWinner
                                    ? messages.winner.regular
                                    : isHighest
                                    ? messages.highest.regular
                                    : messages.notHighest.regular
                            }
                        />
                    ) : (
                        <></>
                    )}
                    <Row id='product-container'>
                        <Col id='images-container' span={12}>
                            <Row id='large-preview'>
                                <img
                                    src={activeImg}
                                    alt='large-preview'
                                    id='large-image-switchable'
                                />
                            </Row>
                            <Row id='all-images' gutter={[0, 16]}>
                                {product.productImages.map((img) => (
                                    <Col
                                        key={img.id}
                                        className='small-previews'>
                                        <button onClick={useSetActiveImg}>
                                            <img
                                                src={img.imageUrl}
                                                alt={product.productImages.indexOf(
                                                    img
                                                )}
                                            />
                                        </button>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col id='product-information-container' span={12}>
                            <Row id='product-name'>
                                <h3>{product.productName}</h3>
                            </Row>
                            <Row id='product-price'>
                                <p>
                                    Starts from:&nbsp;
                                    <span className='highlighted-span'>
                                        ${product.price}
                                    </span>
                                </p>
                            </Row>
                            <Row id='bids-container'>
                                <Row>
                                    <p>
                                        Highest bid:&nbsp;
                                        <span className='highlighted-span'>
                                            ${highestBid}
                                        </span>
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        Number of bids:&nbsp;
                                        <span className='highlighted-span'>
                                            {totalBids}
                                        </span>
                                    </p>
                                </Row>
                                <Row>
                                    <p>
                                        Time left:&nbsp;
                                        <span className='highlighted-span'>
                                            {product.productAuction === null
                                                ? "Not Active"
                                                : getRelativeTime(
                                                      product.productAuction
                                                          .endDate
                                                  )}
                                        </span>
                                    </p>
                                </Row>
                            </Row>
                            {isBidEnabled ? (
                                <Row>
                                    <Col id='bid-amount-container'>
                                        <Input
                                            placeholder={`Enter $${
                                                highestBid + 1
                                            } or higher`}
                                            id='bid-amount-input'
                                            onChange={useChangeInput}
                                        />
                                    </Col>
                                    <Col id='place-bid-button'>
                                        <button
                                            type='submit'
                                            onClick={useSubmitBid}>
                                            <Row>
                                                <p id='place-bid-span'>
                                                    PLACE BID
                                                </p>
                                                &nbsp;
                                                <embed src={vector} />
                                            </Row>
                                        </button>
                                    </Col>
                                </Row>
                            ) : (
                                <></>
                            )}
                            <Tabs type='product-tabs'>
                                <ProductOverviewTabs
                                    description={product.description}
                                    name='Details'
                                    key={product.id}
                                    key1={product.id}
                                    disabled={false}
                                />

                                <div
                                    name='Seller Information'
                                    key1='seller-information'
                                    description='TEST1'
                                    disabled={true}></div>
                                <div
                                    name='Customer Reviews'
                                    key1='customer-reviews'
                                    description='TEST2'
                                    disabled={true}></div>
                            </Tabs>
                        </Col>
                    </Row>
                    <Row id='separator'>
                        {auth.userId === sellerId && bids.length !== 0 ? (
                            <h1>
                                {auth.userId === sellerId && bids.length !== 0
                                    ? "Bidders"
                                    : "Related Products"}
                            </h1>
                        ) : (
                            <></>
                        )}
                    </Row>
                    {auth.userId === sellerId && bids.length !== 0 ? (
                        <Row id='bidders-table'>
                            <Table
                                columns={columns}
                                dataSource={bids}
                                pagination={false}
                                rowKey={(el) => el.id}
                            />
                        </Row>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </>
    );
};

export default Product;
