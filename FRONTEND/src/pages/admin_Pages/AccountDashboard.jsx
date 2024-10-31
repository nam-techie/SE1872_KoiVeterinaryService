// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {FaTrash, FaEdit, FaUserPlus, FaUserMd, FaUndo, FaSort} from 'react-icons/fa';
import './styles/AccountDashboard.css';
import {useAccountInfo} from "./hooks/useAccountInfo.js";
import AccountUpdateProfile from "./AccountUpdateProfile.jsx";
import LoadingCat from '../../components/LoadingCat.jsx';
import Pagination from '../../components/Pagination.jsx';

// eslint-disable-next-line react/prop-types
const AccountDashboard = ({ setActiveTab, setSelectedAccount }) => {
    const {accounts, loading, error, fetchAllAccounts, deleteAccount, restoreAccount} = useAccountInfo();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('username');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editingAccount, setEditingAccount] = useState(null);
    const [dateSearch, setDateSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 7;

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
        (account.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!dateSearch || account.createdAt.includes(dateSearch))
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
    const handleEditAccount = (account) => {
        setSelectedAccount({
            originalUsername: account.username, 
            username: account.username,
            email: account.email,
            role: account.role
        });
        setActiveTab('editAccount');
    };

    const handleUpdateAccount = (updatedAccount) => {
        // Xử lý cập nhật tài khoản trong danh sách
        // Có thể gọi API ở đây hoặc cập nhật state
        console.log('Tài khoản đã được cập nhật:', updatedAccount);
        setEditingAccount(null);
    };

    // Tính toán dữ liệu cho trang hiện tại
    const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);
    const currentAccounts = filteredAccounts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (loading) return <LoadingCat />;
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
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                
                </div>
                <div className="date-box">
                    <input
                        type="date"
                        value={dateSearch}
                        onChange={(e) => setDateSearch(e.target.value)}
                        className="date-input"
                    />
   
                </div>
                <div className="sort-box">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sort-select"
                    >
                        <option value="username">Sắp xếp theo Username</option>
                        <option value="email">Sắp xếp theo Email</option>
                        <option value="role">Sắp xếp theo Vai trò</option>
                        <option value="createdAt">Sắp xếp theo Ngày tạo</option>
                        <option value="deleted">Sắp xếp theo Trạng thái</option>
                    </select>
                </div>
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="sort-order-btn"
                >
                    {sortOrder === 'asc' ? 'Theo thứ tự A - Z' : 'Theo thứ tự Z - A'}
                    <FaSort />
                </button>
            </div>
            <div className="table-container">
                <table className="accounts-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('username')}>Username</th>
                            <th onClick={() => handleSort('email')}>Email</th>
                            <th onClick={() => handleSort('role')}>Vai trò</th>
                            <th onClick={() => handleSort('createdAt')}>Ngày tạo</th>
                            <th onClick={() => handleSort('deleted')}>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAccounts.map(account => (
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
                                    <span className={`status-badge ${account.deleted ? 'inactive' : 'active'}`}>
                                        {account.deleted ? 'Đã bị vô hiệu hóa' : 'Đang sử dụng'}
                                    </span>
                                </td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditAccount(account)}>
                                        <FaEdit />
                                    </button>
                                    {account.deleted ? (
                                        <button 
                                            className="restore-btn" 
                                            onClick={() => handleRestore(account.email)}
                                        >
                                            <FaUndo />
                                        </button>
                                    ) : (
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => handleDelete(account.email)}
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            {editingAccount && (
                <AccountUpdateProfile
                    account={editingAccount}
                    onClose={() => setEditingAccount(null)}
                    onUpdate={handleUpdateAccount}
                />
            )}
            
        </div>
    );
};

export default AccountDashboard;
