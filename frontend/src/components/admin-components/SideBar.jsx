import React from 'react';
import '../../css/admin-css/SideBar.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faReceipt, faRightFromBracket, faSquarePollVertical, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const MyComponent = () => {
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
                <div id="function-2" className="side-bar-function">
                    <FontAwesomeIcon icon={faReceipt} />
                    <p>Quản lý bài đăng</p>
                </div>
                <div id="function-3" className="side-bar-function">
                    <FontAwesomeIcon icon={faUser} />
                    <p>Quản lý người dùng</p>
                </div>
                <div id="function-4" className="side-bar-function">
                    <FontAwesomeIcon icon={faFlag} />
                    <p>Quản lý báo cáo</p>
                </div>
                <div id="function-5" className="side-bar-function">
                    <FontAwesomeIcon icon={faRightFromBracket}  flip="horizontal"/>
                    <p>Đăng xuất</p>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default MyComponent;
