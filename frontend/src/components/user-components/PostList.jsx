import React, {useState} from 'react';
import '../../css/user-css/List.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Pagination from '../PagePagination.jsx';

const MyComponent = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="list-container">
            <div className="list-container-left">
                <div className="list-search-container">
                    <div className="list-search-bounding">
                        <img src="../../../public/list-icon/search.png"/>
                        <input type="text"
                               value={search}
                               id="list-search-input"
                               onChange={(e) => setSearch(e.target.value)}
                               placeholder="Nhập địa chỉ. Ví dụ: Ngách 16, 278 Kim Giang, Hoàng Mai"
                        />
                        <select class="list-search-city-bounding">
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        </select>
                        <button className="list-search-button">Tìm kiếm</button>
                    </div>
                    <div className="list-search-criteria">
                        <div className="filter">
                            <img src="../../../public/list-icon/filter.png"/>
                            <p>Lọc</p>
                        </div>
                        <div className="criteria">
                            <p id="criteria-type">
                                Thể loại
                            </p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        <div className="criteria">
                            <p id="criteria-price">
                                Giá thuê
                            </p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        <div className="criteria">
                            <p id="criteria-area">
                                Diện tích
                            </p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                        <div className="criteria">
                            <p id="criteria-furniture">
                                Tình trạng nội thất
                            </p>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                    </div>
                </div>
                <select className="select">
                    <option disabled selected hidden>Sắp xếp</option>
                    <option value="rating">Đánh giá tốt</option>
                    <option value="price asc">Giá tăng dần</option>
                    <option value="price desc">Giá giảm dần</option>
                    <option value="time">Mới đăng</option>
                </select>
                <div className="list-posts-container">
                    <Link to="/detail" className="list-post">
                        <img src="../../../public/list-icon/home.png"/>
                        <div className="list-post-information">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</h2>
                            <div className="list-post-price-area">
                                <p id="list-post-price">10 triệu/tháng</p>
                                <p id="list-post-area">23m&sup2;</p>
                            </div>
                            <p id="list-post-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                            <div className="list-post-location-time-save">
                                <div className="list-post-location-time">
                                    <div className="list-post-location-container">
                                        <img src="../../../public/list-icon/location-black.png"/>
                                        <p id="list-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                    </div>
                                    <div className="list-post-time-container">
                                        <img src="../../../public/list-icon/clock.png"/>
                                        <p id="list-post-time">13:05, 20/02/2025</p>
                                    </div>
                                </div>
                                <div className="list-post-save" onClick={(e) => e.preventDefault()}>
                                    <img src="../../../public/homePage-icon/heart.png"/>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/detail" className="list-post">
                        <img src="../../../public/list-icon/home.png"/>
                        <div className="list-post-information">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</h2>
                            <div className="list-post-price-area">
                                <p id="list-post-price">10 triệu/tháng</p>
                                <p id="list-post-area">23m&sup2;</p>
                            </div>
                            <p id="list-post-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                            <div className="list-post-location-time-save">
                                <div className="list-post-location-time">
                                    <div className="list-post-location-container">
                                        <img src="../../../public/list-icon/location-black.png"/>
                                        <p id="list-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                    </div>
                                    <div className="list-post-time-container">
                                        <img src="../../../public/list-icon/clock.png"/>
                                        <p id="list-post-time">13:05, 20/02/2025</p>
                                    </div>
                                </div>
                                <div className="list-post-save" onClick={(e) => e.preventDefault()}>
                                    <img src="../../../public/homePage-icon/heart.png"/>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/detail" className="list-post">
                        <img src="../../../public/list-icon/home.png"/>
                        <div className="list-post-information">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</h2>
                            <div className="list-post-price-area">
                                <p id="list-post-price">10 triệu/tháng</p>
                                <p id="list-post-area">23m&sup2;</p>
                            </div>
                            <p id="list-post-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                            <div className="list-post-location-time-save">
                                <div className="list-post-location-time">
                                    <div className="list-post-location-container">
                                        <img src="../../../public/list-icon/location-black.png"/>
                                        <p id="list-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                    </div>
                                    <div className="list-post-time-container">
                                        <img src="../../../public/list-icon/clock.png"/>
                                        <p id="list-post-time">13:05, 20/02/2025</p>
                                    </div>
                                </div>
                                <div className="list-post-save" onClick={(e) => e.preventDefault()}>
                                    <img src="../../../public/homePage-icon/heart.png"/>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to="/detail" className="list-post">
                        <img src="../../../public/list-icon/home.png"/>
                        <div className="list-post-information">
                            <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</h2>
                            <div className="list-post-price-area">
                                <p id="list-post-price">10 triệu/tháng</p>
                                <p id="list-post-area">23m&sup2;</p>
                            </div>
                            <p id="list-post-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                            <div className="list-post-location-time-save">
                                <div className="list-post-location-time">
                                    <div className="list-post-location-container">
                                        <img src="../../../public/list-icon/location-black.png"/>
                                        <p id="list-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                    </div>
                                    <div className="list-post-time-container">
                                        <img src="../../../public/list-icon/clock.png"/>
                                        <p id="list-post-time">13:05, 20/02/2025</p>
                                    </div>
                                </div>
                                <div className="list-post-save" onClick={(e) => e.preventDefault()}>
                                    <img src="../../../public/homePage-icon/heart.png"/>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <Pagination/>
            </div>
            <div className="list-container-right">
                <div className="side-criteria">
                    <h2>Lọc theo khoảng giá</h2>
                    <p>Giá dưới 1 triệu</p>
                    <p>Giá 1 - 2 triệu</p>
                    <p>Giá 2 - 3 triệu</p>
                    <p>Giá 3 - 4 triệu</p>
                    <p>Giá 4 - 5 triệu</p>
                    <p>Giá 5 - 6 triệu</p>
                    <p>Giá 6 - 7 triệu</p>
                    <p>Giá 7 - 8 triệu</p>
                    <p>Trên 8 triệu</p>
                </div>
                <div className="side-criteria">
                    <h2>Lọc theo diện tích</h2>
                    <p>Dưới 20 &sup2;</p>
                    <p>20 - 30 &sup2;</p>
                    <p>30 - 40 &sup2;</p>
                    <p>40 - 50 &sup2;</p>
                    <p>Trên 50 &sup2;</p>
                </div>
                <div className="side-criteria">
                    <h2>Lọc theo tình trạng nội thất</h2>
                    <p>Nội thất cao cấp</p>
                    <p>Nội thất đầy đủ</p>
                    <p>Nhà trông</p>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
