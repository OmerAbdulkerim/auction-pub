import "./landingPage.scss";
import axios from "axios";
import { Col, Row } from "antd";
import { useState, useEffect } from "react";
import Grid from "components/Grid/Grid";
import HighlightedProduct from "components/HighlightedProduct/HighlightedProduct";
import Tabs from "components/Tabs/Tabs";
import Navbar from "components/Navbar/Navbar";

const LandingPage = () => {
    const [newestProducts, setNewestProducts] = useState([]);
    const [lastChanceProducts, setLastChanceProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("/backend/api/v1/products/latest").then((response) => {
            setNewestProducts(response.data.content);
        });

        axios.get("/backend/api/v1/categories/parents").then((response) => {
            setCategories(response.data);
        });

        axios.get("/backend/api/v1/products/last-chance").then((response) => {
            setLastChanceProducts(response.data.content);
        });
    }, []);

    return (
        <>
            <Navbar showSearch={true} />
            <div id='landing-container'>
                <Row id='categories-highlighted-row'>
                    <Col id='categories-container'>
                        <p id='categories-title'>CATEGORIES</p>
                        {categories.map((el) => (
                            <div className='category-row' key={el.id}>
                                <a href={`shop?parent-category=${el.id}`}>
                                    {el.name}
                                </a>
                            </div>
                        ))}
                    </Col>
                    <Col id='highlighted-product' span={16}>
                        <HighlightedProduct
                            highlightedProduct={newestProducts}
                        />
                    </Col>
                </Row>
                <Row id='featured-row'></Row>
                <Row id='new-top-latest-row'>
                    <Row id='bottom-buttons'>
                        <Tabs type='grid-tabs'>
                            <Grid
                                products={newestProducts}
                                name='New Arrivals'
                                key='new-arrivals-tab'
                                key1='new-arrivals-tab'
                                disabled={false}
                            />

                            <div
                                name='Top Rated'
                                key1='top-rated'
                                description='PLACEHOLDER'
                                disabled={true}></div>
                            <Grid
                                products={lastChanceProducts}
                                name='Last Chance'
                                key='last-chance-tab'
                                key1='last-chance'
                                disabled={false}
                            />
                        </Tabs>
                    </Row>
                </Row>
            </div>
        </>
    );
};

export default LandingPage;
