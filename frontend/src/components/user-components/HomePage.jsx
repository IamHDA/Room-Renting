import React, {useContext, useEffect, useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLocationDot, faMagnifyingGlass, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faHeart as redHeart } from "@fortawesome/free-solid-svg-icons";
import {faHeart as normalHeart } from "@fortawesome/free-regular-svg-icons";
import '../../css/user-css/HomePage.css';
import {Link, useNavigate} from "react-router-dom";
import {getNewPosts} from '../../apiServices/post.js';
import AuthContext from "../../contexts/AuthContext.jsx";
import {priceFormat} from "../../utils/format.js";
import FavouritePostContext from "../../contexts/FavouritePostContext.jsx";
import {useDebounce} from "../../hooks/useDebounce.js";
import {searchAddress} from "../../apiServices/address.js";


const MyComponent = () => {
    const searchParamRef = useRef(new URLSearchParams());
    const navigate = useNavigate();
    const [newPosts, setNewPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useContext(AuthContext);
    const [search, setSearch] = useState("");
    const searchDebounce = useDebounce(search, 500);
    const [addressesDropdown, setAddressesDropdown] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const { heartButtonHandle, favouritePostIds } = useContext(FavouritePostContext);
    const cityRef = useRef("Hà Nội");
    const dropDownRef = useRef(null);
    const areaOptions = [
        { label: "Dưới 20 m²", value: "0-20" },
        { label: "20 - 30 m²", value: "20-30" },
        { label: "30 - 40 m²", value: "30-40" },
        { label: "40 - 50 m²", value: "40-50" },
        { label: "Trên 50 m²", value: "50" },
    ];
    const priceOptions = [
        { label: "Dưới 1 triệu", value: "0-1"},
        { label: "Giá 1 - 3 triệu", value: "1-3"},
        { label: "Giá 3 - 5 triệu", value: "3-5"},
        { label: "Giá 5 - 7 triệu", value: "5-7"},
        { label: "Giá 7 - 9 triệu", value: "7-9"},
        { label: "Trên 9 triệu", value: "9"}
    ]
    const furnitureOptions = [
        { label: "Nội thất cao cấp", value: "Cap cấp" },
        { label: "Nội thất đầy đủ", value: "Đầy đủ" },
        { label: "Không có nội thất", value: "Không có" }
    ]


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
            setLoading(false);
        }
        fetchData();
    }, [user]);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await searchAddress(search, cityRef.current);
                setSearchResult(response);
                searchParamRef.current.set("city", "Hà Nội");
            }catch (e){
                console.log(e);
            }
        }
        fetchAddress();
    }, [searchDebounce]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setAddressesDropdown(false);
            }
        };

        if (addressesDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [addressesDropdown]);

    const showAddress = (address) => {
        let res = "";
        if(address.detail) res += address.detail + ", ";
        if(address.wardName) res += address.wardName + ", ";
        if(address.districtName) res += address.districtName + ", ";
        if(address.cityName) res += address.cityName;
        return res;
    }

    const handleOptions = (options) => {
        options.forEach((item) => {
            if (item.value !== "") {
                searchParamRef.current.set(item.name, item.value);
            } else {
                searchParamRef.current.delete(item.name);
            }
        });
    }

    return (
        <div>
            <div className="search-container">
                <div className="search-bounding">
                    <div className="upper">
                        <FontAwesomeIcon icon={faLocationDot} className="location-icon"/>
                        <select className="city-selector" onChange={(e) => {
                            cityRef.current = e.target.value;
                            searchParamRef.current.set("city", e.target.value);
                        }}>
                            <option>Hà Nội</option>
                            <option>Hồ Chí Minh</option>
                        </select>
                        <img src="../../../public/homePage-icon/pipe.png" className="pipe"/>
                        <div className="search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Nhập địa điểm. Ví dụ: Đại Kim, Hoàng Mai"
                                value={search}
                                onClick={() => setAddressesDropdown(true)}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {addressesDropdown && (
                                <div
                                    ref={dropDownRef}
                                    style={{
                                        position: "absolute",
                                        top: "90%",
                                        left: "0",
                                        right: "0",
                                        display: "flex",
                                        flexDirection: "column",
                                        padding: "20px",
                                        maxHeight: "200px",
                                        overflowY: "auto",
                                        zIndex: "100",
                                        backgroundColor: "white",
                                        borderBottomRightRadius: "10px",
                                        borderBottomLeftRadius: "10px",
                                    }}
                                >
                                    {searchResult.map((address, index) => (
                                        <div
                                            key={index}
                                            className="address-choice"
                                        >
                                            <FontAwesomeIcon icon={faLocationDot} />
                                            <p onClick={() => {
                                                searchParamRef.current.set("ward", address.wardName);
                                                searchParamRef.current.set("district", address.districtName);
                                                searchParamRef.current.set("city", address.cityName);
                                                setAddressesDropdown(false);
                                                setSearch(showAddress(address));
                                            }}
                                            >
                                                {showAddress(address)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div
                            className="search-button"
                            onClick={() => {
                                navigate(`/list?${searchParamRef.current.toString()}`);
                            }}
                        >
                            Tìm kiếm
                        </div>
                    </div>
                    <div className="lower">
                        <div className="price">
                            <select
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const values = value.split("-");
                                    localStorage.setItem("selectedPrice", value);
                                    handleOptions([
                                        {name: "minPrice", value: values[0]},
                                        {name: "maxPrice", value: values[1]},
                                    ])}
                                }
                            >
                                <option hidden value="">Mức giá</option>
                                {priceOptions.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="area">
                            <select
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const values = value.split("-");
                                    localStorage.setItem("selectedArea", value);
                                    handleOptions([
                                        {name: "minArea", value: values[0]},
                                        {name: "maxArea", value: values[1]},
                                    ])}
                                }
                            >
                                <option hidden value="">Diện tích</option>
                                {areaOptions.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="furniture">
                            <select
                                onChange={(e) => {
                                    const value = e.target.value;
                                    localStorage.setItem("selectedFurniture", value);
                                    handleOptions([{name: "furniture", value: value}])
                                }}
                            >
                                <option hidden value="">Nội thất</option>
                                {furnitureOptions.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
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
