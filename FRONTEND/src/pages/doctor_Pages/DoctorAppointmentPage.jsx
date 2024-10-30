import {useState, useEffect} from "react";
import {Button, message} from "antd";
import styles from "../doctor_Pages/styles/DoctorAppointment.module.css";
import {DoctorNavBar} from "../../components/Navbar.jsx";

import {
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DoctorAppointmentModal from "./DoctorAppointmentModal.jsx";
import KoiMRModal from "./KoiMRModal.jsx";
import ServiceModal from "./DoctorAddServicesModal.jsx";
import DocktorModal from "./DoctorAppointmentModal.jsx";

const appointmentList = [
    {
        id: "LH001",
        time: "10:00 AM, 25/09/2024",
        patientName: "Nguyễn Văn B",
        service: "Khám tổng quát",
        status: {
            status_id: 2,
            status_name: "Hoàn thành",
        },
        actions: {
            confirm: "Xác nhận",
            reject: "Từ chối",
            viewDetails: "Xem chi tiết",
        },
    },
    {
        id: "LH002",
        time: "2:00 PM, 25/09/2024",
        patientName: "Trần Thị C",
        service: "Khám nhi khoa",
        status: {
            status_id: 1,
            status_name: "Chờ xác nhận",
        },
        actions: {
            confirm: "Xác nhận",
            reject: "Từ chối",
            viewDetails: "Xem chi tiết",
        },
    },
    {
        id: "LH003",
        time: "2:00 PM, 25/09/2024",
        patientName: "Trần Thị C",
        service: "Khám nhi khoa",
        status: {
            status_id: 3,
            status_name: "Đã hủy",
        },
        actions: {
            confirm: "Xác nhận",
            reject: "Từ chối",
            viewDetails: "Xem chi tiết",
        },
    },
    {
        id: "LH0023",
        time: "2:00 PM, 25/09/2024",
        patientName: "Trần Thị C",
        service: "Khám nhi khoa",
        status: {
            status_id: 4,
            status_name: "Đang thực hiện",
        },
        actions: {
            confirm: "Xác nhận",
            reject: "Từ chối",
            viewDetails: "Xem chi tiết",
        },
    },
    {
        id: "LH0024",
        time: "2:00 PM, 25/09/2024",
        patientName: "Trần Thị C",
        service: "Khám nhi khoa",
        status: {
            status_id: 5,
            status_name: "Đã xác nhận",
        },
        actions: {
            confirm: "Xác nhận",
            reject: "Từ chối",
            viewDetails: "Xem chi tiết",
        },
    },
];

const appointmentDetails = {
    id: "DH0001",
    bookingDate: "27/10/2024",
    bookingTime: "14:00",
    customerName: "Kiều Trọng Khánh",
    phone: "012345789",
    address: "D1, FPT",
    consultationDetails: {
        service: "Khám tại nhà",
        issue: "Nổ bị đau",
        consultationDate: "30/10/2024",
        consultationTime: "16:00",
        doctor: "Phân bổ bởi trung tâm",
        location: "1A Trần Hưng Đạo, HCM",
    },
    status: "Chờ xác nhận",
    totalCost: 4000000,
};

const additionalServices = [
    {
        serviceName: "Dịch vụ 1",
        description: "Thêm khám sức khỏe toàn diện",
        cost: 500000,
    },
    {
        serviceName: "Dịch vụ 2",
        description: "Thêm xét nghiệm máu",
        cost: 700000,
    },
];

const getStatusClass = (status) => {
    const statusClasses = {
        "Chờ xác nhận": "#FBBF24", // Màu vàng sáng hơn (#FBBF24)
        "Đã xác nhận": "#22C55E", // Màu xanh lá sáng hơn (#22C55E)
        "Đã hủy": "#F87171", // Màu đỏ nhạt hơn (#F87171)
        "Đang thực hiện": "#60A5FA", // Màu xanh dương nhạt hơn (#60A5FA)
        "Hoàn thành": "#2DD4BF", // Màu teal sáng hơn (#2DD4BF)
        "Xác nhận": "#66BB6A", // Xanh lá nhạt hơn cho xác nhận (#66BB6A)
        "Từ chối": "#FF7961", // Đỏ sáng hơn cho từ chối (#FF7961)
        "Chi tiết": "#42A5F5", // Xanh dương sáng hơn cho chi tiết (#42A5F5)
    };

    return statusClasses[status] || "#9CA3AF"; // Mặc định: xám nhạt hơn (#9CA3AF)
};

function DoctorAppointmentPage() {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [openService, setOpenService] = useState(false);
    const [appoimentWithPet, setAppoimentWithPet] = useState(false);
    const handleOpenService = (appointmentID) => {
        setAppoimentWithPet(
            appointments.find((app) => app.id === appointmentID)
        );
        setOpenService(true);
    };
    const handleCloseService = () => setOpenService(false);
    const handleOpenPetModal = () => {
        setOpenPetModal(true);
    };

    const handleClosePetModal = () => {
        setOpenPetModal(false);
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Mock data for appointments
    useEffect(() => {
        const mockAppointments = [
            {
                id: 1,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations",
            },

            {
                id: 2,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations",
            },

            {
                id: 3,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations",
            },

            {
                id: 4,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations",
            },

            {
                id: 5,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations",
            },
            // ... more mock appointments ...
        ];
        setAppointments(appointmentList);
    }, []);

    const handleOpenModal = (appointment) => {
        setSelectedAppointment(appointment);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedAppointment(null);
    };
    const getText = (status) => {
        if (status === "Confirmed") {
            return {
                status_id: 5,
                status_name: "Đã xác nhận",
            };
        } else if (status === "Rejected") {
            return {
                status_id: 3,
                status_name: "Đã hủy",
            };
        } else if (status === "In Progress") {
            return {
                status_id: 4,
                status_name: "Đang thực hiện",
            };
        } else if (status === "Completed") {
            return {
                status_id: 2,
                status_name: "Hoàn thành",
            };
        }

        return {
            status_id: -1,
            status_name: status,
        };
    };

    const handleStatusChange = (appointmentId, newStatus) => {
        const newStatusChange = getText(newStatus);
        console.log("newStatusChange:", newStatusChange);
        console.log("start");

        setAppointments((prev) =>
            prev.map((app) =>
                app.id === appointmentId
                    ? {...app, status: newStatusChange}
                    : app
            )
        );
        console.log("end");

        message.success(
            `Cuộc hẹn ${newStatusChange.status_name.toLowerCase()} thành công`
        );
    };

    const filteredAppointments = appointments.filter((appointment) =>
        appointment.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const buttonStyle = (action) => ({
        padding: "6px 12px",
        borderRadius: "8px",
        fontWeight: "bold",
        backgroundColor: getStatusClass(action), // Sử dụng hàm để lấy màu nền
        color: "white",
        transition: "background-color 0.3s ease",
        cursor: "pointer",
    });
    console.log("appoimentWithPet:", appoimentWithPet);

    return (
        <>
            <DoctorNavBar/>
            <div style ={{marginLeft:"200px"}}>
            <div className={styles.doctorAppointmentContainer}>
                <div className="flex flex-col items-center p-4">
                    {/* Search and Sort Container */}
                    <div className="flex items-center gap-2 w-full max-w-md mx-auto">
                        <TextField
                            placeholder="Enter the appointment ID"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            className="mb-4"
                            onChange={handleSearchChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <SearchIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>

                <h1 className={styles.doctorAppointmentHeader}>
                    Quản lý lịch hẹn
                </h1>
                <TableContainer component={Paper}>
                    <Table
                        aria-label="appointment table"
                        style={{borderCollapse: "collapse"}}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        backgroundColor: "black",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    ID lịch hẹn
                                </TableCell>
                                <TableCell
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        backgroundColor: "black",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    Thời gian
                                </TableCell>
                                <TableCell
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        backgroundColor: "black",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    Dịch vụ
                                </TableCell>
                                <TableCell
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        backgroundColor: "black",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    Trạng thái
                                </TableCell>
                                <TableCell
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        backgroundColor: "black",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    Hành động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((appointment) => (
                                    <TableRow key={appointment.id}>
                                        <TableCell
                                            align="center"
                                            style={{border: "1px solid #ddd"}}
                                        >
                                            {appointment.id}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{border: "1px solid #ddd"}}
                                        >
                                            {appointment.time}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{border: "1px solid #ddd"}}
                                        >
                                            {appointment.service}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            style={{border: "1px solid #ddd"}}
                                        >
                                            <span
                                                style={{
                                                    padding: "5px 10px",
                                                    borderRadius: "8px",
                                                    fontWeight: "bold",
                                                    backgroundColor: `${getStatusClass(
                                                        appointment.status
                                                            .status_name
                                                    )}`,
                                                }}
                                            >
                                                {appointment.status.status_name}
                                            </span>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            colSpan={3}
                                            style={{border: "1px solid #ddd"}}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    gap: "10px",
                                                }}
                                            >
                                                {/* Logic for Action Buttons */}
                                                {appointment.status
                                                        .status_name ===
                                                    "Chờ xác nhận" && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                style={buttonStyle(
                                                                    "Xác nhận"
                                                                )}
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        appointment.id,
                                                                        "Confirmed"
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    appointment
                                                                        .actions
                                                                        .confirm
                                                                }
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                style={buttonStyle(
                                                                    "Từ chối"
                                                                )}
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        appointment.id,
                                                                        "Rejected"
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    appointment
                                                                        .actions
                                                                        .reject
                                                                }
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                style={buttonStyle(
                                                                    "Chi tiết"
                                                                )}
                                                                onClick={() =>
                                                                    handleOpenModal(
                                                                        appointment
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    appointment
                                                                        .actions
                                                                        .viewDetails
                                                                }
                                                            </Button>
                                                        </>
                                                    )}
                                                {appointment.status
                                                        .status_name ===
                                                    "Đã xác nhận" && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                style={buttonStyle(
                                                                    "Thực hiện dịch vụ"
                                                                )}
                                                                onClick={() =>
                                                                    handleStatusChange(
                                                                        appointment.id,
                                                                        "In Progress"
                                                                    )
                                                                }
                                                            >
                                                                Thực hiện dịch vụ
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                style={buttonStyle(
                                                                    "Chi tiết"
                                                                )}
                                                                onClick={() =>
                                                                    handleOpenModal(
                                                                        appointment
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    appointment
                                                                        .actions
                                                                        .viewDetails
                                                                }
                                                            </Button>
                                                        </>
                                                    )}
                                                {appointment.status
                                                        .status_name ===
                                                    "Đã hủy" && (
                                                        <Button
                                                            variant="contained"
                                                            style={buttonStyle(
                                                                "Chi tiết"
                                                            )}
                                                            onClick={() =>
                                                                handleOpenModal(
                                                                    appointment
                                                                )
                                                            }
                                                        >
                                                            {
                                                                appointment.actions
                                                                    .viewDetails
                                                            }
                                                        </Button>
                                                    )}
                                                {appointment.status
                                                        .status_name ===
                                                    "Đang thực hiện" && (
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                style={buttonStyle(
                                                                    "Hoàn thành"
                                                                )}
                                                                onClick={() =>
                                                                    handleOpenService(
                                                                        appointment.id
                                                                    )
                                                                }
                                                            >
                                                                Hoàn thành
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                style={buttonStyle(
                                                                    "Chi tiết"
                                                                )}
                                                                onClick={() =>
                                                                    handleOpenModal(
                                                                        appointment
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    appointment
                                                                        .actions
                                                                        .viewDetails
                                                                }
                                                            </Button>
                                                        </>
                                                    )}
                                                {appointment.status
                                                        .status_name ===
                                                    "Hoàn thành" && (
                                                        <Button
                                                            variant="contained"
                                                            style={buttonStyle(
                                                                "Chi tiết"
                                                            )}
                                                            onClick={() =>
                                                                handleOpenModal(
                                                                    appointment
                                                                )
                                                            }
                                                        >
                                                            {
                                                                appointment.actions
                                                                    .viewDetails
                                                            }
                                                        </Button>
                                                    )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        align="center"
                                        style={{
                                            color: "gray",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        Không có dữ liệu
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {selectedAppointment && (
                    <DocktorModal
                        appointmentID={selectedAppointment.id}
                        open={modalOpen}
                        onClose={handleCloseModal}
                    />
                )}

                <div>
                    <ServiceModal
                        open={openService}
                        handleClose={handleCloseService}
                        handleStatusChange={handleStatusChange}
                        appointmentID={appoimentWithPet.id}
                    />
                </div>
            </div>
            </div>

        </>
    );
}

export default DoctorAppointmentPage;
