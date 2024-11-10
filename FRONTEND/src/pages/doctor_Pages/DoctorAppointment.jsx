import { useState } from 'react';
import moment from 'moment';
import { Button, Modal, Form, Input, List, Table, DatePicker, Select, Divider, Checkbox, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import styles from '../../styles/DoctorAppointment.module.css';
import { DoctorNavBar } from "../../components/Navbar.jsx";
import useDoctorAppointment from './hooks/useDoctorAppointment.js';

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
    const { 
        appointments, 
        loading, 
        error, 
        refreshAppointments, 
        confirmAppointment,
        startService,
        saveServiceRecord,
        cancelAppointment,
        fetchAppointmentDetail
    } = useDoctorAppointment();
    const [searchText, setSearchText] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isCompletionModalVisible, setIsCompletionModalVisible] = useState(false);
    const [completionForm] = Form.useForm();
    const [selectedServices, setSelectedServices] = useState([]);
    const [isMedicalRecordModalVisible, setIsMedicalRecordModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [isServiceFormVisible, setIsServiceFormVisible] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
    const [cancelForm] = Form.useForm();
    const [appointmentDetail, setAppointmentDetail] = useState(null);
    const [isCompletionNoteModalVisible, setIsCompletionNoteModalVisible] = useState(false);
    const [completionNoteForm] = Form.useForm();

    // Thêm các hàm xử lý trạng thái
    const handleConfirm = async (record) => {
        try {
            const doctorConfirmRequest = {
                doctorId: "currentDoctorId",
                confirmationNote: "Đã xác nhận lịch hẹn"
            };

            await confirmAppointment(record.id, doctorConfirmRequest);
        } catch (error) {
            console.error('Error confirming appointment:', error);
        }
    };

    const handleCancel = (record) => {
        setCurrentAppointment(record);
        setIsCancelModalVisible(true);
    };

    const handleCancelConfirm = async (values) => {
        try {
            await cancelAppointment(currentAppointment.id, values.cancelReason);
            setIsCancelModalVisible(false);
            cancelForm.resetFields();
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };

    const handleStartService = async (record) => {
        try {
            await startService(record.id);
        } catch (error) {
            console.error('Error starting service:', error);
        }
    };

    const handleComplete = (record) => {
        setCurrentAppointment(record);
        if (record.service === "Điều trị bệnh tại nhà" || record.service === "Điều trị bệnh tại trung tâm") {
            setIsServiceFormVisible(true);
        } else {
            setIsCompletionNoteModalVisible(true);
        }
    };

    // Render actions based on status
    const renderActions = (status, record) => {
        const handleViewDetail = async () => {
            try {
                const detail = await fetchAppointmentDetail(record.id);
                setSelectedAppointment(detail);
                setIsModalVisible(true);
            } catch (error) {
                console.error('Error fetching appointment detail:', error);
            }
        };

        // Thêm điều kiện kiểm tra loại dịch vụ cho hồ sơ bệnh án
        const showMedicalRecord = () => {
            return ["Điều trị bệnh tại nhà", "Điều trị bệnh tại trung tâm", "Khảo sát hồ cá tại nhà"].includes(record.service);
        };

        // Thêm điều kiện kiểm tra loại dịch vụ
        const renderCompletionButton = () => {
            if (record.service === "Điều trị bệnh tại nhà" || record.service === "Điều trị bệnh tại trung tâm") {
                return (
                    <Button 
                        type="primary"
                        className={styles.completed}
                        onClick={() => handleComplete(record)}
                    >
                        Hoàn thành
                    </Button>
                );
            } else if (record.service === "Khảo sát hồ cá tại nhà" || record.service === "Tư vấn trực tuyến") {
                return (
                    <Button 
                        type="primary"
                        className={styles.completed}
                        onClick={() => handleComplete(record)}
                    >
                        Hoàn tất
                    </Button>
                );
            }
            return null;
        };

        switch (status) {
            case 'Chờ bác sĩ xác nhận':
                return (
                    <>
                        <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>
                        <Button 
                            type="primary" 
                            className={styles.confirm}
                            onClick={() => handleConfirm(record)}
                        >
                            Xác nhận
                        </Button>
                        <Button 
                            danger 
                            onClick={() => handleCancel(record)}
                        >
                            Hủy
                        </Button>
                    </>
                );
            case 'Thanh toán tiền dịch vụ thành công':
                return (
                    <>
                        <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>
                        <Button 
                            type="primary"
                            className={styles.inProgress}
                            onClick={() => handleStartService(record)}
                        >
                            Thực hiện dịch vụ
                        </Button>
                    </>
                );
            case 'Đang cung cấp dịch vụ':
                return (
                    <>
                        <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>
                        {renderCompletionButton()}
                    </>
                );
            case 'Hoàn thành':
                return (
                    <>
                        <Button type="primary" onClick={handleViewDetail}>Xem chi tiết</Button>
                        {showMedicalRecord() && (
                            <Button 
                                type="primary"
                                onClick={() => handleViewMedicalRecord(record)}
                            >
                                Hồ sơ bệnh án
                            </Button>
                        )}
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
        const updatedAppointments = appointments.map(appointment => {
            if (appointment.id === selectedAppointment.id) {
                return { 
                    ...appointment, 
                    status: 'Hoàn thành',
                    medicalRecord: {
                        ...values,
                        additionalServices: selectedServices
                    }
                };
            }
            return appointment;
        });
        
        setAppointments(updatedAppointments);
        setIsCompletionModalVisible(false);
        completionForm.resetFields();
        setSelectedServices([]);
    };

    // Thêm hàm xử lý hiển thị hồ sơ bệnh án
    const handleViewMedicalRecord = (record) => {
        setSelectedAppointment(record);
        setIsMedicalRecordModalVisible(true);
    };

    const handleSaveService = async (record) => {
        setCurrentAppointment(record);
        setIsServiceFormVisible(true);
    };

    const handleServiceFormSubmit = async (values) => {
        try {
            const serviceData = {
                name: values.name,
                breed: values.breed,
                age: Number(values.age),
                color: values.color,
                weight: Number(values.weight),
                healthStatus: values.healthStatus,
                serviceTypeId5: values.serviceTypeId5 || false,
                serviceTypeId6: values.serviceTypeId6 || false,
                serviceTypeId7: values.serviceTypeId7 || false,
                serviceTypeId8: values.serviceTypeId8 || false,
                serviceTypeId9: values.serviceTypeId9 || false,
                notes: values.notes
            };

            await saveServiceRecord(currentAppointment.id, serviceData);
            setIsServiceFormVisible(false);
            form.resetFields();
            message.destroy();
            message.success('Đã lưu hồ sơ bệnh nhân thành công');
            await refreshAppointments();
        } catch (error) {
            console.error('Error saving service record:', error);
            message.destroy();
            message.error('Có lỗi xảy ra khi lưu hồ sơ bệnh nhân');
        }
    };

    // Thêm hàm xử lý cho form hoàn tất
    const handleCompletionNote = async (values) => {
        try {
            const serviceData = {
                name: null,
                breed: null,
                age: 0,
                color: null,
                weight: 0,
                healthStatus: null,
                serviceTypeId5: false,
                serviceTypeId6: false,
                serviceTypeId7: false,
                serviceTypeId8: false,
                serviceTypeId9: false,
                notes: values.notes
            };

            await saveServiceRecord(currentAppointment.id, serviceData);
            setIsCompletionNoteModalVisible(false);
            completionNoteForm.resetFields();
            message.success('Đã lưu thông tin thành công');
            await refreshAppointments();
        } catch (error) {
            console.error('Error saving completion note:', error);
            message.error('Có lỗi xảy ra khi lưu thông tin');
        }
    };

    // Modal form để nhập thông tin dịch vụ
    const ServiceRecordForm = () => {
        const { supportServices } = useDoctorAppointment();

        return (
            <Modal
                title="Hoàn thành dịch vụ"
                open={isServiceFormVisible}
                onCancel={() => {
                    setIsServiceFormVisible(false);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleServiceFormSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Tên cá"
                        rules={[{ required: true, message: 'Vui lòng nhập tên cá!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="breed"
                        label="Giống"
                        rules={[{ required: true, message: 'Vui lòng nhập giống cá!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="age"
                        label="Tuổi"
                        rules={[{ required: true, message: 'Vui lòng nhập tuổi cá!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        name="color"
                        label="Màu sắc"
                        rules={[{ required: true, message: 'Vui lòng nhập màu sắc!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="weight"
                        label="Cân nặng"
                        rules={[{ required: true, message: 'Vui lòng nhập cân nặng!' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        name="healthStatus"
                        label="Tình trạng sức khỏe"
                        rules={[{ required: true, message: 'Vui lòng nhập tình trạng sức khỏe!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="notes"
                        label="Ghi chú và lưu ý của bác sĩ"
                        rules={[{ required: true, message: 'Vui lòng nhập ghi chú và lưu ý!' }]}
                    >
                        <TextArea 
                            rows={4}
                            placeholder="Nhập ghi chú và lưu ý cho khách hàng..."
                        />
                    </Form.Item>

                    <Divider>Dịch vụ bổ sung</Divider>

                    {supportServices.map((service) => (
                        <Form.Item 
                            key={service.id}
                            name={`serviceTypeId${service.id}`} 
                            valuePropName="checked"
                        >
                            <Checkbox>{service.name}</Checkbox>
                        </Form.Item>
                    ))}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Hoàn thành
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    };

    // Thêm Modal form cho hoàn tất
    const CompletionNoteModal = () => (
        <Modal
            title="Hoàn tất dịch vụ"
            open={isCompletionNoteModalVisible}
            onCancel={() => {
                setIsCompletionNoteModalVisible(false);
                completionNoteForm.resetFields();
            }}
            footer={null}
            width={600}
        >
            <Form
                form={completionNoteForm}
                layout="vertical"
                onFinish={handleCompletionNote}
            >
                <Form.Item
                    name="notes"
                    label="Ghi chú"
                    rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
                >
                    <TextArea 
                        rows={4}
                        placeholder="Nhập ghi chú về buổi khám/tư vấn..."
                    />
                </Form.Item>

                <Form.Item className={styles.modalFooter}>
                    <Button 
                        onClick={() => {
                            setIsCompletionNoteModalVisible(false);
                            completionNoteForm.resetFields();
                        }}
                        style={{ marginRight: 8 }}
                    >
                        Quay lại
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Hoàn tất
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );

    const CancelConfirmModal = () => (
        <Modal
            title="Xác nhận hủy lịch hẹn"
            open={isCancelModalVisible}
            onCancel={() => {
                setIsCancelModalVisible(false);
                cancelForm.resetFields();
            }}
            footer={null}
        >
            <Form
                form={cancelForm}
                layout="vertical"
                onFinish={handleCancelConfirm}
            >
                <Form.Item
                    name="cancelReason"
                    label="Lý do hủy"
                    rules={[{ required: true, message: 'Vui lòng nhập lý do hủy lịch hẹn' }]}
                >
                    <TextArea 
                        rows={4}
                        placeholder="Nhập lý do hủy lịch hẹn..."
                    />
                </Form.Item>

                <Form.Item className={styles.modalFooter}>
                    <Button 
                        onClick={() => {
                            setIsCancelModalVisible(false);
                            cancelForm.resetFields();
                        }}
                        style={{ marginRight: 8 }}
                    >
                        Đóng
                    </Button>
                    <Button type="primary" danger htmlType="submit">
                        Xác nhận hủy
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );

    return (
        <>
            <DoctorNavBar/>
            <div className={styles.doctorAppointmentContainer}>
                <h1>Quản Lý Lịch Hẹn</h1>
                
                {/* Search and Filter Section */}
                <div className={styles.filterSection}>
                    <Input.Search
                        placeholder="Tìm kiếm theo ID hoặc dch vụ..."
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
                        <Select.Option value="Chờ bác sĩ xác nhận">Ch bác sĩ xác nhn</Select.Option>
                        <Select.Option value="Đã xác nhận">Đã xác nhận</Select.Option>
                        <Select.Option value="Thanh toán tiền dịch vụ thành công">Thanh toán tiền dịch vụ thành công</Select.Option>
                        <Select.Option value="Đang thực hiện dịch vụ">Đang thực hiện dịch vụ</Select.Option>
                        <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                        <Select.Option value="Đã hủy">Đã hủy</Select.Option>
                    </Select>
                </div>

                {/* Appointments Table */}
                <Table
                    loading={loading}
                    columns={[
                        { title: 'ID lịch hẹn', dataIndex: 'id', key: 'id' },
                        { title: 'Thời gian', dataIndex: 'time', key: 'time' },
                        { title: 'Ngày', dataIndex: 'date', key: 'date' },
                        { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
                        { title: 'Trạng thái', 
                          dataIndex: 'status', 
                          key: 'status',
                          render: (status) => (
                            <span className={`${styles.status} ${styles[(status || 'not-updated').toLowerCase().replace(/ /g, '-')]}`}>
                                {status || 'Chưa cập nhật'}
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
                                <span style={{ color: '#666', marginRight: 8 }}>Mô tả:</span>
                                <span>{selectedAppointment?.appointmentInfo?.description}</span>
                            </div>
                            <div>
                                <span style={{ color: '#666', marginRight: 8 }}>Phân bổ:</span>
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
                    maskClosable={false}
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
                                    <Input placeholder="Nhp cân nặng" />
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

                {/* Thêm Modal hiển thị hồ sơ bệnh án */}
                <Modal
                    title="Hồ sơ bệnh án"
                    open={isMedicalRecordModalVisible}
                    onCancel={() => setIsMedicalRecordModalVisible(false)}
                    footer={[
                        <Button key="close" onClick={() => setIsMedicalRecordModalVisible(false)}>
                            Đóng
                        </Button>
                    ]}
                    width={800}
                >
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Thông tin cá Koi</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Tên cá:</span>
                                <span className={styles.value}>{selectedAppointment?.medicalRecord?.fishName}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Giống:</span>
                                <span className={styles.value}>{selectedAppointment?.medicalRecord?.fishBreed}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Tuổi:</span>
                                <span className={styles.value}>{selectedAppointment?.medicalRecord?.fishAge}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Màu sắc:</span>
                                <span className={styles.value}>{selectedAppointment?.medicalRecord?.fishColor}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.label}>Cân nặng:</span>
                                <span className={styles.value}>{selectedAppointment?.medicalRecord?.fishWeight}</span>
                            </div>
                        </div>

                        <div className={styles.infoItem} style={{ marginTop: '16px' }}>
                            <span className={styles.label}>Chẩn đoán:</span>
                            <div className={styles.value} style={{ whiteSpace: 'pre-wrap' }}>
                                {selectedAppointment?.medicalRecord?.diagnosis}
                            </div>
                        </div>

                        {selectedAppointment?.medicalRecord?.additionalServices?.length > 0 && (
                            <>
                                <h3 className={styles.sectionTitle} style={{ marginTop: '24px' }}>Dịch vụ bổ sung</h3>
                                <ul>
                                    {selectedAppointment.medicalRecord.additionalServices.map((service, index) => (
                                        <li key={index}>{service}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </Modal>
                <ServiceRecordForm />
                <CompletionNoteModal />
                <CancelConfirmModal />
            </div>
        </>
    );
}

export default DoctorAppointment;
