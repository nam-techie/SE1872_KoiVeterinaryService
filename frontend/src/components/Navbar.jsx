
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/homepage"><img src={logo} alt="logo" /></Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/homepage">Trang Chủ</Link></li>
        <li><Link to="/AboutMe">Về KoiCung</Link></li>
        <li>
          <Link to="#">Dịch vụ</Link>
          <ul className="dropdown">
            <li><Link to="#">Dịch vụ tư vấn</Link></li>
            <li><Link to="#">Đặt lịch khám tại trung tâm</Link></li>
            <li><Link to="#">Đặt dịch vụ theo yêu cầu</Link></li>
          </ul>
        </li>
        <li><Link to="#">Tìm Bác Sĩ</Link></li>
        <li><Link to="#">Quy Trình</Link></li>
        <li><Link to="#">Cẩm Nang</Link></li>
        <li><Link to="#">FAQ</Link></li>
      </ul>
      <div className="auth-buttons">
        <Link to="/login" className="btn login-btn">Đăng nhập</Link>
        <Link to="/register" className="btn register-btn">Đăng Kí</Link>
      </div>
    </nav>
  );
}

export default Navbar;
