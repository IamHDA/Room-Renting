import React, {useContext} from 'react';
import '../../css/user-css/UserPage.css';
import {faCamera, faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarRegular, faMessage, faCalendar, faCompass} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import {Link} from "react-router-dom";
import Pagination from "../PagePagination.jsx";

const MyComponent = () => {
    const [isLeft, setIsLeft] = React.useState(true);
    const [isRight, setIsRight] = React.useState(false);
    const [onReview, setOnReview] = React.useState(false);
    const {isAuthenticated} = useContext(AuthContext);
    const [selectedStar, setSelectedStar] = React.useState(0);

    const toggleLeftLine = () => {
        setIsLeft(true);
        setIsRight(false);
    }

    const toggleRightLine = () => {
        setIsRight(true)
        setIsLeft(false);
    }

    const toggleOnReview = () => {
        setOnReview(prev => !prev);
    }

    return (
        <div className="user-page-body">
            <div className="user-page-container">
                <div className="user-page-profile">
                    <div className="user-avatar-background">
                        <img src="../../../public/user-page-icon/background.png" id="user-background-img"/>
                        <div className="camera-bounding-background">
                            <FontAwesomeIcon icon={faCamera} />
                        </div>
                        <div className="user-avatar-container-rel">
                            <div className="user-avatar-container">
                                <img src="../../../public/user-page-icon/account.png" id="user-avatar-img"/>
                                <div className="camera-bounding-avatar">
                                    <FontAwesomeIcon icon={faCamera} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-lower-information">
                        <h2 id="user-page-username">Nguyễn Văn A</h2>
                        <div className="user-rating">
                            <div className="rating-star">
                                <FontAwesomeIcon icon={faStarRegular} id="star-1"/>
                                <FontAwesomeIcon icon={faStarRegular} id="star-2"/>
                                <FontAwesomeIcon icon={faStarRegular} id="star-3"/>
                                <FontAwesomeIcon icon={faStarRegular} id="star-4"/>
                                <FontAwesomeIcon icon={faStarRegular} id="star-5"/>
                            </div>
                            <p id="rating-count">(n)</p>
                        </div>
                        {isAuthenticated ?
                            <Link to="/personalInformation" className="change-personal-information">
                                Chỉnh sửa thông tin cá nhân
                            </Link>:
                            (
                                <>
                                    <button className={!onReview ? "review-user" : "review-user-js"} onClick={toggleOnReview}>
                                        <p >Đánh giá người dùng</p>
                                    </button>
                                    <div className={onReview ? "review-star" : "review-star-js"} onClick={toggleOnReview}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FontAwesomeIcon
                                                key={star}
                                                icon={star <= selectedStar ? faStarSolid : faStarRegular}
                                                className={star <= selectedStar ? "selected-star" : ""}
                                                onClick={() => setSelectedStar(star)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )
                        }
                        <div className="sub-bounding">
                            <FontAwesomeIcon icon={faMessage}/>
                            <p className="title">Phản hồi chat:</p>
                            <p>Chưa có thông tin</p>
                        </div>
                        <div className="sub-bounding">
                            <FontAwesomeIcon icon={faCalendar} />
                            <p className="title">Đã tham gia:</p>
                            <p>1 ngày</p>
                        </div>
                        <div className="sub-bounding">
                            <FontAwesomeIcon icon={faCompass} />
                            <p className="title">Địa chỉ:</p>
                            <p>Chưa cung cấp</p>
                        </div>
                    </div>
                </div>
                <div className="user-page-posts">
                    <div className="user-page-posts-header">
                        <div className="user-page-posts-header-title">
                            <div className="left" onClick={toggleLeftLine}>
                                <h2>Đang hiển thị</h2>
                                <p>(0)</p>
                            </div>
                            <div className="right" onClick={toggleRightLine}>
                                <h2>Đã ẩn</h2>
                                <p>(0)</p>
                            </div>
                        </div>
                        <div className="blue-line">
                            <img src="../../../public/user-page-icon/blue-line.png" className={isLeft ? "left-line" : ""}/>
                            <img src="../../../public/user-page-icon/blue-line.png" className={isRight ? "right-line" : ""}/>
                        </div>
                    </div>
                    <div className="user-page-posts-container">
                        {isLeft && (
                            <>
                                <div className="user-page-post">
                                    <img src="../../../public/user-page-icon/home.png" className="post-img"/>
                                    <div className="user-page-post-information">
                                        <p className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                        <div className="post-price-area">
                                            <p id="user-page-post-price">8 triệu/tháng</p>
                                            <p id="user-page-post-area">23m&sup2;</p>
                                        </div>
                                        <div className="post-location-time">
                                            <div className="post-location-time-sub">
                                                <img src="../../../public/user-page-icon/location.png"/>
                                                <p id="user-page-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                            </div>
                                            <div className="post-location-time-sub">
                                                <img src="../../../public/user-page-icon/clock.png"/>
                                                <p id="user-page-post-time">13:05, 20/02/2025</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-page-post">
                                    <img src="../../../public/user-page-icon/home.png" className="post-img"/>
                                    <div className="user-page-post-information">
                                        <p className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                        <div className="post-price-area">
                                            <p id="user-page-post-price">8 triệu/tháng</p>
                                            <p id="user-page-post-area">23m&sup2;</p>
                                        </div>
                                        <div className="post-location-time">
                                            <div className="post-location-time-sub">
                                                <img src="../../../public/user-page-icon/location.png"/>
                                                <p id="user-page-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                            </div>
                                            <div className="post-location-time-sub">
                                                <img src="../../../public/user-page-icon/clock.png"/>
                                                <p id="user-page-post-time">13:05, 20/02/2025</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-page-post">
                                    <img src="../../../public/user-page-icon/home.png" className="post-img"/>
                                    <div className="user-page-post-information">
                                        <p className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                        <div className="post-price-area">
                                            <p id="user-page-post-price">8 triệu/tháng</p>
                                            <p id="user-page-post-area">23m&sup2;</p>
                                        </div>
                                        <div className="post-location-time">
                                            <div className="post-location-time-sub">
                                                <img src="../../../public/user-page-icon/location.png"/>
                                                <p id="user-page-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                            </div>
                                            <div className="post-location-time-sub">
                                                <img src="../../../public/user-page-icon/clock.png"/>
                                                <p id="user-page-post-time">13:05, 20/02/2025</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-page-post">
                                    <img src="../../../public/user-page-icon/home.png" className="post-img"/>
                                    <div className="user-page-post-information">
                                        <p className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                        <div className="post-price-area">
                                            <p id="user-page-post-price">8 triệu/tháng</p>
                                            <p id="user-page-post-area">23m&sup2;</p>
                                        </div>
                                        <div className="post-location-time">
                                            <div className="post-location-time-sub">
                                                <img src="../../../public/user-page-icon/location.png"/>
                                                <p id="user-page-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                            </div>
                                            <div className="post-location-time-sub">
                                                <img src="../../../public/user-page-icon/clock.png"/>
                                                <p id="user-page-post-time">13:05, 20/02/2025</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {isRight && (
                            <>
                                <div className="user-page-post-disabled">
                                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</h2>
                                    <p>20:13, 13/03/2025</p>
                                </div>
                            </>
                        )}
                        <Pagination/>
                        {/*<div className="user-page-posts-empty">*/}
                        {/*    <h2>Bạn chưa đăng tin nào!</h2>*/}
                        {/*    <button className="user-page-submit-post">Đăng tin ngay</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
