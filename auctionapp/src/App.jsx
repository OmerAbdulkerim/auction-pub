import "./App.scss";
import "antd/dist/antd.min.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "views/MainLayout/MainLayout";
import LandingPage from "views/LandingPage/LandingPage";
import AboutUs from "views/AboutUs/AboutUs";
import TermsConditions from "views/TermsConditions/TermsConditions";
import PrivacyPolicy from "views/PrivacyPolicy/PrivacyPolicy";
import ShopPage from "views/ShopPage/ShopPage";
import Product from "views/Product/Product";
import Login from "views/Login";
import Register from "views/Register";
import PersistLogin from "components/PersistLogin/PersistLogin";
import Account from "views/Account/Account";
//import AddProduct from "views/AddProduct/AddProduct";

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route element={<PersistLogin />}>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='about' element={<AboutUs />} />
                    <Route path='terms' element={<TermsConditions />} />
                    <Route path='privacy' element={<PrivacyPolicy />} />
                    <Route path='shop' element={<ShopPage />} />
                    <Route path='account' element={<Account />} />
                    <Route path='product/*' element={<Product />} />
                </Route>

                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Route>
        </Routes>
    );
}

export default App;
