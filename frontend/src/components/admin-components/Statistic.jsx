import React, {useEffect} from 'react';
import '../../css/admin-css/Statistic.css'
import '../../css/admin-css/index.css';

const MyComponent = () => {

    useEffect(() => {
        const function1 = document.getElementById("function-1");
        if(function1){
            function1.classList.add("isSelected");
        }
    }, [])

    return (
        <div className="statistic-body">
            <div className="row">
                <h1>Người dùng</h1>
                <div className="content">
                    <div className="detail">
                        <h2>Tổng số người dùng</h2>
                        <p><span className="number">300</span> người dùng</p>
                    </div>
                    <div className="detail">
                        <h2>Tài khoản mới trong tháng</h2>
                        <p><span className="number">50</span> người dùng</p>
                    </div>
                    <div className="detail">
                        <h2>Tài khoản mới trong ngày</h2>
                        <p><span className="number">10</span> người dùng</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>Bài đăng</h1>
                <div className="content">
                    <div className="detail">
                        <h2>Tổng số bài đăng</h2>
                        <p><span className="number">300</span> bài đăng</p>
                    </div>
                    <div className="detail">
                        <h2>Bài đăng mới trong tháng</h2>
                        <p><span className="number">50</span> bài đăng</p>
                    </div>
                    <div className="detail">
                        <h2>Bài đăng mới trong ngày</h2>
                        <p><span className="number">10</span> bài đăng</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <h1>Báo cáo</h1>
                <div className="content">
                    <div className="detail">
                        <h2>Tổng số báo cáo</h2>
                        <p><span className="number">300</span> báo cáo</p>
                    </div>
                    <div className="detail">
                        <h2>Báo cáo mới trong tháng</h2>
                        <p><span className="number">50</span> báo cáo</p>
                    </div>
                    <div className="detail">
                        <h2>Báo cáo mới trong ngày</h2>
                        <p><span className="number">10</span> báo cáo</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
