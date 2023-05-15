import "./breadcrumb.scss";
import vector from "assets/arrow-right.svg";
import { Row, Breadcrumb as AntBreadcrumb} from "antd";

const Breadcrumb = ({title, path, currentPage = "default"}) => {
    return (
        <>
            <Row id='breadcrumb-container'>
                <p id='breadcrumb-title'>{title}</p>
                <AntBreadcrumb separator={<embed src={vector}></embed>}>
                    <AntBreadcrumb.Item>
                        <a href='/'>Home</a>
                    </AntBreadcrumb.Item>
                    <AntBreadcrumb.Item>
                        <a href={`/${path}`}>{currentPage === "default" ? title : currentPage}</a>
                    </AntBreadcrumb.Item>
                </AntBreadcrumb>
            </Row>
        </>
    );
};

export default Breadcrumb;
