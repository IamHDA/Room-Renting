import React, {useContext, useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight, faX,} from '@fortawesome/free-solid-svg-icons';
import '../../css/user-css/PostDetail.css';
import {getPost} from "../../apiServices/post.js";
import {getImageMime, priceFormat} from "../../utils/format.js";
import AuthContext from "../../contexts/AuthContext.jsx";
import {Link, useParams} from "react-router-dom";

const MyComponent = () => {
    const {postId} = useParams();
    const { user, isAuthenticated } = useContext(AuthContext);
    const [post, setPost] = useState(null);
    const [postImages, setPostImages] = useState(null);
    const [postVideos, setPostVideos] = useState(null);
    const [mainMedia, setMainMedia] = useState({index: 0, type: "IMAGE"});
    const [totalLength, setTotalLength] = useState(null);
    const [fullImage, setFullImage] = useState(false);
    const swiperRef = useRef(null);
    let bedroom = "";
    let bathroom = "";
    let water = "";
    let electric = "";
    let parking = "";
    let wifi = "";
    let security = "";
    let furniture = "";

    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await getPost(postId);
                setPost(response);
                bedroom = response.postDetailDTO.bedroom;
                bathroom = response.postDetailDTO.bathroom;
                water = response.postDetailDTO.water;
                electric = response.postDetailDTO.electric;
                parking = response.postDetailDTO.parking;
                wifi = response.postDetailDTO.wifi;
                security = response.postDetailDTO.security;
                furniture = response.postDetailDTO.furniture;
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
        if(swiperRef.current) swiperRef.current.swiper.slideTo(mainMedia.index);
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
                        <Swiper ref={swiperRef} slidesPerView="5" grabCursor={true} style={{maxWidth: "860px"}} className="full-image-swiper">
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
                                <Swiper ref={swiperRef} slidesPerView="4" grabCursor={true} style={{maxWidth: "860px"}}>
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
                                            <img src="../../../public/detail-icon/share.png" className="share"/>
                                            <img src="../../../public/detail-icon/alert.png" className="report" onClick={(e) => {
                                                if(!isAuthenticated) alert("Đăng nhập để sử dụng chức năng này!")
                                            }}/>
                                            <img src="../../../public/detail-icon/heart.png" className="save" onClick={(e) => {
                                                if(!isAuthenticated) alert("Đăng nhập để sử dụng chức năng này!")
                                            }}/>
                                        </div>
                                    )}

                                </div>
                                <div className="post-location">
                                    <img src="../../../public/detail-icon/location.png"/>
                                    <p>{post.dtoAddress}</p>
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
                                    <div className="left">
                                        <img src="../../../public/detail-icon/line.png" className="line"/>
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/dong.png"/>
                                                <p>Mức giá</p>
                                            </div>
                                            <p>{priceFormat(post.postDetailDTO.price)} triệu/tháng</p>
                                        </div>
                                        <img src="../../../public/detail-icon/line.png" className="line"/>
                                        <div className="sub">
                                            <div className="title">
                                                <img src="../../../public/detail-icon/area.png"/>
                                                <p>Diện tích</p>
                                            </div>
                                            <p>{post.postDetailDTO.area}m&sup2;</p>
                                        </div>
                                        {bedroom !== "" && (
                                            <>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                                <div className="sub">
                                                    <div className="title">
                                                        <img src="../../../public/detail-icon/bedroom.png"/>
                                                        <p>Phòng ngủ</p>
                                                    </div>
                                                    <p>{bedroom}</p>
                                                </div>
                                            </>
                                        )}
                                        {bathroom !== "" && (
                                            <>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                                <div className="sub">
                                                    <div className="title">
                                                        <img src="../../../public/detail-icon/bathroom.png"/>
                                                        <p>Phòng tắm, vệ sinh</p>
                                                    </div>
                                                    <p>{bathroom}</p>
                                                </div>
                                            </>
                                        )}
                                        {parking !== "" &&(
                                            <>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                                <div className="sub">
                                                    <div className="title">
                                                        <img src="../../../public/detail-icon/clock.png"/>
                                                        <p>Chỗ để xe</p>
                                                    </div>
                                                    <p>{parking}</p>
                                                </div>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                            </>
                                        )}
                                    </div>
                                    <div className="right">
                                        {electric !== "" && (
                                            <>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                                <div className="sub">
                                                    <div className="title">
                                                        <img src="../../../public/detail-icon/electric.png"/>
                                                        <p>Giá điện</p>
                                                    </div>
                                                    <p>{electric}</p>
                                                </div>
                                            </>
                                        )}
                                        {water !== "" && (
                                            <>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                                <div className="sub">
                                                    <div className="title">
                                                        <img src="../../../public/detail-icon/water.png"/>
                                                        <p>Giá nước</p>
                                                    </div>
                                                    <p>{water}</p>
                                                </div>
                                            </>
                                        )}
                                        {wifi !== "" && (
                                            <>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                                <div className="sub">
                                                    <div className="title">
                                                        <img src="../../../public/detail-icon/wifi.png"/>
                                                        <p>Giá Internet</p>
                                                    </div>
                                                    <p>{wifi}</p>
                                                </div>
                                            </>
                                        )}
                                        {security !== "" && (
                                            <>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                                <div className="sub">
                                                    <div className="title">
                                                        <img src="../../../public/detail-icon/security.png"/>
                                                        <p>An ninh</p>
                                                    </div>
                                                    <p>{security}</p>
                                                </div>
                                            </>
                                        )}
                                        {furniture !== "" && (
                                            <>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                                <div className="sub">
                                                    <div className="title">
                                                        <img src="../../../public/detail-icon/furniture.png"/>
                                                        <p>Nội thất</p>
                                                    </div>
                                                    <p>{furniture}</p>
                                                </div>
                                                <img src="../../../public/detail-icon/line.png" className="line"/>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="post-user">
                            <Link to="/account" className="user-profile">
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
                                    <p id="sub-join">{post.postCreator.joinTime}</p>
                                </div>
                                <img src="../../../public/detail-icon/stand-line.png" className="stand-line"/>
                                <div className="sub">
                                    <p>Tin đăng đang có</p>
                                    <p id="sub-post">{post.postCreator.totalPosts}</p>
                                </div>
                                <img src="../../../public/detail-icon/stand-line.png" className="stand-line"/>
                                <div className="sub">
                                    <p>Tỉ lệ phản hồi</p>
                                    <p id="sub-rep">90%</p>
                                </div>
                            </div>
                            <div  className="post-user-number-bounding">
                                <img src="../../../public/detail-icon/phone-ring.png"/>
                                <p id="post-user-number">{post.postCreator.phoneNumber}</p>
                            </div>
                            <div className="post-user-chatting-bounding">
                                <img src="../../../public/detail-icon/chat-icon.png"/>
                                <p id="post-user-chatting">Nhắn tin ngay</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyComponent;
