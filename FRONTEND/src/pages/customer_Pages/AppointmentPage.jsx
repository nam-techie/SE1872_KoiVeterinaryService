import React from "react";
import { useState, useEffect } from "react";
import {
    Button,
    Card,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Grid,
    Select,
    MenuItem,
} from "@mui/material";
import { CustomerNavBar } from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx"; // CSS Module import
import styles from './styles/AppointmentPage.module.css'
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import {
    TextField,
    InputAdornment,
    IconButton,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import AppointmentModal from "../../components/customer-component/AppointmentModal.jsx";

//Mock Data cho Lịch Đặt:
const appointments = [
    {
        id: "LH001",
        time: "10:00 AM, 25/09/2024",
        service: "Khám tổng quát",
        status: {
            status_id: 1,
            status_name: "Chờ xác nhận",
        },
        action: "Xem chi tiết",
    },
    {
        id: "LH002",
        time: "2:00 PM, 24/09/2024",
        service: "Khám nhi khoa",
        status: {
            status_id: 2,
            status_name: "Đã xác nhận",
        },
        action: "Xem chi tiết",
    },
    {
        id: "LH0035",
        time: "2:00 PM, 25/09/2024",
        status: { status_id: 3, status_name: "Chờ thanh toán phí lần 1" },
        service: "Khám nhi khoa",
        action: "Xem chi tiết",
    },
    {
        id: "LH0054",
        time: "2:00 PM, 21/09/2024",
        service: "Khám nhi khoa",
        status: { status_id: 4, status_name: "Đã thanh toán" },
        action: "Xem chi tiết",
    },
    {
        id: "LH005",
        time: "2:00 PM, 25/09/2024",
        service: "Khám nhi khoa",
        status: { status_id: 5, status_name: "Đang thực hiện dịch vụ" },
        action: "Xem chi tiết",
    },
    {
        id: "LH0013",
        time: "10:00 AM, 25/09/2024",
        service: "Khám tổng quát",
        status: { status_id: 6, status_name: "Chờ thanh toán phí lần 2" },
        action: "Xem chi tiết",
    },
    {
        id: "LH0022",
        time: "2:00 PM, 24/09/2024",
        service: "Khám nhi khoa",
        status: { status_id: 7, status_name: "Đã thanh toán" },
        action: "Xem chi tiết",
    },
    {
        id: "LH00315",
        time: "2:00 PM, 25/09/2024",
        service: "Khám nhi khoa",
        status: { status_id: 8, status_name: "Hoàn thành" },
        action: "Xem chi tiết",
    },
    {
        id: "LH00543",
        time: "2:00 PM, 21/09/2024",
        service: "Khám nhi khoa",
        status: { status_id: 5, status_name: "Đang thực hiện dịch vụ" },
        action: "Xem chi tiết",
    },
    {
        id: "LH0052",
        time: "2:00 PM, 25/09/2024",
        service: "Khám nhi khoa",
        status: { status_id: 3, status_name: "Chờ thanh toán phí lần 1" },
        action: "Xem chi tiết",
    },
];

//Mock Data cho Bảng Kê Chi Phí:

//Mock Data cho Hồ Sơ Bệnh Án:
const medicalRecord = {
    petName: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    diagnosis: "Đang chờ",
    note: "Annual checkup and vaccinations",
};

const appointmentData = {
    id: "DH0001",
    bookingDate: "27/10/2024",
    bookingTime: "14:00:00",
    customerName: "Kiều Trọng Khánh",
    phone: "012345789",
    address: "D1, FPT",
    service: "Khám tại nhà",
    problem: "Nó bị đau",
    detailAddress: "1A Trần Hưng Đạo, HCM",
    appointmentDate: "30/10/2024",
    appointmentTime: "16:00",
    doctor: "Phân bổ bởi trung tâm",
    totalAmount: "4.000.000 VND",
    currentStatus: 0,
};

const steps = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Chờ thanh toán phí lần 1",
    "Đã thanh toán",
    "Đang thực hiện dịch vụ",
    "Chờ thanh toán phí lần 2",
    "Đã thanh toán",
    "Hoàn thành",
];

