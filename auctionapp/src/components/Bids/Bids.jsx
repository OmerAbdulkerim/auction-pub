import "./bids.scss";
import { Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "hooks/useAuth";
import moment from "moment/moment";

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
        title: "Your price",
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

const Bids = () => {
    const { auth } = useAuth();

    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 3,
        },
    });
    const [dataSource, setDataSource] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    location.pathname = "";

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const fetchData = () => {
        setLoading(true);
        axios
            .get(`/backend/api/v1/bids/by-user`, {
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                params: {
                    pageNo: tableParams.pagination.current - 1,
                    pageSize: tableParams.pagination.pageSize,
                },
            })
            .then((response) => {
                const { data } = response;
                if (response.status === 200 && data.content.length !== 0) {
                    const newArr = [];
                    data.content.forEach((el) => {
                        newArr.push({
                            key: el.bidId,
                            item: (
                                <img
                                    src={el.imageUrls[0].imageUrl}
                                    alt='table-element'
                                />
                            ),
                            name: el.productName,
                            time: moment(new Date(el.endDate)).fromNow(),
                            price: el.myBid,
                            bids: el.totalBids,
                            highest: el.highestBid,
                            id: (
                                <button
                                    onClick={() =>
                                        navigate(
                                            `${location.pathname}/product?product-id=${el.productId}`
                                        )
                                    }>
                                    BID
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
            rowKey={(record) => record.key}
            dataSource={dataSource}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
            loading={loading}
        />
    );
};

export default Bids;
