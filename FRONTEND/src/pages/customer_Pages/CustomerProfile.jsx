// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {FaEdit, FaSave, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaEye, FaEyeSlash} from 'react-icons/fa';
import styles from './styles/CustomerProfile.module.css';
import {CustomerNavBar} from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx"; // CSS Module import

// Mock Data
const mockCustomer = {
    fullName: "Nguyễn Văn An",
    phone: "0923456789",
    email: "nguyenvanan@gmail.com",
    address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
    imageUrl: "",
    password: "********"
};

const CustomerProfile = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState({});
    const [updateMessage, setUpdateMessage] = useState({type: '', content: ''});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');

    // Tạo avatar từ tên
    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    // Tạo màu ngẫu nhiên cho avatar
    const getRandomColor = (name) => {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];
        const index = name ? name.length % colors.length : 0;
        return colors[index];
    };

    // Giả lập API call
    useEffect(() => {
        setTimeout(() => {
            setCustomer(mockCustomer);
            setEditedCustomer(mockCustomer);
            setLoading(false);
        }, 1000); // Giả lập delay 1s
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUpdateMessage({type: '', content: ''});
        }, 3000);
        return () => clearTimeout(timer);
    }, [updateMessage]);

    const handleEdit = () => {
        setIsEditing(true);
        setUpdateMessage({type: '', content: ''});
    };

    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
        setPasswordError(''); // Clear error when user types
    };

    const validatePasswords = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('Mật khẩu mới không khớp!');
            return false;
        }
        if (passwordData.newPassword.length < 6) {
            setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (passwordData.newPassword && !validatePasswords()) {
            return;
        }

        // Giả lập API call
        setLoading(true);
        setTimeout(() => {
            setCustomer(editedCustomer);
            setIsEditing(false);
            setLoading(false);
            setUpdateMessage({type: 'success', content: 'Cập nhật thông tin thành công!'});
            // Reset password fields
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setPasswordError('');
        }, 1000);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditedCustomer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div className={styles['loading']}>Đang tải...</div>;

    return (
        <>
            <CustomerNavBar/>
            <div className={styles['customer-profile']}>
                <div className={styles['profile-header']}>
                    <div
                        className={styles['avatar']}
                        style={{backgroundColor: getRandomColor(customer.fullName)}}
                    >
                        {customer.imageUrl ? (
                            <img src={customer.imageUrl} alt={customer.fullName}/>
                        ) : (
                            <span>{getInitials(customer.fullName)}</span>
                        )}
                    </div>
                    <h2>{customer.fullName || 'Khách hàng'}</h2>
                </div>

                <div className={styles['profile-info']}>
                    {isEditing ? (
                        <form className={styles['profile-form']}>
                            <div className={styles['form-group']}>
                                <label htmlFor="fullName">Họ và tên:</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={editedCustomer.fullName || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="phone">Số điện thoại:</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={editedCustomer.phone || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={editedCustomer.email || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="address">Địa chỉ:</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={editedCustomer.address || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles['password-section']}>
                                <h3>Đổi mật khẩu</h3>
                                <div className={styles['form-group']}>
                                    <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                                    <div className={styles['password-input']}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="currentPassword"
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                        />
                                        <button
                                            type="button"
                                            className={styles['toggle-password']}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                        </button>
                                    </div>
                                </div>
                                <div className={styles['form-group']}>
                                    <label htmlFor="newPassword">Mật khẩu mới:</label>
                                    <div className={styles['password-input']}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="newPassword"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                </div>
                                <div className={styles['form-group']}>
                                    <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                                    <div className={styles['password-input']}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                </div>
                                {passwordError && (
                                    <div className={styles['password-error']}>
                                        {passwordError}
                                    </div>
                                )}
                            </div>
                        </form>
                    ) : (
                        <div className={styles['profile-details']}>
                            <div className={styles['info-item']}>
                                <FaUser className={styles['info-icon']}/>
                                <div>
                                    <label>Họ và tên</label>
                                    <p>{customer.fullName}</p>
                                </div>
                            </div>
                            <div className={styles['info-item']}>
                                <FaPhone className={styles['info-icon']}/>
                                <div>
                                    <label>Số điện thoại</label>
                                    <p>{customer.phone}</p>
                                </div>
                            </div>
                            <div className={styles['info-item']}>
                                <FaEnvelope className={styles['info-icon']}/>
                                <div>
                                    <label>Email</label>
                                    <p>{customer.email}</p>
                                </div>
                            </div>
                            <div className={styles['info-item']}>
                                <FaMapMarkerAlt className={styles['info-icon']}/>
                                <div>
                                    <label>Địa chỉ</label>
                                    <p>{customer.address}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {updateMessage.content && (
                        <div className={`${styles.message} ${styles[updateMessage.type]}`}>
                            {updateMessage.content}
                        </div>
                    )}

                    {isEditing ? (
                        <button className={styles['save-button']} onClick={handleSave}>
                            <FaSave/> Lưu thay đổi
                        </button>
                    ) : (
                        <button className={styles['edit-button']} onClick={handleEdit}>
                            <FaEdit/> Chỉnh sửa thông tin
                        </button>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default CustomerProfile;
