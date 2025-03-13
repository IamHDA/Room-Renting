import React, {useEffect, useState} from 'react';
import '../../css/admin-css/index.css';
import '../../css/admin-css/AccountManage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faCamera,
    faSort,
    faStar as faStarSolid,
    faX,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../Pagination.jsx";
import {faCalendar, faCompass, faMessage, faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

const MyComponent = () => {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const function3 = document.getElementById("function-3");
        if(function3){
            function3.classList.add("isSelected");
        }
    }, [])

    return (
        <div className="account-manage-body">
            {isSelected && <div className="curtain"></div>}
            <table>
                <thead>
                <tr>
                    <th className="stt">STT</th>
                    <th className="id">ID <FontAwesomeIcon icon={faSort} className="sort-icon"/></th>
                    <th className="fullname">Tên người dùng <FontAwesomeIcon icon={faSort} className="sort-icon"/></th>
                    <th className="email">Email</th>
                    <th className="phone-number">Số điện thoại</th>
                    <th className="report-number">Số lượt báo cáo <FontAwesomeIcon icon={faSort} className="sort-icon"/></th>
                    <th className="role">Vai trò</th>
                    <th className="sign-up-time">Thời gian tạo<FontAwesomeIcon icon={faSort} className="sort-icon"/></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr onClick={() => setIsSelected(true)}>
                    <td className="stt">1</td>
                    <td className="id">1</td>
                    <td>Hứa Duy Anh</td>
                    <td>huaduyanh090@gmail</td>
                    <td>0902162143</td>
                    <td>4 lượt</td>
                    <td>Người dùng</td>
                    <td>12:00, 15/03/2025</td>
                    <td className="delete" onClick={(e) => {
                        e.stopPropagation();
                        console.log("ADSD")
                    }}><FontAwesomeIcon icon={faX}/></td>
                </tr>
                </tbody>
            </table>
            <Pagination/>
            {isSelected && (
                <div className="pop-up">
                    <div className="content-container">
                        <FontAwesomeIcon icon={faXmark} className="close" onClick={() => setIsSelected(false)}/>
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
                                    <FontAwesomeIcon icon={faCompass} />                            <p className="title">Địa chỉ:</p>
                                    <p>Chưa cung cấp</p>
                                </div>
                            </div>
                        </div>
                        <div className="report-container">
                            <h1>Báo cáo</h1>
                            <div className="report-bounding">
                                <FontAwesomeIcon icon={faXmark} className="close"/>
                                <div className="report-content">
                                    <h3>Thông tin sai</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ádasdasdasdfffffffffffffffffffff</p>
                                </div>
                                <div className="reporter-container">
                                    <h3>Người báo cáo</h3>
                                    <div className="reporter">
                                        <p>ID: 10</p>
                                        <p>Tên: Hứa Duy Anh</p>
                                    </div>
                                </div>
                            </div>
                            <div className="report-bounding">
                                <FontAwesomeIcon icon={faXmark} className="close"/>
                                <div className="report-content">
                                    <h3>Thông tin sai</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ádasdasdasdfffffffffffffffffffff</p>
                                </div>
                                <div className="reporter-container">
                                    <h3>Người báo cáo</h3>
                                    <div className="reporter">
                                        <p>ID: 10</p>
                                        <p>Tên: Hứa Duy Anh</p>
                                    </div>
                                </div>
                            </div>
                            <div className="report-bounding">
                                <FontAwesomeIcon icon={faXmark} className="close"/>
                                <div className="report-content">
                                    <h3>Thông tin sai</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ádasdasdasdfffffffffffffffffffff</p>
                                </div>
                                <div className="reporter-container">
                                    <h3>Người báo cáo</h3>
                                    <div className="reporter">
                                        <p>ID: 10</p>
                                        <p>Tên: Hứa Duy Anh</p>
                                    </div>
                                </div>
                            </div>
                            <Pagination/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
