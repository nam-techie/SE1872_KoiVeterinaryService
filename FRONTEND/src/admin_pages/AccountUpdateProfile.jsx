// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAccountInfo } from './hooks/useAccountInfo';
import '../admin_pages/styles/AccountUpdateProfile.css';

const AccountUpdateProfile = ({ account, onClose, onUpdate }) => {
    const [editingAccount, setEditingAccount] = useState({
        ...account,
        originalUsername: account.originalUsername || account.username
    });
    const [error, setError] = useState('');
    const { updateAccountInfo } = useAccountInfo();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const updatedAccount = await updateAccountInfo({
                originalUsername: editingAccount.originalUsername,
                username: editingAccount.username,
                email: editingAccount.email,
                role: editingAccount.role
            });
            onUpdate(updatedAccount);
            onClose();
        } catch (err) {
            console.error('Lỗi khi cập nhật tài khoản:', err);
            if (err.response) {
                setError(err.response.data);
            } else {
                setError('Có lỗi xảy ra khi cập nhật tài khoản. Vui lòng thử lại sau.');
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingAccount(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="account-update-profile-container">
            <h2>Chỉnh sửa thông tin tài khoản</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Tên người dùng:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={editingAccount.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={editingAccount.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Vai trò:</label>
                    <select
                        id="role"
                        name="role"
                        value={editingAccount.role}
                        onChange={handleChange}
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="VETERINARY">VETERINARY</option>
                    </select>
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-btn">Cập nhật</button>
                    <button type="button" onClick={onClose} className="cancel-btn">Hủy</button>
                </div>
            </form>
        </div>
    );
};

export default AccountUpdateProfile;
