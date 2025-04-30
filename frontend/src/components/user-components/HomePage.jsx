import React, {useContext, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLocationDot, faAngleDown, faMagnifyingGlass, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faHeart as redHeart } from "@fortawesome/free-solid-svg-icons";
import {faHeart as normalHeart } from "@fortawesome/free-regular-svg-icons";
import '../../css/user-css/HomePage.css';
import {Link} from "react-router-dom";
import {getNewPosts} from '../../apiServices/post.js';
import {getCurrentAccount} from '../../apiServices/account.js';
import {getFavouritePostsIdByUser} from '../../apiServices/favouritePost.js';
import AuthContext from "../../contexts/AuthContext.jsx";
import {priceFormat} from "../../utils/format.js";
import FavouritePostContext from "../../contexts/FavouritePostContext.jsx";


const MyComponent = () => {
    const [newPosts, setNewPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);
    const { heartButtonHandle, setFavouritePostIds, favouritePostIds } = useContext(FavouritePostContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const tmpPosts = localStorage.getItem("posts");
            if(tmpPosts) setNewPosts(JSON.parse(tmpPosts));
            else{
                try{
                    const response = await getNewPosts();
                    setNewPosts(response);
                }catch(e){
                    console.log(e);
                }
            }
            if(user){
                const tmpFav = localStorage.getItem("favouritePostsId");
                if(tmpFav) setFavouritePostIds(JSON.parse(tmpFav));
                else{
                    try {
                        const response = await getFavouritePostsIdByUser();
                        localStorage.setItem("favouritePostsId", JSON.stringify(response));
                        setFavouritePostIds(response);
                    }catch(e){
                        console.log(e);
                    }
                }
            } else {
                setFavouritePostIds([]);
            }
            setLoading(false);
        }

        fetchData();
    }, [user]);

    return (
        <div>
            <div className="search-container">
                <div className="search-bounding">
                    <div className="upper">
                        <div className="city-selector">
                            <FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
                            <p>Thành phố</p>
                            <FontAwesomeIcon icon={faAngleDown} className="arrow-down-icon"/>
                            <img src="../../../public/homePage-icon/pipe.png" className="pipe"/>
                        </div>
                        <div className="search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                            <input className="search-input" type="text" placeholder="Nhập địa điểm. Ví dụ: Đại Kim, Hoàng Mai"/>
                        </div>
                        <div className="search-button">Tìm kiếm</div>
                    </div>
                    <div className="lower">
                        <div className="price">
                            <p>Mức giá</p>
                            <FontAwesomeIcon icon={faAngleDown} className="arrow-down-icon"/>
                        </div>
                        <div className="area">
                            <p>Diện tích</p>
                            <FontAwesomeIcon icon={faAngleDown} className="arrow-down-icon"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="posts-container">
                <h1>Tin đăng mới nhất</h1>
                {!loading && (
                    <div className="post-grid">
                        {newPosts.map((post, index) => (
                            <Link to={`/detail/${post.id}`} className="post-container" key={index}>
                                <img src={post.thumbnailURL} className="post-image"/>
                                <h2 className="post-title">{post.title}</h2>
                                <div className="post-price-and-area">
                                    <p className="post-price"><span>{priceFormat(post.postDetailSummaryDTO.price)}</span> triệu/tháng</p>
                                    <p className="post-area">{post.postDetailSummaryDTO.area.toString()}m&sup2;</p>
                                </div>
                                <div className="post-location-time-save">
                                    <div className="post-location-time">
                                        <div className="post-location">
                                            <img src="../../../public/homePage-icon/location-black.png" className="post-location-icon"/>
                                            <p className="location">{post.addressDTO}</p>
                                        </div>
                                        <div className="post-time">
                                            <img src="../../../public/homePage-icon/clock.png" className="post-time-icon"/>
                                            <p className="time">{post.updatedAt !== null ? post.updatedAt : post.createdAt}</p>
                                        </div>
                                    </div>
                                    {(user === null || post.userId !== user.id) && (
                                        <div className="post-save" onClick={(e) => {
                                            e.preventDefault();
                                            heartButtonHandle(post.id);
                                        }}>
                                            {!favouritePostIds.includes(post.id) ?
                                                    <FontAwesomeIcon icon={normalHeart} style={{fontSize: '30px', color: 'black'}}/>:
                                                    <FontAwesomeIcon icon={redHeart} style={{fontSize: '30px', color: "#ed333b"}}/>
                                            }
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                <div className="showmore">
                    <Link to="/list" className="showmore-text">
                        <FontAwesomeIcon icon={faArrowLeft} className="arrow-left"/>
                        Xem thêm
                        <FontAwesomeIcon icon={faArrowRight} className="arrow-right"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
