import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {changePostStatus, deletePost, getDisablePostsByUserId} from "../../apiServices/post.js";
import TablePagination from "./TablePagination.jsx";
import {getPostDetail} from "../../apiServices/post.js";
import NoDataFound from "../NoDataFound.jsx";

const MyComponent = ({ setEditPost, userId, setCurrentEditingPost }) => {
    const [posts, setPosts] = useState([]);
    const [updatePost, setUpdatePost] = useState(false);
    let storedPageIndex = JSON.parse(localStorage.getItem("postManageDisablePostIndex"))
    let currentPageIndex = storedPageIndex ? storedPageIndex : 0;
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(4);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getDisablePostsByUserId(userId);
                setPosts(response);
            }catch(error) {
                console.log(error);
            }
        }
        fetchPosts();
    }, [updatePost])

    const handleChangeStatus = async (status, postId) => {
        try{
            const response = await changePostStatus(status, postId);
            if(response === "Change Post's Status Successfully!") setUpdatePost(prev => !prev);
        }catch(error){
            console.log(error);
        }
    }

    const handleEditPostButton = async (post) => {
        try{
            const postDetail = await getPostDetail(post.postDetailSummaryDTO.id);
            setCurrentEditingPost({post, postDetail});
            setEditPost(true);
        }catch(error) {
            console.log(error);
        }
    }

    const handleDeletePost = async (postId) => {
        try{
            const response = await deletePost(postId);
            if(response !== "Post deleted successfully!") alert("Có lỗi xảy ra");
            else setPosts(posts.filter(p => p.id !== postId));
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className="invisible-posts-container">
            {posts.length > 0 ? (
                <React.Fragment>
                    {posts.slice(startIndex, endIndex).map((post, index) => (
                        <div className="invisible-posts-post" key={index}>
                            <img src={post.thumbnailURL} className="post-img"/>
                            <div className="invisible-posts-post-information">
                                <p className="title">{post.title}</p>
                                <button className="delete-button">
                                    <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDeletePost(post.id)}/>
                                </button>
                                <button className="edit-button">
                                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEditPostButton(post)}/>
                                </button>
                                <div className="post-price-area">
                                    <p id="invisible-posts-post-price">{post.postDetailSummaryDTO.price} triệu/tháng</p>
                                    <p id="invisible-posts-post-area">{post.postDetailSummaryDTO.area}m&sup2;</p>
                                </div>
                                <p className="post-description">
                                    {post.description.replace(/<br\s*\/?>/gi, ' ')}
                                </p>
                                <div className="post-location-time">
                                    <div className="post-location-time-sub">
                                        <img src="../../../public/saved-posts-icon/location.png"/>
                                        <p id="invisible-posts-post-location">{post.addressDTO}</p>
                                    </div>
                                    <div className="post-location-time-sub">
                                        <img src="../../../public/saved-posts-icon/clock.png"/>
                                        <p id="invisible-posts-post-time">{post.updatedAt ? post.updatedAt : post.createdAt}</p>
                                    </div>
                                </div>
                                <button className="invisible-button" onClick={() => handleChangeStatus("ENABLED", post.id)}>Đã ẩn</button>
                            </div>
                        </div>
                    ))}
                    <TablePagination dataLength={posts.length} currentPageIndex={currentPageIndex} setStartIndex={setStartIndex} setEndIndex={setEndIndex} storageName="postManageDisablePostIndex"/>
                </React.Fragment>
            ) : (
                <div className="no-data-found-container">
                    <NoDataFound/>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
