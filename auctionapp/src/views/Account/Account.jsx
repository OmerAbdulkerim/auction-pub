import "./account.scss";
import { Row, Button, Tabs } from "antd";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import Navbar from "components/Navbar/Navbar";
import AccountForms from "./AccountForms";
import Seller from "components/Seller/Seller";
import Bids from "components/Bids/Bids";
import useAuth from "hooks/useAuth";
import Login from "views/Login";
import { useNavigate } from "react-router-dom";


const tabContents = [
    { element: <AccountForms />, name: "Profile", key: "accountForms" },
    { element: <Seller />, name: "Seller", key: "sellersItems" },
    { element: <Bids />, name: "Bids", key: "bidsItems" },
];

const items = new Array(tabContents.length).fill(null).map((_, i) => {
    return {
        label: tabContents[i].name,
        key: tabContents[i].key,
        children: tabContents[i].element,
    };
});

const Account = () => {
    const { auth } = useAuth();
    const navigate = useNavigate();
    
    const operations = <Button onClick={navigate("/add-product", {replace: true})}>ADD ITEM</Button>;

    return (
        <>
            {auth.accessToken ? (
                <>
                    <Navbar showSearch={true} />
                    <div id='account-container'>
                        <Breadcrumb
                            title='Profile'
                            path={"account"}
                            currentPage={"My Account"}
                        />
                        <Row id='account-navigation'>
                            <Tabs
                                tabBarExtraContent={operations}
                                items={items}
                                tabBarGutter={0}
                            />
                        </Row>
                    </div>
                </>
            ) : (
                <Login />
            )}
        </>
    );
};

export default Account;
