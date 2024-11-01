import { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Modal, Form, Input, List, Table, DatePicker, Select, Divider, Checkbox } from 'antd';
import styles from '../../styles/DoctorAppointment.module.css';
import { DoctorNavBar } from "../../components/Navbar.jsx";

// Mock Data với đầy đủ thông tin chi tiết
const mockAppointments = [
    {
        id: '1',
        customerInfo: {
            name: 'cus001',
            phone: '0948832432',
            address: '02934324'
        },
        appointmentInfo: {
            createdDate: '2024-10-31T16:26:16.443+00:00',
            appointmentDate: '2024-11-05',
            appointmentTime: '08:00:00',
            service: 'Điều trị bệnh tại trung tâm',
            address: 'Chưa cập nhật',
            status: 'Chờ bác sĩ xác nhận',
            doctor: 'Nguyễn Thị Mai'
        }
    },
    {
        id: '2',
        customerInfo: {
            name: 'cus002',
            phone: '0912345678',
            address: '15 Lê Lợi, Q.1'
        },
        appointmentInfo: {
            createdDate: '2024-10-31T15:00:00.000+00:00',
            appointmentDate: '2024-11-05',
            appointmentTime: '09:15:00',
            service: 'Khám định kỳ',
            address: '15 Lê Lợi, Q.1',
            status: 'Đã xác nhận',
            doctor: 'Trần Văn An'
        }
    },
    // ... thêm 5 mockdata khác tương tự
];

