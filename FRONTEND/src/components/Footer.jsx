
import '../styles/Footer.css'; // Tạo file CSS riêng để định dạng
import logo from "../assets/images/logo.png"

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <img src={logo} alt="Koikung Logo" />
          <p>Tận tâm, chuyên nghiệp - Tạo nên sự khác biệt</p>
          <p>Copyright © 2024 Koikung</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-section links-section">
          <h3>Về Koikung</h3>
          <ul>
            <li><a href="#">Tầm nhìn</a></li>
            <li><a href="#">Chuyên gia</a></li>
            <li><a href="#">Quy trình</a></li>
            <li><a href="#">Chính sách</a></li>
          </ul>
        </div>
        <div className="footer-section links-section">
          <h3>Dịch vụ</h3>
          <ul>
            <li><a href="#">Tư vấn trực tuyến </a></li>
            <li><a href="#">Khảo sát tại tại nhà</a></li>
            <li><a href="#">Đặt lịch tại trung tâm</a></li>
            <li><a href="#">Y tế tại nhà</a></li>
          </ul>
        </div>
        <div className="footer-section map-section">
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
      <div className="footer-bottom">
        <p>
          Các thông tin trên website Koikung chỉ nhằm mục đích tham khảo. Tất cả
          ý kiến, nội dung và thông tin không thay thế cho chẩn đoán và điều trị
          của bác sĩ. Cảm ơn quý khách đã tin tưởng dịch vụ chăm sóc của Koikung.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
