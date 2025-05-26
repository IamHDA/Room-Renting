import React, {useContext, useState, useEffect, useRef} from 'react';
import '../../css/user-css/PersonalInformation.css';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faArrowLeft, faEye, faEyeSlash, faX} from "@fortawesome/free-solid-svg-icons";
import {getPersonalInformation} from "../../apiServices/user.js";
import AddressContext from "../../contexts/AddressContext.jsx";
import { checkExistedIdentifier, addNewAccountWithPhoneNumber, addNewAccountWithEmail } from "../../apiServices/account.js"
import { changePersonalInformation, currentUser, changePassword } from "../../apiServices/user.js";

const MyComponent = () => {
    const { allCities, allDistricts, allWards, setAllDistricts, setAllWards, fetchDistrictsByCity, fetchWardsByDistrict } = useContext(AddressContext);
    const { user, setUser } = useContext(AuthContext);
    const phoneNumberRef = useRef(null);
    const userInformationRef = useRef(null);
    const [isSelected, setIsSelected] = useState(true);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [phoneNumberInput, setPhoneNumberInput] = useState("");
    const [pickAddress, setPickAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [showAddresses, setShowAddresses] = useState(false);
    const [showAddPhoneNumber, setShowAddPhoneNumber] = useState(0);
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
    const [emailLocked, setEmailLocked] = useState(false);
    const [error, setError] = useState(0);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        const fetchInformation = async () => {
            try{
                const information = await getPersonalInformation();
                userInformationRef.current = information;
                console.log(information);
                setNameInput(information.fullName);
                setEmailInput(information.email);
                phoneNumberRef.current = information.phoneNumber;
                setAddress(information.addressText);
                if(information.email !== null) setEmailLocked(true);
            }catch(err){
                console.log(err);
            }
        }
        setIsSelected(true);
        fetchInformation();
    }, [user]);

    useEffect(() => {
        if(user && userInformationRef.current){
            const addressText = userInformationRef.current.addressText;
            console.log(addressText);
            if(emailInput !== userInformationRef.current.email) {
                setEdited(true);
                return;
            }
            if(phoneNumberRef.current !== userInformationRef.current.phoneNumber) {
                setEdited(true);
                return;
            }
            if(ward !== "" && (!addressText.includes(ward) || addressText.includes(detail))) {
                setEdited(true);
                return;
            }
            setEdited(false);
        }
    }, [emailInput, phoneNumberInput, ward])

    const toggleSelected = (num) => {
        setIsSelected(num);
        setAllDistricts(null);
        setAllWards(null);
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
        if (showPassword === num) {
            setShowPassword(-1);
        } else {
            setShowPassword(num);
        }
    }

    const changeInformationHandler = async () => {
        try{
            const fullName = nameInput;
            const email = emailInput;
            const phoneNumber = phoneNumberInput;
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

    const handleCheckExistedIdentifier = async (identifier) => {
        return await checkExistedIdentifier(identifier);
    }

    return (
        <div className="personal-information-body">
            <div className="personal-information-container">
                {showAddresses && (
                    <>
                        <div className="curtain"></div>
                        <div className="data-container">
                            <FontAwesomeIcon icon={faX} className="close" onClick={() => setShowAddresses(false)} />
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
                                           setShowAddresses(false);
                                       }}
                                       style={{cursor : "pointer", fontSize : "20px"}}
                                    >{item.name}</p>
                                ))}
                            </div>
                        </div>
                    </>
                )}
                {showAddPhoneNumber === true && (
                    <>
                        <div className="curtain"></div>
                        <div className="pop-up-phone-number">
                            <FontAwesomeIcon icon={faX} className="close" onClick={() => {
                                setShowAddPhoneNumber(0);
                                setError(0);
                                setPhoneNumberInput(null);
                            }} />
                            <img src="../../../public/register-signIn/banner.jpg" className="illustration"/>
                            <div className="pop-up-content">
                                {showAddPhoneNumber === 1 && (
                                    <>
                                        <h2>Số điện thoại</h2>
                                        <input
                                            className={`pop-up-input ${error ? "error-js" : ""}`}
                                            type="text"
                                            placeholder="Nhập số điện thoại"
                                            value={phoneNumberInput}
                                            onChange={(e) => setPhoneNumberInput(e.target.value)}
                                        />
                                        {error === 1 && <p className="error">- Số điện thoại không hợp lệ</p>}
                                        {error === 2 && <p className="error">- Số điện thoại đã được sử dụng</p>}
                                        <button
                                            className="continue-button"
                                            onClick={async () => {
                                                if(phoneNumberInput === "" || !/^\d+$/.test(phoneNumberInput) || phoneNumberInput.length !== 10) setError(1);
                                                else if(await handleCheckExistedIdentifier(phoneNumberInput)) {
                                                    setError(2);
                                                }
                                                else setShowAddPhoneNumber(2);
                                            }}
                                        >
                                            Tiếp tục
                                        </button>
                                    </>
                                )}
                                {showAddPhoneNumber === 2 && (
                                    <>
                                        <FontAwesomeIcon
                                            icon={faArrowLeft}
                                            style={{
                                                fontSize : "25px",
                                                position: "absolute",
                                                left: "49%",
                                                top: "10px",
                                            }}
                                            onClick={() => setShowAddPhoneNumber(1)}
                                        />
                                        <h2>Mật khẩu</h2>
                                        <input
                                            className="pop-up-input"
                                            type="password"
                                            placeholder="Nhập mật khẩu"
                                            value={password1}
                                            onChange={(e) => setPassword1(e.target.value)}
                                        />
                                        <input
                                            className="pop-up-input"
                                            type="password"
                                            placeholder="Nhập lại mật khẩu"
                                            value={password2}
                                            onChange={(e) => setPassword2(e.target.value)}
                                        />
                                        {error === 4 && <p className="error">- Mật khẩu không hợp lệ</p>}
                                        {error === 3 && <p className="error">- Mật khẩu không khớp</p>}
                                        <button
                                            style={{
                                                fontSize : "22px",
                                                width: "86%",
                                                padding: "10px",
                                                backgroundColor: "#339dff",
                                                color: "white",
                                                fontWeight: "bold",
                                                border: "none",
                                                borderRadius: "10px",
                                                cursor: "pointer"
                                            }}
                                            onClick={async () => {
                                                if(password1 === "" || password2 === "") setError(4);
                                                else if(password1 !== password2) setError(3);
                                                else{
                                                    try {
                                                        const response = await addNewAccountWithPhoneNumber(phoneNumberInput, password1);
                                                        if(response !== "Add phone number successfully!") alert("Có lỗi xảy ra");
                                                        else {
                                                            alert("Thêm số điện thoại thành công");
                                                            phoneNumberRef.current = phoneNumberInput;
                                                            setShowAddPhoneNumber(0);
                                                        }
                                                    }catch(err) {
                                                        console.log(err);
                                                    }
                                                }
                                            }}
                                        >
                                            Tiếp tục
                                        </button>
                                    </>
                                )}
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
                                    <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
                                        <div className="information-input-bounding">
                                            <p className="title">Email</p>
                                            <input
                                                value={emailInput}
                                                onChange={(e) => setEmailInput(e.target.value)}
                                                type="text"
                                                disabled={emailLocked}
                                                style={{
                                                    backgroundColor: 'inherit',
                                                    color: 'black',
                                                    fontSize: '20px',
                                                }}
                                            />
                                        </div>
                                        {!emailLocked && <p
                                            style={{fontSize: "20px", color: "#008CFF", cursor: "pointer"}}
                                            onClick={async () => {
                                                if(emailInput == null || !emailInput.includes("@gmail.com")) alert("Email không hợp lệ");
                                                else if(await handleCheckExistedIdentifier(emailInput)) alert("Email đã được sử dụng");
                                                else{
                                                    try{
                                                        const response = await addNewAccountWithEmail(emailInput);
                                                        if(response !== "Add email successfully!") alert("Có lỗi xảy ra");
                                                        else {
                                                            alert("Thêm email thành công");
                                                            setEmailLocked(true);
                                                        }
                                                    }catch(err) {
                                                        console.log(err);
                                                    }
                                                }
                                            }}
                                        >+ Thêm email</p>}
                                    </div>
                                    <div className="information-input-bounding">
                                        <p className="title">Họ và tên</p>
                                        <input
                                            value={nameInput}
                                            onChange={(e) => setNameInput(e.target.value)}
                                            type="text"
                                        />
                                    </div>
                                    <div style={{display: "flex", gap: "20px", alignItems: "center"}}>
                                        <div className="information-input-bounding">
                                            <p className="title">Số điện thoại</p>
                                            <input
                                                type="text"
                                                value={phoneNumberRef.current}
                                                readOnly
                                            />
                                        </div>
                                        {!phoneNumberRef.current && <p style={{fontSize: "20px", color: "#008CFF", cursor: "pointer"}} onClick={() => setShowAddPhoneNumber(1)}>+ Thêm số điện thoại</p>}
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
                                                setShowAddresses(true);
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
                                                setShowAddresses(true);
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
                                                setShowAddresses(true);
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
                                <button className={`submit-information ${edited && "confirmed"}`} onClick={changeInformationHandler}>
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
