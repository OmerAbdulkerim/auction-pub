import "./highlightedProduct.scss";
import { Col, Row } from "antd";
import vector from "assets/Vector.svg";
import { useNavigate } from "react-router";

const HighlightedProduct = ({ highlightedProduct }) => {
    const navigate = useNavigate();

    if (highlightedProduct.length === 0) return <></>;

    const navigateToProduct = () => {
        navigate(`product?product-id=${highlightedProduct[0].id}`);
    }

    return (
        <>
            <Col id='product-info'>
                <Row>
                    <h3 id='name'>{highlightedProduct[0].productName}</h3>
                </Row>
                <Row>
                    <h3>Start From ${highlightedProduct[0].price}</h3>
                </Row>
                <Row id='highlighted-product-description'>
                    <p>{highlightedProduct[0].description}</p>
                </Row>
                <Row id="bid-button">
                    <button type='primary' id='bid-now' onClick={navigateToProduct}>
                        <Row>
                            <p>BID NOW</p>
                            <embed src={vector} />
                        </Row>
                    </button>
                </Row>
            </Col>
            <Col id="highlighted-image-container">
                <img
                    src={highlightedProduct[0].productImages[0].imageUrl}
                    alt='product-media'
                    id='highlighted-pic'
                />
            </Col>
        </>
    );
};

export default HighlightedProduct;
