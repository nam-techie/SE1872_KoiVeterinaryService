import styles from "../styles/NavBar.module.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock} from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import Logo from "../assets/homePage_images/logo.png";
import { Link } from "react-router-dom";
import { IoLogInOutline, IoLogInSharp } from "react-icons/io5";
import { useAuthValidation } from "../utils/Validation.js";
import { useState } from "react"; // Để quản lý trạng thái hiển thị dropdown

export function CustomerNavBar() {
  const { isLoggedIn, username, handleLogout } = useAuthValidation(); // Kiểm tra trạng thái đăng nhập
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý trạng thái dropdown

  // Hàm để toggle dropdown khi nhấn vào icon
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
      <>
        <div className={styles.topPage}>
          <div className={styles.customerTopNavBar}>
            <div className={styles.welcomeInfo}>
              {isLoggedIn && (
                  <span>
          Xin Chào <span style={{color: "orangered"}}>{username}</span>
        </span>
              )}
            </div>
            <div className={styles.contactInfo}>
      <span>
        <FaMapMarkerAlt/> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, TP.Thủ Đức, HCM
      </span>
              <span>
        <FaPhoneAlt/> 1800.999 (Miễn phí)
      </span>
              <span>
        <FaClock/> 06:00 - 19:00 (Thứ Hai - Chủ Nhật)
      </span>
            </div>
          </div>
          <nav className={styles.customerNavBarContainer}>
            <div className={styles.customerNavBarLogo}>
              <Link to="/homepage">
                <img src={Logo} alt="KOI_CUNG_LOGO"/>
              </Link>
            </div>
            <ul className={styles.customerNavBarLinks}>
              <li>
                <Link to="/homepage">Trang Chủ</Link>
              </li>
              <li>
                <Link to="/aboutme">Về KOI CUNG</Link>
              </li>
              <li>
                <Link to="/service">Dịch Vụ</Link>
              </li>
              <li>
                <Link to="/doctor-list">Tìm Bác Sĩ</Link>
              </li>
              <li>
                <Link to="/aboutme">Điều Khoản Và Dịch Vụ</Link>
              </li>
              <li>
                <Link to="/faq">Câu Hỏi Thường Gặp</Link>
              </li>
            </ul>
            <div className={styles.authButtons}>
              {isLoggedIn ? (
                  <div className={styles.userIconWrapper} onClick={toggleDropdown}>
                    <FaUserLarge size={35} color={"white"}/>
                    {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                          <Link to="#">Thông Báo</Link>
                          <Link to="/booking-service-history">Lịch sử đặt dịch vụ</Link>
                          <Link to="#">Quản Lí Lịch Đặt</Link>
                          <Link to="#">Phản Hồi Và Đánh Giá Dịch Vụ</Link>
                          <Link to="/forgot-password">Đổi Mật Khẩu</Link>
                          <hr/>
                          <Link to="/profile">Thông tin cá nhân</Link>
                          <hr/>
                          <button onClick={handleLogout} className={styles.logoutButton}>
                            Đăng xuất
                          </button>
                        </div>
                    )}
                  </div>
              ) : (
                  <>
                    <Link className={styles.loginBtn} to="/login">
                      Đăng Nhập <IoLogInOutline size={20}/>
                    </Link>
                    <Link className={styles.registerBtn} to="/register">
                      Đăng Kí <IoLogInSharp size={20}/>
                    </Link>
                  </>
              )}
            </div>
          </nav>
        </div>
      </>
  );
}
