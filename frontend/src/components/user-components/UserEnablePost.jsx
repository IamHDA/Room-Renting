import React, {useEffect, useState} from 'react';
import {getEnablePostsByUserId} from "../../apiServices/post.js";
import Pagination from './TablePagination.jsx'
import {Link} from "react-router-dom";

const MyComponent = ({userId, setEnablePostLength}) => {
    let storedPageIndex = JSON.parse(localStorage.getItem("enablePostsPage"))
    let currentPageIndex = storedPageIndex ? storedPageIndex : 0;
    const [postLength, setPostLength] = useState();
    const [posts, setPosts] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getEnablePostsByUserId(userId);
                setPosts(response);
                setEnablePostLength(response.length);
                setPostLength(response.length);
            }catch(error) {
                console.log(error);
            }
        }
        fetchPosts();
    }, [userId])

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {postLength > 0 ? (
                <>
                    {posts.slice(startIndex, endIndex).map((post, index) => (
                        <Link to={`/detail/${post.id}`} key={index} className="user-page-post">
                            <img src={post.thumbnailURL} className="post-img"/>
                            <div className="user-page-post-information">
                                <p className="title">{post.title}</p>
                                <div className="post-price-area">
                                    <p id="user-page-post-price">{post.postDetailSummaryDTO.price} tr/tháng</p>
                                    <p id="user-page-post-area">{post.postDetailSummaryDTO.area}m&sup2;</p>
                                </div>
                                <div className="post-location-time">
                                    <div className="post-location-time-sub">
                                        <img src="../../../public/user-page-icon/location.png"/>
                                        <p id="user-page-post-location">{post.addressDTO}</p>
                                    </div>
                                    <div className="post-location-time-sub">
                                        <img src="../../../public/user-page-icon/clock.png"/>
                                        <p id="user-page-post-time">{post.updatedAt ? post.updatedAt : post.createdAt}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <Pagination data={posts} dataLength={posts.length} setStartIndex={setStartIndex} setEndIndex={setEndIndex} storageName="enablePostsPage" currentPageIndex={currentPageIndex}/>
                </>
            ) : (
                <div className="user-page-posts-empty">
                    <h2>Không có tin đăng nào</h2>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
