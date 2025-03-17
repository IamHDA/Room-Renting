import React, {useEffect, useRef, useState} from 'react';
import '../../css/user-css/Chat.css';
import {faCamera, faEllipsisVertical, faMagnifyingGlass, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const MyComponent = () => {

    const fileInputRef = useRef(null);
    const messageEndRef = useRef(null);
    // const [deleteConversation, setDeleteConversation] = useState(false);

    const handleCameraClick = () => {
        fileInputRef.current.click(); // Mở trình chọn ảnh khi nhấn vào icon camera
    };


    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div className="chat-body">
            <div className="chat-container">
                <div className="left">
                    <div className="search-chat-room">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="text" placeholder="Tìm kiếm người dùng"/>
                    </div>
                    <img src="../../../public/chat-icon/line.png" className="line"/>
                    <div className="chat-room-container">
                        <div className="chat-room-bounding" onClick={(e) => {
                            e.currentTarget.classList.add("isSelected");
                        }}>
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="opponent-name-message">
                                <h2>Nguyễn Văn A</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                            </div>
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        </div>
                        <div className="chat-room-bounding" onClick={(e) => {
                            e.currentTarget.classList.add("isSelected");
                        }}>
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="opponent-name-message">
                                <h2>Nguyễn Văn A</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                            </div>
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        </div>
                        <div className="chat-room-bounding" onClick={(e) => {
                            e.currentTarget.classList.add("isSelected");
                        }}>
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="opponent-name-message">
                                <h2>Nguyễn Văn A</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                            </div>
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        </div>
                        <div className="chat-room-bounding" onClick={(e) => {
                            e.currentTarget.classList.add("isSelected");
                        }}>
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="opponent-name-message">
                                <h2>Nguyễn Văn A</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                            </div>
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        </div>
                        <div className="chat-room-bounding" onClick={(e) => {
                            e.currentTarget.classList.add("isSelected");
                        }}>
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="opponent-name-message">
                                <h2>Nguyễn Văn A</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                            </div>
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        </div>
                        <div className="chat-room-bounding">
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="opponent-name-message">
                                <h2>Nguyễn Văn A</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                            </div>
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        </div>
                        <div className="chat-room-bounding">
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="opponent-name-message">
                                <h2>Nguyễn Văn A</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                            </div>
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        </div>
                        <div className="chat-room-bounding">
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="opponent-name-message">
                                <h2>Nguyễn Văn A</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                            </div>
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        </div>
                        <div className="chat-room-bounding">
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                                <div className="status-dot online"></div>
                            </div>
                            <div className="opponent-name-message">
                                <h2>Nguyễn Văn A</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</p>
                            </div>
                            <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        </div>

                    </div>
                    <img src="../../../public/chat-icon/line.png" className="line"/>
                    <div className="delete-conversation">
                        <FontAwesomeIcon icon={faTrash} />
                        <p>Xóa hội thoại</p>
                    </div>
                </div>
                <img src="../../../public/chat-icon/stand-line.png"/>
                <div className="right">
                    <div className="chat-header">
                        <Link to="/account" className="opponent">
                            <div className="img-container">
                                <img src="../../../public/header-icon/account.png" className="opponent-img"/>
                            </div>
                            <div className="name-status">
                                <h3>Nguyễn Văn A</h3>
                                <div className="status">
                                    <div className="status-dot offline"></div>
                                    <p>Hoạt động 1 giờ trước</p>
                                </div>
                            </div>
                        </Link>
                        <FontAwesomeIcon icon={faEllipsisVertical} className="additional-icon"/>
                    </div>
                    <img src="../../../public/chat-icon/line.png" className="line"/>
                    <Link to="/detail" className="chat-post-container">
                        <img src="../../../public/list-icon/home.png" className="chat-post-img"/>
                        <div className="post-title-price">
                            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
                            <p>8 triệu/tháng</p>
                        </div>
                    </Link>
                    <img src="../../../public/chat-icon/line.png" className="line"/>
                    <div className="message-container">
                        <p id="send-time">18:30, CN</p>
                        <div className="recipient-message-div">
                            <img src="../../../public/header-icon/account.png" className="sender-img"/>
                            <div className="recipient-message">
                                Day la messgae
                            </div>
                        </div>
                        <div className="sender-message">
                            Đây là mesage
                        </div>
                        <div className="sender-message">
                            Đây là mesage
                        </div>
                        <div className="sender-message">
                            Đây là mesage
                        </div>
                        <div className="sender-message">
                            Đây là mesage
                        </div>
                        <div className="sender-message">
                            Đây là mesage
                        </div>
                        <div className="sender-message">
                            Đây là mesage
                        </div>
                        <div className="sender-message">
                            <div className="image-grid image-count-5">
                                <img src="../../../public/chat-icon/premium_photo-1673306778968-5aab577a7365.avif" className="chat-image"/>
                                <img src="../../../public/chat-icon/premium_photo-1673306778968-5aab577a7365.avif" className="chat-image"/>
                                <img src="../../../public/chat-icon/premium_photo-1673306778968-5aab577a7365.avif" className="chat-image"/>
                                <img src="../../../public/chat-icon/premium_photo-1673306778968-5aab577a7365.avif" className="chat-image"/>
                                <img src="../../../public/chat-icon/premium_photo-1673306778968-5aab577a7365.avif" className="chat-image"/>
                            </div>
                        </div>
                        <div ref={messageEndRef} />
                    </div>
                    <img src="../../../public/chat-icon/line.png" className="line"/>
                    <div className="send-message-bounding">
                        <FontAwesomeIcon icon={faCamera} className="camera-icon" onClick={handleCameraClick}/>
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept="image/*"
                            style={{ display: "none" }}
                        />

                        <input type="text" placeholder="Nhập tin nhắn"/>
                        <img src="../../../public/chat-icon/send.png" className="send-icon"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
