import React, {useEffect, useState} from 'react';
import Pagination from '../TablePagination.jsx';
import {getDisablePostsByUserId} from "../../apiServices/post.js";

const MyComponent = ({userId, setDisablePostLength}) => {
    let storedPageIndex = JSON.parse(localStorage.getItem("disablePostsPage"))
    let currentPageIndex = storedPageIndex ? storedPageIndex : 0;
    const [postLength, setPostLength] = useState();
    const [posts, setPosts] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getDisablePostsByUserId(userId);
                setPosts(response);
                setDisablePostLength(response.length);
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
                    {posts.slice(startIndex, endIndex).map(post => (
                        <div className="user-page-post-disabled">
                            <img src={post.thumbnailURL}/>
                            <div className="disable-post-information">
                                <h2>{post.title}</h2>
                                <p>{post.description.replace(/<br\s*\/?>/gi, ' ')}</p>
                                <div className="post-time">
                                    <img src="../../../public/user-page-icon/clock.png"/>
                                    <p id="user-page-post-time">{post.updatedAt ? post.updatedAt : post.createdAt}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Pagination data={posts} dataLength={posts.length} setStartIndex={setStartIndex} setEndIndex={setEndIndex} storageName="disablePostsPage" currentPageIndex={currentPageIndex}/>
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
