import React, { useState, useEffect } from 'react';
import { FaSearch, FaSort, FaTrash, FaUndo, FaEdit, FaPlus } from 'react-icons/fa';
import './styles/ServiceDashboard.css';
import LoadingCat from '../../components/LoadingCat.jsx';
import { useServiceType } from './hooks/useServiceType';
import EditServiceModal from './EditServiceModal'; // Tạo component này sau
import AddServiceModal from './AddServiceModal';

const ServiceDashboard = () => {
    const { serviceTypes, loading, error, fetchServiceTypes, deleteServiceType, restoreServiceType, setServiceTypes, addServiceType } = useServiceType();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [editingService, setEditingService] = useState(null);
    const [isAddingService, setIsAddingService] = useState(false);

    useEffect(() => {
        fetchServiceTypes();
    }, []);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa loại dịch vụ này?')) {
            try {
                await deleteServiceType(id);
                setServiceTypes(prevServiceTypes => 
                    prevServiceTypes.map(serviceType => 
                        serviceType.id === id ? {...serviceType, deleted: true} : serviceType
                    )
                );
                alert('Loại dịch vụ đã được xóa thành công.');
            } catch (err) {
                console.error('Lỗi khi xóa loại dịch vụ:', err);
            }
        }
    };

    const handleRestore = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn khôi phục loại dịch vụ này?')) {
            try {
                await restoreServiceType(id);
                setServiceTypes(prevServiceTypes => 
                    prevServiceTypes.map(serviceType => 
                        serviceType.id === id ? {...serviceType, deleted: false} : serviceType
                    )
                );
                alert('Loại dịch vụ đã được khôi phục thành công.');
            } catch (err) {
                console.error('Lỗi khi khôi phục loại dịch vụ:', err);
            }
        }
    };

    const handleEdit = (serviceType) => {
        setEditingService(serviceType);
    };

    const handleCloseEdit = () => {
        setEditingService(null);
    };

    const handleSaveAndReload = async () => {
        await fetchServiceTypes(); // Tải lại danh sách dịch vụ
        setEditingService(null); // Đóng modal
    };

    const handleAddService = () => {
        setIsAddingService(true);
    };

    const handleCloseAdd = () => {
        setIsAddingService(false);
    };

    const handleSaveNewService = async (newService) => {
        try {
            setServiceTypes(prevServiceTypes => [...prevServiceTypes, newService]);
            await fetchServiceTypes(); // Tải lại danh sách dịch vụ từ server
            setIsAddingService(false); // Đóng modal
        } catch (err) {
            console.error('Lỗi khi cập nhật danh sách dịch vụ:', err);
            alert('Có lỗi xảy ra khi cập nhật danh sách dịch vụ. Vui lòng tải lại trang.');
        }
    };

    if (loading) return <LoadingCat />;
    if (error) return <div className="error-message">{error}</div>;

    const sortedServiceTypes = [...serviceTypes].sort((a, b) => {
        if (sortBy === 'id') {
            return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
        } else if (sortBy === 'name') {
            return sortOrder === 'asc' 
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        } else if (sortBy === 'base_price') {
            return sortOrder === 'asc' 
                ? a.base_price - b.base_price
                : b.base_price - a.base_price;
        } else if (sortBy === 'status') {
            const statusA = a.deleted ? 'deleted' : 'active';
            const statusB = b.deleted ? 'deleted' : 'active';
            return sortOrder === 'asc' 
                ? statusA.localeCompare(statusB)
                : statusB.localeCompare(statusA);
        }
        return 0;
    });

    const filteredServiceTypes = sortedServiceTypes.filter(serviceType =>
        serviceType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        serviceType.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="service-dashboard">
            <div className="dashboard-header">
                <h2>Quản Lý Loại Dịch Vụ</h2>
                <div className="action-buttons">
                    <button className="add-service-btn" onClick={handleAddService}>
                        <FaPlus /> Thêm mới dịch vụ
                    </button>
                </div>
            </div>
            <div className="search-sort-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm loại dịch vụ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </div>
                <div className="sort-box">
                    <select
                        onChange={(e) => handleSort(e.target.value)}
                        value={sortBy}
                        className="sort-select"
                    >
                        <option value="id">Sắp xếp theo ID</option>
                        <option value="name">Sắp xếp theo Tên</option>
                        <option value="base_price">Sắp xếp theo Giá</option>
                        <option value="status">Sắp xếp theo Trạng thái</option>
                        <option value="description">Sắp xếp theo Mô tả</option>
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
            <div className="service-table">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id')}>ID</th>
                            <th onClick={() => handleSort('name')}>Tên Loại Dịch Vụ</th>
                            <th onClick={() => handleSort('base_price')}>Giá Cơ Bản</th>
                            <th onClick={() => handleSort('description')}>Mô Tả</th>
                            <th onClick={() => handleSort('status')}>Trạng Thái</th>
                            <th className='action-column'>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServiceTypes.map((serviceType) => (
                            <tr key={serviceType.id}>
                                <td>{serviceType.id}</td>
                                <td>{serviceType.name}</td>
                                <td>{serviceType.base_price.toLocaleString()} VNĐ</td>
                                <td className="description">{serviceType.description}</td>
                                <td>
                                    <span className={`status-badge ${serviceType.deleted ? 'inactive' : 'active'}`}>
                                        {serviceType.deleted ? 'Đã hủy' : 'Đang hoạt động'}
                                    </span>
                                </td>
                                <td>
                                    {serviceType.deleted ? (
                                        <button 
                                            className="restore-btn" 
                                            onClick={() => handleRestore(serviceType.id)}
                                        >
                                            <FaUndo />
                                        </button>
                                    ) : (
                                        <>
                                            <button 
                                                className="edit-btn" 
                                                onClick={() => handleEdit(serviceType)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                className="delete-btn" 
                                                onClick={() => handleDelete(serviceType.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingService && (
                <EditServiceModal
                    service={editingService}
                    onClose={handleCloseEdit}
                    onSave={handleSaveAndReload}
                />
            )}
            {isAddingService && (
                <AddServiceModal
                    onClose={handleCloseAdd}
                    onSave={handleSaveNewService}
                />
            )}
        </div>
    );
};

export default ServiceDashboard;
