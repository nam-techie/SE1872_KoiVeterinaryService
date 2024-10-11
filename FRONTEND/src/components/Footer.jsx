
import '../styles/Footer.css'; // Tạo file CSS riêng để định dạng
import logo from "../assets/images/logo.png"
import '@fortawesome/fontawesome-free/css/all.min.css';



function Footer() {
  return (
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Về Koikung</h3>
            <ul>
              <li><a href="#">Giới thiệu</a></li>
              <li><a href="#">Bác sĩ</a></li>
              <li><a href="#">Quy trình</a></li>
              <li><a href="#">Chính sách</a></li>
              <li><a href="#">Câu hỏi thường gặp</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Dịch vụ</h3>
            <ul>
              <li><a href="#">Tư vấn trực tuyến</a></li>
              <li><a href="#">Khảo sát tại nhà</a></li>
              <li><a href="#">Đặt lịch tại trung tâm</a></li>
              <li><a href="#">Y tế tại nhà</a></li>
            </ul>
          </div>

          <div className="footer-section contact-section">
            <h3>Liên hệ với chúng tôi</h3>
            <ul>
              <li><a href="#"><i className="fas fa-envelope"></i> Koikungcenter@gmail.com</a></li>
              <li><a href="#"><i className="fas fa-phone"></i> 1800.999 (Miễn phí)</a></li>
            </ul>
            <br/>
            <h4>Địa chỉ</h4>
            <p><i className="fas fa-map-marker-alt"></i> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, TP.Thủ Đức, HCM
            </p>
          </div>

          <div className="footer-section map-section">
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

        <div className="social-media">
          <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
        </div>


        <div className="footer-bottom">
          <p>
            Các thông tin trên Website Koikung chỉ nhằm mục đích tham khảo. Tất cả ý kiến, nội dung và thông tin không
            thay thế cho chẩn đoán và điều trị của bác sĩ. Cảm ơn quý khách đã tin tưởng dịch vụ chăm sóc của chúng tôi.
          </p>
          <p>© 2024 Trung tâm KoiKung. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>

  );
};

export default Footer;