// Component Modal Chi tiết
const AppointmentDetailModal = ({ visible, onClose, appointmentData }) => {
    return (
        <Modal
            title={`Chi tiết lịch hẹn #${appointmentData?.id}`}
            open={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            className={styles.detailModal}
        >
            <div className={styles.modalContent}>
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Thông tin khách hàng</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Họ tên:</span>
                            <span className={styles.value}>{appointmentData?.customerInfo.name}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Số điện thoại:</span>
                            <span className={styles.value}>{appointmentData?.customerInfo.phone}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Địa chỉ:</span>
                            <span className={styles.value}>{appointmentData?.customerInfo.address}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Thông tin lịch hẹn</h3>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Ngày tạo:</span>
                            <span className={styles.value}>
                                {moment(appointmentData?.appointmentInfo.createdDate).format('DD/MM/YYYY HH:mm:ss')}
                            </span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Dịch vụ:</span>
                            <span className={styles.value}>{appointmentData?.appointmentInfo.service}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Ngày hẹn:</span>
                            <span className={styles.value}>
                                {moment(appointmentData?.appointmentInfo.appointmentDate).format('DD/MM/YYYY')}
                            </span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Giờ hẹn:</span>
                            <span className={styles.value}>{appointmentData?.appointmentInfo.appointmentTime}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Địa chỉ:</span>
                            <span className={styles.value}>{appointmentData?.appointmentInfo.address}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Trạng thái:</span>
                            <span className={`${styles.status} ${styles[appointmentData?.appointmentInfo.status.toLowerCase().replace(/ /g, '-')]}`}>
                                {appointmentData?.appointmentInfo.status}
                            </span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Bác sĩ phụ trách:</span>
                            <span className={styles.value}>{appointmentData?.appointmentInfo.doctor}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

function DoctorAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isCompletionModalVisible, setIsCompletionModalVisible] = useState(false);
    const [completionForm] = Form.useForm();
    const [selectedServices, setSelectedServices] = useState([]);

    // Mock data với các trạng thái mới
    useEffect(() => {
        const mockAppointments = [
            {
                id: '1',
                time: '08:30:00',
                date: '2024-01-20',
                service: 'Khám sức khỏe định kỳ',
                status: 'Chờ bác sĩ xác nhận',
            },
            {
                id: '2',
                time: '09:15:00',
                date: '2024-01-20',
                service: 'Tiêm phòng',
                status: 'Đã xác nhận',
            },
            {
                id: '3',
                time: '10:00:00',
                date: '2024-01-20',
                service: 'Khám tổng quát',
                status: 'Chờ thanh toán tiền dịch vụ',
            },
            {
                id: '4',
                time: '14:30:00',
                date: '2024-01-20',
                service: 'Điều trị bệnh',
                status: 'Đang thực hiện dịch vụ',
            },
            {
                id: '5',
                time: '15:45:00',
                date: '2024-01-20',
                service: 'Tư vấn dinh dưỡng',
                status: 'Hoàn thành',
            },
            {
                id: '6',
                time: '16:30:00',
                date: '2024-01-20',
                service: 'Khám răng',
                status: 'Đã hủy',
            },
            {
                id: '7',
                time: '11:00:00',
                date: '2024-01-20',
                service: 'Chụp X-quang',
                status: 'Đã thanh toán',
            }
        ];
        setAppointments(mockAppointments);
    }, []);

    // Render actions based on status
    const renderActions = (status, record) => {
        const handleViewDetail = () => {
            setSelectedAppointment(record);
            setIsModalVisible(true);
        };

        const handleComplete = () => {
            setIsCompletionModalVisible(true);
        };

        switch (status) {
            case 'Chờ bác sĩ xác nhận':
                return (
                    <>
                        <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>
                        <Button type="primary">Xác nhận</Button>
                        <Button danger>Hủy</Button>
                    </>
                );
            case 'Đã thanh toán':
                return (
                    <>
                        <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>
                        <Button type="primary">Thực hiện dịch vụ</Button>
                    </>
                );
            case 'Đang thực hiện dịch vụ':
                return (
                    <>
                        <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>
                        <Button type="primary" onClick={handleComplete}>Hoàn thành</Button>
                    </>
                );
            case 'Hoàn thành':
                return (
                    <>
                        <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>
                        <Button type="primary">Hồ sơ bệnh án</Button>
                    </>
                );
            case 'Đã xác nhận':
            case 'Đã hủy':
            case 'Chờ thanh toán tiền dịch vụ':
                return <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>;
            default:
                return <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>;
        }
    };

    // Hàm xử lý tìm kiếm
    const handleSearch = (value) => {
        setSearchText(value);
    };

    // Hàm xử lý chọn ngày
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Hàm xử lý lọc trạng thái
    const handleStatusFilter = (value) => {
        setStatusFilter(value);
    };

    // Hàm lọc và hiển thị dữ liệu
    const getFilteredAppointments = () => {
        return appointments.filter(appointment => {
            // Lọc theo text tìm kiếm (tìm theo ID và service)
            const searchMatch = searchText ? (
                appointment.id.toLowerCase().includes(searchText.toLowerCase()) ||
                appointment.service.toLowerCase().includes(searchText.toLowerCase())
            ) : true;

            // Lọc theo ngày
            const dateMatch = selectedDate ? (
                moment(appointment.date).format('YYYY-MM-DD') === moment(selectedDate).format('YYYY-MM-DD')
            ) : true;

            // Lọc theo trạng thái
            const statusMatch = statusFilter === 'all' ? true : appointment.status === statusFilter;

            return searchMatch && dateMatch && statusMatch;
        });
    };

    // Thêm danh sách dịch vụ bổ sung
    const additionalServices = [
        'Kiểm tra và vệ sinh hồ',
        'Cung cấp thức ăn dinh dưỡng',
        'Xử lí nước hồ',
        'Chăm sóc cá Stress',
        'Tư vấn thiết kế hồ'
    ];

    // Hàm xử lý khi submit form
    const handleCompletionSubmit = (values) => {
        console.log('Form values:', { ...values, additionalServices: selectedServices });
        setIsCompletionModalVisible(false);
        completionForm.resetFields();
        setSelectedServices([]);
    };

    return (
        <>
            <DoctorNavBar/>
            <div className={styles.doctorAppointmentContainer}>
                <h1>Quản Lý Lịch Hẹn</h1>
                
                {/* Search and Filter Section */}
                <div className={styles.filterSection}>
                    <Input.Search
                        placeholder="Tìm kiếm theo ID hoặc dịch vụ..."
                        allowClear
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ width: 200 }}
                    />
                    <DatePicker 
                        placeholder="Chọn ngày"
                        format="DD/MM/YYYY"
                        onChange={handleDateChange}
                        value={selectedDate}
                    />
                    <Select
                        defaultValue="all"
                        style={{ width: 200 }}
                        onChange={handleStatusFilter}
                        value={statusFilter}
                    >
                        <Select.Option value="all">Tất cả trạng thái</Select.Option>
                        <Select.Option value="Chờ bác sĩ xác nhận">Chờ bác sĩ xác nhận</Select.Option>
                        <Select.Option value="Đã xác nhận">Đã xác nhận</Select.Option>
                        <Select.Option value="Đã thanh toán">Đã thanh toán</Select.Option>
                        <Select.Option value="Đang thực hiện dịch vụ">Đang thực hiện dịch vụ</Select.Option>
                        <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                        <Select.Option value="Đã hủy">Đã hủy</Select.Option>
                    </Select>
                </div>

                {/* Appointments Table */}
                <Table
                    columns={[
                        { title: 'ID lịch hẹn', dataIndex: 'id', key: 'id' },
                        { title: 'Thời gian', dataIndex: 'time', key: 'time' },
                        { title: 'Ngày', dataIndex: 'date', key: 'date' },
                        { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
                        { title: 'Trạng thái', 
                          dataIndex: 'status', 
                          key: 'status',
                          render: (status) => (
                            <span className={`${styles.status} ${styles[status.toLowerCase().replace(/ /g, '-')]}`}>
                              {status}
                            </span>
                          )
                        },
                        { 
                            title: 'Hành động',
                            key: 'action',
                            render: (_, record) => (
                                <div className={styles.actionButtons}>
                                    {renderActions(record.status, record)}
                                </div>
                            )
                        }
                    ]}
                    dataSource={getFilteredAppointments()}
                    className={styles.appointmentTable}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showTotal: (total, range) => 
                            `${range[0]}-${range[1]} của ${total} lịch hẹn`,
                    }}
                />

                {/* Thêm Modal này */}
                <Modal
                    title={`Chi tiết lịch hẹn #${selectedAppointment?.id}`}
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                    width={800}
                >
                    <div>
                        <h3 style={{ color: '#1890ff', borderBottom: '1px solid #f0f0f0', paddingBottom: 8 }}>
                            Thông tin khách hàng
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Họ tên:</span>
                                <span>{selectedAppointment?.customerInfo?.name}</span>
                            </div>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Số điện thoại:</span>
                                <span>{selectedAppointment?.customerInfo?.phone}</span>
                            </div>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Địa chỉ:</span>
                                <span>{selectedAppointment?.customerInfo?.address}</span>
                            </div>
                        </div>

                        <h3 style={{ color: '#1890ff', borderBottom: '1px solid #f0f0f0', paddingBottom: 8 }}>
                            Thông tin lịch hẹn
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Ngày tạo:</span>
                                <span>{moment(selectedAppointment?.appointmentInfo?.createdDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                            </div>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Dịch vụ:</span>
                                <span>{selectedAppointment?.appointmentInfo?.service}</span>
                            </div>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Ngày hẹn:</span>
                                <span>{moment(selectedAppointment?.appointmentInfo?.appointmentDate).format('DD/MM/YYYY')}</span>
                            </div>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Giờ hẹn:</span>
                                <span>{selectedAppointment?.appointmentInfo?.appointmentTime}</span>
                            </div>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Địa chỉ:</span>
                                <span>{selectedAppointment?.appointmentInfo?.address}</span>
                            </div>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Trạng thái:</span>
                                <span>{selectedAppointment?.appointmentInfo?.status}</span>
                            </div>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Bác sĩ phụ trách:</span>
                                <span>{selectedAppointment?.appointmentInfo?.doctor}</span>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Thêm Modal hoàn thành */}
                <Modal
                    title="Hoàn thành dịch vụ"
                    open={isCompletionModalVisible}
                    onOk={() => completionForm.submit()}
                    onCancel={() => {
                        setIsCompletionModalVisible(false);
                        completionForm.resetFields();
                        setSelectedServices([]);
                    }}
                    width={800}
                    className={styles.completionModal}
                    okText="Hoàn thành dịch vụ"
                    cancelText="Đóng"
                >
                    <Form
                        form={completionForm}
                        layout="vertical"
                        onFinish={handleCompletionSubmit}
                    >
                        {/* Phần 1: Hồ sơ bệnh án */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Hồ sơ bệnh án cá Koi</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                <Form.Item
                                    label="Tên cá"
                                    name="fishName"
                                    rules={[{ required: true, message: 'Vui lòng nhập tên cá' }]}
                                >
                                    <Input placeholder="Nhập tên cá" />
                                </Form.Item>

                                <Form.Item
                                    label="Giống"
                                    name="fishBreed"
                                    rules={[{ required: true, message: 'Vui lòng nhập giống cá' }]}
                                >
                                    <Input placeholder="Nhập giống cá" />
                                </Form.Item>

                                <Form.Item
                                    label="Tuổi"
                                    name="fishAge"
                                    rules={[{ required: true, message: 'Vui lòng nhập tuổi cá' }]}
                                >
                                    <Input placeholder="Nhập tuổi cá" />
                                </Form.Item>

                                <Form.Item
                                    label="Màu sắc"
                                    name="fishColor"
                                    rules={[{ required: true, message: 'Vui lòng nhập màu sắc' }]}
                                >
                                    <Input placeholder="Nhập màu sắc" />
                                </Form.Item>

                                <Form.Item
                                    label="Cân nặng"
                                    name="fishWeight"
                                    rules={[{ required: true, message: 'Vui lòng nhập cân nặng' }]}
                                >
                                    <Input placeholder="Nhập cân nặng" />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Chẩn đoán"
                                name="diagnosis"
                                rules={[{ required: true, message: 'Vui lòng nhập chẩn đoán' }]}
                            >
                                <Input.TextArea 
                                    rows={4}
                                    placeholder="Nhập chẩn đoán chi tiết"
                                />
                            </Form.Item>
                        </div>

                        {/* Phần 2: Dịch vụ bổ sung */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Dịch vụ bổ sung</h3>
                            <Form.Item>
                                <Checkbox.Group
                                    options={additionalServices}
                                    value={selectedServices}
                                    onChange={(checkedValues) => setSelectedServices(checkedValues)}
                                />
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            </div>
        </>
    );
}

export default DoctorAppointment;
