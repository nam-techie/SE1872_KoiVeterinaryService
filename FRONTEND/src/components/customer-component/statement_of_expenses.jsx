import React from "react";
import { Box, Typography, Divider } from "@mui/material";

const treatmentCosts = {
    items: [
        {
            name: "Dịch vụ 1",
            quantity: 1,
            unitPrice: 3000000,
            totalPrice: 3000000,
        },
        {
            name: "Dịch vụ 2",
            quantity: 2,
            unitPrice: 3000000,
            totalPrice: 6000000,
        },
        {
            name: "Dịch vụ 3",
            quantity: 1,
            unitPrice: 3000000,
            totalPrice: 3000000,
        },
    ],
    subTotal: 12000000,
    tax: 860000,
    grandTotal: 12860000,
};

const medicalRecord = {
    petName: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    diagnosis: "Đang chờ",
    note: "Annual checkup and vaccinations",
};

function TreatmentCostTable() {
    return (
        <Box sx={{ width: "100%", margin: "auto", mt: 4 }}>
            <Typography
                variant="h6"
                align="center"
                sx={{ backgroundColor: "#3f51b5", color: "white", py: 1 }}
            >
                BẢNG KÊ CHI PHÍ VÀ HỒ SƠ BỆNH ÁN
            </Typography>

            <Box sx={{ overflowX: "auto", mt: 2 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "8px",
                                    backgroundColor: "while",
                                }}
                            >
                                <strong>HẠNG MỤC</strong>
                            </th>
                            <th
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <strong>SỐ LƯỢNG/GIỜ</strong>
                            </th>
                            <th
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <strong>ĐƠN GIÁ</strong>
                            </th>
                            <th
                                style={{
                                    borderBottom: "1px solid #ddd",
                                    padding: "8px",
                                    textAlign: "center",
                                }}
                            >
                                <strong>THÀNH TIỀN</strong>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {treatmentCosts.items.map((item, index) => (
                            <tr key={index}>
                                <td
                                    style={{
                                        padding: "8px",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    <strong>{item.name}</strong>
                                    <br />
                                    Mô tả
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        textAlign: "center",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    {item.quantity}
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        textAlign: "center",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    {item.unitPrice.toLocaleString("vi-VN")}đ
                                </td>
                                <td
                                    style={{
                                        padding: "8px",
                                        textAlign: "center",
                                        borderBottom: "1px solid #ddd",
                                    }}
                                >
                                    {item.totalPrice.toLocaleString("vi-VN")}đ
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Box>

            <Box sx={{ mt: 2, mx: 2 }}>
                <Typography variant="body2" align="right">
                    Tổng phụ: {treatmentCosts.subTotal.toLocaleString("vi-VN")}đ
                </Typography>
                <Typography variant="body2" align="right">
                    Thuế (8%): {treatmentCosts.tax.toLocaleString("vi-VN")}đ
                </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Typography
                variant="h6"
                align="right"
                sx={{ mr: 2, fontWeight: "bold" }}
            >
                TỔNG CỘNG: {treatmentCosts.grandTotal.toLocaleString("vi-VN")}đ
            </Typography>
            <div className="bg-white rounded-lg shadow-md p-4 w-full mx-auto mt-10">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Hồ sơ bệnh án
                </h3>
                <table className="w-full border-collapse text-sm text-gray-800">
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <th className="p-3 text-gray-500 font-normal text-left">
                                Tên cá Koi
                            </th>
                            <td className="p-3 font-semibold">Max</td>
                            <th className="p-3 text-gray-500 font-normal text-left">
                                Loại
                            </th>
                            <td className="p-3 font-semibold">Dog</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th className="p-3 text-gray-500 font-normal text-left">
                                Giống
                            </th>
                            <td className="p-3 font-semibold">
                                Golden Retriever
                            </td>
                            <th className="p-3 text-gray-500 font-normal text-left">
                                Chẩn đoán
                            </th>
                            <td className="p-3 font-semibold">
                                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                                    Đang chờ
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <th className="p-3 text-gray-500 font-normal text-left">
                                Ghi chú
                            </th>
                            <td className="p-3 font-semibold" colSpan="3">
                                Annual checkup and vaccinations
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Box>
    );
}

export default TreatmentCostTable;
