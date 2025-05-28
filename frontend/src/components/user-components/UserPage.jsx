import React, {useContext, useEffect, useState} from 'react';
import '../../css/user-css/UserPage.css';
import {faCamera, faPhone, faSignal, faStar as faStarSolid, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarRegular, faMessage, faCalendar, faCompass, faFlag} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../../contexts/AuthContext.jsx";
import {Link, useParams} from "react-router-dom";
import UserDisablePost from "./UserDisablePost.jsx";
import UserEnablePost from "./UserEnablePost.jsx";
import {getUserProfile} from "../../apiServices/user.js";
import {getImageMime} from "../../utils/format.js";
import { changeAvatar, changeBackgroundImage} from "../../apiServices/user.js";
import { currentUser } from "../../apiServices/user.js";
import {rateUser, changeRate, getUserRating} from "../../apiServices/rating.js";
import {reportUser} from "../../apiServices/report.js";

const MyComponent = () => {
    const [isLeft, setIsLeft] = React.useState(true);
    const [isRight, setIsRight] = React.useState(false);
    const [onReview, setOnReview] = React.useState(false);
    const { user, setUser } = useContext(AuthContext);
    const [selectedStar, setSelectedStar] = React.useState(0);
    const [currentReason, setCurrentReason] = useState(null);
    const [currentDescription, setCurrentDescription] = useState("");
    const {userId} = useParams();
    const[userProfile, setUserProfile] = useState(null);
    const [enablePostLength, setEnablePostLength] = useState(0);
    const [disablePostLength, setDisablePostLength] = useState(0);
    const [changeImage, setChangeImage] = useState(false);
    const [reportPopup, setReportPopup] = useState(false);
    const reportReason = [
        "Hình đại diện không hợp lệ",
        "Thông tin cá nhân không hợp lệ",
        "Có dấu hiệu lừa đảo",
        "Lý do khác"
    ]

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserProfile(userId);
                setUserProfile(response);
            }catch(err) {
                console.error(err);
            }
        }
        fetchUser();
    }, [changeImage, userId, selectedStar]);

    useEffect(() => {
        const fetchRating = async () => {
            try {
                if(user.id !== userId){
                    const response = await getUserRating(user.id, userId);
                    setSelectedStar(response);
                    console.log(response);
                }
            }catch(err) {
                console.error(err);
            }
        }
        if(user !== null) fetchRating();
    }, [user])

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

    const updateImageHandle = async (image, type) => {
        let formData = new FormData();
        try {
            if(type === "avatar"){
                formData.append("avatar", image);
                await changeAvatar(formData);
                const user = await currentUser();
                setUser(user);
                alert("Thay đổi ảnh đại diện thành công");
            }else{
                formData.append("backgroundImage", image);
                await changeBackgroundImage(formData);
                alert("Thay đổi hình nền thành công");
            }
        }catch(err) {
            alert("Có lỗi xảy ra");
            console.error(err);
        }
        setChangeImage(prev => !prev);
    }

    const handleRateUser = async (reviewedId, rate) => {
        console.log(rate);
        try{
            if(selectedStar > 0){
                const response = await rateUser(user.id, reviewedId, rate);
                if(response === "User rated successfully"){
                    alert("Đánh giá người dùng thành công");
                    setSelectedStar(rate);
                    setOnReview(false);
                }
            }else{
                const response = await changeRate(user.id, reviewedId, rate);
                if(response === "User rated successfully"){
                    alert("Đánh giá người dùng thành công");
                    setSelectedStar(rate);
                    setOnReview(false);
                }
            }
        }catch (e){
            console.log(e);
        }
    }

    return (
        <div className="user-page-body">
            <div className="user-page-container">
                {reportPopup && (
                    <>
                        <div className="curtain"></div>
                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                flexDirection: "column",
                                position: "fixed",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                zIndex: 1000,
                                backgroundColor: "white",
                                padding: "20px",
                                borderRadius: "10px",
                                textAlign: "center",
                                fontSize: "22px",
                            }}
                        >
                            <FontAwesomeIcon icon={faXmark} className="close" onClick={() => {
                                setReportPopup(false);
                                setCurrentReason(null);
                            }}/>
                            <h2 style={{margin: "0"}}>Lý do</h2>
                            {reportReason.map((reason, index) => (
                                <label
                                    key={index}
                                    style={{display: "flex", gap: "20px", cursor: "pointer"}}
                                    onClick={() => {
                                        setCurrentReason(reason);
                                        setCurrentDescription("");
                                    }}
                                >
                                    <input type="radio" name="option" value={reason} style={{width: "20px"}}/>
                                    {reason}
                                </label>
                            ))}
                            {currentReason && (
                                <textarea
                                    id="report-description"
                                    style={{
                                        width: "95%",
                                        alignSelf: "center",
                                        height: "100px",
                                        marginTop: "10px",
                                        border: "1px solid black",
                                        resize: "none",
                                        fontSize: "20px"
                                    }}
                                    onChange={(e) => setCurrentDescription(e.target.value)}
                                />
                            )}
                            <button
                                style={{
                                    width: "200px",
                                    margin: "auto",
                                    fontSize: "25px",
                                    marginTop: "15px",
                                    padding: "10px 0px 10px 0px",
                                    borderRadius: "10px",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                onClick={async () => {
                                    if(currentReason === null) alert("Chọn một lý do để báo cáo");
                                    else {
                                        try {
                                            const reportBody = {
                                                name: currentReason,
                                                description: currentDescription,
                                            }
                                            const response = await reportUser(userId, reportBody);
                                            if(response === "User reported successfully!") {
                                                alert("Báo cáo người dùng thành công");
                                                setCurrentDescription("");
                                                setCurrentReason(null);
                                                setReportPopup(false);
                                            }else alert("Bạn không thể báo cáo cùng 1 lý do nhiều lần!");
                                        }catch(e) {
                                            console.log(e);
                                        }
                                    }
                                }}
                            >Báo cáo</button>
                        </div>
                    </>
                )}
                {userProfile && (
                    <div className="user-page-profile">
                        <div className="user-avatar-background">
                            <img src={`data:${getImageMime(userProfile.backgroundImage)};base64,${userProfile.backgroundImage}`} id="user-background-img"/>
                            {userProfile.id === user.id && (
                                <label htmlFor="backgroundUpload" className="camera-bounding-background">
                                    <FontAwesomeIcon icon={faCamera} />
                                    <input
                                        type="file"
                                        id="backgroundUpload"
                                        name="images"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => updateImageHandle(e.target.files[0], "backgroundImage")}
                                    />
                                </label>
                            )}
                            <div className="user-avatar-container-rel">
                                <div className="user-avatar-container">
                                    <img src={`data:${getImageMime(userProfile.avatar)};base64,${userProfile.avatar}`} id="user-avatar-img"/>
                                    {userProfile.id === user.id && (
                                        <label htmlFor="avatarUpload" className="camera-bounding-avatar">
                                            <FontAwesomeIcon icon={faCamera}/>
                                            <input
                                                type="file"
                                                id="avatarUpload"
                                                name="images"
                                                accept="image/*"
                                                hidden
                                                onChange={(e) => updateImageHandle(e.target.files[0], "avatar")}
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="user-lower-information">
                            <h2 id="user-page-username">{userProfile.fullName}</h2>
                            {userProfile.id !== user.id && (
                                <div
                                    style={{
                                        padding: "10px",
                                        border: "1px solid black",
                                        borderRadius: "8px",
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        cursor: "pointer"
                                    }}
                                >
                                    <FontAwesomeIcon icon={faFlag} style={{fontSize: "22px"}} onClick={() => setReportPopup(true)}/>
                                </div>
                            )}
                            <div className="user-rating">
                                <div className="rating-star">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <FontAwesomeIcon
                                            key={star}
                                            icon={star <= userProfile.totalRating.totalRating ? faStarSolid : faStarRegular}
                                        />
                                    ))}
                                </div>
                                <p id="rating-count">({userProfile.totalRating.numberOfRating})</p>
                            </div>
                            {userProfile.id === user.id ?
                                <Link to="/personalInformation" className="change-personal-information">
                                    Chỉnh sửa thông tin cá nhân
                                </Link>:
                                (
                                    <>
                                        <button className={!onReview ? "review-user" : "review-user-js"} onClick={toggleOnReview}>
                                            <p >Đánh giá người dùng</p>
                                        </button>
                                        <div className={onReview ? "review-star" : "review-star-js"} onClick={toggleOnReview}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <FontAwesomeIcon
                                                    key={star}
                                                    icon={star <= selectedStar ? faStarSolid : faStarRegular}
                                                    className={star <= selectedStar ? "selected-star" : ""}
                                                    onClick={() => handleRateUser(userProfile.id, star)}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )
                            }
                            <div className="sub-bounding">
                                <FontAwesomeIcon icon={faSignal} />
                                <p className="title">Trạng thái:</p>
                                <p>{userProfile.status}</p>
                            </div>
                            <div className="sub-bounding">
                                <FontAwesomeIcon icon={faMessage}/>
                                <p className="title">Phản hồi chat:</p>
                                <p>{userProfile.replyPercentage}%</p>
                            </div>
                            <div className="sub-bounding">
                                <FontAwesomeIcon icon={faCalendar} />
                                <p className="title">Đã tham gia:</p>
                                <p>{userProfile.joinTime} ngày</p>
                            </div>
                            <div className="sub-bounding" style={{alignItems: "flex-start"}}>
                                <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                                    <FontAwesomeIcon icon={faCompass} />
                                    <p className="title" style={{width: "65px"}}>Địa chỉ:</p>
                                </div>
                                <p>{userProfile.addressDTO === "" ? "Chưa cung cấp" : userProfile.addressDTO}</p>
                            </div>
                            <div className="sub-bounding">
                                <FontAwesomeIcon icon={faPhone} />
                                <p className="title">Số điện thoại:</p>
                                <p>{userProfile.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="user-page-posts">
                    <div className="user-page-posts-header">
                        <div className="user-page-posts-header-title">
                            <div className="left" onClick={toggleLeftLine}>
                                <h2>Đang hiển thị</h2>
                                <p>({enablePostLength})</p>
                            </div>
                            <div className="right" onClick={toggleRightLine}>
                                <h2>Đã ẩn</h2>
                                <p>({disablePostLength})</p>
                            </div>
                        </div>
                        <div className="blue-line">
                            <img src="../../../public/user-page-icon/blue-line.png" className={isLeft ? "left-line" : ""}/>
                            <img src="../../../public/user-page-icon/blue-line.png" className={isRight ? "right-line" : ""}/>
                        </div>
                    </div>
                    <div className="user-page-posts-container">
                        {isLeft && <UserEnablePost userId={userId} setEnablePostLength={setEnablePostLength} />}
                        {isRight && <UserDisablePost userId={userId} setDisablePostLength={setDisablePostLength} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
