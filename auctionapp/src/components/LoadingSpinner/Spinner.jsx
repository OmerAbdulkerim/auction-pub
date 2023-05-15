import "./spinner.scss";
import { Spin, Col } from "antd";

const Spinner = () => {
    return (
        <Col id='spinner-container'>
            <Spin size='large' />
        </Col>
    );
};

export default Spinner;
