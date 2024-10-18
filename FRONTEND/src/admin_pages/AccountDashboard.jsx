// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {FaTrash, FaEdit, FaUserPlus} from 'react-icons/fa';
import './styles/AccountDashboard.css';
import {useAccountInfo} from './hooks/useAccountInfo';

const AccountDashboard = () => {
    const {accounts, loading, error, fetchAllAccounts} = useAccountInfo();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('username');
    const [sortOrder, setSortOrder] = useState('asc');

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
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredAccounts = sortedAccounts.filter(account =>
        account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div className="account-dashboard">
            <div className="dashboard-header">
                <h2>Quản lý Tài khoản</h2>
                <button className="add-account-btn"><FaUserPlus /> Thêm Tài khoản</button>
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
                        <option value="is_deleted">Sắp xếp theo Trạng thái</option>
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
                            <th onClick={() => handleSort('is_deleted')}>Trạng thái</th>
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
                                <td>{account.role}</td>
                                <td>{account.createdAt}</td>
                                <td>
                                    <span className={`status-badge ${account.isDeleted ? 'inactive' : 'active'}`}>
                                        {account.status}
                                    </span>
                                </td>
                                <td>
                                    <button className="edit-btn"><FaEdit /></button>
                                    <button className="delete-btn"><FaTrash /></button>
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
