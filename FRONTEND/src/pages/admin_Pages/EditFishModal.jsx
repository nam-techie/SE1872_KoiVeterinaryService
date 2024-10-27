import React, { useState } from 'react';
import './styles/EditFishModal.css';
import useFish from './hooks/useFish';


const EditFishModal = ({ fish, onClose, onSave }) => {
    const [editedFish, setEditedFish] = useState(fish);
    const [error, setError] = useState('');
    const { updateFish } = useFish();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedFish(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const updatedFish = await updateFish(editedFish);
            onSave(updatedFish);
        } catch (error) {
            setError('Có lỗi xảy ra khi cập nhật thông tin cá. Vui lòng thử lại!');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Chỉnh sửa thông tin cá</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Tên cá</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={editedFish.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="breed">Giống loài</label>
                        <input
                            type="text"
                            id="breed"
                            name="breed"
                            value={editedFish.breed}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Tuổi</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={editedFish.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="color">Màu sắc</label>
                        <input
                            type="text"
                            id="color"
                            name="color"
                            value={editedFish.color}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Cân nặng (kg)</label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            step="0.01"
                            value={editedFish.weight}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="healthStatus">Tình trạng sức khỏe</label>
                        <input
                            type="text"
                            id="healthStatus"
                            name="healthStatus"
                            value={editedFish.healthStatus}
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

export default EditFishModal;
