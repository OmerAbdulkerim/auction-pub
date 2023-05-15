import "./seller.scss";
import { Row, Tabs } from "antd";
import SellerItems from "./SellerItems";

const tabContents = [
    {
        element: <SellerItems typeOfItems='ACTIVE' />,
        name: "Active",
        key: "active-items",
    },
    {
        element: <SellerItems typeOfItems='SOLD' />,
        name: "Sold",
        key: "sold-items",
    },
];

const items = new Array(tabContents.length).fill(null).map((_, i) => {
    return {
        label: tabContents[i].name,
        key: tabContents[i].key,
        children: tabContents[i].element,
    };
});

const Seller = () => {
    return (
        <>
            <Row id='account-navigation'>
                <Tabs items={items} tabBarGutter={0} />
            </Row>
        </>
    );
};

export default Seller;
