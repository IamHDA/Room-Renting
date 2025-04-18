import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {getEnablePostsByUserId} from "../../apiServices/post.js";

const MyComponent = ({ toggleEditPost, userId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getEnablePostsByUserId(userId);
                setPosts(response);
                // setEnablePostLength(response.length);
                // setPostLength(response.length);
            }catch(error) {
                console.log(error);
            }
        }
        fetchPosts();
    }, [])

    return (
        <div className="visible-posts-container">
            {posts.length > 0 && posts.map((post, index) => (
                <div className="visible-posts-post" key={index}>
                    <img src={post.thumbnailURL} className="post-img"/>
                    <div className="visible-posts-post-information">
                        <p className="title">{post.title}</p>
                        <button className="delete-button">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                        <button className="edit-button">
                            <FontAwesomeIcon icon={faPenToSquare} onClick={toggleEditPost}/>
                        </button>
                        <div className="post-price-area">
                            <p id="visible-posts-post-price">{post.postDetailSummaryDTO.price} triệu/tháng</p>
                            <p id="visible-posts-post-area">{post.postDetailSummaryDTO.area}m&sup2;</p>
                        </div>
                        <p className="post-description">
                            {post.description.replace(/<br\s*\/?>/gi, ' ')}
                        </p>
                        <div className="post-location-time">
                            <div className="post-location-time-sub">
                                <img src="../../../public/saved-posts-icon/location.png"/>
                                <p id="visible-posts-post-location">{post.addressDTO}</p>
                            </div>
                            <div className="post-location-time-sub">
                                <img src="../../../public/saved-posts-icon/clock.png"/>
                                <p id="visible-posts-post-time">{post.updatedAt ? post.updatedAt : post.createdAt}</p>
                            </div>
                        </div>
                        <button className="visible-button">Hiển thị</button>
                    </div>
                </div>
            ))}
            {/*<Pagination/>*/}
        </div>
    );
};

export default MyComponent;
