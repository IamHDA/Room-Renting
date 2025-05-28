import React, {useContext, useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight, faHeart as redHeart, faX, faXmark,} from '@fortawesome/free-solid-svg-icons';
import '../../css/user-css/PostDetail.css';
import {getPost} from "../../apiServices/post.js";
import {getImageMime, priceFormat} from "../../utils/format.js";
import AuthContext from "../../contexts/AuthContext.jsx";
import {Link, useParams} from "react-router-dom";
import {faHeart as normalHeart} from "@fortawesome/free-regular-svg-icons";
import FavouritePostContext from "../../contexts/FavouritePostContext.jsx";
import {reportPost} from "../../apiServices/report.js";

const MyComponent = () => {
    const { heartButtonHandle, favouritePostIds } = useContext(FavouritePostContext);
    const {postId} = useParams();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [postImages, setPostImages] = useState(null);
    const [postVideos, setPostVideos] = useState(null);
    const [mainMedia, setMainMedia] = useState({index: 0, type: "IMAGE"});
    const [totalLength, setTotalLength] = useState(null);
    const [fullImage, setFullImage] = useState(false);
    const [reportPopup, setReportPopup] = useState(false);
    const [currentReason, setCurrentReason] = useState(null);
    const [currentDescription, setCurrentDescription] = useState("");
    const swiperRef1 = useRef(null);
    const swiperRef2 = useRef(null);
    const reportReason = [
        "Lừa đảo",
        "Trùng lặp",
        "Trọ đã được thuê",
        "Không liên lạc được",
        "Thông tin của tin đăng không đúng thực tế",
        "Thông tin của người đăng không đúng thực tế",
        "Lý do khác"
    ]

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await getPost(postId);
                setPost(response);
                setTotalLength(response.postMediaDTO.length);
                setPostImages(response.postMediaDTO.filter(media => media.type === "IMAGE"));
                setPostVideos(response.postMediaDTO.filter(media => media.type === "VIDEO"));
            }catch(e){
                console.log(e);
            }
        }
        fetchPost();
    }, [])

    const nextMedia = (index) => {
        const tmp = index + 1;
        if(tmp === totalLength) setMainMedia({index: 0, type: "IMAGE"});
        else if(tmp >= postImages.length) setMainMedia({index: tmp, type: "VIDEO"});
        else setMainMedia({index: tmp, type: "IMAGE"});
    }

    const prevMedia = (index) => {
        const tmp = index - 1;
        if(tmp === -1){
            if(postVideos.length !== 0) setMainMedia({index: totalLength - 1, type: "VIDEO"});
            else setMainMedia({index: totalLength - 1, type: "IMAGE"});
        }
        else if(tmp < postImages.length) setMainMedia({index: tmp, type: "IMAGE"});
        else setMainMedia({index: tmp, type: "VIDEO"});
    }

    const specificImage = (index) => {
        setMainMedia({index: index, type: "IMAGE"});
    }

    const specificVideo = (index) => {
        setMainMedia({index: postImages.length + index, type: "VIDEO"});
    }

    useEffect(() => {
        if(swiperRef1.current) swiperRef1.current.swiper.slideTo(mainMedia.index);
        if(fullImage){
            if(swiperRef2.current) swiperRef2.current.swiper.slideTo(mainMedia.index);
        }
    }, [mainMedia])

    return (
        <div className="post-detail-body">
            {fullImage && (
                <div className="curtain">
                    <div className="full-view">
                        {mainMedia.type === "IMAGE" ? (
                            <img src={postImages[mainMedia.index].url} onClick={() => setFullImage(prev => !prev)}/>
                        ) : (
                            <video controls>
                                <source src={postVideos[mainMedia.index - postImages.length].url} type="video/mp4" />
                                <source src={postVideos[mainMedia.index - postImages.length].url} type="video/webm" />
                                <source src={postVideos[mainMedia.index - postImages.length].url} type="video/ogg" />
                            </video>
                        )}
                    </div>
                    <button className="next" onClick={() => nextMedia(mainMedia.index)}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <button className="prev" onClick={() => prevMedia(mainMedia.index)}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <FontAwesomeIcon icon={faX} className="close-image" onClick={() => setFullImage(prev => !prev)}/>
                    {totalLength > 4 ? (
                        <Swiper ref={swiperRef2} slidesPerView="5" grabCursor={true} style={{maxWidth: "860px"}} className="full-image-swiper">
                            {postImages.map((image, index) => (
                                <SwiperSlide>
                                    <img
                                        src={image.url}
                                        className={mainMedia.index !== index ? "thumbnail" : "thumbnail js"}
                                        key={index}
                                        onClick={() => specificImage(index)}
                                    />
                                </SwiperSlide>
                            ))}
                            {
                                postVideos.map((video, index) => (
                                    <SwiperSlide>
                                        <img
                                            src="../../../public/detail-icon/play-video.jpg"
                                            key={index}
                                            className={mainMedia.index - postImages.length !== index ? "thumbnail" : "thumbnail js"}
                                            style={{ backgroundColor: "white" }}
                                            onClick={() => specificVideo(index)}
                                        ></img>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    ) : (
                        <div className="full-image-swiper">
                            {postImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.url}
                                    className={mainMedia.index !== index ? "thumbnail" : "thumbnail js"}
                                    onClick={() => specificImage(index)}
                                />
                            ))}
                            {postVideos.map((video, index) => (
                                <img
                                    key={index}
                                    src="../../../public/detail-icon/play-video.jpg"
                                    className={mainMedia.index - postImages.length !== index ? "thumbnail" : "thumbnail js"}
                                    style={{ backgroundColor: "white" }}
                                    onClick={() => specificVideo(index)}
                                ></img>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {reportPopup && (
                <>
                    <div className="curtain report"></div>
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
                        {currentReason && currentReason !== "Trùng lặp" && currentReason !== "Trọ đã được thuê" && (
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
                                if(currentReason === null) alert("Hãy chọn một lý do");
                                else {
                                    const reportBody = {
                                        name: currentReason,
                                        description: currentDescription
                                    }
                                    try {
                                        const response = await reportPost(postId, reportBody);
                                        if(response === "Post reported successfully!") {
                                            alert("Báo cáo tin đăng thành công");
                                            setReportPopup(false);
                                            setCurrentReason(null);
                                            setCurrentDescription("");
                                        }
                                        else alert("Bạn không thể báo cáo cùng 1 lý do nhiều lần!");
                                    }catch(e){
                                        console.log(e);
                                    }
                                }
                            }}
                        >Báo cáo</button>
                    </div>
                </>
            )}
            <div className="post-detail-container">
                {post !== null && (
                    <>
                        <div className="post-detail">
                            <div className="post-media">
                                <div className="post-main-media">
                                    {mainMedia.type === "IMAGE" ? (
                                        <img src={postImages[mainMedia.index].url} onClick={() => setFullImage(prev => !prev)}/>
                                    ) : (
                                        <video controls>
                                            <source src={postVideos[mainMedia.index - postImages.length].url} type="video/mp4" />
                                            <source src={postVideos[mainMedia.index - postImages.length].url} type="video/webm" />
                                            <source src={postVideos[mainMedia.index - postImages.length].url} type="video/ogg" />
                                        </video>
                                    )}
                                    <button className="next" onClick={() => nextMedia(mainMedia.index)}>
                                        <FontAwesomeIcon icon={faAngleRight} />
                                    </button>
                                    <button className="prev" onClick={() => prevMedia(mainMedia.index)}>
                                        <FontAwesomeIcon icon={faAngleLeft} />
                                    </button>
                                </div>
                            </div>
                            {totalLength > 4 ? (
                                <Swiper ref={swiperRef1} slidesPerView="4" grabCursor={true} style={{maxWidth: "860px"}}>
                                    {postImages.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={image.url}
                                                className={mainMedia.index !== index ? "thumbnail" : "thumbnail js"}
                                                onClick={() => specificImage(index)}
                                            />
                                        </SwiperSlide>
                                    ))}
                                    {postVideos.map((video, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src="../../../public/detail-icon/play-video.jpg"
                                                className={mainMedia.index - postImages.length !== index ? "thumbnail" : "thumbnail js"}
                                                style={{ backgroundColor: "white" }}
                                                onClick={() => specificVideo(index)}
                                            ></img>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="post-detail-image-container">
                                    {postImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image.url}
                                            className={mainMedia.index !== index ? "thumbnail" : "thumbnail js"}
                                            onClick={() => specificImage(index)}
                                        />
                                    ))}
                                    {postVideos.map((video, index) => (
                                        <img
                                            key={index}
                                            src="../../../public/detail-icon/play-video.jpg"
                                            className={mainMedia.index - postImages.length !== index ? "thumbnail" : "thumbnail js"}
                                            style={{ backgroundColor: "white" }}
                                            onClick={() => specificVideo(index)}
                                        ></img>
                                    ))}
                                </div>
                            )}
                            <h1>{post.title}</h1>
                            <img src="../../../public/detail-icon/line.png" className="line"/>
                            <div className="post-detail-mixed">
                                <div className="main-content">
                                    <div className="post-detail-price">
                                        <p className="title">Mức giá</p>
                                        <p className="emphasize">{priceFormat(post.postDetailDTO.price)} triệu/tháng</p>
                                    </div>
                                    <div className="post-detail-area">
                                        <p className="title">Diện tích</p>
                                        <p className="emphasize">{post.postDetailDTO.area}m&sup2;</p>
                                    </div>
                                    {(user === null || post.postCreator.id !== user.id) && (
                                        <div className="post-detail-function">
                                            <img src="../../../public/detail-icon/alert.png" className="report" onClick={() => {
                                                if(!user) alert("Đăng nhập để sử dụng chức năng này!")
                                                else setReportPopup(true);
                                            }}/>
                                            {!favouritePostIds.includes(post.id) ?
                                                <FontAwesomeIcon icon={normalHeart} style={{fontSize: '30px', color: 'black'}} className="save" onClick={() => heartButtonHandle(post.id)}/> :
                                                <FontAwesomeIcon icon={redHeart} style={{fontSize: '30px', color: "#ed333b"}} className="save" onClick={() => heartButtonHandle(post.id)}/>
                                            }
                                        </div>
                                    )}

                                </div>
                                <div className="post-location">
                                    <img src="../../../public/detail-icon/location.png"/>
                                    <p>{post.addressDTO}</p>
                                </div>
                                <div className="post-time">
                                    <img src="../../../public/detail-icon/clock.png"/>
                                    <p>{post.createdAt}</p>
                                </div>
                            </div>
                            <img src="../../../public/detail-icon/line.png" className="line"/>
                            <div className="post-detail-description">
                                <h2>Thông tin mô tả</h2>
                                <div className="description-content" dangerouslySetInnerHTML={{
                                    __html: post.description.replace(/<br>/, '<br/>')
                                }} >
                                </div>
                            </div>
                            <img src="../../../public/detail-icon/line.png" className="line"/>
                            <div className="post-property">
                                <h2>Đặc điểm phòng trọ</h2>
                                <div className="properties">
                                    <div className="sub">
                                        <div className="title">
                                            <img src="../../../public/detail-icon/dong.png"/>
                                            <p>Mức giá</p>
                                        </div>
                                        <p>{priceFormat(post.postDetailDTO.price)} triệu/tháng</p>
                                    </div>
                                    <div className="sub">
                                        <div className="title">
                                            <img src="../../../public/detail-icon/area.png"/>
                                            <p>Diện tích</p>
                                        </div>
                                        <p>{post.postDetailDTO.area}m&sup2;</p>
                                    </div>
                                    {post.postDetailDTO.bedroom !== "" && (
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/bedroom.png"/>
                                                <p>Phòng ngủ</p>
                                            </div>
                                            <p>{post.postDetailDTO.bedroom} phòng</p>
                                        </div>
                                    )}
                                    {post.postDetailDTO.bathroom !== "" && (
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/bathroom.png"/>
                                                <p>Phòng tắm, vệ sinh</p>
                                            </div>
                                            <p>{post.postDetailDTO.bathroom} phòng</p>
                                        </div>
                                    )}
                                    {post.postDetailDTO.parking !== "" &&(
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/clock.png"/>
                                                <p>Chỗ để xe</p>
                                            </div>
                                            <p>{post.postDetailDTO.parking} xe</p>
                                        </div>
                                    )}
                                    {post.postDetailDTO.electric !== "" && (
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/electric.png"/>
                                                <p>Giá điện</p>
                                            </div>
                                            <p>{post.postDetailDTO.electric}</p>
                                        </div>
                                    )}
                                    {post.postDetailDTO.water !== "" && (
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/water.png"/>
                                                <p>Giá nước</p>
                                            </div>
                                            <p>{post.postDetailDTO.water}</p>
                                        </div>
                                    )}
                                    {post.postDetailDTO.wifi !== "" && (
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/wifi.png"/>
                                                <p>Giá Internet</p>
                                            </div>
                                            <p>{post.postDetailDTO.wifi}</p>
                                        </div>
                                    )}
                                    {post.postDetailDTO.security && (
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/security.png"/>
                                                <p>An ninh</p>
                                            </div>
                                            <p>{post.postDetailDTO.security}</p>
                                        </div>
                                    )}
                                    {post.postDetailDTO.furniture && (
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/furniture.png"/>
                                                <p>Nội thất</p>
                                            </div>
                                            <p>{post.postDetailDTO.furniture}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="post-user">
                            <Link to={`/account/${post.postCreator.id}`} className="user-profile">
                                <img src={`data:${getImageMime(post.postCreator.avatar)};base64,${post.postCreator.avatar}`} className="avatar"/>
                                <div className="name-status">
                                    <p className="name">{post.postCreator.fullName}</p>
                                    <div className="status">
                                        <div className={post.postCreator.status === "Online" ? "post-creator-status-dot-online" : "post-creator-status-dot-offline"}></div>
                                        <p>{post.postCreator.status}</p>
                                    </div>
                                </div>
                            </Link>
                            <div className="user-background">
                                <div className="sub">
                                    <p>Tham gia URPLACE</p>
                                    <p id="sub-join">{post.postCreator.joinTime} ngày</p>
                                </div>
                                <img src="../../../public/detail-icon/stand-line.png" className="stand-line"/>
                                <div className="sub">
                                    <p>Tin đăng đang có</p>
                                    <p id="sub-post">{post.postCreator.totalPosts} tin</p>
                                </div>
                                <img src="../../../public/detail-icon/stand-line.png" className="stand-line"/>
                                <div className="sub">
                                    <p>Tỉ lệ phản hồi</p>
                                    <p id="sub-rep">{post.postCreator.replyPercentage}%</p>
                                </div>
                            </div>
                            <div  className="post-user-number-bounding">
                                <img src="../../../public/detail-icon/phone-ring.png"/>
                                <p id="post-user-number">{post.postCreator.phoneNumber}</p>
                            </div>
                            <Link
                                to={`/chat/${user?.id}_${post.postCreator.id}`}
                                state={{userId: post.postCreator.id}}
                                onClick={(e) => {
                                    if(!user) {
                                        e.preventDefault();
                                        alert("Đăng nhập để sử dụng chức năng này");
                                    }else if(user.id === post.postCreator.id){
                                        e.preventDefault();
                                        alert("Không thể tự chat với chính mình");
                                    }else{
                                        const chatRoomPost = {
                                            id: post.id,
                                            title: post.title,
                                            thumbnailUrl: postImages[0].url,
                                            price: post.postDetailDTO.price,
                                            area: post.postDetailDTO.area
                                        }
                                        localStorage.setItem("chatRoomPost", JSON.stringify(chatRoomPost));
                                    }
                                }}
                                className="post-user-chatting-bounding">
                                <img src="../../../public/detail-icon/chat-icon.png"/>
                                <p id="post-user-chatting">Nhắn tin ngay</p>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyComponent;