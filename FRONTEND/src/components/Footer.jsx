import styles from "../styles/Footer.module.css";
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome for icons

function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.footerContent}>
                {/* Phần Về Koikung */}
                <div className={styles.footerSection}>
                    <h3 className={styles.footerSectionTitle}>Về KoiKung</h3>
                    <ul className={styles.footerList}>
                        <li className={styles.footerListItem}><a href="/aboutme" className={styles.footerLink}>Giới thiệu</a>
                        </li>
                        <li className={styles.footerListItem}><a href="/doctor-list" className={styles.footerLink}>Bác sĩ</a></li>
                        <li className={styles.footerListItem}><a href="/service" className={styles.footerLink}>Điều khoản Dịch
                            vụ</a></li>
                        <li className={styles.footerListItem}><a href="/faqs" className={styles.footerLink}>Câu hỏi thường
                            gặp</a></li>
                    </ul>
                </div>

                {/* Phần Dịch vụ */}
                <div className={styles.footerSection}>
                    <h3 className={styles.footerSectionTitle}>Dịch vụ</h3>
                    <ul className={styles.footerList}>
                        <li className={styles.footerListItem}><a href="/service" className={styles.footerLink}>Tư vấn trực
                            tuyến</a></li>
                        <li className={styles.footerListItem}><a href="/service" className={styles.footerLink}>Khảo sát tại
                            nhà</a></li>
                        <li className={styles.footerListItem}><a href="/service" className={styles.footerLink}>Đặt lịch tại
                            trung tâm</a></li>
                        <li className={styles.footerListItem}><a href="/service" className={styles.footerLink}>Y tế tại nhà</a>
                        </li>
                    </ul>
                </div>

                {/* Phần Liên hệ */}
                <div className={`${styles.footerSection} ${styles.contactSection}`}>
                    <h3 className={styles.footerSectionTitle}>Liên hệ với chúng tôi</h3>
                    <ul className={styles.footerList}>
                        <li className={styles.footerListItem}>
                            <i className={`fas fa-envelope ${styles.contactSectionIcon}`}></i>
                            <span>Koikungcenter@gmail.com</span>
                        </li>
                        <li className={styles.footerListItem}>
                            <i className={`fas fa-phone ${styles.contactSectionIcon}`}></i>
                            <span>1800.999 (Miễn phí)</span>
                        </li>
                        <li className={styles.footerListItem}>
                            <i className={`fas fa-map-marker-alt ${styles.contactSectionIcon}`}></i>
                            <span> Lô E2a-7, Đường D1, Long Thạnh Mỹ, Thủ Đức, TP.HCM</span>
                        </li>
                    </ul>
                </div>

                {/* Phần Google Maps */}
                <div className={styles.mapSection}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105370124!2d106.80730807480579!3d10.841127589311634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1728661899242!5m2!1sen!2s"
                        width="300"
                        height="200"
                        style={{border: "0"}}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Map"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            {/* Phần mạng xã hội */}
            <div className={styles.socialMedia}>
                <a href="https://www.facebook.com/nhatan200804" className={styles.socialIcon}><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.facebook.com/nhatan200804" className={styles.socialIcon}><i className="fab fa-youtube"></i></a>
                <a href="https://www.facebook.com/nhatan200804" className={styles.socialIcon}><i className="fab fa-instagram"></i></a>
                <a href="https://www.facebook.com/nhatan200804" className={styles.socialIcon}><i className="fab fa-tiktok"></i></a>
                <a href="https://www.facebook.com/nhatan200804" className={styles.socialIcon}><i className="fab fa-threads"></i></a>
                <a href="https://www.facebook.com/nhatan200804" className={styles.socialIcon}><i className="fab fa-telegram"></i></a>
            </div>

            {/* Phần Footer Bottom */}
            <div className={styles.footerBottom}>
                <p>
                    Các thông tin trên Website Koikung chỉ nhằm mục đích tham khảo. Tất cả ý kiến, nội dung và thông tin
                    không thay thế cho chẩn đoán và điều trị của bác sĩ. Cảm ơn Quý khách đã tin tưởng dịch vụ chăm sóc
                    của
                    chúng tôi.
                </p>
                <p>© 2024 Trung tâm KoiKung. Tất cả các quyền được bảo lưu.</p>
            </div>
        </footer>
    );
}

export default Footer;
