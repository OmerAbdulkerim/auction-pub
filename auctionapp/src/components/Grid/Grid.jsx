import "./grid.scss";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const Grid = ({ products, columns = 4}) => {
    const navigate = useNavigate();
    if (products.length === 0) return <></>;
    return (
        <Row className='items-row' gutter={[0, 24]}>
            {products.map((product) => (
                <Col
                    span={24/columns}
                    key={products.indexOf(product)}
                    className='product-container'>
                    <button onClick={() => navigate(`/product?product-id=${product.id}`, {state: product})}>
                        <Row className='image-row'>
                            <img src={product.productImages[0].imageUrl} alt="grid-media"/>
                        </Row>
                        <Row>
                            <h1>{product.productName}</h1>
                        </Row>
                        <Row>
                            <p>Start From: <span className="price-span">${product.price}</span></p>
                        </Row>
                    </button>
                </Col>
            ))}
        </Row>
    );
};

export default Grid;
