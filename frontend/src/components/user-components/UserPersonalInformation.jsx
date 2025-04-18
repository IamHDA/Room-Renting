import React, {useContext, useState, useEffect} from 'react';
import '../../css/user-css/PersonalInformation.css';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faEye, faEyeSlash, faX} from "@fortawesome/free-solid-svg-icons";
import {getPersonalInformation} from "../../apiServices/user.js";
import AddressContext from "../../contexts/AddressContext.jsx";
import { changePersonalInformation, currentUser, changePassword } from "../../apiServices/user.js";

const MyComponent = () => {
    const { allCities, allDistricts, allWards, setAllDistricts, setAllWards, fetchDistrictsByCity, fetchWardsByDistrict } = useContext(AddressContext);
    const [isSelected, setIsSelected] = useState(true);
    const { user, setUser } = useContext(AuthContext);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [numberInput, setNumberInput] = useState("");
    const [pickAddress, setPickAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [showPopUp, setShowPopUp] = useState(false);
    const [addressChoices, setAddressChoices] = useState([]);
    const [showPassword, setShowPassword] = useState(-1);
    const [savedChoice, setSavedChoice] = useState("");
    const [ward, setWard] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [detail, setDetail] = useState("")
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");


    useEffect(() => {
        const fetchInformation = async () => {
            try{
                const information = await getPersonalInformation();
                setNameInput(information.fullName);
                setEmailInput(information.email);
                setNumberInput(information.phoneNumber);
                setAddress(information.addressText);
            }catch(err){
                console.log(err);
            }
        }
        setIsSelected(true);
        fetchInformation();
    }, [user]);

    const toggleSelected = (num) => {
        setIsSelected(num);
        setAllDistricts(null);
        setAllWards(null);
        console.log(isSelected);
    };

    const handleSubmitAddress = () => {
        const detail = document.getElementById('address-detail-detail').value;
        const tmpAddress = (detail !== "" ? detail + ", " : "") + ward + ", " + district + ", " + city;
        if(city === "" || ward === "" || district === ""){
            alert("Hãy nhập đầy đủ địa chỉ")
        }else{
            setAddress(tmpAddress);
            setPickAddress(prev => !prev);
        }
    }

    const handleShowPassword = (num) => {
        setShowPassword(num);
        if(showPassword === num) setShowPassword(-1);
    }

    const changeInformationHandler = async () => {
        try{
            const fullName = nameInput;
            const email = emailInput;
            const phoneNumber = numberInput;
            let addressText;
            addressText = city + ", " + district + ", " + ward + (detail !== "" ? ", " + detail : "");
            const response = await changePersonalInformation({fullName, email, phoneNumber, addressText});
            if(response === "Change user information successfully!"){
                alert("Cập nhật thông tin thành công");
                setUser(await currentUser());
            }
        }catch(err){
            console.log(err);
        }
    }

    const changePasswordHandler = async () => {
        if(newPassword1 !== newPassword2) document.querySelector(".password-error").classList.add("js");
        else{
            document.querySelector(".password-error").classList.remove("js");
            try {
                const response = await changePassword(oldPassword, newPassword2);
                if(response === "Current password is incorrect!") alert("Mật khẩu hiện tại không đúng");
                else{
                    alert("Đổi mật khẩu thành công");
                    location.reload();
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    return (
        <div className="personal-information-body">
            <div className="personal-information-container">
                {showPopUp && (
                    <>
                        <div className="curtain"></div>
                        <div className="data-container">
                            <FontAwesomeIcon icon={faX} className="close" onClick={() => setShowPopUp(false)} />
                            <div className="data">
                                {addressChoices && addressChoices.map((item, index) => (
                                    <p key={index}
                                       onClick={() => {
                                           if(savedChoice === "ward") setWard(item.name);
                                           else if(savedChoice === "district"){
                                               setDistrict(item.name);
                                               fetchWardsByDistrict(item.id);
                                           }else if(savedChoice === "city"){
                                               setCity(item.name);
                                               fetchDistrictsByCity(item.id);
                                           }
                                           setShowPopUp(false);
                                       }}
                                       style={{cursor : "pointer", fontSize : "20px"}}
                                    >{item.name}</p>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                <h1>Thay đổi thông tin</h1>
                <div className="personal-information-content">
                    <div className="personal-information-content-left">
                        <p className={isSelected === true ? "is-selected" : ""} onClick={() => toggleSelected(true)}>Thông tin cá nhân</p>
                        <p className={isSelected === false ? "is-selected" : ""} onClick={() => toggleSelected(false)}>Thay đổi mật khẩu</p>
                    </div>
                    <div className="personal-information-content-right">
                        {isSelected === true ? (
                            <>
                                <div className="personal-information-name-email-contact">
                                    <div className="information-input-bounding">
                                        <p className="title">Email</p>
                                        <input
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            type="text"/>
                                    </div>
                                    <div className="information-input-bounding">
                                        <p className="title">Họ và tên</p>
                                        <input
                                            value={nameInput}
                                            onChange={(e) => setNameInput(e.target.value)}
                                            type="text"/>
                                    </div>
                                    <div className="information-input-bounding">
                                        <p className="title">Số điện thoại</p>
                                        <input type="text" value={numberInput}/>
                                    </div>
                                </div>
                                <div className="personal-information-address">
                                    <p className="title">Địa chỉ</p>
                                    <p>{address}</p>
                                    <FontAwesomeIcon className="angle-right" icon={faAngleDown} style={{fontSize: "40px"}} onClick={() => setPickAddress(prev => !prev)} />
                                </div>
                                <div className={`address-detail ${pickAddress ? "show" : ""}`}>
                                    <div className="city-district">
                                        <input
                                            type="text"
                                            id="address-detail-city"
                                            value={city}
                                            readOnly
                                            placeholder="Tỉnh, Thành phố"
                                            style={{caretColor : "transparent", cursor: "pointer"}}
                                            onClick={() => {
                                                setAddressChoices(allCities);
                                                setSavedChoice("city");
                                                setShowPopUp(true);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            id="address-detail-district"
                                            value={district}
                                            readOnly
                                            placeholder="Quận, Huyện, Thị Xã"
                                            style={{caretColor : "transparent", cursor: "pointer"}}
                                            onClick={() => {
                                                setAddressChoices(allDistricts);
                                                setSavedChoice("district");
                                                setShowPopUp(true);
                                            }}
                                        />
                                    </div>
                                    <div className="ward-detail">
                                        <input
                                            type="text"
                                            id="address-detail-ward"
                                            value={ward}
                                            readOnly
                                            placeholder="Xã, Phường, Thị trấn"
                                            style={{caretColor : "transparent", cursor: "pointer"}}
                                            onClick={() => {
                                                setAddressChoices(allWards);
                                                setSavedChoice("ward");
                                                setShowPopUp(true);
                                            }}
                                        />
                                        <input
                                            type="text"
                                            id="address-detail-detail"
                                            value={detail}
                                            onChange={(e) => setDetail(e.target.value)}
                                            placeholder="Địa chỉ cụ thể"/>
                                    </div>
                                    <button className="submit-button" onClick={handleSubmitAddress}>Xác nhận</button>
                                </div>
                                <button className="submit-information" onClick={changeInformationHandler}>
                                    Thay đổi thông tin
                                </button>
                            </>
                        ) : (
                            <div className="input-container">
                                <div className="password-input">
                                    <input
                                        type={showPassword !== 0 ? "password" : "text"}
                                        id="current-password"
                                        placeholder="Mật khẩu hiện tại"
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <FontAwesomeIcon icon={showPassword !== 0 ? faEye : faEyeSlash} style={{cursor: "pointer"}} onClick={() => handleShowPassword(0)}/>
                                </div>
                                <div className="password-input">
                                    <input
                                        type={showPassword !== 1 ? "password" : "text"}
                                        id="new-password-1"
                                        placeholder="Mật khẩu mới"
                                        onChange={(e) => setNewPassword1(e.target.value)}
                                    />
                                    <FontAwesomeIcon icon={showPassword !== 1 ? faEye : faEyeSlash} style={{cursor: "pointer"}} onClick={() => handleShowPassword(1)}/>
                                </div>
                                <div className="password-input">
                                    <input
                                        type={showPassword !== 2 ? "password" : "text"}
                                        id="new-password-2"
                                        placeholder="Nhập lại mật khẩu mới"
                                        onChange={(e) => setNewPassword2(e.target.value)}
                                    />
                                    <FontAwesomeIcon icon={showPassword !== 2 ? faEye : faEyeSlash} style={{cursor: "pointer"}} onClick={() => handleShowPassword(2)}/>
                                </div>
                                <p className="password-error">-Mật khẩu không khớp</p>
                                <button className="submit-password-button" onClick={changePasswordHandler}>
                                    Xác nhận
                                </button>
                            </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
