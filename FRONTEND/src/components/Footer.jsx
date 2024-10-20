import styles from "../styles/Footer.module.css"
import Logo  from "../assets/homePage_images/Logo.png"
function Footer() {
    return(
        <>
            <footer className={styles.footerContainer}>
                <div className={styles.footerContent}>
                    <div className={styles.logoSection}>
                        <img src={Logo} alt="Koikung Logo"/>
                        <p>Tận tâm, chuyên nghiệp - Tạo nên sự khác biệt</p>
                        <p>Copyright © 2024 Koikung</p>
                        <div className={styles.socialIcons}>
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className={styles.linksSection}>
                        <h3>Về Koikung</h3>
                        <ul>
                            <li><a href="#">Tầm nhìn</a></li>
                            <li><a href="#">Chuyên gia</a></li>
                            <li><a href="#">Quy trình</a></li>
                            <li><a href="#">Chính sách</a></li>
                        </ul>
                    </div>
                    <div className={styles.linksSection}>
                        <h3>Dịch vụ</h3>
                        <ul>
                            <li><a href="#">Tư vấn trực tuyến</a></li>
                            <li><a href="#">Khảo sát tại nhà</a></li>
                            <li><a href="#">Đặt lịch tại trung tâm</a></li>
                            <li><a href="#">Y tế tại nhà</a></li>
                        </ul>
                    </div>
                    <div className={styles.mapSection}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=..."
                            width="300"
                            height="200"
                            allowFullScreen=""
                            loading="lazy"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <p>
                        Các thông tin trên website Koikung chỉ nhằm mục đích tham khảo. Tất cả
                        ý kiến, nội dung và thông tin không thay thế cho chẩn đoán và điều trị
                        của bác sĩ. Cảm ơn quý khách đã tin tưởng dịch vụ chăm sóc của Koikung.
                    </p>
                </div>
            </footer>

        </>
    );
}

export default Footer