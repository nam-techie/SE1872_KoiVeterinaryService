// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useAccountInfo } from './hooks/useAccountInfo';
import '../admin_pages/styles/CreateAccount.css';

const CreateAccount = ({ setActiveTab }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '' // Đảm bảo role được khởi tạo
    });
    const [error, setError] = useState('');
    const { createAccount } = useAccountInfo();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('FormData being sent:', formData); // Thay dataToSend bằng formData
        try {
            const newAccount = await createAccount(formData); // Sử dụng trực tiếp formData
            console.log('Tài khoản mới được tạo:', newAccount);
            setActiveTab('accounts');
        } catch (err) {
            console.error('Lỗi từ createAccount:', err);
            setError(err.message || 'Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại.');
        }
    };

    return (
        <div className="create-account-page">
            <button onClick={() => setActiveTab('accounts')} className="back-btn">
                <FaArrowLeft /> Quay lại
            </button>
            <div className="create-account-container">
                <h2>Tạo Tài Khoản Mới</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Tên đăng nhập:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Vai trò:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn vai trò</option>
                            <option value="CUSTOMER">Khách hàng</option>
                            <option value="VETERINARY">Bác sĩ thú y</option>
                            <option value="ADMIN">Quản trị viên</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <p>Mật khẩu tự động: 123456</p>
                    </div>
                    <button type="submit" className="submit-btn">Tạo Tài Khoản</button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
