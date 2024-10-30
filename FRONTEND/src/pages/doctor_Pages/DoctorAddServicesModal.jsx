import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
    Divider,
    Button,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { Grid, FormControlLabel, FormLabel } from "@mui/material";

const getService = () => {
    return {
        services: [
            { service_id: 1, service_name: "Kiểm tra sức khỏe định kỳ" },
            { service_id: 2, service_name: "Tư vấn dinh dưỡng" },
            { service_id: 3, service_name: "Dịch vụ vệ sinh bể cá" },
            { service_id: 4, service_name: "Điều trị bệnh ngoài da" },
            { service_id: 5, service_name: "Phục hồi sức khỏe sau bệnh" },
        ],
    };
};

const ServiceDialog = ({
                           open,
                           handleClose,
                           appointmentID,
                           handleStatusChange,
                       }) => {
    const [formData, setFormData] = useState({
        selectedServices: {},
        age: 0,
        breed: "",
        color: "",
        healthStatus: "",
        name: "",
        weight: 0,
        additionalInfo: "",
    });
    const [services, setServices] = useState([]);

    useEffect(() => {
        const response = getService();
        setServices(response.services);
    }, []);

    const handleCheckboxChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            selectedServices: {
                ...prevData.selectedServices,
                [event.target.name]: event.target.checked,
            },
        }));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log("Dữ liệu đã được lưu:", formData);
        setFormData({
            selectedServices: {},
            age: 0,
            breed: "",
            color: "",
            healthStatus: "",
            name: "",
            weight: 0,
            additionalInfo: "",
        });
        try {
            const response = { ok: true, status: 200 }; // Gọi API để lưu dữ liệu
            if (response.ok) {
                handleStatusChange(appointmentID, "Completed"); // Cập nhật trạng thái
                handleClose(); // Đóng modal
            } else {
                alert("Lỗi khi lưu dữ liệu");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        }
    };

    const handleReset = () => {
        setFormData({
            selectedServices: {},
            age: 0,
            breed: "",
            color: "",
            healthStatus: "",
            name: "",
            weight: 0,
            additionalInfo: "",
        });
    };
    const handleBackdropClick = (event) => {
        setFormData({
            selectedServices: {},
            age: 0,
            breed: "",
            color: "",
            healthStatus: "",
            name: "",
            weight: 0,
            additionalInfo: "",
        });

        event.stopPropagation(); // Ngăn chặn sự kiện click đi lên
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            onBackdropClick={handleBackdropClick} // Xử lý click trên backdrop
        >
            <div>
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: "20px",
                    }}
                >
                    Bổ sung dịch vụ
                </Typography>
                <Button
                    onClick={handleClose}
                    sx={{ position: "absolute", right: 0, top: 0 }}
                >
                    <MdClose size={28} />
                </Button>
            </div>
            <DialogContent>
                <Divider sx={{ my: 2, opacity: 1, width: "100%" }} />
                <Typography
                    variant="subtitle1"
                    sx={{ mt: 2, fontWeight: "bold" }}
                >
                    Dịch vụ bổ sung
                </Typography>

                <Grid container spacing={2} mt={1}>
                    {services.map((service) => (
                        <Grid item xs={6} key={service.service_id}>
                            <FormControlLabel
                                control={
                                    <input
                                        type="checkbox"
                                        checked={
                                            formData.selectedServices[
                                                service.service_name
                                                ] || false
                                        }
                                        onChange={handleCheckboxChange}
                                        name={service.service_name}
                                        className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                            cursor: "pointer",
                                            marginRight: "0.7rem",
                                        }}
                                    />
                                }
                                label={
                                    <Typography
                                        variant="body1"
                                        className="text-black ml-8"
                                    >
                                        {service.service_name}
                                    </Typography>
                                }
                                className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200 ease-in-out"
                            />
                        </Grid>
                    ))}
                </Grid>
                <Divider sx={{ my: 2, opacity: 1, width: "100%" }} />

                {/* Các trường nhập dữ liệu như tên, tuổi, giống... */}
                {[
                    "name",
                    "age",
                    "breed",
                    "color",
                    "healthStatus",
                    "weight",
                    "additionalInfo",
                ].map((field, index) => (
                    <div className="mt-6" key={index}>
                        <FormLabel
                            component="legend"
                            sx={{
                                color: "black",
                                fontWeight: "bold",
                                mb: 1,
                            }}
                        >
                            {field === "name" && "Tên"}
                            {field === "age" && "Tuổi"}
                            {field === "breed" && "Giống"}
                            {field === "color" && "Màu sắc"}
                            {field === "healthStatus" && "Trạng thái sức khỏe"}
                            {field === "weight" && "Cân nặng"}
                            {field === "additionalInfo" && "Thông tin bổ sung"}
                        </FormLabel>
                        {field !== "additionalInfo" ? (
                            <input
                                type={
                                    field === "age" || field === "weight"
                                        ? "number"
                                        : "text"
                                }
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                placeholder={`Nhập ${
                                    field === "additionalInfo"
                                        ? "thông tin bổ sung"
                                        : `của thú cưng`
                                }`}
                                className="w-full h-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <textarea
                                name="additionalInfo"
                                value={formData.additionalInfo}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Nhập thông tin bổ sung"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    </div>
                ))}
            </DialogContent>
            <DialogActions
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <Button
                    onClick={handleReset}
                    color="primary"
                    variant="outlined"
                    sx={{ marginRight: "auto" }} // Đẩy nút Reset sang trái
                >
                    Reset
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ marginLeft: "auto" }} // Đẩy nút Save sang phải
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ServiceDialog;
