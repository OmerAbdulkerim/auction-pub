import "./footer.scss";
import { SocialIcon } from "react-social-icons";
import { Col, Row, Button, Input } from "antd";

const Footer = () => {
    const socialIcons = ["facebook", "instagram", "twitter"];

    return (
        <div id='footer-container'>
            <Row id="columns-container">
                <Col span={4} xs={24} sm={12} md={8} className="column">
                    <p className='row-title'>AUCTION</p>
                    <Row>
                        <Button type='link'>
                            <a href='/about'>About us</a>
                        </Button>
                    </Row>
                    <Row>
                        <Button type='link'>
                            <a href='/terms'>Terms and Conditions</a>
                        </Button>
                    </Row>
                    <Row>
                        <Button type='link'>
                            <a href='/privacy'>Privacy Policy</a>
                        </Button>
                    </Row>
                </Col>
                <Col span={4} xs={24} sm={12} md={8} className="column">
                    <p className='row-title'>GET IN TOUCH</p>
                    <Row>
                        <p className='firstFooterParagraph'>
                            Call Us at +123 797-567-2535
                        </p>
                    </Row>
                    <Row>
                        <p className='footerParagraph'>support@auction.com</p>
                    </Row>
                    <Row id='social-icon-row'>
                        {socialIcons.map((el) => {
                            return (
                                <SocialIcon
                                    network={el}
                                    className='social-icon-footer'
                                    bgColor='#9B9B9B'
                                    key={el}
                                />
                            );
                        })}
                    </Row>
                </Col>
                <Col span={6} xs={24} sm={12} md={8} className="column">
                    <p className='row-title'>NEWSLETTER</p>
                    <Row>
                        <p className='firstFooterParagraph'>
                            Enter your email address and get notified about new
                            products. We hate spam!
                        </p>
                    </Row>
                    <Row>
                        <Input.Group compact id="input-group">
                            <Input
                                placeholder='Your Email Address'
                                id='input-email'
                            />
                            <Button type='primary' id='subscribe-to-email'>
                                GO
                            </Button>
                        </Input.Group>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