const getStatusClass = (status) => {
    const statusClasses = {
        "Chờ xác nhận": "bg-yellow-500", // Pending
        "Đã xác nhận": "bg-green-500", // Confirmed
        "Chờ thanh toán phí lần 1": "bg-orange-500", // Waiting for payment 1
        "Đã thanh toán": "bg-blue-500", // Paid
        "Đang thực hiện dịch vụ": "bg-purple-500", // In service
        "Chờ thanh toán phí lần 2": "bg-red-500", // Waiting for payment 2
        "Hoàn thành": "bg-teal-500", // Completed
    };

    return statusClasses[status] || "bg-gray-500"; // Default for any other status
};
const AppointmentPage = () => {
    const [appointmentsData, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null); // State to hold selected appointment data
    const [sortOption, setSortOption] = useState("None"); // State cho dropdown
    const [statusList, setStatusList] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    useEffect(() => {
        // Initialize appointments data
        setAppointments(appointments);
    }, []);
    useEffect(() => {
        // use effect này để tạo ra 1 list các status unique lấy từ dữ liệu appointments
        const statusUnique = [
            ...new Set(
                appointmentsData.map(
                    (appointment) => appointment.status.status_name
                )
            ),
        ];

        setStatusList(statusUnique);
    }, [appointmentsData]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleOpenModal = (appointment) => {
        setSelectedAppointment(appointment);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedAppointment(null);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    // hàm này để chuyển đổi 1 string sang 1 Date
    // cú pháp và logic thì các bạn tự xem xét nhé, khá giống java thôi
    const convertToDate = (timeString) => {
        const [time, date] = timeString.split(", ");
        const [hourString, minuteString] = time.split(":");
        const [day, month, year] = date.split("/");

        // Parse hours and minutes
        const hours = parseInt(hourString);
        const minutes = parseInt(minuteString.split(" ")[0]); // Get only the minutes part
        const isPM = time.includes("PM");

        // Convert hours to 24-hour format
        const hour24 =
            isPM && hours !== 12 ? hours + 12 : hours === 12 ? 0 : hours;

        return new Date(year, month - 1, day, hour24, minutes);
    };
    // hàm này phục vụ cho sortData
    const sortedAppointments = [...appointmentsData]?.sort((a, b) => {
        const dateA = convertToDate(a.time);

        const dateB = convertToDate(b.time);

        if (sortOption === "None") {
            return 0;
        } else if (sortOption === "0") {
            return dateA - dateB;
        } else if (sortOption === "1") {
            return dateB - dateA;
        } else if (sortOption === "2") {
            return a.service.localeCompare(b.service); // Sắp xếp từ A-Z theo tên dịch vụ
        } else if (sortOption === "3") {
            return b.service.localeCompare(a.service); // Sắp xếp từ Z-A theo tên dịch vụ
        }
    });

    // sau khi sortData thì sẽ filter theo những thứ mà các bạn cần
    const filteredAppointments = sortedAppointments.filter((appointment) => {
        const isMatchingSearchTerm = appointment.id
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const isMatchingStatus =
            selectedStatuses.length === 0 ||
            selectedStatuses.includes(appointment.status.status_name);
        return isMatchingSearchTerm && isMatchingStatus;
    });

    return (
        <>
            <CustomerNavBar />
            <div className="flex flex-col items-center p-4 mt-28">
                {/* Search and Sort Container */}
                <div className="flex items-center gap-2">
                    {" "}
                    {/* Sử dụng flex để nằm cùng hàng */}
                    {/* Search Input */}
                    <TextField
                        placeholder="Enter the appointment ID"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        className="max-w-md mb-4"
                        onChange={handleSearchChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Select
                        value={sortOption}
                        onChange={handleSortChange}
                        variant="outlined"
                        className="max-w-xs sm:max-w-md h-12" // Responsive width và chiều cao
                    >
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="0">
                            Sắp xếp theo thời gian ( Tăng Dần)
                        </MenuItem>
                        <MenuItem value="1">
                            Sắp xếp theo thời gian ( Giảm Dần)
                        </MenuItem>
                        <MenuItem value="2">
                            Sắp xếp theo dịch vụ ( Từ a - z)
                        </MenuItem>
                        <MenuItem value="3">
                            Sắp xếp theo dịch vụ ( Từ z - a)
                        </MenuItem>
                    </Select>
                </div>
            </div>

            {/* ================== TABLE ================ */}
            <div
                className={`p-4 shadow-md overflow-x-auto ${styles.container}`}
                style={{ width: "80%", margin: "0 auto" }}
            >
                <table className="w-full border-collapse text-center">
                    <thead className="thead-table">
                        <tr className=" text-white">
                            <th
                                className="p-2 border border-gray-300 text-center"
                                style={{
                                    position: "relative",
                                    backgroundColor: "black",
                                }}
                            >
                                ID lịch hẹn
                            </th>
                            <th
                                className="p-2 border border-gray-300 text-center"
                                style={{
                                    position: "relative",
                                    backgroundColor: "black",
                                }}
                            >
                                Thời gian
                            </th>
                            <th
                                className="p-2 border border-gray-300 text-center"
                                style={{
                                    position: "relative",
                                    backgroundColor: "black",
                                }}
                            >
                                Dịch vụ
                            </th>
                            <th
                                className="p-2 border border-gray-300 text-center"
                                style={{
                                    position: "relative",
                                    backgroundColor: "black",
                                }}
                            >
                                Trạng thái
                            </th>
                            <th
                                className="p-2 border border-gray-300 text-center"
                                style={{
                                    position: "relative",
                                    backgroundColor: "black",
                                }}
                            >
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) => {
                                return (
                                    <tr
                                        key={appointment.id}
                                        className="text-center"
                                    >
                                        <td className="p-2 border border-gray-300 text-center">
                                            {appointment.id}
                                        </td>
                                        <td className="p-2 border border-gray-300 text-center">
                                            {appointment.time}
                                        </td>
                                        <td className="p-2 border border-gray-300 text-center">
                                            {appointment.service}
                                        </td>
                                        <td className="p-2 border border-gray-300 text-center">
                                            <span
                                                className={`px-2 py-1 rounded text-white ${getStatusClass(
                                                    appointment.status
                                                        .status_name
                                                )}`}
                                            >
                                                {appointment.status.status_name}
                                            </span>
                                        </td>
                                        <td className="p-2 border border-gray-300 text-center">
                                            <button
                                                className="px-2 py-1 bg-blue-500 text-white rounded"
                                                onClick={() =>
                                                    handleOpenModal(appointment)
                                                }
                                            >
                                                {appointment.action}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="p-4 text-center text-gray-500"
                                >
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* ================= MODAL ================ */}
            {/* Đây là modal sẽ được show ra khi click vào xem chi tiết nhé */}
            {selectedAppointment && (
                <AppointmentModal
                    appointmentID={selectedAppointment.id}
                    steps={steps}
                    open={modalOpen}
                    onClose={handleCloseModal}
                />
            )}
            <Footer />
        </>
    );
};

export default AppointmentPage;
