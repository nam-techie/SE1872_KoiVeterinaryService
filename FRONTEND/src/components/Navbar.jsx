
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../styles/Navbar.css';
import {useNavbar} from "../hooks/useNavbar.js";
import userIcon from "../assets/images/logo.png"

function Navbar() {
    const {
        isLoggedIn,
        showDropdown,
        setShowDropdown,
        handleLogout,
    } = useNavbar();
  return (
      <>
          <nav className="navbar">
              <div className="logo">
                  <Link to="/homepage"><img src={logo} alt="logo"/></Link>
              </div>
              <ul className="nav-links">
                  <li><Link to="/homepage">Trang Chủ</Link></li>
                  <li><Link to="/aboutme">Về KoiCung</Link></li>
                  <li><Link to="/services">Dịch vụ</Link></li>
                  <li><Link to="#">Tìm Bác Sĩ</Link></li>
                  <li><Link to="/termandrefunds">Điều Khoản Và Dịch Vụ</Link></li>
                  <li><Link to="/verify-otp">Cẩm Nang</Link></li>
                  <li><Link to="#">FAQ</Link></li>
              </ul>

              <div className="auth-buttons">
                  {isLoggedIn ? (
                      <div className="user-menu">
                          <img
                              src={userIcon}
                              alt="User"
                              className="user-icon"
                              onClick={() => setShowDropdown(!showDropdown)} // Thay đổi trạng thái dropdown khi bấm vào icon người dùng
                          />
                          {showDropdown && (
                              <div className="dropdown-menu">
                                  <Link to="/profile">Thông tin cá nhân</Link>
                                  <Link to="/booking-history">Lịch sử đơn đặt</Link>
                                  <button onClick={handleLogout}>Đăng xuất</button>
                              </div>
                          )}
                      </div>
                  ) : (
                      <>
                          <Link to="/login" className="btn login-btn">Đăng nhập</Link>
                          <Link to="/register" className="btn register-btn">Đăng Kí</Link>
                      </>
                  )}
              </div>
          </nav>
      </>

  );
}

export default Navbar;
