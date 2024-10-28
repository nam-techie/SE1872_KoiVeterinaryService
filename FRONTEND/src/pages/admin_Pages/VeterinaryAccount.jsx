// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useAccountInfo } from './hooks/useAccountInfo';
import './admin_pages/styles/VeterinaryAccount.css';


const VeterinaryAccount = ({ setActiveTab }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { createVeterinaryAccount } = useAccountInfo();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVeterinaryAccount({ email });
            setActiveTab('accounts');
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Có lỗi xảy ra khi tạo tài khoản bác sĩ. Vui lòng thử lại.');
        }
    };

    return (
        <div className="veterinary-account-page">
            <div className="veterinary-account-container">
                <h2>Tạo Tài Khoản Bác Sĩ</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu:</label>
                        <p>Mật khẩu tự động: 123456</p>
                    </div>
                    <div className="form-group">
                        <label>Tên đăng nhập:</label>
                        <p>Tự động tạo từ email</p>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-btn">Tạo Tài Khoản Bác Sĩ</button>
                        <button type="button" onClick={() => setActiveTab('accounts')} className="cancel-btn">Hủy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VeterinaryAccount;
