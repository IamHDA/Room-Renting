import React, {useContext} from 'react';
import '../../css/admin-css/SideBar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReceipt, faRightFromBracket, faSquarePollVertical, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import AuthContext from "../../contexts/AuthContext.jsx";

const MyComponent = () => {
    const {setUser} = useContext(AuthContext);

    return (
        <div className="side-bar">
            <div className="page-title">
                <h1>Admin Page</h1>
            </div>
            <div className="side-bar-function-bounding">
                <div></div>
                <Link to="/admin/statistic" id="function-1" className="side-bar-function">
                    <FontAwesomeIcon icon={faSquarePollVertical} />
                    <p>Thống kê</p>
                </Link>
                <Link to="/admin/postManage" id="function-2" className="side-bar-function">
                    <FontAwesomeIcon icon={faReceipt} />
                    <p>Quản lý tin đăng</p>
                </Link>
                <Link to="/admin/accountManage" id="function-3" className="side-bar-function">
                    <FontAwesomeIcon icon={faUser} />
                    <p>Quản lý người dùng</p>
                </Link>
                <Link to="/" id="function-4" className="side-bar-function" onClick={() => {
                    localStorage.clear();
                    setUser(null);
                }}>
                    <FontAwesomeIcon icon={faRightFromBracket}  flip="horizontal"/>
                    <p>Đăng xuất</p>
                </Link>
                <div></div>
            </div>
        </div>
    );
};

export default MyComponent;
