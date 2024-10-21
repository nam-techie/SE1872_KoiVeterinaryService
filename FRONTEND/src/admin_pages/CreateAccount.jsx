// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAccountInfo } from './hooks/useAccountInfo';
import '../admin_pages/styles/CreateAccount.css';

const CreateAccount = ({ setActiveTab }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: ''
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
        try {
            const newAccount = await createAccount(formData);
            console.log('Tài khoản mới được tạo:', newAccount);
            setActiveTab('accounts');
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại.');
        }
    };

    return (
        <div className="create-account-page">
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
                            <option value="CUSTOMER">CUSTOMER</option>
                            <option value="VETERINARY">VETERINARY</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <p>Mật khẩu tự động: 123456</p>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-btn">Tạo Tài Khoản</button>
                        <button type="button" onClick={() => setActiveTab('accounts')} className="cancel-btn">Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
