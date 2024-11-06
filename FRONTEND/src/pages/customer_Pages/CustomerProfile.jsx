import React, {useState, useEffect} from 'react';
import styles from '../../styles/CustomerProfile.module.css';
import {CustomerNavBar} from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { useCustomerInfo } from '../../hooks/useCustomerInfo';
import useManageCus from '../../hooks/useManageCus';

const CustomerProfile = () => {
    const { user, loading, error, updateCustomerInfo } = useCustomerInfo();
    const [showEditForm, setShowEditForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        email: ''
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const { changePassword } = useManageCus();

    // Cập nhật formData khi user data được load
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                address: user.address,
                email: user.email
            });
        }
    }, [user]);

    // Tạo avatar từ tên
    const getInitials = (name) => {
        if (!name) {
            return '?';
        }
        
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

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCustomerInfo({
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                email: formData.email
            });
            setShowEditForm(false);
            alert('Cập nhật thông tin thành công!');
        } catch (error) {
            alert('Có lỗi xảy ra khi cập nhật thông tin: ' + (error.response?.data?.message || error.message));
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        // if (passwordData.newPassword !== passwordData.confirmPassword) {
        //     alert('Mật khẩu mới và xác nhận mật khẩu không khớp!');
        //     return;
        // }
        
        try {
            await changePassword({
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword
            });
            
            alert('Đổi mật khẩu thành công!');
            setPasswordData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setShowPasswordForm(false);
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <CustomerNavBar/>
            <div className={styles.profileContainer}>
                <div className={styles.profileCard}>
                    <div className={styles.avatar}>
                        {getInitials(user.fullName)}
                    </div>

                    <div className={styles.info}>
                        <h2>{user.fullName || 'Chưa cập nhật'}</h2>
                        <p><strong>Số điện thoại:</strong> {user.phoneNumber || 'Chưa cập nhật'}</p>
                        <p><strong>Địa chỉ:</strong> {user.address || 'Chưa cập nhật'}</p>
                        <p><strong>Email:</strong> {user.email || 'Chưa cập nhật'}</p>
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
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
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
                                        name="oldPassword"
                                        value={passwordData.oldPassword}
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
