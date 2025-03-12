import React, {useContext, useState, useEffect} from 'react';
import '../../css/user-css/PersonalInformation.css';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

const MyComponent = () => {
    const [isSelected, setIsSelected] = React.useState(-1);
    const { userName, setUserName } = useContext(AuthContext);
    const [tmpUserName, settmpUserName] = useState();
    const [pickAddress, setPickAddress] = useState(false);
    const [address, setAddress] = useState();
    const [showPassword, setShowPassword] = useState(-1);

    useEffect(() => {
        settmpUserName(userName)
    }, [isSelected]);

    const toggleSelected = (num) => {
        setIsSelected(num);
        console.log(isSelected);
    };

    const handleChangeUserName = (e) => {
        if(e.key === 'Enter') {
            setUserName(e.target.value);
        }
    }

    const handleSubmitAddress = () => {
        const city = document.getElementById('address-detail-city').value;
        const district = document.getElementById('address-detail-district').value;
        const ward = document.getElementById('address-detail-ward').value;
        const detail = document.getElementById('address-detail-detail').value;
        const tmpAddress = (detail !== "" ? detail + ", " : "") + ward + ", " + district + ", " + city;
        if(city === "" || ward === "" || district === ""){
            alert("Hãy nhập đầy đủ địa chỉ")
        }else{
            setAddress(tmpAddress);
            setPickAddress(prev => !prev);

            document.getElementById('address-detail-city').value = "";
            document.getElementById('address-detail-district').value = "";
            document.getElementById('address-detail-ward').value = "";
            document.getElementById('address-detail-detail').value = "";
        }
    }

    const handleShowPassword = (num) => {
        setShowPassword(num);
    }

    return (
        <div className="personal-information-body">
            <div className="personal-information-container">
                <h1>Thay đổi thông tin</h1>
                <div className="personal-information-content">
                    <div className="personal-information-content-left">
                        <p className={isSelected === 0 ? "is-selected" : ""} onClick={() => toggleSelected(0)}>Thông tin cá nhân</p>
                        <p className={isSelected === 1 ? "is-selected" : ""} onClick={() => toggleSelected(1)}>Thay đổi mật khẩu</p>
                    </div>
                    <div className="personal-information-content-right">
                        {isSelected === 0 ? (
                            <>
                                <div className="personal-information-name-contact">
                                    <div className="username">
                                        <p className="title">Họ và tên</p>
                                        <input
                                            value={tmpUserName}
                                            onChange={(e) => settmpUserName(e.target.value)}
                                            onKeyDown={handleChangeUserName}
                                            type="text"/>
                                    </div>
                                    <div className="contact">
                                        <p className="title">Số điện thoại</p>
                                        <input type="text" value="0902162143"/>
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
                                            placeholder="Tỉnh, Thành phố"/>
                                        <input
                                            type="text"
                                            id="address-detail-district"
                                            placeholder="Quận, Huyện, Thị Xã"/>
                                    </div>
                                    <div className="ward-detail">
                                        <input
                                            type="text"
                                            id="address-detail-ward"
                                            placeholder="Xã, Phường, Thị trấn"/>
                                        <input
                                            type="text"
                                            id="address-detail-detail"
                                            placeholder="Địa chỉ cụ thể"/>
                                    </div>
                                    <button className="submit-button" onClick={handleSubmitAddress}>Xác nhận</button>
                                </div>
                            </>
                        ) : (
                                <div className="input-container">
                                    <div className="password-input">
                                        <input
                                            type={showPassword !== 0 ? "password" : "text"}
                                            id="current-password"
                                            placeholder="Mật khẩu hiện tại"/>
                                        <FontAwesomeIcon icon={showPassword !== 0 ? faEye : faEyeSlash} style={{cursor: "pointer"}} onClick={() => handleShowPassword(0)}/>
                                    </div>
                                    <div className="password-input">
                                        <input
                                            type={showPassword !== 1 ? "password" : "text"}
                                            id="new-password-1"
                                            placeholder="Mật khẩu mới"/>
                                        <FontAwesomeIcon icon={showPassword !== 1 ? faEye : faEyeSlash} style={{cursor: "pointer"}} onClick={() => handleShowPassword(1)}/>
                                    </div>
                                    <div className="password-input">
                                        <input
                                            type={showPassword !== 2 ? "password" : "text"}
                                            id="new-password-2"
                                            placeholder="Nhập lại mật khẩu mới"/>
                                        <FontAwesomeIcon icon={showPassword !== 2 ? faEye : faEyeSlash} style={{cursor: "pointer"}} onClick={() => handleShowPassword(2)}/>
                                    </div>
                                    <button className="submit-password-button">
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
