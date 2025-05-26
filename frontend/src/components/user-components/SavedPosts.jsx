import React, {useEffect, useState} from 'react';
import '../../css/user-css/SavedPosts.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import Pagination from "./PagePagination.jsx";
import {getFavouritePostByUser, removeFromFavourite} from "../../apiServices/favouritePost.js";
import SavedPostList from "../../dataList/SavedPostList.jsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {priceFormat} from "../../utils/format.js";

const MyComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);
    const [posts, setPosts] = useState([]);
    const [deletePosts, setDeletePosts] = useState(false);
    const [order, setOrder] = useState(0);
    let {pageIndex} = useParams();
    let currentPageIndex = 1;

    useEffect(() => {
        window.scrollTo(0, 0);
        const urlParams = new URLSearchParams(location.search);
        let orderFromUrl = urlParams.get('order');
        if(!orderFromUrl) orderFromUrl = 1;
        setOrder(parseInt(orderFromUrl));
        const fetchFavouritePosts = async () => {
            try{
                const response = await getFavouritePostByUser(parseInt(orderFromUrl));
                setPosts(response);
            }catch(e){
                console.log(e);
            }
        }
        fetchFavouritePosts();
    }, [pageIndex, location.search]);

    const changeSortOrder = (newOrder) => {
        setOrder(newOrder);
        navigate({
            pathname: currentPageIndex === 1 ? '/savedPosts' : `/savedPosts/${pageIndex}`,
            search: `${newOrder === 1 ? "" : `?order=${newOrder}`}`,
        });
    };

     const removePostFromFavourite = async (postId) => {
        try{
            const response = await removeFromFavourite(postId);
            if(response !== "Removed post from favourite") alert("Có lỗi xảy ra");
            const newFavouritePosts = posts.filter((post) => post.id !== postId);
            setPosts(newFavouritePosts);
            const favouritePostsId = JSON.parse(localStorage.getItem("favouritePostsId")).filter(id => id !== postId);
            localStorage.setItem("favouritePostsId", JSON.stringify(favouritePostsId));
            localStorage.setItem("favouritePosts", JSON.stringify(newFavouritePosts));
            setDeletePosts(prev => !prev);
        }catch (e){
            console.log(e);
        }
    }

    return (
        <div className="saved-posts-body">
            <div className="saved-posts-bounding">
                <div className="saved-posts-bounding-left">
                    {posts.length === 0 ? (
                        <div className="saved-posts-empty">
                            <p className="saved-posts-reminder1">Bạn chưa lưu tin đăng nào!</p>
                            <p className="saved-posts-reminder2">Hãy bấm nút <FontAwesomeIcon icon={faHeart} style={{color: "black"}}/> ở tin đăng để lưu và quay lại trang này</p>
                            <Link to="/" className="start-explore-button">
                                Bắt đầu tìm kiếm
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h1 className="title">Tin đăng đã lưu ({posts.length}/100)</h1>
                            {posts.length > 0 && (
                                <div className="saved-posts-container">
                                    {posts.slice(startIndex, endIndex).map((post, index) => (
                                        <Link to={`/detail/${post.id}`} className="saved-posts-post" key={index}>
                                            <img src={post.thumbnailURL} className="post-img"/>
                                            <div className="saved-posts-post-information">
                                                <p className="title">{post.title}</p>
                                                <button className="delete-button" onClick={(e) => {
                                                    e.preventDefault();
                                                    removePostFromFavourite(post.id);
                                                }}>
                                                    <FontAwesomeIcon icon={faX}/>
                                                </button>
                                                <div className="post-price-area">
                                                    <p id="saved-posts-post-price">{priceFormat(post.postDetailSummaryDTO.price) + " tr/tháng"}</p>
                                                    <p id="saved-posts-post-area">{post.postDetailSummaryDTO.area}m&sup2;</p>
                                                </div>
                                                <p className="post-description">
                                                    {post.description.replace(/<br>/gi, " ")}
                                                </p>
                                                <div className="post-location-time">
                                                    <div className="post-location-time-sub">
                                                        <img src="../../../public/saved-posts-icon/location.png"/>
                                                        <p>{post.addressDTO}</p>
                                                    </div>
                                                    <div className="post-location-time-sub">
                                                        <img src="../../../public/saved-posts-icon/clock.png"/>
                                                        <p>{post.updatedAt ? post.updatedAt : post.createdAt}</p>
                                                    </div>
                                                </div>
                                                <button className="chat-button">Nhắn tin</button>
                                            </div>
                                        </Link>
                                    ))}
                                    <Pagination pathName="/savedPosts" dataLength={posts.length} setStartIndex={setStartIndex} setEndIndex={setEndIndex} currentIndex={pageIndex}/>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {posts.length > 0 && (
                    <div className="saved-posts-bounding-right">
                        <h1>Sắp xếp</h1>
                        <p className={order === 1 ? "sort" : ""} onClick={() => changeSortOrder(1)}>Ngày lưu tăng dần</p>
                        <p className={order === 2 ? "sort" : ""} onClick={() => changeSortOrder(2)}>Ngày lưu giảm dần</p>
                        <p className={order === 3 ? "sort" : ""} onClick={() => changeSortOrder(3)}>Giá tăng dần</p>
                        <p className={order === 4 ? "sort" : ""} onClick={() => changeSortOrder(4)}>Giá giảm dần</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyComponent;
