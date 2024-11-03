import styles from "../styles/ContactButton.module.css";
import {Link} from "react-router-dom";
import {LiaCalendarPlus} from "react-icons/lia";
import {GrContact} from "react-icons/gr";

function ContactButton() {
    const iconStyle = {
        cursor: 'pointer',
        backgroundColor: 'white',
        color: '#ff6b00', // Màu cam đậm hơn
        borderRadius: '50%',
        padding: '12px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
    };

    return (
        <div className={styles.buttonContainer}>
            <Link to="/customer/booking-page" className={styles.iconWrapper}>
                <LiaCalendarPlus
                    size={50}
                    className={styles.userIcon}
                    style={iconStyle}
                />
            </Link>
            <Link to="https://zalo.me/0816518989" target="_blank" className={styles.iconWrapper}>
                <GrContact
                    size={50}
                    className={styles.userIcon}
                    style={iconStyle}
                />
            </Link>
        </div>
    );
}

export default ContactButton;
