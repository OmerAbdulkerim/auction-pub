import "./productOverviewTabs.scss";
import { Row } from "antd";

const ProductOverviewTabs = ({ description }) => {
    if ((description === null) | undefined) return <></>;
    return (
        <Row id='details-tab'>
            <p>{description}</p>
        </Row>
    );
};

export default ProductOverviewTabs;
