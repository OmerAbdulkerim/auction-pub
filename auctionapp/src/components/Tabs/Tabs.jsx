import "./tabs.scss";
import { Row } from "antd";
import { useState } from "react";

const Tabs = ({ children, type }) => {
    const [activeTab, setactiveTab] = useState("tab0");

    const useSetactiveTab = (event) => {
        if (event.target.className === "disabled") return;
        setactiveTab(event.target.id);
    };

    if (children.length === 0) return <></>;

    return (
        <div className={type}>
            <Row id='tabs-div'>
                {children.map((child, index) => {
                    return (
                        <button
                            key={index}
                            className={
                                child.props.disabled
                                    ? "disabled"
                                    : activeTab === `tab${index}`
                                    ? "tab-active"
                                    : ""
                            }
                            id={`tab${index}`}
                            onClick={useSetactiveTab}>
                            {child.props.name}
                        </button>
                    );
                })}
            </Row>
            <div className='outlet'>
                {children.map((child, index) => {
                    if (child.type === undefined || activeTab !== `tab${index}`)
                        return <div key={index}></div>;
                    return (
                        <div key={index} className='content-active'>
                            {child}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tabs;
