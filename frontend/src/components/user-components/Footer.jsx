import React from 'react';
import '../../css/user-css/Footer.css';

const MyComponent = () => {
    return (
        <div>
            <div className="container-footer">
                <div className="footer-logo-location-contact">
                    <div className="logo">
                        <img src="../../../public/header-icon/handHouse.png"/>
                        <p>URPLACE</p>
                    </div>
                    <div className="footer-location">
                        <img src="../../../public/footer-icon/location-white.png"/>
                        <p>Km10, Nguyễn Trãi, Hà Đông, Hà Nội</p>
                    </div>
                    <div className="footer-contact">
                        <img src="../../../public/footer-icon/phone-white.png"/>
                        <p>024 3756 2186</p>
                    </div>
                </div>
                <div className="about-urplace">
                    <h2>Về URPLACE</h2>
                    <p>Giới thiệu</p>
                    <p>Chính sách bảo mật</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Câu hỏi thường gặp</p>
                </div>
                <div className="social-media">
                    <h2>Liên kết</h2>
                    <div className="facebook">
                        <img src="../../../public/footer-icon/facebook.png"/>
                        <p>Facebook</p>
                    </div>
                    <div className="youtube">
                        <img src="../../../public/footer-icon/youtube.png"/>
                        <p>Youtube</p>
                    </div>
                    <div className="tiktok">
                        <img src="../../../public/footer-icon/tiktok.png"/>
                        <p>Tiktok</p>
                    </div>
                </div>
                <div className="footer-hotline-sign">
                    <div className="footer-hotline">
                        <img src="../../../public/footer-icon/phone-ring.png" className="footer-phoneRing-icon"/>
                        <div className="title-number">
                            <h3>Hotline</h3>
                            <h2>1900 6863</h2>
                        </div>
                    </div>
                    <div className="footer-sign">
                        <h2>Đăng ký nhận tin</h2>
                        <div className="footer-input-bounding">
                            <p>Nhập email của bạn</p>
                            <div className="footer-send-bounding">
                                <img src="../../../public/footer-icon/send.png"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-cskh-bct">
                    <div className="footer-cskh">
                        <img src="../../../public/footer-icon/envelop.png"/>
                        <div className="title-email">
                            <h3>Chăm sóc khách hàng</h3>
                            <h2>ctsv@ptit.edu.vn</h2>
                        </div>
                    </div>
                    <img src="../../../public/footer-icon/bct.png" className="bct-icon"/>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
