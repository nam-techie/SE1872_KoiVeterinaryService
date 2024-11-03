import React, {useState} from 'react';
import styles from '../../styles/CustomerProfile.module.css';
import {CustomerNavBar} from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

// Mock Data
const MOCK_CUSTOMER = {
    fullName: "Nguyễn Văn An",
    phone: "0923456789",
    address: "123 Nguyễn Văn Linh, Quận 7, TP.HCM",
    email: "nguyenvanan@gmail.com"
};

const CustomerProfile = () => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [customerData, setCustomerData] = useState(MOCK_CUSTOMER);
    const [formData, setFormData] = useState({
        fullName: customerData.fullName,
        phone: customerData.phone,
        address: customerData.address,
        email: customerData.email
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Tạo avatar từ tên
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        // Giả lập API call
        console.log('Thông tin cập nhật:', formData);
        setCustomerData(formData);
        setShowEditForm(false);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }
        // Giả lập API call
        console.log('Yêu cầu đổi mật khẩu:', passwordData);
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setShowPasswordForm(false);
    };

    return (
        <>
            <CustomerNavBar/>
            <div className={styles.profileContainer}>
                <div className={styles.profileCard}>
                    <div className={styles.avatar}>
                        {getInitials(customerData.fullName)}
                    </div>

                    <div className={styles.info}>
                        <h2>{customerData.fullName}</h2>
                        <p><strong>Số điện thoại:</strong> {customerData.phone}</p>
                        <p><strong>Địa chỉ:</strong> {customerData.address}</p>
                        <p><strong>Email:</strong> {customerData.email}</p>
                    </div>

                    <div className={styles.buttons}>
                        <button
                            className={styles.editButton}
                            onClick={() => setShowEditForm(true)}
                        >
                            Chỉnh sửa thông tin
                        </button>
                        <button
                            className={styles.passwordButton}
                            onClick={() => setShowPasswordForm(true)}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </div>

                {showEditForm && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>Chỉnh sửa thông tin</h2>
                            <form onSubmit={handleEditSubmit}>
                                <div className={styles.formGroup}>
                                    <label>Họ và tên:</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Số điện thoại:</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        pattern="[0-9]{10}"
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Địa chỉ:</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.modalButtons}>
                                    <button type="submit">Lưu</button>
                                    <button type="button" onClick={() => setShowEditForm(false)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showPasswordForm && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>Đổi mật khẩu</h2>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className={styles.formGroup}>
                                    <label>Mật khẩu hiện tại:</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mật khẩu mới:</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        minLength="6"
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Xác nhận mật khẩu mới:</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        minLength="6"
                                        required
                                    />
                                </div>
                                <div className={styles.modalButtons}>
                                    <button type="submit">Lưu</button>
                                    <button type="button" onClick={() => setShowPasswordForm(false)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
};

export default CustomerProfile;
