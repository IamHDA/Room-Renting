import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLocationDot, faAngleDown, faMagnifyingGlass, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import '../../css/user-css/HomePage.css';
import {Link} from "react-router-dom";

const MyComponent = () => {
    return (
        <div>
            <div className="search-container">
                <div className="search-bounding">
                    <div className="upper">
                        <div className="city-selector">
                            <FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
                            <p>Thành phố</p>
                            <FontAwesomeIcon icon={faAngleDown} className="arrow-down-icon"/>
                            <img src="../../../public/homePage-icon/pipe.png" className="pipe"/>
                        </div>
                        <div className="search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                            <input className="search-input" type="text" placeholder="Nhập địa điểm. Ví dụ: Đại Kim, Hoàng Mai"/>
                        </div>
                        <div className="search-button">Tìm kiếm</div>
                    </div>
                    <div className="lower">
                        <div className="category">
                            <p>Loại trọ</p>
                            <FontAwesomeIcon icon={faAngleDown} className="arrow-down-icon"/>
                        </div>
                        <div className="price">
                            <p>Mức giá</p>
                            <FontAwesomeIcon icon={faAngleDown} className="arrow-down-icon"/>
                        </div>
                        <div className="area">
                            <p>Diện tích</p>
                            <FontAwesomeIcon icon={faAngleDown} className="arrow-down-icon"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="posts-container">
                <h1>Một số phòng trọ nổi bật</h1>
                <div className="post-grid">
                    <Link to="/detail" className="post-container">
                        <img src="../../../public/homePage-icon/home.png" className="post-image"/>
                        <h2 className="post-title">Trọ xây mới tại dãy trọ sóng thần</h2>
                        <div className="post-price-and-area">
                            <p className="post-price"><span>3,4</span> triệu/tháng</p>
                            <p className="post-area">23m&sup2;</p>
                        </div>
                        <div className="post-location-time-save">
                            <div className="post-location-time">
                                <div className="post-location">
                                    <img src="../../../public/homePage-icon/location-black.png" className="post-location-icon"/>
                                    <p className="location">278, Kim Giang, Hoàng Mai, Hà Nội</p>
                                </div>
                                <div className="post-time">
                                    <img src="../../../public/homePage-icon/clock.png" className="post-time-icon"/>
                                    <p className="time">12:00, 21/03/2025</p>
                                </div>
                            </div>
                            <div className="post-save" onClick={(e) => e.preventDefault()}>
                                <img src="../../../public/homePage-icon/heart.png" className="post-save-icon"/>
                            </div>
                        </div>
                    </Link>
                    <div className="post-container">
                        <img src="../../../public/homePage-icon/home.png" className="post-image"/>
                        <h2 className="post-title">Trọ xây mới tại dãy trọ sóng thần</h2>
                        <div className="post-price-and-area">
                            <p className="post-price"><span>3,4</span> triệu/tháng</p>
                            <p className="post-area">23m&sup2;</p>
                        </div>
                        <div className="post-location-time-save">
                            <div className="post-location-time">
                                <div className="post-location">
                                    <img src="../../../public/homePage-icon/location-black.png" className="post-location-icon"/>
                                    <p className="location">278, Kim Giang, Hoàng Mai, Hà Nội</p>
                                </div>
                                <div className="post-time">
                                    <img src="../../../public/homePage-icon/clock.png" className="post-time-icon"/>
                                    <p className="time">12:00, 21/03/2025</p>
                                </div>
                            </div>
                            <div className="post-save">
                                <img src="../../../public/homePage-icon/heart.png"/>
                            </div>
                        </div>
                    </div>
                    <div className="post-container">
                        <img src="../../../public/homePage-icon/home.png" className="post-image"/>
                        <h2 className="post-title">Trọ xây mới tại dãy trọ sóng thần</h2>
                        <div className="post-price-and-area">
                            <p className="post-price"><span>3,4</span> triệu/tháng</p>
                            <p className="post-area">23m&sup2;</p>
                        </div>
                        <div className="post-location-time-save">
                            <div className="post-location-time">
                                <div className="post-location">
                                    <img src="../../../public/homePage-icon/location-black.png" className="post-location-icon"/>
                                    <p className="location">278, Kim Giang, Hoàng Mai, Hà Nội</p>
                                </div>
                                <div className="post-time">
                                    <img src="../../../public/homePage-icon/clock.png" className="post-time-icon"/>
                                    <p className="time">12:00, 21/03/2025</p>
                                </div>
                            </div>
                            <div className="post-save">
                                <img src="../../../public/homePage-icon/heart.png" className="post-save-icon"/>
                            </div>
                        </div>
                    </div>
                    <div className="post-container">
                        <img src="../../../public/homePage-icon/home.png" className="post-image"/>
                        <h2 className="post-title">Trọ xây mới tại dãy trọ sóng thần</h2>
                        <div className="post-price-and-area">
                            <p className="post-price"><span>3,4</span> triệu/tháng</p>
                            <p className="post-area">23m&sup2;</p>
                        </div>
                        <div className="post-location-time-save">
                            <div className="post-location-time">
                                <div className="post-location">
                                    <img src="../../../public/homePage-icon/location-black.png" className="post-location-icon"/>
                                    <p className="location">278, Kim Giang, Hoàng Mai, Hà Nội</p>
                                </div>
                                <div className="post-time">
                                    <img src="../../../public/homePage-icon/clock.png" className="post-time-icon"/>
                                    <p className="time">12:00, 21/03/2025</p>
                                </div>
                            </div>
                            <div className="post-save">
                                <img src="../../../public/homePage-icon/heart.png" className="post-save-icon"/>
                            </div>
                        </div>
                    </div>
                    <div className="post-container">
                        <img src="../../../public/homePage-icon/home.png" className="post-image"/>
                        <h2 className="post-title">Trọ xây mới tại dãy trọ sóng thần</h2>
                        <div className="post-price-and-area">
                            <p className="post-price"><span>3,4</span> triệu/tháng</p>
                            <p className="post-area">23m&sup2;</p>
                        </div>
                        <div className="post-location-time-save">
                            <div className="post-location-time">
                                <div className="post-location">
                                    <img src="../../../public/homePage-icon/location-black.png" className="post-location-icon"/>
                                    <p className="location">278, Kim Giang, Hoàng Mai, Hà Nội</p>
                                </div>
                                <div className="post-time">
                                    <img src="../../../public/homePage-icon/clock.png" className="post-time-icon"/>
                                    <p className="time">12:00, 21/03/2025</p>
                                </div>
                            </div>
                            <div className="post-save">
                                <img src="../../../public/homePage-icon/heart.png" className="post-save-icon"/>
                            </div>
                        </div>
                    </div>
                    <div className="post-container">
                        <img src="../../../public/homePage-icon/home.png" className="post-image"/>
                        <h2 className="post-title">Trọ xây mới tại dãy trọ sóng thần</h2>
                        <div className="post-price-and-area">
                            <p className="post-price"><span>3,4</span> triệu/tháng</p>
                            <p className="post-area">23m&sup2;</p>
                        </div>
                        <div className="post-location-time-save">
                            <div className="post-location-time">
                                <div className="post-location">
                                    <img src="../../../public/homePage-icon/location-black.png" className="post-location-icon"/>
                                    <p className="location">278, Kim Giang, Hoàng Mai, Hà Nội</p>
                                </div>
                                <div className="post-time">
                                    <img src="../../../public/homePage-icon/clock.png" className="post-time-icon"/>
                                    <p className="time">12:00, 21/03/2025</p>
                                </div>
                            </div>
                            <div className="post-save">
                                <img src="../../../public/homePage-icon/heart.png" className="post-save-icon"/>
                            </div>
                        </div>
                    </div>
                    <div className="post-container">
                        <img src="../../../public/homePage-icon/home.png" className="post-image"/>
                        <h2 className="post-title">Trọ xây mới tại dãy trọ sóng thần</h2>
                        <div className="post-price-and-area">
                            <p className="post-price"><span>3,4</span> triệu/tháng</p>
                            <p className="post-area">23m&sup2;</p>
                        </div>
                        <div className="post-location-time-save">
                            <div className="post-location-time">
                                <div className="post-location">
                                    <img src="../../../public/homePage-icon/location-black.png" className="post-location-icon"/>
                                    <p className="location">278, Kim Giang, Hoàng Mai, Hà Nội</p>
                                </div>
                                <div className="post-time">
                                    <img src="../../../public/homePage-icon/clock.png" className="post-time-icon"/>
                                    <p className="time">12:00, 21/03/2025</p>
                                </div>
                            </div>
                            <div className="post-save">
                                <img src="../../../public/homePage-icon/heart.png" className="post-save-icon"/>
                            </div>
                        </div>
                    </div>
                    <div className="post-container">
                        <img src="../../../public/homePage-icon/home.png" className="post-image"/>
                        <h2 className="post-title">Trọ xây mới tại dãy trọ sóng thần</h2>
                        <div className="post-price-and-area">
                            <p className="post-price"><span>3,4</span> triệu/tháng</p>
                            <p className="post-area">23m&sup2;</p>
                        </div>
                        <div className="post-location-time-save">
                            <div className="post-location-time">
                                <div className="post-location">
                                    <img src="../../../public/homePage-icon/location-black.png" className="post-location-icon"/>
                                    <p className="location">278, Kim Giang, Hoàng Mai, Hà Nội</p>
                                </div>
                                <div className="post-time">
                                    <img src="../../../public/homePage-icon/clock.png" className="post-time-icon"/>
                                    <p className="time">12:00, 21/03/2025</p>
                                </div>
                            </div>
                            <div className="post-save">
                                <img src="../../../public/homePage-icon/heart.png" className="post-save-icon"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="showmore">
                    <Link to="/list" className="showmore-text">
                        <FontAwesomeIcon icon={faArrowLeft} className="arrow-left"/>
                        Xem thêm
                        <FontAwesomeIcon icon={faArrowRight} className="arrow-right"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
