import React, {useContext, useEffect, useState} from 'react';
import '../../css/admin-css/index.css';
import '../../css/admin-css/AccountManage.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCamera, faSignal,
    faX,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../admin-components/Pagination.jsx";
import {faCalendar, faCompass, faMessage, faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";
import SortIcon from "./SortIcon.jsx";
import SearchIcon from "./SearchIcon.jsx";
import {getUsers, deleteUser, getUserReport, deleteReport} from "../../apiServices/admin.js";
import {getImageMime} from "../../utils/format.js";
import AuthContext from "../../contexts/AuthContext.jsx";
import NoDataFound from "../NoDataFound.jsx";

const MyComponent = () => {
    const {user} = useContext(AuthContext);
    const [isSelected, setIsSelected] = useState(false);
    const [sortCondition, setSortCondition] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const totalUsersNumberRef = React.useRef(0);
    const [users, setUsers] = useState([]);
    const [userInformation, setUserInformation] = useState(null);
    const [reports, setReports] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const function3 = document.getElementById("function-3");
        if(function3){
            function3.classList.add("isSelected");
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = {
                    pageNumber,
                    pageSize,
                    sortCondition,
                    fullName: userName,
                    email,
                    phoneNumber
                }
                console.log(searchParams);
                const response = await getUsers(searchParams);
                setUsers(response.users);
                totalUsersNumberRef.current = response.totalUsers;
            }catch (e){
                console.log(e);
            }
        }
        fetchData();
    }, [pageNumber, pageSize, sortCondition, email, phoneNumber, userName])

    const handleGetUserReport = async (userId) => {
        try {
            const response = await getUserReport(userId);
            setUserInformation(response.user);
            setReports(response.reportList);
            setAccounts(response.accounts);
            setIsSelected(true);
        }catch (e){
            console.log(e);
        }
    }

    const handleDeleteUser = async (userId) => {
        try {
            const response = await deleteUser(userId);
            if(response === "User deleted successfully!"){
                alert("Xóa người dùng thành công");
                const newUsers = users.map(user => user.id !== userId);
                setUsers(newUsers);
            }else{
                alert("Có lỗi xảy ra");
            }
        }catch (e){
            console.log(e);
        }
    }

    const handleDeleteReport = async (reportId) => {
        try {
            const response = await deleteReport(reportId);
            if(response === "Report deleted successfully!"){
                alert("Xóa tin thành công");
                const newReports = reports.map(report => report.id !== reportId);
                setReports(newReports);
            }else{
                alert("Có lỗi xảy ra");
            }
        }catch (e){
            console.log(e);
        }
    }

    return (
        <div className="account-manage-body">
            {isSelected && <div className="curtain"></div>}
            <table>
                <thead>
                <tr>
                    <th className="stt">STT</th>
                    <th className="id">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginRight: "10px"}}>ID</p>
                            <SortIcon
                                sortValue={"id "}
                                sortCondition={sortCondition}
                                setSortCondition={setSortCondition}
                            />
                        </div>
                    </th>
                    <th className="fullname">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p>Tên người dùng</p>
                            <SearchIcon item={"Người dùng"} setParam={setUserName} setCurrentPage={setPageNumber}/>
                        </div>
                    </th>
                    <th className="email">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p>Email</p>
                            <SearchIcon item={"Email"} setParam={setEmail} setCurrentPage={setPageNumber}/>
                        </div>
                    </th>
                    <th className="phone-number">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p>Số điện thoại</p>
                            <SearchIcon item={"Số điện thoại"} setParam={setPhoneNumber} setCurrentPage={setPageNumber}/>
                        </div>
                    </th>
                    <th className="report-number">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginRight: "10px"}}>Số lượt báo cáo</p>
                            <SortIcon
                                sortValue={"reportCount "}
                                sortCondition={sortCondition}
                                setSortCondition={setSortCondition}
                            />
                        </div>
                    </th>
                    <th className="role">Vai trò</th>
                    <th className="sign-up-time">
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <p style={{marginRight: "10px"}}>Thời gian tạo</p>
                            <SortIcon
                                sortValue={"createdAt "}
                                sortCondition={sortCondition}
                                setSortCondition={setSortCondition}
                            />
                        </div>
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? users.map((data, index) => (
                        <tr key={index} onClick={() => handleGetUserReport(data.id)}>
                            <td className="stt">{pageSize % (pageNumber * pageSize) + 1 + index}</td>
                            <td className="id">{data.id}</td>
                            <td>{data.fullName}</td>
                            <td>{data.email}</td>
                            <td>{data.phoneNumber}</td>
                            <td>{data.reportedTime}</td>
                            <td>{data.role === "User" ? "Người dùng" : "Quản trị viên"}</td>
                            <td>{data.createdAt}</td>
                            <td className="delete" onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteUser(user.id);
                            }}><FontAwesomeIcon icon={faX}/></td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="10" style={{
                                height: "200px",
                                textAlign: "center",
                                paddingTop: "20px",
                                backgroundColor: "#fff"
                            }}>
                                <NoDataFound/>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={pageNumber}
                setCurrentPage={setPageNumber}
                totalLength={totalUsersNumberRef.current}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            {isSelected && (
                <div className="pop-up">
                    <div className="content-container">
                        <FontAwesomeIcon icon={faXmark} className="close" onClick={() => setIsSelected(false)}/>
                        <div className="user-page-profile">
                            <div className="user-avatar-background">
                                <img src={`data:${getImageMime(userInformation.backgroundImage)};base64,${userInformation.backgroundImage}`} id="user-background-img"/>
                                <div className="user-avatar-container-rel">
                                    <div className="user-avatar-container">
                                        <img src={`data:${getImageMime(userInformation.avatar)};base64,${userInformation.avatar}`} id="user-avatar-img"/>
                                    </div>
                                </div>
                            </div>
                            <div className="user-lower-information">
                                <h2 id="user-page-username">{userInformation.fullName}</h2>
                                <div className="user-rating">
                                    <div className="rating-star">
                                        <FontAwesomeIcon icon={faStarRegular} id="star-1"/>
                                        <FontAwesomeIcon icon={faStarRegular} id="star-2"/>
                                        <FontAwesomeIcon icon={faStarRegular} id="star-3"/>
                                        <FontAwesomeIcon icon={faStarRegular} id="star-4"/>
                                        <FontAwesomeIcon icon={faStarRegular} id="star-5"/>
                                    </div>
                                    <p id="rating-count">(n)</p>
                                </div>
                                <div className="sub-bounding">
                                    <FontAwesomeIcon icon={faSignal} />
                                    <p className="title">Trạng thái:</p>
                                    <p>{userInformation.status}</p>
                                </div>
                                <div className="sub-bounding">
                                    <FontAwesomeIcon icon={faMessage}/>
                                    <p className="title">Phản hồi chat:</p>
                                    <p>{userInformation.replyPercentage ? userInformation.replyPercentage + "%" : "Chưa có thông tin"}</p>
                                </div>
                                <div className="sub-bounding">
                                    <FontAwesomeIcon icon={faCompass} />
                                    <p className="title">Địa chỉ:</p>
                                    <p>{userInformation.addressDTO ? userInformation.addressDTO : "Chưa cung cấp"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="report-container">
                            <h1>Báo cáo</h1>
                            {reports.map((report, index) => (
                                <div key={index} className="report-bounding">
                                    <FontAwesomeIcon icon={faXmark} className="close" onClick={() => handleDeleteReport(report.id)}/>
                                    <div className="report-content">
                                        <h3>{report.name}</h3>
                                        <p>{report.description}</p>
                                    </div>
                                    <div className="reporter-container">
                                        <h3>Người báo cáo</h3>
                                        <div className="reporter">
                                            <p>ID: {report.reportCreator.id}</p>
                                            <p>Tên: {report.reportCreator.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/*<Pagination/>*/}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyComponent;
