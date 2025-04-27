import React, {useContext, useState} from 'react';
import {useLocation} from 'react-router-dom';
import '../../css/user-css/PostManage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCamera,
    faImage,
    faAngleRight,
    faAngleDown,
    faX,
    faXmark, faPlus,
} from "@fortawesome/free-solid-svg-icons";
import * as postManageService from "../../apiServices/post.js";
import AddressContext from "../../contexts/AddressContext.jsx";
import PostManageEnablePost from "./PostManageEnablePost.jsx";
import PostManageDisablePost from "./PostManageDisablePost.jsx";

const MyComponent = () => {
    const {allCities, allDistricts, allWards, fetchDistrictsByCity, fetchWardsByDistrict, setAllWards, setAllDistricts} = useContext(AddressContext);
    const location = useLocation();
    const isPost = location.state?.toManage;
    const userId = location.state?.userId;
    const [isSelected, setIsSelected] = useState(isPost);
    const [pickAddressPopUp, setPickAddressPopUp] = useState(false);
    const [pickAddress, setPickAddress] = useState(2);
    const [isVisiblePosts, setIsVisiblePosts] = useState(true);
    const [editPost, setEditPost] = useState(false);
    const [selectedFurniture, setSelectedFurniture] = useState("");
    const [showFurnitureOption, setShowFurnitureOption] = useState(false);
    const [imageList, setImageList] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [currentEditingPost, setCurrentEditingPost] = useState(null);

    const togglePickAddress = async (num) => {
        if(pickAddress === num) setPickAddress(2);
        else setPickAddress(num);
    }

    const togglePickAddressPopUp = () => {
        setPickAddressPopUp(!pickAddressPopUp);
        setAllWards(null);
        setAllDistricts(null);
    }

    const handleSubmitAddressButton = () => {
        let detail = document.getElementById("address-detail-input").value;
        localStorage.setItem("addressDetail", detail);
        let ward = document.getElementById("choose-address-ward").innerText;
        let district = document.getElementById("choose-address-district").innerText;
        let city = document.getElementById("choose-address-city").innerText;
        togglePickAddressPopUp();
        document.getElementById("show-address").innerHTML = city + ", " + district + ", " + ward + (detail ? ", " + detail : "");
    }

    const handleFurnitureOption = (e) => {
        e.stopPropagation();
        setSelectedFurniture(e.target.innerText);
        setShowFurnitureOption(false)
    }

    const handleSubmitPostButton = async () => {
        const title = document.getElementById("post-create-title").value;
        const area = document.getElementById("post-create-area").value;
        const address = document.getElementById("show-address").value;
        const images = imageList;
        const videos = videoList;
        const imagesLength = images.length;
        const videosLength = videos.length;
        if(imagesLength < 3) alert("Đăng ít nhất 3 ảnh");
        else if(title === "" || area === "" || address === "") alert("Vui lòng điền những thông tin quan trọng")
        else{
            const formData = new FormData();
            for(const file of images){
                formData.append("file", file);
            }
            if(videosLength > 0){
                for(const file of videos){
                    formData.append("file", file);
                }
            }
            const postCreateRequest = {
                addressDTO: {
                    detail : localStorage.getItem("addressDetail"),
                    wardId : localStorage.getItem("wardId")
                },
                createPostDTO: {
                    title : title,
                    description : document.getElementById("post-create-description").value,
                    price : document.getElementById("post-create-price").value,
                    area : area,
                    bedroom : document.getElementById("post-create-bedroom").value,
                    bathroom : document.getElementById("post-create-bathroom").value,
                    water : document.getElementById("post-create-water").value,
                    electric: document.getElementById("post-create-electric").value,
                    parking : document.getElementById("post-create-parking").value,
                    wifi : document.getElementById("post-create-internet").value,
                    security: document.getElementById("post-create-security").value,
                    furniture: document.getElementById("post-create-furniture").value
                }
            };
            const jsonBlob = new Blob([JSON.stringify(postCreateRequest)], {
                type: 'application/json'
            });
            formData.append("post", jsonBlob);
            const response = await postManageService.createPost(formData);
            if (response === "Post created"){
                alert("Đã đăng thành công");
                window.location.reload();
            }
            else {
                alert("Đã xảy ra lỗi");
            }
        }
    }

    return (
        <div className="post-manage-body">
            { (pickAddressPopUp || editPost) && <div className="curtain"></div>}
            <div className="post-manage-container">
                <div className="switcher">
                    <button className={!isSelected ? "is-selected" : ""} onClick={() => setIsSelected(false)}>Đăng tin</button>
                    <button className={isSelected ? "is-selected" : ""} onClick={() => setIsSelected(true)}>Quản lý tin</button>
                </div>
                {!isSelected ? (
                    <>
                        {pickAddressPopUp && (
                            <div className="choose-address-pop-up">
                                <div className="choose-address-pop-up-container">
                                    <FontAwesomeIcon icon={faXmark} className="close" onClick={togglePickAddressPopUp} />
                                    <h1 id = "address-input">Địa chỉ</h1>
                                    <button className="bounding" onClick={() => togglePickAddress(1)}>
                                        <p id="choose-address-city">Tỉnh, Thành phố</p>
                                        <FontAwesomeIcon icon={faAngleDown} style={{fontSize: "30px"}}/>
                                        {pickAddress === 1 && (
                                            <div className="address-choice-dropdown">
                                                {allCities.map((city, index) => (
                                                    <p key={index} onClick={async () => {
                                                        await fetchDistrictsByCity(city.id);
                                                        document.getElementById('choose-address-city').innerText = city.name;
                                                        document.getElementById('choose-address-district').innerText = "Quận, Huyện, Thị Xã";
                                                        togglePickAddress(2);
                                                    }}>{city.name}</p>
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                    <button className="bounding" onClick={() => togglePickAddress(0)}>
                                        <p id="choose-address-district">Quận, Huyện, Thị Xã</p>
                                        <FontAwesomeIcon icon={faAngleDown} style={{fontSize: "30px"}}/>
                                        {pickAddress === 0 && (
                                            <div className="address-choice-dropdown">
                                                {allDistricts && allDistricts.map((district, index) => (
                                                    <p key={index} onClick={async () => {
                                                        await fetchWardsByDistrict(district.id);
                                                        document.getElementById('choose-address-district').innerText = district.name;
                                                        document.getElementById('choose-address-ward').innerText = "Phường, Xã, Thị trấn";
                                                        togglePickAddress(2);
                                                    }}>{district.name}</p>
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                    <button className="bounding" onClick={() => togglePickAddress(-1)}>
                                        <p id="choose-address-ward">Phường, Xã, Thị trấn</p>
                                        <FontAwesomeIcon icon={faAngleDown} style={{fontSize: "30px"}}/>
                                        {pickAddress === -1 && (
                                            <div className="address-choice-dropdown">
                                                {allWards && allWards.map((ward, index) => (
                                                    <p key={index} onClick={() => {
                                                        document.getElementById('choose-address-ward').innerText = ward.name;
                                                        localStorage.setItem("wardId", ward.id);
                                                        togglePickAddress(2);
                                                    }} id="ward-selection">{ward.name}</p>
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                    <button className="bounding">
                                        <input type="text" placeholder="Địa chỉ cụ thể" id="address-detail-input"/>
                                    </button>
                                    <button className="confirm-button" onClick={handleSubmitAddressButton}>
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="post-create-main-content">
                            <div className="left">
                                <h1>Hình ảnh và Video</h1>
                                <form id="uploadForm" encType="multipart/form-data">
                                    <div className="upload-container">
                                        <div className="container">
                                            {imageList.length === 0 ? (
                                                    <label   className="upload-box">
                                                        <FontAwesomeIcon icon={faImage} style={{fontSize: "50px"}}/>
                                                        <p>Đăng từ <strong>03 - 12</strong> hình</p>
                                                        <input
                                                            type="file"
                                                            id="imageUpload"
                                                            name="images"
                                                            accept="image/*"
                                                            multiple
                                                            hidden
                                                            onChange={(e) => setImageList([...e.target.files])}
                                                        />
                                                    </label>
                                            ) : (
                                                <div className="post-media-grid">
                                                    <label htmlFor="imageUpload" className="small-upload-box">
                                                        <FontAwesomeIcon icon={faPlus} />
                                                        <input
                                                            type="file"
                                                            id="imageUpload"
                                                            name="images"
                                                            accept="image/*"
                                                            multiple
                                                            hidden
                                                            onChange={(e) => setImageList(prev => [...prev, ...e.target.files])}
                                                        />
                                                    </label>
                                                    {imageList.map((image, index) => (
                                                        <div className="media-container" key={`container-${index}`}>
                                                            <img src={URL.createObjectURL(image)}
                                                                 alt=""
                                                                 key={index}
                                                                 style={{ maxWidth: "70px" , maxHeight: "70px", border: "1px solid lightgray" }}
                                                            />
                                                            <div className="delete-container" key={index + imageList.length} onClick={() => setImageList(prev => prev.filter((_, i) => i !== index))}>
                                                                <FontAwesomeIcon icon={faXmark} style={{fontSize: "15px", color: "white"}}/>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="container">
                                            {videoList.length === 0 ? (
                                                <label htmlFor="videoUpload" className="upload-box">
                                                    <FontAwesomeIcon icon={faCamera} style={{fontSize: "50px"}}/>
                                                    <p>Đăng thêm <strong className="highlight">video</strong> để bán nhanh hơn</p>
                                                    <input
                                                        type="file"
                                                        id="videoUpload"
                                                        name="video"
                                                        accept="video/*"
                                                        multiple
                                                        hidden
                                                        onChange = {(e) => setVideoList([...e.target.files])}
                                                    />
                                                </label>
                                            ) : (
                                                <div className="post-media-grid">
                                                    <label htmlFor="videoUpload" className="small-upload-box">
                                                        <FontAwesomeIcon icon={faPlus} />
                                                        <input
                                                            type="file"
                                                            id="videoUpload"
                                                            name="video"
                                                            accept="video/*"
                                                            multiple
                                                            hidden
                                                            onChange={(e) => setVideoList(prev => [...prev, ...e.target.files])}
                                                        />
                                                    </label>
                                                    {videoList.map((video, index) => (
                                                        <div className="media-container" key={`container-${index}`}>
                                                            <video key={index}
                                                                   poster={"../../../public/post-manage-icon/play-video.png"}
                                                                   style={{ maxWidth: "70px", maxHeight: "70px", border: "1px solid lightgray" }}>
                                                                <source src={URL.createObjectURL(video)} type="video/mp4"/>
                                                                <source src={URL.createObjectURL(video)} type="video/webm"/>
                                                                <source src={URL.createObjectURL(video)} type="video/quicktime"/>
                                                            </video>
                                                            <div className="delete-container" key={index + imageList.length} onClick={() => setVideoList(prev => prev.filter((_, i) => i !== index))}>
                                                                <FontAwesomeIcon icon={faXmark} style={{fontSize: "15px", color: "white"}}/>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                                <button className="post-button" onClick={handleSubmitPostButton}>
                                    Đăng tin
                                </button>
                            </div>
                            <img src="../../../public/post-manage-icon/stand-line.png" className="stand-line"/>
                            <div className="right">
                                <div className="address">
                                    <h1>Địa chỉ</h1>
                                    <div className="post-address-input-bounding" onClick={togglePickAddressPopUp}>
                                        <p id="show-address"></p>
                                        <FontAwesomeIcon icon={faAngleRight} style={{fontSize: "40px"}}/>
                                    </div>
                                </div>
                                <div className="price-area">
                                    <h1>Giá thuê và diện tích</h1>
                                    <div className="post-price-area">
                                        <div className="container">
                                            <p>Giá thuê</p>
                                            <input id="post-create-price" type="text"/>
                                        </div>
                                        <div className="container">
                                            <p>Diện tích</p>
                                            <input id="post-create-area" type="text"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="title-description">
                                    <h1>Tiêu đề và mô tả</h1>
                                    <div className="container">
                                        <p>Tiêu đề</p>
                                        <input id="post-create-title" type="text"/>
                                    </div>
                                    <div className="container">
                                        <p>Mô tả</p>
                                        <textarea id="post-create-description" />
                                    </div>
                                </div>
                                <div className="others-information">
                                    <h1>Thông tin khác</h1>
                                    <div className="post-bedroom-electric">
                                        <div className="container">
                                            <p>Số phòng ngủ</p>
                                            <input id="post-create-bedroom" type="text"/>
                                        </div>
                                        <div className="container">
                                            <p>Giá điện</p>
                                            <input id="post-create-electric" type="text"/>
                                        </div>
                                    </div>
                                    <div className="post-bathroom-water">
                                        <div className="container">
                                            <p>Số phòng tắm, vệ sinh</p>
                                            <input id="post-create-bathroom" type="text"/>
                                        </div>
                                        <div className="container">
                                            <p>Giá nước</p>
                                            <input id="post-create-water" type="text"/>
                                        </div>
                                    </div>
                                    <div className="post-parking-internet">
                                        <div className="container">
                                            <p>Chỗ để xe</p>
                                            <input id="post-create-parking" type="text"/>
                                        </div>
                                        <div className="container">
                                            <p>Giá Internet</p>
                                            <input id="post-create-internet" type="text"/>
                                        </div>
                                    </div>
                                    <div className="post-security-furniture">
                                        <div className="container">
                                            <p>An ninh</p>
                                            <input id="post-create-security" type="text"/>
                                        </div>
                                        <div className="container" onClick={() => setShowFurnitureOption(prev => !prev)}>
                                            <p>Nội thất</p>
                                            <input
                                                id="post-create-furniture"
                                                type="text"
                                                readOnly
                                                value={selectedFurniture}
                                                style={{ caretColor: "transparent", cursor: "pointer" }}
                                            />
                                            {showFurnitureOption && (
                                                <div className="option">
                                                    <p className="options" onClick={handleFurnitureOption}>Cao cấp</p>
                                                    <p className="options" onClick={handleFurnitureOption}>Đầy đủ</p>
                                                    <p className="options" onClick={handleFurnitureOption}>Không có</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {editPost &&
                            <div className="edit-pop-up">
                                <div className="edit-pop-up-container">
                                    <div className="close" onClick={() => setEditPost(false)}>
                                        <FontAwesomeIcon icon={faX} />
                                    </div>
                                    <h1>Chỉnh sửa</h1>
                                    <div className="edit-pop-up-main-content">
                                        <div className="left">
                                            <div className="edit-price-area">
                                                <div className="price-area">
                                                    <h2>Giá thuê và diện tích</h2>
                                                    <div className="post-price-area">
                                                        <div className="container">
                                                            <p>Giá thuê</p>
                                                            <input
                                                                id="post-edit-price"
                                                                value={currentEditingPost.postDetail.price}
                                                                type="text"/>
                                                        </div>
                                                        <div className="container">
                                                            <p>Diện tích</p>
                                                            <input
                                                                id="post-edit-area"
                                                                value={currentEditingPost.postDetail.area}
                                                                type="text"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="edit-title-description">
                                                <h2>Tiêu đề và mô tả</h2>
                                                <div className="container">
                                                    <p>Tiêu đề</p>
                                                    <input
                                                        id="post-edit-title"
                                                        value={currentEditingPost.post.title}
                                                        type="text"/>
                                                </div>
                                                <div className="container">
                                                    <p>Mô tả</p>
                                                    <textarea
                                                        id="post-edit-description"
                                                        value={currentEditingPost.post.description.replace(/<br\s*\/?>/gi, '\n')}>
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="edit-others-information">
                                                <h2>Thông tin khác</h2>
                                                <div className="post-bedroom-electric">
                                                    <div className="container">
                                                        <p>Số phòng ngủ</p>
                                                        <input
                                                            id="post-edit-bedroom"
                                                            value={currentEditingPost.postDetail.bedroom}
                                                            type="text"/>
                                                    </div>
                                                    <div className="container">
                                                        <p>Giá điện</p>
                                                        <input
                                                            id="post-edit-electric"
                                                            value={currentEditingPost.postDetail.electric}
                                                            type="text"/>
                                                    </div>
                                                </div>
                                                <div className="post-bathroom-water">
                                                    <div className="container">
                                                        <p>Số phòng tắm, vệ sinh</p>
                                                        <input
                                                            id="post-edit-bathroom"
                                                            value={currentEditingPost.postDetail.bathroom}
                                                            type="text"/>
                                                    </div>
                                                    <div className="container">
                                                        <p>Giá nước</p>
                                                        <input
                                                            id="post-edit-water"
                                                            value={currentEditingPost.postDetail.water}
                                                            type="text"/>
                                                    </div>
                                                </div>
                                                <div className="post-parking-internet">
                                                    <div className="container">
                                                        <p>Chỗ để xe</p>
                                                        <input
                                                            id="post-create-parking"
                                                            value={currentEditingPost.postDetail.parking}
                                                            type="text"/>
                                                    </div>
                                                    <div className="container">
                                                        <p>Giá Internet</p>
                                                        <input
                                                            id="post-create-internet"
                                                            value={currentEditingPost.postDetail.wifi}
                                                            type="text"/>
                                                    </div>
                                                </div>
                                                <div className="post-security-furniture">
                                                    <div className="container">
                                                        <p>An ninh</p>
                                                        <input
                                                            id="post-edit-security"
                                                            value={currentEditingPost.security}
                                                            type="text"/>
                                                    </div>
                                                    <div className="container" onClick={() => setShowFurnitureOption(prev => !prev)}>
                                                        <p>Nội thất</p>
                                                        <input
                                                            id="post-edit-furniture"
                                                            type="text"
                                                            readOnly
                                                            value={currentEditingPost.postDetail.furniture}
                                                            style={{ caretColor: "transparent", cursor: "pointer" }}
                                                        />
                                                        {showFurnitureOption && (
                                                            <div className="option">
                                                                <p className="options" onClick={handleFurnitureOption}>Cao cấp</p>
                                                                <p className="options" onClick={handleFurnitureOption}>Đầy đủ</p>
                                                                <p className="options" onClick={handleFurnitureOption}>Nhà trống</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="submit-edit-button" onClick={() => setEditPost(false)}>
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="post-manage-main-content">
                            <div className="switch-posts">
                                <p className={isVisiblePosts ? "visible-posts show" : "visible-posts"} onClick={() => setIsVisiblePosts(true)}>Bài đăng đang hiển thị</p>
                                <img src="../../../public/post-manage-icon/stand-line.png" className="stand-line" style={{height: "60px"}}/>
                                <p className={!isVisiblePosts ? "invisible-posts show" : "invisible-posts"} onClick={() => setIsVisiblePosts(false)}>Bài đăng đã ẩn</p>
                            </div>
                            <img src="../../../public/post-manage-icon/line.png" className="line"/>
                            {isVisiblePosts ?
                                <PostManageEnablePost setEditPost={setEditPost} setCurrentEditingPost={setCurrentEditingPost} userId={userId}/> :
                                <PostManageDisablePost setEditPost={setEditPost} setCurrentEditingPost={setCurrentEditingPost} userId={userId}/>
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyComponent;