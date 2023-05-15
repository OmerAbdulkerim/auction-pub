import "./seller.scss";
import { Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import useAuth from "hooks/useAuth";

const columns = [
    {
        title: "Item",
        dataIndex: "item",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Time left",
        dataIndex: "time",
    },
    {
        title: "Starting price",
        dataIndex: "price",
    },
    {
        title: "No. bids",
        dataIndex: "bids",
    },
    {
        title: "Highest Bid",
        dataIndex: "highest",
    },
    {
        title: "",
        dataIndex: "id",
    },
];

const SellerItems = ({ typeOfItems }) => {
    const { auth } = useAuth();

    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 3,
        },
    });
    const [dataSource, setDataSource] = useState([]);
    const location = useLocation();
    location.pathname = "";
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const fetchData = () => {
        setLoading(true);
        axios
            .get(`/backend/api/v1/products/${auth.userId}/products-overview`, {
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                params: {
                    status: typeOfItems,
                    pageNo: tableParams.pagination.current - 1,
                    pageSize: tableParams.pagination.pageSize,
                },
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200 && data.content.lenght !== 0) {
                    const newArr = [];
                    data.content.forEach((el) => {
                        newArr.push({
                            item: (
                                <img src={el.pictureUrl} alt='table-element' />
                            ),
                            name: el.productName,
                            time: moment(new Date(el.endDate)).fromNow(),
                            price: el.startPrice,
                            highest: el.highestBid,
                            bids: el.bidsAmount,
                            key: el.productId,
                            id: (
                                <button
                                    onClick={() =>
                                        navigate(
                                            `${location.pathname}/product?product-id=${el.productId}`
                                        )
                                    }>
                                    VIEW
                                </button>
                            ),
                        });
                    });
                    setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: data.totalElements,
                        },
                    });
                    setDataSource(newArr);
                }
            })
            .finally(() => setLoading(false));
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataSource([]);
        }
    };

    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
            loading={loading}
        />
    );
};

export default SellerItems;
