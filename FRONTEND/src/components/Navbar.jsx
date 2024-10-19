import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../styles/Navbar.css";
import { useNavbar } from "../hooks/useNavbar.js";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaUser, FaRegFileAlt } from 'react-icons/fa';
import { FaUserDoctor } from "react-icons/fa6";

function Navbar() {
  const { isLoggedIn, role, showDropdown, setShowDropdown, handleLogout, username } = useNavbar();

  // Hàm xử lý khi bấm vào biểu tượng người dùng
  const handleUserIconClick = () => {
    setShowDropdown(!showDropdown);
  };

  // Hiển thị navbar dành cho bác sĩ
  if (role === "DOCTOR") {
    return (
        <>
          <div className="top-navbar">
            <span className="welcome-tittle"> Chào mừng [<span style={{ color: 'orangered' }}>{role}</span>] <span style={{ color: 'orangered' }}>{username}</span> đến với hệ thống KoiCung</span>
            <div className="contact-info">
              <span><FaMapMarkerAlt/> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, TP.Thủ Đức, HCM</span>
              <span><FaPhoneAlt/> 1800.999 (Miễn phí)</span>
              <span><FaClock/> 06:00 - 19:00 (Thứ Hai - Chủ Nhật)</span>
            </div>
          </div>
          <nav className="navbar">
            <div className="logo">
              <Link to="/doctor-dashboard">
                <img src={logo} alt="logo"/>
              </Link>
            </div>
            <ul className="nav-links">
              <li>
                <Link to="/doctor-dashboard">Trang Chủ Bác Sĩ</Link>
              </li>
              <li>
                <Link to="/doctor-schedule">Lịch Làm Việc</Link>
              </li>
              <li>
                <Link to="/patient-management">Quản Lý Bệnh Nhân</Link>
              </li>
              <li>
                <Link to="/doctor-profile">Thông Tin Cá Nhân</Link>
              </li>
            </ul>
            <div className="auth-buttons">
              <div onClick={handleUserIconClick} className="user-icon-wrapper">
                <FaUserDoctor size={32} className="user-icon" style={{ cursor: 'pointer' }} />
                {showDropdown && (
                    <div className="dropdown-menu">
                      <Link to="#">Thông Báo</Link>
                      <Link to="#">Lịch sử làm việc</Link>
                      <Link to="#">Phản hồi</Link>
                      <Link to="/forgot-password">Đổi Mật Khẩu</Link>
                      <hr/>
                      <Link to="/profile">Thông tin cá nhân</Link>
                      <hr/>
                      <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
                    </div>
                )}
              </div>
            </div>
          </nav>
        </>
    );
  }

  // Hiển thị navbar cho người dùng khác (không phải bác sĩ)
  return (
      <>
        <div className="top-navbar">
          <span className="welcome-tittle">
            {isLoggedIn ? (
                <>
                  Chào mừng [<span style={{ color: 'orangered' }}>{role}</span>] <span style={{ color: 'orangered' }}>{username}</span> đã đến với KoiCung
                </>
            ) : ''}
          </span>
          <div className="contact-info">
            <span><FaMapMarkerAlt /> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, TP.Thủ Đức, HCM</span>
            <span><FaPhoneAlt /> 1800.999 (Miễn phí)</span>
            <span><FaClock /> 06:00 - 19:00 (Thứ Hai - Chủ Nhật)</span>
          </div>
        </div>

        <nav className="navbar">
          <div className="logo">
            <Link to="/homepage">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/homepage">Trang Chủ</Link>
            </li>
            <li>
              <Link to="/aboutme">Về KoiCung</Link>
            </li>
            <li>
              <Link to="/services">Dịch vụ</Link>
            </li>
            <li>
              <Link to="#">Tìm Bác Sĩ</Link>
            </li>
            <li>
              <Link to="/termandrefunds">Điều Khoản Và Dịch Vụ</Link>
            </li>
            <li>
              <Link to="#">FAQ</Link>
            </li>
          </ul>

          <div className="auth-buttons">
            {isLoggedIn ? (
                <div className="user-icon-container">
                  <Link to="/booking-service-history">
                    <FaRegFileAlt
                        size={32}
                        className="file-icon"
                        style={{ cursor: 'pointer', marginRight: '25px', color: 'white' }}
                    />
                  </Link>
                  <div onClick={handleUserIconClick} className="user-icon-wrapper">
                    <FaUser
                        size={32}
                        className="user-icon"
                        style={{ cursor: 'pointer' }}
                    />
                    {showDropdown && (
                        <div className="dropdown-menu">
                          <Link to="#">Thông Báo</Link>
                          <Link to="/booking-service-history">Lịch sử đặt dịch vụ</Link>
                          <Link to="#">Quản Lí Lịch Đặt</Link>
                          <Link to="#">Phản Hồi Và Đánh Giá Dịch Vụ</Link>
                          <Link to="/forgot-password">Đổi Mật Khẩu</Link>
                          <hr/>
                          <Link to="/profile">Thông tin cá nhân</Link>
                          <hr/>
                          <button onClick={handleLogout} className="logout-button">Đăng xuất</button>
                        </div>
                    )}
                  </div>
                </div>
            ) : (
                <>
                  <Link to="/login" className="btn login-btn">
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="btn register-btn">
                    Đăng ký
                  </Link>
                </>
            )}
          </div>
        </nav>
      </>
  );
}

export default Navbar;
