import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import '../css/PostDetail.css';

const MyComponent = () => {
    return (
        <div className="post-detail-body">
            <div className="post-detail-container">
                <div className="post-detail">
                    <div className="post-images">
                        <div className="post-main-image">
                            <img src="../../public/detail-icon/home.png"/>
                            <button className="next">
                                <FontAwesomeIcon icon={faAngleRight} />
                            </button>
                            <button className="prev">
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                        </div>
                        <div className="post-images-thumbnail">
                            <img src="../../public/detail-icon/home.png" className="thumbnail"/>
                            <img src="../../public/detail-icon/home.png" className="thumbnail"/>
                            <img src="../../public/detail-icon/home.png" className="thumbnail"/>
                            <img src="../../public/detail-icon/home.png" className="thumbnail"/>
                        </div>
                    </div>
                    <h1>ĐỘC QUYỀN CHO THUÊ CĂN HỘ 2PN AKARI CITY NAM LONG</h1>
                    <img src="../../public/detail-icon/line.png" className="line"/>
                    <div className="post-detail-mixed">
                        <div className="main-content">
                            <div className="post-detail-price">
                                <p className="title">Mức giá</p>
                                <p className="emphasize">8 triệu/tháng</p>
                            </div>
                            <div className="post-detail-area">
                                <p className="title">Diện tích</p>
                                <p className="emphasize">62m&sup2;</p>
                            </div>
                            <div className="post-detail-bedroom">
                                <p className="title">Phòng ngủ</p>
                                <p className="emphasize">1 PN</p>
                            </div>
                            <div className="post-detail-function">
                                <img src="../../public/detail-icon/share.png" className="share"/>
                                <img src="../../public/detail-icon/alert.png" className="report"/>
                                <img src="../../public/detail-icon/heart.png" className="save"/>
                            </div>
                        </div>
                        <div className="post-location">
                            <img src="../../public/detail-icon/location.png"/>
                            <p>Akari City Nam Long, Võ Văn Kiệt, An Lạc, Bình Tân, Hồ Chí Minh</p>
                        </div>
                        <div className="post-time">
                            <img src="../../public/detail-icon/clock.png"/>
                            <p>12:00, 13/03/2025</p>
                        </div>
                    </div>
                    <img src="../../public/detail-icon/line.png" className="line"/>
                    <div className="post-detail-description">
                        <h2>Thông tin mô tả</h2>
                        <div className="description-content">
                            <p>Cho thuê căn hộ Akari City Không gian sống hiện đại giữa lòng Sài Gòn</p>
                            <br/>
                            <p>Bạn đang tìm kiếm một nơi an cư lý tưởng với tiện nghi đẳng cấp và vị trí thuận lợi? Căn hộ Akari City chính là lựa chọn hoàn hảo dành cho bạn!</p>
                            <br/>
                            <p>Tổng quan dự án:</p>
                            <p>Vị trí: Số 77 Đại lộ Võ Văn Kiệt, phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh.</p>
                            <p>Chủ đầu tư: Tập đoàn Nam Long hợp tác cùng hai đối tác Nhật Bản.</p>
                            <p>Quy mô: Khu đô thị rộng hơn 8,5 ha với 3 giai đoạn phát triển, cung cấp gần 5.000 căn hộ.</p>
                            <br/>
                            <p>Thông tin căn hộ cho thuê:</p>
                            <p>Diện tích và giá thuê:</p>
                            <p>- Căn hộ 2 phòng ngủ, 1 phòng tắm (60-63m²): 8 triệu đồng/tháng.</p>
                            <p>- Căn hộ 2 phòng ngủ, 2 phòng tắm (78-81m²): 9 - 9,5 triệu đồng/tháng.</p>
                            <p>- Căn hộ 2 phòng ngủ, 2 phòng tắm (84-89m²): 10,5 - 11 triệu đồng/tháng.</p>
                            <p>- Căn hộ 3 phòng ngủ, 2 phòng tắm (93-99m²): 12 - 14 triệu đồng/tháng.</p>
                            <br/>
                            <p>Tiện ích nội khu: Hồ bơi riêng cho từng giai đoạn, trung tâm thương mại, sân thể thao, phòng gym, yoga, vườn Nhật, khu vui chơi trẻ em, thư viện và nhiều tiện ích khác.</p>
                            <br/>
                            <p>Tình trạng bàn giao: Hoàn thiện cơ bản theo tiêu chuẩn Flora của chủ đầu tư Nam Long.</p>
                            <br/>
                            <p>Ưu điểm nổi bật:</p>
                            <p>- Vị trí chiến lược: Nằm trên trục đại lộ Võ Văn Kiệt, dễ dàng di chuyển đến trung tâm Quận 1 chỉ trong 20 phút.</p>
                            <p>- Thiết kế hiện đại: Căn hộ được thiết kế thông minh, tối ưu hóa không gian và ánh sáng tự nhiên.</p>
                            <p>- Tiện ích đa dạng: Đáp ứng mọi nhu cầu sống, giải trí và thư giãn của cư dân.</p>
                            <br/>
                            <p>Liên hệ ngay để biết thêm chi tiết và sắp xếp lịch xem nhà.</p>
                        </div>
                    </div>
                    <img src="../../public/detail-icon/line.png" className="line"/>
                    <div className="post-property">
                        <h2>Đặc điểm phòng trọ</h2>
                        <div className="properties">
                            <div className="left">
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/dong.png"/>
                                        <p>Mức giá</p>
                                    </div>
                                    <p id="sub-price">8 triệu/tháng</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/area.png"/>
                                        <p>Diện tích</p>
                                    </div>
                                    <p id="sub-area">62m&sup2;</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/bedroom.png"/>
                                        <p>Phòng ngủ</p>
                                    </div>
                                    <p id="sub-bedroom">2 phòng</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/bathroom.png"/>
                                        <p>Phòng tắm, vệ sinh</p>
                                    </div>
                                   <p id="sub-bathroom">2 phòng</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/clock.png"/>
                                        <p>Thời gian dự kiến vào ở</p>
                                    </div>
                                    <p id="sub-move-time">Ở ngay</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                            </div>
                            <div className="right">
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/electric.png"/>
                                        <p>Giá điện</p>
                                    </div>
                                    <p id="electric-price">Theo nhà cung cấp</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/water.png"/>
                                        <p>Giá nước</p>
                                    </div>
                                    <p id="sub-water-price">Theo nhà cung cấp</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/wifi.png"/>
                                        <p>Giá Internet</p>
                                    </div>
                                    <p id="internet-price">150k/tháng</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/security.png"/>
                                        <p>An ninh</p>
                                    </div>
                                    <p id="sub-security">Camera, PCCC, Bảo vệ</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                                <div className="sub">
                                    <div className="title">
                                        <img src="../../public/detail-icon/furniture.png"/>
                                        <p>Nội thất</p>
                                    </div>
                                    <p id="sub-furniture">Căn bản</p>
                                </div>
                                <img src="../../public/detail-icon/line.png" className="line"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="post-user">
                    <div className="user-profile">
                        <img src="../../public/detail-icon/account.png" className="avatar"/>
                        <div className="name-status">
                            <p className="name">Nguyễn Văn A</p>
                            <div className="status">
                                <img src="../../public/detail-icon/offline.png"/>
                                <p>Offline</p>
                            </div>
                        </div>
                    </div>
                    <div className="user-background">
                        <div className="sub">
                            <p>Tham gia URPLACE</p>
                            <p id="sub-join">3 ngày</p>
                        </div>
                        <img src="../../public/detail-icon/stand-line.png" className="stand-line"/>
                        <div className="sub">
                            <p>Tin đăng đang có</p>
                            <p id="sub-post">1 tin</p>
                        </div>
                        <img src="../../public/detail-icon/stand-line.png" className="stand-line"/>
                        <div className="sub">
                            <p>Tỉ lệ phản hồi</p>
                            <p id="sub-rep">90%</p>
                        </div>
                    </div>
                    <div  className="post-user-number-bounding">
                        <img src="../../public/detail-icon/phone-ring.png"/>
                        <p id="post-user-number">0912437812</p>
                    </div>
                    <div className="post-user-chatting-bounding">
                        <img src="../../public/detail-icon/chat-icon.png"/>
                        <p id="post-user-chatting">Nhắn tin ngay</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
