// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useAccountInfo } from './hooks/useAccountInfo';
import '../admin_pages/styles/VeterinaryAccount.css';


const VeterinaryAccount = ({ setActiveTab }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { createVeterinaryAccount } = useAccountInfo();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createVeterinaryAccount({ email });
            setActiveTab('accounts');
        } catch (err) {
            setError('Có lỗi xảy ra khi tạo tài khoản bác sĩ. Vui lòng thử lại.');
        }
    };

    return (
        <div className="veterinary-account-page">
            <button onClick={() => setActiveTab('accounts')} className="back-btn">
                <FaArrowLeft /> Quay lại
            </button>
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
                    <button type="submit" className="submit-btn">Tạo Tài Khoản Bác Sĩ</button>
                </form>
            </div>
        </div>
    );
};

export default VeterinaryAccount;
