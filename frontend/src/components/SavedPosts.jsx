import React, {useState} from 'react';
import '../css/SavedPosts.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faX} from "@fortawesome/free-solid-svg-icons";

const MyComponent = () => {

    const [isEmpty, setIsEmpty] = useState(false);

    return (
        <div className="saved-posts-body">
            <div className="saved-posts-bounding">
                <div className="saved-posts-bounding-left">
                    <h1 className="title">Tin đăng đã lưu (0/100)</h1>
                    {isEmpty ? (
                        <div className="saved-posts-empty">
                            <p className="saved-posts-reminder1">Bạn chưa lưu tin đăng nào!</p>
                            <p className="saved-posts-reminder2">Hãy bấm nút <FontAwesomeIcon icon={faHeart} style={{color: "black"}}/> ở tin đăng để lưu và quay lại trang này</p>
                            <button className="start-explore-button">
                                Bắt đầu tìm kiếm
                            </button>
                        </div>
                    ) : (
                        <div className="saved-posts-container">
                            <div className="saved-posts-post">
                                <img src="../../public/saved-posts-icon/home.png" className="post-img"/>
                                <div className="saved-posts-post-information">
                                    <p className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                    <button className="delete-button">
                                        <FontAwesomeIcon icon={faX} />
                                    </button>
                                    <div className="post-price-area">
                                        <p id="saved-posts-post-price">8 triệu/tháng</p>
                                        <p id="saved-posts-post-area">23m&sup2;</p>
                                    </div>
                                    <p className="post-description">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                    </p>
                                    <div className="post-location-time">
                                        <div className="post-location-time-sub">
                                            <img src="../../public/saved-posts-icon/location.png"/>
                                            <p id="saved-posts-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                        </div>
                                        <div className="post-location-time-sub">
                                            <img src="../../public/saved-posts-icon/clock.png"/>
                                            <p id="saved-posts-post-time">13:05, 20/02/2025</p>
                                        </div>
                                    </div>
                                    <button className="chat-button">Nhắn tin</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {!isEmpty && (
                    <div className="saved-posts-bounding-right">
                        <h1>Sắp xếp tin đăng</h1>
                        <p>Ngày lưu tăng dần</p>
                        <p>Ngày lưu giảm dần</p>
                        <p>Giá tăng dần</p>
                        <p>Giá giảm dần</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyComponent;
