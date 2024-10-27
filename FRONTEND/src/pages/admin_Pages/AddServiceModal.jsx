import React, { useState } from 'react';
import { useServiceType } from './hooks/useServiceType';
import './styles/AddServiceModal.css';

const AddServiceModal = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const { addServiceType } = useServiceType();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Xóa lỗi cũ nếu có
        try {
            const newService = { name, base_price: parseFloat(basePrice), description };
            await addServiceType(newService);
            onSave(); // Gọi hàm onSave để tải lại trang ServiceDashboard
            onClose(); // Đóng modal sau khi thêm thành công
        } catch (error) {
            console.error('Lỗi khi thêm mới dịch vụ:', error);
            if (error.status === 409) {
                setError(error.data || 'Loại dịch vụ đã tồn tại!');
            } else if (error.status === 400) {
                setError(error.data || 'Dữ liệu không hợp lệ!');
            } else {
                setError('Có lỗi xảy ra khi thêm mới dịch vụ. Vui lòng thử lại!');
            }
        }
    };

    return (
        <div className="add-service-modal-overlay">
            <div className="add-service-modal-content">
                <h2>Thêm mới dịch vụ</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="add-service-form-group">
                        <label htmlFor="name">Tên Loại Dịch Vụ</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-service-form-group">
                        <label htmlFor="basePrice">Giá Cơ Bản</label>
                        <input
                            type="number"
                            id="basePrice"
                            value={basePrice}
                            onChange={(e) => setBasePrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-service-form-group">
                        <label htmlFor="description">Mô Tả</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                        />
                    </div>
                    <div className="add-service-button-group">
                        <button type="button" className="add-service-cancel-btn" onClick={onClose}>Hủy yêu cầu</button>
                        <button type="submit" className="add-service-save-btn">Lưu thông tin</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddServiceModal;
