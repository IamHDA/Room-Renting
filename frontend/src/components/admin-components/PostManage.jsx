import React, {useEffect, useRef, useState} from 'react';
import '../../css/admin-css/PostManage.css';
import '../../css/admin-css/index.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faX, faXmark} from "@fortawesome/free-solid-svg-icons";
import {getPosts, getPostReport, deleteReport} from "../../apiServices/admin.js";
import {deletePost} from "../../apiServices/post.js";
import SortIcon from "./SortIcon.jsx";
import Pagination from "../admin-components/Pagination.jsx";
import SearchIcon from "./SearchIcon.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import {priceFormat} from "../../utils/format.js";

const MyComponent = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [posts, setPosts] = useState([]);
    const totalPostsNumberRef = useRef(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [sortCondition, setSortCondition] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [postStatus, setPostStatus] = useState("");
    const [post, setPost] = useState(null);
    const [reports, setReports] = useState([]);
    const [postImages, setPostImages] = useState([]);
    const [postVideos, setPostVideos] = useState([]);
    const [mainMedia, setMainMedia] = useState({index: 0, type: "IMAGE"});
    const [totalLength, setTotalLength] = useState(null);
    const [fullImage, setFullImage] = useState(false);
    const swiperRef1 = useRef(null);
    const swiperRef2 = useRef(null);

    useEffect(() => {
        const function2 = document.getElementById("function-2");
        if(function2){
            function2.classList.add("isSelected");
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = {
                    pageNumber,
                    pageSize,
                    sortCondition,
                    authorName,
                    status: postStatus
                }
                const response = await getPosts(searchParams);
                setPosts(response.posts);
                totalPostsNumberRef.current = response.totalLength;
            }catch (e){
                console.log(e);
            }
        }
        fetchData();
    }, [pageNumber, pageSize, sortCondition, authorName, postStatus])

    useEffect(() => {
        if(swiperRef1.current) swiperRef1.current.swiper.slideTo(mainMedia.index);
        if(fullImage){
            if(swiperRef2.current) swiperRef2.current.swiper.slideTo(mainMedia.index);
        }
    }, [mainMedia])

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

    const handleGetPostReport = async (postId) => {
        const response = await getPostReport(postId);
        setPost(response.post);
        setReports(response.reportList);
        setTotalLength(response.post.postMediaDTO.length);
        setPostImages(response.post.postMediaDTO.filter(media => media.type === "IMAGE"));
        setPostVideos(response.post.postMediaDTO.filter(media => media.type === "VIDEO"));
        setIsSelected(true);
    }

    const handleDeleteReport = async (reportId) => {
        try {
            const response = await deleteReport(reportId);
            if(response === "Report deleted successfully!"){
                alert("Xóa tin thành công");
                const newReports = reports.map(report => report.id !== reportId);
                setReports(newReports);
            }else{
                alert("Có lỗi xảy ra");
            }
        }catch (e){
            console.log(e);
        }
    }

    return (
        <div className="admin-post-manage-body">
            {isSelected && <div className="curtain"></div>}
            <table>
                <thead>
                    <tr>
                        <th className="stt">STT</th>
                        <th className="id">
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p style={{marginRight: "10px"}}>ID</p>
                                <SortIcon
                                    sortValue={"id "}
                                    sortCondition={sortCondition}
                                    setSortCondition={setSortCondition}
                                />
                            </div>
                        </th>
                        <th className="user-id" >ID người đăng</th>
                        <th className="author">
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p>Tên người đăng</p>
                                <SearchIcon item={"Người đăng"} setParam={setAuthorName} setCurrentPage={setPageNumber}/>
                            </div>
                        </th>
                        <th className="post-title">Tiêu đề tin</th>
                        <th className="report-number">
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p style={{marginRight: "10px"}}>Số lượt báo cáo</p>
                                <SortIcon
                                    sortValue={"reportCount "}
                                    sortCondition={sortCondition}
                                    setSortCondition={setSortCondition}
                                />
                            </div>
                        </th>
                        <th style={{width: "180px"}}>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p>Trạng thái</p>
                                <SearchIcon item={"Trạng thái"} setParam={setPostStatus} setCurrentPage={setPageNumber}/>
                            </div>
                        </th>
                        <th className="post-time">
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p style={{marginRight: "10px"}}>Thời gian đăng</p>
                                <SortIcon
                                    sortValue={"createdAt "}
                                    sortCondition={sortCondition}
                                    setSortCondition={setSortCondition}
                                />
                            </div>
                        </th>
                        <th className="update-time">
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <p style={{marginRight: "10px"}}>Thời gian cập nhật</p>
                                <SortIcon
                                    sortValue={"updatedAt "}
                                    sortCondition={sortCondition}
                                    setSortCondition={setSortCondition}
                                />
                            </div>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length > 0 ? posts.map((post, index) => (
                        <tr key={index} onClick={() => handleGetPostReport(post.id)}>
                            <td className="stt">{pageSize % (pageNumber * pageSize) + 1 + index}</td>
                            <td className="id">{post.id}</td>
                            <td className="user-id">{post.userId}</td>
                            <td>{post.authorName}</td>
                            <td className="post-title">{post.title}</td>
                            <td>{post.reportedTime} lượt</td>
                            <td>{post.postStatus === "ENABLED" ? "Đang hiển thị" : "Đã ẩn"}</td>
                            <td>{post.createdAt}</td>
                            <td>{post.updatedAt ? post.updatedAt : ""}</td>
                            <td className="delete" onClick={(e) => {
                                e.stopPropagation();
                                deletePost(post.id);
                            }}><FontAwesomeIcon icon={faX}/></td>
                        </tr>
                    )): (
                        <tr>
                            <td colSpan="10" style={{
                                height: "200px",
                                textAlign: "center",
                                paddingTop: "20px",
                                backgroundColor: "#fff"
                            }}>
                                <img src="../../../public/no-data.png" alt="No data" style={{width: "80px", height: "80px", opacity: 0.5}} />
                                <p style={{marginTop: "10px", color: "#888"}}>Không có dữ liệu</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={pageNumber}
                setCurrentPage={setPageNumber}
                totalLength={totalPostsNumberRef.current}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            {isSelected && (
                <div className="pop-up">
                    <div className="content-container">
                        <FontAwesomeIcon icon={faXmark} className="close" onClick={() => setIsSelected(false)}/>
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
                                <Swiper ref={swiperRef1} slidesPerView="4" grabCursor={true} style={{maxWidth: "800px"}}>
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
                        <div className="report-container">
                            <h1>Báo cáo</h1>
                            {reports.map((report, index) => (
                                <div key={index} className="report-bounding">
                                    <FontAwesomeIcon icon={faXmark} className="close" onClick={() => handleDeleteReport(report.id)}/>
                                    <div className="report-content">
                                        <h3>{report.name}</h3>
                                        <p>{report.description}</p>
                                    </div>
                                    <div className="reporter-container">
                                        <h3>Người báo cáo</h3>
                                        <div className="reporter">
                                            <p>ID: {report.reportCreator.id}</p>
                                            <p>Tên: {report.reportCreator.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
