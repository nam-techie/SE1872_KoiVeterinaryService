import styles from "../styles/NavBar.module.css";
import {FaMapMarkerAlt, FaPhoneAlt, FaClock} from "react-icons/fa";
import Logo from "../assets/homePage_images/Logo.png";
import {AiFillSchedule} from "react-icons/ai";
import {PiNewspaperClippingFill} from "react-icons/pi";
import {IoLogOutSharp} from "react-icons/io5";
import {FaUserLarge} from "react-icons/fa6";
import { MdDashboard } from 'react-icons/md';

import {Link, NavLink} from "react-router-dom";
import {IoLogInOutline, IoLogInSharp} from "react-icons/io5";
import {useAuthValidation} from "../utils/Validation.js";
import {useState} from "react"; // Để quản lý trạng thái hiển thị dropdown

export function CustomerNavBar() {
    const {isLoggedIn, username, handleLogout} = useAuthValidation(); // Kiểm tra trạng thái đăng nhập
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
        <FaMapMarkerAlt/> Lô E2a-7, Đ. D1, Long Thạnh Mỹ, TP.Thủ Đức, HCM
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
                        <NavLink to="/homepage">
                            <img src={Logo} alt="KOI_CUNG_LOGO"/>
                        </NavLink>
                    </div>
                    <ul className={styles.customerNavBarLinks}>
                        <li>
                            <NavLink to="/homepage" className={({isActive}) => isActive ? styles.active : ''}>
                                Trang chủ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/service" className={({isActive}) => isActive ? styles.active : ''}>
                                Dịch vụ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctor-list" className={({isActive}) => isActive ? styles.active : ''}>
                                Tìm Bác sĩ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/terms" className={({isActive}) => isActive ? styles.active : ''}>
                                Điều khoản Dịch vụ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/aboutme" className={({isActive}) => isActive ? styles.active : ''}>
                                Giới thiệu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/faqs" className={({isActive}) => isActive ? styles.active : ''}>
                                Câu hỏi thường gặp
                            </NavLink>
                        </li>
                    </ul>
                    <div className={styles.authButtons}>
                        {isLoggedIn ? (
                            <div className={styles.userIconWrapper} onClick={toggleDropdown}>
                                <FaUserLarge size={35} color={"white"}/>
                                {isDropdownOpen && (
                                    <div className={styles.dropdownMenu}>
                                        <Link to="/customer/manage-appointment">Quản lí Lịch hẹn</Link>
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


export const DoctorNavBar = () => {
    const {username, role, handleLogout} = useAuthValidation(); // Lấy role từ hook

    return (
        <div className={styles.DoctorSidebar}>
            <div className={styles.DoctorSidebarLogo}>
                [{role}] {username} {/* Hiển thị role và username */}
            </div>
            <div className={styles.DoctorSidebarLinks}>
                <a className={styles.DoctorSidebarLink} href="/doctor/doctor-dashboard">
                    <MdDashboard className={styles.icon} size={40}/> Tổng quan
                </a>
                <a className={styles.DoctorSidebarLink} href="/doctor/doctor-work-schedule">
                    <AiFillSchedule className={styles.icon} size={40}/> Lịch làm việc
                </a>
                <a className={styles.DoctorSidebarLink} href="/doctor/doctor-appointment">
                    <PiNewspaperClippingFill className={styles.icon} size={40}/> Quản lí Lịch đặt
                </a>
                <hr className={styles.separator}/>
                <a className={styles.DoctorSidebarLink} href="#logout" onClick={handleLogout}>
                    <IoLogOutSharp className={styles.icon} size={40}/> Đăng xuất
                </a>
            </div>
        </div>
    );
};
