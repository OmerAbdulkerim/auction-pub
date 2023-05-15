import "./aboutUs.scss";
import pic1 from "assets/Rectangle 63.png";
import pic2 from "assets/Rectangle 64.png";
import pic3 from "assets/Rectangle 65.png";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";
import { Col, Row } from "antd";
import Navbar from "components/Navbar/Navbar";

const AboutUs = () => {
    return (
        <>
            <Navbar showSearch={true} />
            <div id='about-us-container'>
                <Breadcrumb title='About Us' path='about' />
                <h3>About Us</h3>
                <Row justify='space-evenly' id='about-row'>
                    <Col span={12} id='about-text'>
                        <Row>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Duis consequat pretium turpis,
                                in eleifend mi laoreet sed. Donec ipsum mauris,
                                venenatis sit amet porttitor id, laoreet eu
                                magna. In convallis diam volutpat libero
                                tincidunt semper. Ut aliquet erat rutrum,
                                venenatis lacus ut, ornare lectus. Quisque
                                congue ex sit amet diam malesuada, eget laoreet
                                quam molestie. In id elementum turpis. Curabitur
                                quis tincidunt mauris.
                            </p>
                        </Row>
                        <Row>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Duis consequat pretium turpis,
                                in eleifend mi laoreet sed. Donec ipsum mauris,
                                venenatis sit amet porttitor id, laoreet eu
                                magna. In convallis diam volutpat libero
                                tincidunt semper. Ut aliquet erat rutrum,
                                venenatis lacus ut, ornare lectus. Quisque
                                congue ex sit amet diam malesuada, eget laoreet
                                quam molestie. In id elementum turpis. Curabitur
                                quis tincidunt mauris.
                            </p>
                        </Row>
                        <Row>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Duis consequat pretium turpis,
                                in eleifend mi laoreet sed. Donec ipsum mauris,
                                venenatis sit amet porttitor id, laoreet eu
                                magna. In convallis diam volutpat libero
                                tincidunt semper. Ut aliquet erat rutrum,
                                venenatis lacus ut, ornare lectus. Quisque
                                congue ex sit amet diam malesuada, eget laoreet
                                quam molestie. In id elementum turpis. Curabitur
                                quis tincidunt mauris.
                            </p>
                        </Row>
                        <Row>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Duis consequat pretium turpis,
                                in eleifend mi laoreet sed. Donec ipsum mauris,
                                venenatis sit amet porttitor id, laoreet eu
                                magna. In convallis diam volutpat libero
                                tincidunt semper. Ut aliquet erat rutrum,
                                venenatis lacus ut, ornare lectus. Quisque
                                congue ex sit amet diam malesuada, eget laoreet
                                quam molestie. In id elementum turpis. Curabitur
                                quis tincidunt mauris.
                            </p>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={24} id='first-pic-col'>
                                <img
                                    src={pic1}
                                    alt='First Media'
                                    className='template-image'
                                />
                            </Col>
                        </Row>
                        <Row id='second-pic-row'>
                            <Col span={12}>
                                <img
                                    src={pic2}
                                    alt='Second Media'
                                    className='template-image'
                                />
                            </Col>
                            <Col span={12}>
                                <img
                                    src={pic3}
                                    alt='Third Media'
                                    className='template-image'
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default AboutUs;
