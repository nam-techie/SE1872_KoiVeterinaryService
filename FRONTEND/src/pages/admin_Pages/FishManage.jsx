import React, { useState, useEffect } from 'react';
import { FaSearch, FaSort, FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import './styles/FishManage.css';
import LoadingCat from '../../components/LoadingCat.jsx';
import useFish from './hooks/useFish';
import EditFishModal from './EditFishModal';

const FishManage = () => {
    const { fishes, loading, error, fetchFishes } = useFish();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editingFish, setEditingFish] = useState(null);

    useEffect(() => {
        fetchFishes();
    }, []);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    if (loading) return <LoadingCat />;
    if (error) return <div className="error-message">{error}</div>;

    const sortedFishes = [...fishes].sort((a, b) => {
        if (sortBy === 'id') {
            return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
        } else if (sortBy === 'name') {
            return sortOrder === 'asc' 
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (sortBy === 'age') {
            return sortOrder === 'asc' ? a.age - b.age : b.age - a.age;
        } else if (sortBy === 'weight') {
            return sortOrder === 'asc' ? a.weight - b.weight : b.weight - a.weight;
        }
        return 0;
    });

    const filteredFishes = sortedFishes.filter(fish =>
        fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fish.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (fish) => {
        setEditingFish(fish);
    };

    const handleSave = (updatedFish) => {
        // Cập nhật danh sách cá với thông tin mới
        const updatedFishes = fishes.map(f => 
            f.id === updatedFish.id ? updatedFish : f
        );
        // Cập nhật state fishes với danh sách mới
        // Đây chỉ là ví dụ, bạn cần điều chỉnh theo cách bạn quản lý state
        // setFishes(updatedFishes);
        setEditingFish(null);
    };

    const handleSaveAndReload = async (updatedFish) => {
        await fetchFishes(); // Tải lại danh sách cá
        setEditingFish(null); // Đóng modal
    };

    return (
        <div className="fish-manage">
            <div className="dashboard-header">
                <h2>Quản Lý Hồ Sơ Cá Koi</h2>
                <div className="action-buttons">
                </div>
            </div>
            <div className="search-sort-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm cá..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="sort-box">
                    <select
                        onChange={(e) => handleSort(e.target.value)}
                        value={sortBy}
                        className="sort-select"
                    >
                        <option value="id">Sắp xếp theo ID</option>
                        <option value="name">Sắp xếp theo Tên</option>
                        <option value="age">Sắp xếp theo Tuổi</option>
                        <option value="weight">Sắp xếp theo Cân nặng</option>
                    </select>
                </div>
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="sort-order-btn"
                >
                    {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
                    <FaSort />
                </button>
            </div>
            <div className="fish-table">
                <table>
                    <thead>
                        <tr>
                            <th>MS hồ sơ</th>
                            <th>Tên cá</th>
                            <th>Giống loài</th>
                            <th>Tuổi</th>
                            <th>Màu sắc</th>
                            <th>Cân nặng (kg)</th>
                            <th>Tình trạng sức khỏe</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFishes.map((fish) => (
                            <tr key={fish.id}>
                                <td>{fish.appointmentId}</td>
                                <td>{fish.name}</td>
                                <td>{fish.breed}</td>
                                <td>{fish.age}</td>
                                <td>{fish.color}</td>
                                <td>{fish.weight.toFixed(2)}</td>
                                <td>{fish.healthStatus}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(fish)}>
                                        <FaEdit />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingFish && (
                <EditFishModal
                    fish={editingFish}
                    onClose={() => setEditingFish(null)}
                    onSave={handleSaveAndReload}
                />
            )}
        </div>
    );
};

export default FishManage;
