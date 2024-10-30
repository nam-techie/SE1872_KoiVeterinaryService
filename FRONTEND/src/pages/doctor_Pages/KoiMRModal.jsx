import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
    Card,
    Typography,
    Divider,
} from "@mui/material";
import { MdClose } from "react-icons/md"; // Biểu tượng X

const KoiMRModal = ({ open, onClose }) => {
    // State để lưu thông tin thú cưng
    const [petInfo, setPetInfo] = useState({
        age: 2,
        breed: "Golden Retriever",
        color: "Yellow",
        healthStatus: "Tốt",
        name: "Max",
        weight: 25,
        additionalInfo: "Annual checkup and vaccinations",
    });

    // Hàm xử lý khi người dùng thay đổi giá trị trong các trường nhập
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    // Hàm xử lý khi người dùng lưu thông tin
    const handleSubmit = () => {
        console.log("Thông tin thú cưng:", petInfo);
        // Bạn có thể thực hiện lưu thông tin ở đây
        onClose(); // Đóng modal sau khi lưu
    };

    // Hàm xử lý khi người dùng reset thông tin
    const handleReset = () => {
        setPetInfo({
            age: 2,
            breed: "Golden Retriever",
            color: "Yellow",
            healthStatus: "Tốt",
            name: "Max",
            weight: 25,
            additionalInfo: "Annual checkup and vaccinations",
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px",
                }}
            >
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Nhập Thông Tin Thú Cưng
                </Typography>
                <Button onClick={onClose} style={{ minWidth: "auto" }}>
                    <MdClose size={24} />
                </Button>
            </div>
            <Divider sx={{ my: 1, opacity: 0.5 }} />
            <DialogContent>
                <Card
                    style={{
                        padding: "20px",
                        borderRadius: "16px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                label="Tên"
                                name="name"
                                value={petInfo.name}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Tuổi"
                                name="age"
                                type="number"
                                value={petInfo.age}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Giống"
                                name="breed"
                                value={petInfo.breed}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Màu sắc"
                                name="color"
                                value={petInfo.color}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Trọng lượng (kg)"
                                name="weight"
                                type="number"
                                value={petInfo.weight}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Tình trạng sức khỏe"
                                name="healthStatus"
                                value={petInfo.healthStatus}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Thông tin bổ sung"
                                name="additionalInfo"
                                value={petInfo.additionalInfo}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Card>
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-between" }}>
                <Button
                    variant="outlined"
                    onClick={handleReset}
                    style={{ margin: "10px" }}
                >
                    Reset
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    style={{
                        margin: "10px",
                        backgroundColor: "#2196F3",
                        color: "#FFFFFF",
                    }} // Màu xanh cho nút lưu
                >
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default KoiMRModal;
