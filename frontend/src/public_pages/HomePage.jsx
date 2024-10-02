import "../styles/HomePage.css";
import veterian from "../assets/images/veterian.jpg";
import innovation from "../assets/images/Inovation Icon.png"
import tech from "../assets/images/Tech Icon.jpg"
import expert from "../assets/images/Expert Icon.png"
import quality from "../assets/images/Quality Icon.jpg"
import qanda from "../assets/images/Q&A.jpg"

function HomePage() {
    return (
        <>
            <div className="homepage-container">
                <div className="homepage-first">
                    <div className="homepage-left">
                        <div className="intro">
                            <h1>“Tận tâm, chuyên nghiệp – Tạo nên sự khác biệt”</h1>
                            <p>
                                Với tâm huyết và sự am hiểu sâu sắc về cá Koi, chúng tôi luôn đặt
                                chất lượng lên hàng đầu trong từng dịch vụ. Sự khác biệt đến từ
                                quy trình chăm sóc chuyên nghiệp và đội ngũ giàu kinh nghiệm, mang
                                lại sự an tâm cho khách hàng.
                            </p>
                            <button className="cta-button">Đặt Lịch Ngay</button>
                        </div>
                    </div>
                    <div className="homepage-right">
                        <img src={veterian} alt="Veterian"/>
                    </div>
                </div>
            </div>
            <div className="why-choose-container">
                <h1>Tại sao nên chọn KoiKung?</h1>
                <div className="red-line"></div>
                <div className="content-container">
                    <div className="info-box">
                        <div className="info-item">
                            <img src={expert} alt="Expert Icon" className="info-icon"/>
                            <h3>Chuyên gia hàng đầu</h3>
                            <p>
                                Trung tâm chúng tôi sở hữu đội ngũ chuyên gia cá Koi giàu kinh nghiệm, kết hợp cùng các
                                kỹ thuật
                                viên chuyên chăm sóc cá bài bản. Luôn tận tâm trong từng khâu chăm sóc và điều trị.
                                Chúng tôi
                                cam kết mang lại dịch vụ chất lượng cao và sự hài lòng cho khách hàng.
                            </p>
                        </div>
                        <div className="info-item">
                            <img src={quality} alt="Quality Icon" className="info-icon"/>
                            <h3>Chất lượng xứng tầm</h3>
                            <p>
                                Trung tâm KoiKung được quản lý và vận hành bởi sự giám sát của những nhà quản lý giàu
                                kinh
                                nghiệm, cùng với sự hỗ trợ của phương tiện kỹ thuật hiện đại, mang lại cho quý khách
                                dịch vụ
                                chăm sóc cá Koi toàn diện và hiệu quả.
                            </p>
                        </div>
                        <div className="info-item">
                            <img src={tech} alt="Technology Icon" className="info-icon"/>
                            <h3>Công nghệ tiên tiến</h3>
                            <p>
                                Trung tâm chúng tôi cung cấp cơ sở vật chất hiện đại và dịch vụ chuyên nghiệp, ứng dụng
                                công
                                nghệ tiên tiến trong chăm sóc cá Koi. Đội ngũ kỹ thuật giàu kinh nghiệm bảo đảm mang lại
                                sự tối
                                ưu và hiệu quả cao, giúp cá Koi luôn phát triển toàn diện.
                            </p>
                        </div>
                        <div className="info-item">
                            <img src={innovation} alt="Innovation Icon" className="info-icon"/>
                            <h3>Nghiên cứu & Đổi mới</h3>
                            <p>
                                Chúng tôi không ngừng nâng cao kiến thức và cập nhật những nghiên cứu mới nhất để đào
                                tạo đội
                                ngũ chuyên gia cá Koi. Luôn tìm kiếm những phương pháp mới và sáng tạo để mang đến tiêu
                                chuẩn
                                chăm sóc tốt nhất.
                            </p>
                        </div>
                    </div>
                    <div className="image-container">
                        <img src={qanda} alt="Question and Check" className="main-image"/>
                    </div>
                </div>
            </div>
            <div className="veterian-information-list">
                <h1>Đội ngũ y bác sĩ tại trung tâm</h1>
                <div className="red-line"></div>
            </div>
            </>


            );
            }

            export default HomePage;
