import React, {useEffect, useState} from 'react';
import '../../css/admin-css/Statistic.css'
import '../../css/admin-css/index.css';
import {getTotalPosts, getTotalReports, getTotalUsers} from "../../apiServices/admin.js"

const MyComponent = () => {
    const [postStatistic, setPostStatistic] = useState(null);
    const [userStatistic, setUserStatistic] = useState(null);
    const [reportStatistic, setReportStatistic] = useState(null);

    useEffect(() => {
        const function1 = document.getElementById("function-1");
        if(function1){
            function1.classList.add("isSelected");
        }
        const fetchData = async () => {
            try {
                const postStatistic = await getTotalPosts();
                const userStatistic = await getTotalUsers();
                const reportStatistic = await getTotalReports();
                setPostStatistic(postStatistic);
                setUserStatistic(userStatistic);
                setReportStatistic(reportStatistic);
            }catch (e){
                console.log(e);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="statistic-body">
            {postStatistic && userStatistic && reportStatistic && (
                <>
                    <div className="row">
                        <h1>Người dùng</h1>
                        <div className="content">
                            <div className="detail">
                                <h2>Tổng số người dùng</h2>
                                <p><span className="number">{userStatistic.totalUsers}</span> người dùng</p>
                            </div>
                            <div className="detail">
                                <h2>Người dùng mới trong tháng</h2>
                                <p><span className="number">{userStatistic.totalUsersThisMonth}</span> người dùng</p>
                            </div>
                            <div className="detail">
                                <h2>Người dùng mới trong ngày</h2>
                                <p><span className="number">{userStatistic.totalUsersThisDay}</span> người dùng</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h1>Bài đăng</h1>
                        <div className="content">
                            <div className="detail">
                                <h2>Tổng số bài đăng</h2>
                                <p><span className="number">{postStatistic.totalPosts}</span> tin đăng</p>
                            </div>
                            <div className="detail">
                                <h2>Bài đăng mới trong tháng</h2>
                                <p><span className="number">{postStatistic.totalPostsThisMonth}</span> tin đăng</p>
                            </div>
                            <div className="detail">
                                <h2>Bài đăng mới trong ngày</h2>
                                <p><span className="number">{postStatistic.totalPostsThisDay}</span> tin đăng</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h1>Báo cáo</h1>
                        <div className="content">
                            <div className="detail">
                                <h2>Tổng số báo cáo</h2>
                                <p><span className="number">{reportStatistic.totalReports}</span> báo cáo</p>
                            </div>
                            <div className="detail">
                                <h2>Báo cáo mới trong tháng</h2>
                                <p><span className="number">{reportStatistic.totalReportsThisMonth}</span> báo cáo</p>
                            </div>
                            <div className="detail">
                                <h2>Báo cáo mới trong ngày</h2>
                                <p><span className="number">{reportStatistic.totalReportsThisDay}</span> báo cáo</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyComponent;
