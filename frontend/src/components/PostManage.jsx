import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import '../css/PostManage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCamera,
    faImage,
    faAngleRight,
    faAngleDown,
    faX,
    faPenToSquare, faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";

const MyComponent = () => {

    const location = useLocation();
    const isPost = location.state?.toManage;
    const [isSelected, setIsSelected] = useState(isPost);
    const [pickAddress, setPickAddress] = useState(false);
    const [isVisiblePosts, setIsVisiblePosts] = useState(true);
    const [editPost, setEditPost] = useState(false);

    const togglePickAddress = () => {
        setPickAddress(!pickAddress);
    }

    const toggleEditPost = () => {
        setEditPost(!editPost);
    }

    return (
        <div className="post-manage-body">
            { (pickAddress || editPost) && <div className="curtain"></div>}
            <div className="post-manage-container">
                <div className="switcher">
                    <button className={!isSelected ? "is-selected" : ""} onClick={() => setIsSelected(false)}>Đăng bài</button>
                    <button className={isSelected ? "is-selected" : ""} onClick={() => setIsSelected(true)}>Quản lý bài</button>
                </div>
                {!isSelected ? (
                    <>
                        {pickAddress && (
                            <div className="choose-address-pop-up">
                                <div className="choose-address-pop-up-container">
                                    <FontAwesomeIcon icon={faXmark} className="close" onClick={togglePickAddress} />
                                    <h1>Địa chỉ</h1>
                                    <button className="bounding">
                                        <p id="choose-address-city">Tỉnh, Thành phố</p>
                                        <FontAwesomeIcon icon={faAngleDown} style={{fontSize: "30px"}}/>
                                        {/*<div id="city-choice-dropdown">*/}
                                        {/*    <p>Hà Nội</p>*/}
                                        {/*    <p>Hồ Chí Minh</p>*/}
                                        {/*</div>*/}
                                    </button>
                                    <button className="bounding">
                                        <p id="choose-address-district">Quận, Huyện, Thị Xã</p>
                                        <FontAwesomeIcon icon={faAngleDown} style={{fontSize: "30px"}}/>
                                    </button>
                                    <button className="bounding">
                                        <p id="choose-address-ward">Phường, Xã, Thị trấn</p>
                                        <FontAwesomeIcon icon={faAngleDown} style={{fontSize: "30px"}}/>
                                    </button>
                                    <button className="bounding">
                                        <input type="text" placeholder="Địa chỉ cụ thể" id="choose-address-detail"/>
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="post-create-main-content">
                            <div className="left">
                                <h1>Hình ảnh và Video</h1>
                                <form id="uploadForm" encType="multipart/form-data">
                                    <div className="upload-container">
                                        <label htmlFor="imageUpload" className="upload-box">
                                            <FontAwesomeIcon icon={faImage} style={{fontSize: "50px"}}/>
                                            <p>Đăng từ <strong>03 - 12</strong> hình</p>
                                            <input type="file" id="imageUpload" name="images" accept="image/*" multiple hidden/>
                                        </label>
                                        <label htmlFor="videoUpload" className="upload-box">
                                            <FontAwesomeIcon icon={faCamera} style={{fontSize: "50px"}}/>
                                            <p>Đăng thêm <strong className="highlight">video</strong> để bán nhanh hơn</p>
                                            <input type="file" id="videoUpload" name="video" accept="video/*" hidden/>
                                        </label>
                                    </div>
                                </form>
                                <button className="post-button">
                                    Đăng tin
                                </button>
                            </div>
                            <img src="../../public/post-manage-icon/stand-line.png" className="stand-line"/>
                            <div className="right">
                                <div className="address">
                                    <h1>Địa chỉ</h1>
                                    <div className="post-address-input-bounding">
                                        <p></p>
                                        <FontAwesomeIcon icon={faAngleRight} style={{fontSize: "40px"}} onClick={togglePickAddress}/>
                                    </div>
                                </div>
                                <div className="price-area">
                                    <h1>Giá thuê và diện tích</h1>
                                    <div className="post-price-area">
                                        <div className="container">
                                            <p>Giá thuê</p>
                                            <input id="post-create-price" type="text"/>
                                        </div>
                                        <div className="container">
                                            <p>Diện tích</p>
                                            <input id="post-create-area" type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="title-description">
                                    <h1>Tiêu đề và mô tả</h1>
                                    <div className="container">
                                        <p>Tiêu đề</p>
                                        <input id="post-create-title" type="text"/>
                                    </div>
                                    <div className="container">
                                        <p>Mô tả</p>
                                        <textarea id="post-create-description" />
                                    </div>
                                </div>
                                <div className="others-information">
                                    <h1>Thông tin khác</h1>
                                    <div className="post-bedroom-electric">
                                        <div className="container">
                                            <p>Số phòng ngủ</p>
                                            <input id="post-create-bedroom" type="text"/>
                                        </div>
                                        <div className="container">
                                            <p>Giá điện</p>
                                            <input id="post-create-electric" type="text"/>
                                        </div>
                                    </div>
                                    <div className="post-bathroom-water">
                                        <div className="container">
                                            <p>Số phòng tắm, vệ sinh</p>
                                            <input id="post-create-bathroom" type="text"/>
                                        </div>
                                        <div className="container">
                                            <p>Giá nước</p>
                                            <input id="post-create-water" type="text"/>
                                        </div>
                                    </div>
                                    <div className="post-move-internet">
                                        <div className="container">
                                            <p>Thời gian chuyển vào</p>
                                            <input id="post-create-move" type="text"/>
                                        </div>
                                        <div className="container">
                                            <p>Giá Internet</p>
                                            <input id="post-create-internet" type="text"/>
                                        </div>
                                    </div>
                                    <div className="post-security-furniture">
                                        <div className="container">
                                            <p>An ninh</p>
                                            <input id="post-create-security" type="text"/>
                                        </div>
                                        <div className="container">
                                            <p>Nội thất</p>
                                            <input id="post-create-furniture" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {editPost &&
                            <div className="edit-pop-up">
                                <div className="edit-pop-up-container">
                                    <div className="close" onClick={toggleEditPost}>
                                        <FontAwesomeIcon icon={faX} />
                                    </div>
                                    <h1>Chỉnh sửa</h1>
                                    <div className="edit-pop-up-main-content">
                                        <div className="left">
                                            <div className="edit-price-area">
                                                <div className="price-area">
                                                    <h2>Giá thuê và diện tích</h2>
                                                    <div className="post-price-area">
                                                        <div className="container">
                                                            <p>Giá thuê</p>
                                                            <input id="post-edit-price" type="text"/>
                                                        </div>
                                                        <div className="container">
                                                            <p>Diện tích</p>
                                                            <input id="post-edit-area" type="text"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="edit-title-description">
                                                <h2>Tiêu đề và mô tả</h2>
                                                <div className="container">
                                                    <p>Tiêu đề</p>
                                                    <input id="post-edit-title" type="text"/>
                                                </div>
                                                <div className="container">
                                                    <p>Mô tả</p>
                                                    <textarea id="post-edit-description" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="edit-others-information">
                                                <h2>Thông tin khác</h2>
                                                <div className="post-bedroom-electric">
                                                    <div className="container">
                                                        <p>Số phòng ngủ</p>
                                                        <input id="post-edit-bedroom" type="text"/>
                                                    </div>
                                                    <div className="container">
                                                        <p>Giá điện</p>
                                                        <input id="post-edit-electric" type="text"/>
                                                    </div>
                                                </div>
                                                <div className="post-bathroom-water">
                                                    <div className="container">
                                                        <p>Số phòng tắm, vệ sinh</p>
                                                        <input id="post-edit-bathroom" type="text"/>
                                                    </div>
                                                    <div className="container">
                                                        <p>Giá nước</p>
                                                        <input id="post-edit-water" type="text"/>
                                                    </div>
                                                </div>
                                                <div className="post-move-internet">
                                                    <div className="container">
                                                        <p>Thời gian chuyển vào</p>
                                                        <input id="post-edit-move" type="text"/>
                                                    </div>
                                                    <div className="container">
                                                        <p>Giá Internet</p>
                                                        <input id="post-edit-internet" type="text"/>
                                                    </div>
                                                </div>
                                                <div className="post-security-furniture">
                                                    <div className="container">
                                                        <p>An ninh</p>
                                                        <input id="post-edit-security" type="text"/>
                                                    </div>
                                                    <div className="container">
                                                        <p>Nội thất</p>
                                                        <input id="post-edit-furniture" type="text"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="submit-edit-button" onClick={toggleEditPost}>
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div class="post-manage-main-content">
                            <div className="switch-posts">
                                <p className={isVisiblePosts ? "visible-posts show" : "visible-posts"} onClick={() => setIsVisiblePosts(true)}>Bài đăng đang hiển thị (n/n)</p>
                                <img src="../../public/post-manage-icon/stand-line.png" className="stand-line"/>
                                <p className={!isVisiblePosts ? "invisible-posts show" : "invisible-posts"} onClick={() => setIsVisiblePosts(false)}>Bài đăng đã ẩn(n/n)</p>
                            </div>
                            <img src="../../public/post-manage-icon/line.png" className="line"/>
                            {isVisiblePosts ? (
                                <div className="visible-posts-container">
                                    <div className="visible-posts-post">
                                        <img src="../../public/saved-posts-icon/home.png" className="post-img"/>
                                        <div className="visible-posts-post-information">
                                            <p className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                            <button className="delete-button">
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                            <button className="edit-button">
                                                <FontAwesomeIcon icon={faPenToSquare} onClick={toggleEditPost}/>
                                            </button>
                                            <div className="post-price-area">
                                                <p id="visible-posts-post-price">8 triệu/tháng</p>
                                                <p id="visible-posts-post-area">23m&sup2;</p>
                                            </div>
                                            <p className="post-description">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                            </p>
                                            <div className="post-location-time">
                                                <div className="post-location-time-sub">
                                                    <img src="../../public/saved-posts-icon/location.png"/>
                                                    <p id="visible-posts-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                                </div>
                                                <div className="post-location-time-sub">
                                                    <img src="../../public/saved-posts-icon/clock.png"/>
                                                    <p id="visible-posts-post-time">13:05, 20/02/2025</p>
                                                </div>
                                            </div>
                                            <button className="visible-button">Hiển thị</button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="invisible-posts-container">
                                    <div className="invisible-posts-post">
                                        <img src="../../public/saved-posts-icon/home.png" className="post-img"/>
                                        <div className="invisible-posts-post-information">
                                            <p className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                                            <button className="delete-button">
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                            <button className="edit-button">
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <div className="post-price-area">
                                                <p id="invisible-posts-post-price">8 triệu/tháng</p>
                                                <p id="invisible-posts-post-area">23m&sup2;</p>
                                            </div>
                                            <p className="post-description">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                            </p>
                                            <div className="post-location-time">
                                                <div className="post-location-time-sub">
                                                    <img src="../../public/saved-posts-icon/location.png"/>
                                                    <p id="invisible-posts-post-location">Km10, Nguyễn Trãi, Trần Phú, Hà Đông, Hà Nội</p>
                                                </div>
                                                <div className="post-location-time-sub">
                                                    <img src="../../public/saved-posts-icon/clock.png"/>
                                                    <p id="invisible-posts-post-time">13:05, 20/02/2025</p>
                                                </div>
                                            </div>
                                            <button className="invisible-button">Đã ẩn</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyComponent;
