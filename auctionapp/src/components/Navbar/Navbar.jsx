import "./navbar.scss";
import logo from "assets/auctionapplogo.png";
import { Col, Row } from "antd";
import { SocialIcon } from "react-social-icons";
import { Search as SearchIcon } from "akar-icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "hooks/useAuth";

const Navbar = ({ showSearch }) => {
    const { auth } = useAuth();
    const { username } = auth;
    const socialIcons = ["facebook", "instagram", "twitter"];
    const [searchField, setSearchField] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleInput = (event) => {
        setSearchField(event.target.value);
    };
    
    const submitQuery = (e) => {
        location.pathname = location.pathname === "/shop" ? "" : "/shop";
        e.preventDefault();
        if (searchField !== null) {
            searchField !== ""
                ? navigate(
                      `${location.pathname}?comparator=${e.nativeEvent.srcElement[0].value}`,
                      {
                          replace: true,
                          state: { comparator: searchField },
                      }
                  )
                : navigate(location.pathname);
        }
    };
    return (
        <div id='nav-main-div'>
            <nav id='header'>
                <div id='icons-container'>
                    {socialIcons.map((el) => (
                        <SocialIcon
                            network={`${el}`}
                            className='social-icon'
                            bgColor='#9B9B9B'
                            key={el}
                        />
                    ))}
                </div>
                {username ? (
                    <div id='username'>Hi, {username}</div>
                ) : (
                    <div id='href-container'>
                        <a href='login' className='header-button'>
                            Login
                        </a>
                        or
                        <a href='register' className='header-button'>
                            Create an account
                        </a>
                    </div>
                )}
            </nav>
            <nav id='navbar'>
                <Col
                    span={4}
                    id={
                        !showSearch ? "logo-container" : "logo-container-start"
                    }>
                    <a href='/' className='logo'>
                        <img alt='Logo' src={logo} className='logo' />
                    </a>
                </Col>
                {!showSearch ? (
                    <></>
                ) : (
                    <>
                        <Col id='navbar-right-div' span={14}>
                            <Row id='search-div'>
                                <form
                                    action='/'
                                    id='search-form'
                                    onSubmit={submitQuery}>
                                    <input
                                        type='text'
                                        placeholder='Try enter: Shoes'
                                        name='search'
                                        id='search-input'
                                        onChange={handleInput}
                                    />
                                    <button type='submit' id='search-button'>
                                        <SearchIcon strokeWidth={2} size={17} />
                                    </button>
                                </form>
                            </Row>
                        </Col>
                        <Col span={6} id='refs'>
                            <Row id='navbar-hrefs'>
                                <a href='/' className='navbar-button'>
                                    HOME
                                </a>
                                <a href='/shop' className='navbar-button'>
                                    SHOP
                                </a>
                                <a href='/account' className='navbar-button'>
                                    MY ACCOUNT
                                </a>
                            </Row>
                        </Col>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
