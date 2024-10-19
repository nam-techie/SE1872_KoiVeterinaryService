// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {FaTrash, FaEdit, FaUserPlus, FaUserMd, FaUndo} from 'react-icons/fa';
import './styles/AccountDashboard.css';
import {useAccountInfo} from './hooks/useAccountInfo';

const AccountDashboard = ({ setActiveTab }) => {
    const {accounts, loading, error, fetchAllAccounts, deleteAccount, restoreAccount, updateAccountRole} = useAccountInfo();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('username');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editingAccount, setEditingAccount] = useState(null);

    useEffect(() => {
        fetchAllAccounts();
    }, []);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const sortedAccounts = [...accounts].sort((a, b) => {
        if (sortBy === 'status') {
            // Sắp xếp theo trạng thái
            const statusA = a.deleted ? 'inactive' : 'active';
            const statusB = b.deleted ? 'inactive' : 'active';
            return sortOrder === 'asc' 
                ? statusA.localeCompare(statusB) 
                : statusB.localeCompare(statusA);
        }
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredAccounts = sortedAccounts.filter(account =>
        account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (email) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
            try {
                await deleteAccount(email);
                alert('Tài khoản đã được xóa thành công.');
            } catch (err) {
                console.error('Lỗi khi xóa tài khoản:', err);
                alert('Có lỗi xảy ra khi xóa tài khoản. Vui lòng thử lại.');
            }
        }
    };

    const handleRestore = async (email) => {
        if (window.confirm('Bạn có chắc chắn muốn khôi phục tài khoản này?')) {
            try {
                await restoreAccount(email);
                alert('Tài khoản đã được khôi phục thành công.');
            } catch (err) {
                console.error('Lỗi khi khôi phục tài khoản:', err);
                alert('Có lỗi xảy ra khi khôi phục tài khoản. Vui lòng thử lại.');
            }
        }
    };

    const handleEditRole = (account) => {
        setEditingAccount(account);
    };

    const handleRoleChange = async (email, newRole) => {
        try {
            await updateAccountRole(email, newRole);
            setEditingAccount(null);
            alert('Role đã được cập nhật thành công.');
        } catch (err) {
            console.error('Lỗi khi cập nhật role:', err);
            alert('Có lỗi xảy ra khi cập nhật role. Vui lòng thử lại.');
        }
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div className="account-dashboard">
            <div className="dashboard-header">
                <h2>Quản lý Tài khoản</h2>
                <div className="account-actions">
                    <button onClick={() => setActiveTab('createAccount')} className="add-account-btn">
                        <FaUserPlus /> Thêm Tài khoản Tự do
                    </button>
                    <button onClick={() => setActiveTab('createVeterinaryAccount')} className="add-account-btn doctor-btn">
                        <FaUserMd /> Thêm Tài khoản Bác sĩ
                    </button>
                </div>
            </div>
            <div className="search-sort-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="sort-container">
                    <select
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value)}
                        className="sort-select"
                    >
                        <option value="username">Sắp xếp theo Username</option>
                        <option value="email">Sắp xếp theo Email</option>
                        <option value="role">Sắp xếp theo Vai trò</option>
                        <option value="createdAt">Sắp xếp theo Ngày tạo</option>
                        <option value="status">Sắp xếp theo Trạng thái</option>
                    </select>
                </div>
                <div className="sort-order-container">
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="sort-order-btn"
                    >
                        {sortOrder === 'asc' ? 'Theo thứ tự A - Z' : 'Theo thứ tự Z - A'}
                    </button>
                </div>
            </div>
            <div className="table-container">
                <table className="accounts-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('username')}>Username</th>
                            <th onClick={() => handleSort('email')}>Email</th>
                            <th onClick={() => handleSort('role')}>Vai trò</th>
                            <th onClick={() => handleSort('created_at')}>Ngày tạo</th>
                            <th onClick={() => handleSort('deleted')}>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAccounts.map(account => (
                            <tr key={account.id}>
                                <td>
                                    <div className="user-info">
                                        <img src={`https://ui-avatars.com/api/?name=${account.username}&background=random`} alt={account.username} className="user-avatar" />
                                        <span>{account.username}</span>
                                    </div>
                                </td>
                                <td>{account.email}</td>
                                <td>
                                    {editingAccount && editingAccount.id === account.id ? (
                                        <select
                                            value={account.role}
                                            onChange={(e) => handleRoleChange(account.email, e.target.value)}
                                        >
                                            <option value="CUSTOMER">CUSTOMER</option>
                                            <option value="VETERINARY">VETERINARY</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    ) : (
                                        account.role
                                    )}
                                </td>
                                <td>{account.createdAt}</td>
                                <td>
                                    <span className={`status-badge ${account.deleted ? 'inactive' : 'active'}`}>
                                        {account.deleted ? 'Đã bị vô hiệu hóa' : 'Đang sử dụng'}
                                    </span>
                                </td>
                                <td>
                                    {!editingAccount || editingAccount.id !== account.id ? (
                                        <button className="edit-btn" onClick={() => handleEditRole(account)}>
                                            <FaEdit />
                                        </button>
                                    ) : null}
                                    <button 
                                        className="delete-btn" 
                                        onClick={() => handleDelete(account.email)}
                                    >
                                        <FaTrash />
                                    </button>
                                    {account.deleted && (
                                        <button 
                                            className="restore-btn" 
                                            onClick={() => handleRestore(account.email)}
                                        >
                                            <FaUndo />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountDashboard;
