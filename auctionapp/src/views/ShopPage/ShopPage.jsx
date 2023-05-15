import "./shopPage.scss";
import axios from "axios";
import Grid from "components/Grid/Grid";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Navbar from "components/Navbar/Navbar";

const ShopPage = () => {
    const { state } = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [exploreMoreActive, setExploreMoreActive] = useState(false);
    const [currentRequestPage, setCurrentRequestPage] = useState(0);
    const [categoriesObj, setCategoriesObj] = useState([]);
    const [currentCheckedCategories, setCurrentCheckedCategories] = useState(
        []
    );
    const [activeCategoryId, setActiveCategoryId] = useState("");
    const [comparator, setComparator] = useState(
        !state ? "" : !state.comparator ? "" : state.comparator
    );
    const [filterQuery, setFilterQuery] = useState("?");

    useEffect(() => {
        let query = "";
        const parentCategory = searchParams.get("parent-category");
        const comp = searchParams.get("comparator");
        if (parentCategory !== null) {
            setActiveCategoryId(parentCategory);
            query = queryBuilder({ category: parentCategory });
            setFilterQuery(query);
            performAxios(query);
        } else if (comp !== null) {
            setComparator(comp);
            query = queryBuilder({ comp });
            setFilterQuery(query);
            performAxios(query);
        } else {
            query = queryBuilder({});
            performAxios(query, []);
        }

        axios.get(`backend/api/v1/categories`).then((response) => {
            const { data } = response;
            const newArray = data
                .map((el) => {
                    if (el.parentId === null) {
                        return {
                            parent: el,
                            children: data.filter(
                                (child) => child.parentId === el.id
                            ),
                        };
                    }
                    return null;
                })
                .filter((el) => el !== null);
            setCategoriesObj(newArray);
        });
    }, []);

    useEffect(() => {
        if (!state) return;
        let query = "";
        if (state && state.comparator) {
            setComparator(state.comparator);
            query = queryBuilder({
                comp: state.comparator,
                checked: currentCheckedCategories,
                category: activeCategoryId,
                currentPage: currentRequestPage,
            });
        } else {
            setComparator("");
            query = queryBuilder({
                comp: null,
                currentPage: currentRequestPage,
                checked: currentCheckedCategories,
                category: activeCategoryId,
            });
        }
        performAxios(query, []);
    }, [state]);

    const queryBuilder = ({ checked, category, comp, currentPage }) => {
        let query = `backend/api/v1/products/filter`;
        let prefix = "?";

        if (
            (!checked || checked.length === 0) &&
            !category &&
            !comp &&
            (!currentPage || currentPage === 0)
        )
            return query.concat(prefix).concat("pageSize=9");

        if (category) {
            query = query.concat(prefix).concat(`parent-category=${category}`);
            prefix = "&";
        }
        if (checked) {
            query = query.concat(prefix).concat(`category-ids=${checked}`);
            prefix = "&";
        }
        if (comp) {
            query = query.concat(prefix).concat(`comparator=${comp}`);
            prefix = "&";
        }
        if (currentPage) {
            query = query.concat(prefix).concat(`pageNo=${currentPage}`);
            prefix = "&";
        }
        query = query.concat(prefix).concat("pageSize=9");
        setFilterQuery(query);
        return query;
    };

    const performAxios = (query = filterQuery, currentProducts = products) => {
        axios.get(query).then((response) => {
            setCurrentRequestPage(response.data.number);
            setProducts(currentProducts.concat(response.data.content));
            if (
                response.data.pageable.pageNumber <
                response.data.totalPages - 1
            )
                setExploreMoreActive(true);
            else setExploreMoreActive(false);
        });
    };

    const dropDownSubcategories = (event) => {
        let query = filterQuery;
        setCurrentCheckedCategories([]);
        if (activeCategoryId === event.target.id) {
            query = queryBuilder({
                checked: [],
                comp: comparator,
                category: null,
            });
            setFilterQuery(query);
            setActiveCategoryId("");
            performAxios(query, []);
            return;
        }
        setActiveCategoryId(event.target.id);
        query = queryBuilder({
            checked: [],
            category: event.target.id,
            comp: comparator,
        });
        setFilterQuery(query);
        performAxios(query, []);
    };

    const fetchNewProductsPage = () => {
        const query = queryBuilder({
            checked: currentCheckedCategories,
            category: activeCategoryId,
            comp: comparator,
            currentPage: currentRequestPage + 1,
        });
        setCurrentRequestPage(currentRequestPage + 1);
        performAxios(query);
    };

    const applyFilter = (event) => {
        let newCurrentChecked = [].concat(currentCheckedCategories);
        const index = currentCheckedCategories.indexOf(event.target.id);

        if (index === -1) {
            newCurrentChecked.push(event.target.id);
        } else {
            index === 0
                ? (newCurrentChecked = [])
                : (newCurrentChecked = newCurrentChecked.filter(
                      (el) => el !== event.target.id
                  ));
        }
        const query = queryBuilder({
            checked:
                newCurrentChecked.length === 0
                    ? ""
                    : newCurrentChecked.toString(),
            category: activeCategoryId,
            comp: comparator,
        });
        setCurrentRequestPage(0);
        setCurrentCheckedCategories(newCurrentChecked);
        performAxios(query, []);
    };

    return (
        <>
            <Navbar showSearch={true} />
            <Row id='shop-container'>
                <Col id='filter-container' span={5}>
                    <Col id='category-filter'>
                        <h1>PRODUCT CATEGORIES</h1>
                        {categoriesObj.map(({ parent, children }) => {
                            return (
                                <Row
                                    className='category-container'
                                    key={parent.id}>
                                    <div className='category-header'>
                                        <p className='parent-name'>
                                            {parent.name}
                                        </p>
                                        <button
                                            id={parent.id}
                                            onClick={dropDownSubcategories}>
                                            {activeCategoryId === parent.id
                                                ? "-"
                                                : "+"}
                                        </button>
                                    </div>
                                    {activeCategoryId === parent.id &&
                                    children.length !== 0 ? (
                                        <Row className='category-body'>
                                            {children.map((el) => (
                                                <Row
                                                    className='checkbox-row'
                                                    key={el.id}>
                                                    <input
                                                        id={el.id}
                                                        className='checkbox-category'
                                                        type='checkbox'
                                                        value={el.name}
                                                        onChange={applyFilter}
                                                    />
                                                    <span>{el.name}</span>
                                                </Row>
                                            ))}
                                        </Row>
                                    ) : (
                                        <div></div>
                                    )}
                                </Row>
                            );
                        })}
                    </Col>
                </Col>
                <Col span={19} id='products-col'>
                    <Row id='grid-row'>
                        <Grid products={products} columns={3} />
                    </Row>
                    {exploreMoreActive ? (
                        <Row id='explore-button-row'>
                            <button
                                id='explore-more'
                                onClick={fetchNewProductsPage}>
                                Explore More
                            </button>
                        </Row>
                    ) : (
                        <></>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default ShopPage;
