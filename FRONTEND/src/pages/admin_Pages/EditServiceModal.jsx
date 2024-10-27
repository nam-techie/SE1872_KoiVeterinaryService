import React, { useState } from 'react';
import { useServiceType } from './hooks/useServiceType';
import './styles/EditServiceModal.css';

const EditServiceModal = ({ service, onClose, onSave }) => {
    const { editServiceType } = useServiceType();
    const [editedService, setEditedService] = useState(service);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedService(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Xóa lỗi cũ nếu có
        try {
            await editServiceType(service.id, editedService);
            onSave(editedService);
            onClose();
        } catch (error) {
            console.error('Lỗi khi cập nhật dịch vụ:', error);
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
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Chỉnh sửa thông tin dịch vụ</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Tên Loại Dịch Vụ</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={editedService.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="base_price">Giá Cơ Bản</label>
                        <input
                            type="number"
                            id="base_price"
                            name="base_price"
                            value={editedService.base_price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Mô Tả</label>
                        <textarea
                            id="description"
                            name="description"
                            value={editedService.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={onClose}>Hủy yêu cầu</button>
                        <button type="submit">Lưu thông tin</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditServiceModal;
