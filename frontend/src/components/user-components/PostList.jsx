import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../css/user-css/PostList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart as redHeart, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {getPostsByCriteria} from '../../apiServices/post.js';
import {getCities, getDistrictsByCity} from '../../apiServices/address.js';
import FavouritePostContext from "../../contexts/FavouritePostContext.jsx";
import {faHeart as normalHeart} from "@fortawesome/free-regular-svg-icons";
import AuthContext from "../../contexts/AuthContext.jsx";
import BackendPaginationUI from "./BackendPaginationUI.jsx";
import {useDebounce} from "../../hooks/useDebounce.js";
import {addressFormat} from "../../utils/format.js";

const MyComponent = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { heartButtonHandle, favouritePostIds } = useContext(FavouritePostContext);
    const [posts, setPosts] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [selectedFurniture, setSelectedFurniture] = useState("");
    const [selectedSortCondition, setSelectedSortCondition] = useState("")
    const [searchInput, setSearchInput] = useState("");
    const searchDebounce = useDebounce(searchInput, 500);
    const [showDropdown, setShowDropdown] = useState(false);
    const [addressChoices, setAddressChoices] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const scrollToTop = useRef(null);
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
     const sortOptions  = [
         { label: "Tin mới nhất", value: "normal" },
         { label: "Giá tăng dần", value: "price asc" },
         { label: "Giá giảm dần", value: "price desc" },
         { label: "Diện tích tăng dần", value: "area asc" },
         { label: "Diện tích giảm dần", value: "area desc" },
         { label: "Đăng đã lâu", value: "createdAt asc " }
     ]
    const [cityOptions, setCityOptions] = useState([]);
    const totalLength = useRef(0);

    useEffect(() => {
        const fetchCity = async () => {
            return await getCities();
        }
        fetchCity().then(response => setCityOptions(response));
        const selectedSortCondition = localStorage.getItem("selectedSortCondition");
        const selectedPrice = localStorage.getItem("selectedPrice");
        const selectedArea = localStorage.getItem("selectedArea");
        const selectedFurniture = localStorage.getItem("selectedFurniture");
        if(selectedSortCondition) setSelectedSortCondition(selectedSortCondition);
        if(selectedPrice) setSelectedPrice(selectedPrice);
        if(selectedArea) setSelectedArea(selectedArea);
        if(selectedFurniture) setSelectedFurniture(selectedFurniture);
        return () => {
            localStorage.removeItem("selectedSortCondition");
            localStorage.removeItem("selectedPrice");
            localStorage.removeItem("selectedArea");
            localStorage.removeItem("selectedFurniture");
        }
    }, []);

    useEffect(() => {

    }, [searchDebounce]);

    useEffect(() => {
        if(scrollToTop.current) {
            scrollToTop.current.scrollIntoView({ behavior: "smooth" });
        }
        const paramsObject = Object.fromEntries(searchParams.entries());
        const fetchPosts = async () => {
            const response = await getPostsByCriteria(paramsObject);
            setPosts(response.posts);
            totalLength.current = response.totalLength;
        }
        fetchPosts();
    }, [location.search]);

    const updateSearchParams = (listParam) => {
        if(searchParams.get("pageNumber") === "1") deleteSearchParams("pageNumber");
        listParam.map((item) => {
            searchParams.set(item.param, item.value);
        })
        navigate(`?${searchParams.toString()}`);
    }

    const deleteSearchParams = (param) => {
        searchParams.delete(param);
        navigate(`?${searchParams.toString()}`);
    }

    const handleFurnitureParam = (value) => {
        if (selectedFurniture === value) {
            setSelectedFurniture("");
            localStorage.removeItem("selectedFurniture");
            deleteSearchParams("furniture");
        }else{
            setSelectedFurniture(value);
            localStorage.setItem("selectedFurniture", value);
            updateSearchParams([{
                param: "furniture",
                value: value
            }])
        }
    }

    const handleAreaParam = (value) => {
        if (selectedArea === value) {
            setSelectedArea("");
            localStorage.removeItem("selectedArea");
            deleteSearchParams("minArea");
            deleteSearchParams("maxArea");
        }else{
            setSelectedArea(value);
            let minArea = 0;
            let maxArea  = 0;
            localStorage.setItem("selectedArea", value);
            if(value === "50") minArea = 50;
            else {
                const tmp = value.split("-");
                minArea = tmp[0];
                maxArea = tmp[1];
            }
            updateSearchParams([{
                param: "minArea",
                value: minArea
            }, {
                param: "maxArea",
                value: maxArea
            }])
        }
    }

    const handlePriceParam = (value) => {
        if (selectedPrice === value) {
            setSelectedPrice("");
            localStorage.removeItem("selectedPrice");
            deleteSearchParams("price");
        }else{
            setSelectedPrice(value);
            let minPrice = 0;
            let maxPrice = 0;
            localStorage.setItem("selectedPrice", value);
            if(value === "9") minPrice = 9;
            else {
                const tmp = value.split("-");
                minPrice = tmp[0];
                maxPrice = tmp[1];
            }
            updateSearchParams([{
                param: "minPrice",
                value: minPrice
            },{
                param: "maxPrice",
                value: maxPrice
            }])
        }
    }

    return (
        <div className="list-container" onClick={() => setShowDropdown(false)}>
            <div className="list-container-left">
                <div className="list-search-container">
                    <div className="list-search-bounding">
                        <img src="../../../public/list-icon/search.png"/>
                        <input type="text"
                               value={searchInput}
                               id="list-search-input"
                               onChange={(e) => setSearchInput(e.currentTarget.value)}
                               onClick={(e) => {
                                   e.stopPropagation();
                                   setShowDropdown(true);
                               }}
                               placeholder="Nhập địa chỉ. Ví dụ: Ngách 16, 278 Kim Giang, Hoàng Mai"
                        />
                        <select
                            value={selectedCity === "" ? "Tất cả" : cityOptions.find(city => (city.id === selectedCity)?.name)}
                            id="list-search-city-bounding"
                        >
                            <option value="">Tất cả</option>
                            {cityOptions && cityOptions.map(city => (
                                <option
                                    key={city.id}
                                    value={city.id}
                                    onClick={async () => {
                                        setSelectedCity(city.id);
                                        const response = await getDistrictsByCity(city.id);
                                        const districts = response.map(district =>  {
                                            return {
                                                detail: "",
                                                ward: "",
                                                district: district.name,
                                                city: city.name,
                                            }
                                        })
                                        setAddressChoices(districts);
                                    }}
                                >{city.name}</option>
                            ))}
                        </select>
                        {showDropdown && (
                            <div className="available-addresses">
                                {addressChoices.map((address, index) =>
                                    <div
                                        className="address-text"
                                        key={index}
                                        onClick={() => updateSearchParams([{
                                            param: "detail",
                                            value: address.detail
                                        }, {
                                            param: "ward",
                                            value: address.ward
                                        }, {
                                            param: "district",
                                            value: address.district
                                        }, {
                                            param: "city",
                                            value: address.city
                                        }])}
                                    >
                                        <FontAwesomeIcon icon={faLocationDot}/>
                                        {addressFormat(address)}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="list-search-criteria">
                        <div className="filter">
                            <img src="../../../public/list-icon/filter.png"/>
                            <p>Lọc</p>
                        </div>
                            <select
                                className="criteria"
                                value={selectedPrice}
                                onChange={(e) => handlePriceParam(e.target.value)}
                            >
                                <option value="" hidden>
                                    {selectedPrice
                                        ? (priceOptions.find(opt => opt.value === selectedPrice)?.label)
                                        : "Tầm giá"}
                                </option>
                                {priceOptions.map(option => (
                                    <option
                                        value={option.value}
                                        key={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        <select
                            className="criteria"
                            value={selectedArea}
                            onChange={(e) => handleAreaParam(e.target.value)}
                        >
                            <option value="" hidden>
                                {selectedArea
                                    ? (areaOptions.find(opt => opt.value === selectedArea)?.label)
                                    : "Diện tích"}
                            </option>
                            {areaOptions.map(option => (
                                <option
                                    value={option.value}
                                    key={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <select
                            className="criteria"
                            value={selectedFurniture}
                            onChange={(e) => handleFurnitureParam(e.target.value)}
                        >
                            <option value="" hidden>
                                {selectedFurniture
                                    ? (furnitureOptions.find(opt => opt.value === selectedFurniture)?.label)
                                    : "Tình trạng nội thất"}
                            </option>
                            {furnitureOptions.map(option => (
                                <option
                                    value={option.value}
                                    key={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div ref={scrollToTop}></div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
                    <h2 style={{marginBottom: "10px", fontSize: "30px"}}>Tổng số: <span style={{color: "#008CFF"}}>{totalLength.current} tin</span></h2>
                    <select
                        className="select"
                        value={selectedSortCondition}
                        onChange={(e) => {
                            const value = e.target.value;
                            if(value === "normal") {
                                setSelectedSortCondition(value);
                                localStorage.removeItem("selectedSortCondition");
                                deleteSearchParams("sortCondition");
                            }else{
                                setSelectedSortCondition(value);
                                localStorage.setItem("selectedSortCondition", value);
                                updateSearchParams([{
                                    param: "sortCondition",
                                    value: value
                                }])
                            }
                        }}
                    >
                        {sortOptions.map(option => (
                            <option
                                value={option.value}
                                key={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="list-posts-container">
                    {posts && posts.map((post, index) => (
                        <Link to={`/detail/${post.id}`} key={index} className="list-post">
                            <img src={post.thumbnailURL}/>
                            <div className="list-post-information">
                                <h2>{post.title}</h2>
                                <div className="list-post-price-area">
                                    <p id="list-post-price">{post.postDetailSummaryDTO.price} tr/tháng</p>
                                    <p id="list-post-area">{post.postDetailSummaryDTO.area}m&sup2;</p>
                                </div>
                                <p id="list-post-description">
                                    {post.description.replace(/<br\s*\/?>/gi, ' ')}
                                </p>
                                <div className="list-post-location-time-save">
                                    <div className="list-post-location-time">
                                        <div className="list-post-location-container">
                                            <img src="../../../public/list-icon/location-black.png"/>
                                            <p id="list-post-location">{post.addressDTO}</p>
                                        </div>
                                        <div className="list-post-time-container">
                                            <img src="../../../public/list-icon/clock.png"/>
                                            <p id="list-post-time">{post.updatedAt ? post.updatedAt : post.createdAt}</p>
                                        </div>
                                    </div>
                                    {(user === null || post.userId !== user.id) && (
                                        <div className="list-post-save" onClick={(e) => {
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
                            </div>
                        </Link>
                    ))}
                </div>
                <BackendPaginationUI currentPage={searchParams.get("pageNumber") ? Number(searchParams.get("pageNumber")) : 1} updateSearchParams={updateSearchParams} deleteSearchParams={deleteSearchParams} totalLength={totalLength.current} pageSize={4}/>
            </div>
            <div className="list-container-right">
                <div className="side-criteria">
                    <h2>Lọc theo khoảng giá</h2>
                    {priceOptions.map(option => (
                        <p className={option.value === selectedPrice ? "selected" : ""} key={option.value} style={{ cursor: 'pointer' }} onClick={() => {
                            handlePriceParam(option.value);
                        }}>
                            {option.label}
                        </p>
                    ))}
                </div>
                <div className="side-criteria">
                    <h2>Lọc theo diện tích</h2>
                    {areaOptions.map((option) => (
                        <p className={option.value === selectedArea ? "selected" : ""} key={option.value} style={{ cursor: 'pointer' }} onClick={() => {
                            handleAreaParam(option.value);
                        }}>
                            {option.label}
                        </p>
                    ))}
                </div>
                <div className="side-criteria">
                    <h2>Lọc theo tình trạng nội thất</h2>
                    {furnitureOptions.map(option => (
                        <p className={option.value === selectedFurniture ? "selected" : ""} key={option.value} style={{ cursor: 'pointer' }} onClick={() => {
                            handleFurnitureParam(option.value);
                        }}>
                            {option.label}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
