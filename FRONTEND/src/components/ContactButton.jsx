import styles from "../styles/ContactButton.module.css";
import { Link } from "react-router-dom";
import { LiaCalendarPlus } from "react-icons/lia";
import { GrContact } from "react-icons/gr";

function ContactButton() {
    return (
        <div className={styles.buttonContainer}>
            <Link to="/customer/booking-page">
                <LiaCalendarPlus
                    size={50}
                    className={styles.userIcon}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: 'white', // Nền trắng
                        color: 'orange', // Màu cam cho icon
                        borderRadius: '50%', // Bo tròn
                        padding: '10px', // Thêm khoảng trống cho icon
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Tạo hiệu ứng bóng cho nút
                    }}
                />
            </Link>
            <Link to="https://zalo.me/0816518989" target="_blank">
                <GrContact
                    size={50}
                    className={styles.userIcon}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: 'white', // Nền trắng
                        color: 'orange', // Màu cam cho icon
                        borderRadius: '50%', // Bo tròn
                        padding: '10px', // Thêm khoảng trống cho icon
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Tạo hiệu ứng bóng cho nút
                    }}
                />
            </Link>
        </div>
    );
}

export default ContactButton;
