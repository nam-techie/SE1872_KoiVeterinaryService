import "../styles/BookingPage.css";
import { useBookingForm } from "../hooks/bookingLogic.js"; // Import custom hook

function BookingPage() {
    const {
        specialty,
        setSpecialty,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        address,
        setAddress,
        district,
        setDistrict,
        doctor,
        setDoctor,
        handleSubmit
    } = useBookingForm(); // Sử dụng hook để quản lý state

    return (
        <>
            <form onSubmit={handleSubmit} className="appointment-form">
                <h2>Nội dung chi tiết đặt hẹn</h2>

                {/* Loại dịch vụ */}
                <div className="form-group">
                    <label htmlFor="specialty">Loại Dịch Vụ Bạn Muốn Đặt</label>
                    <select
                        id="specialty"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    >
                        <option value="">Chọn loại dịch vụ</option>
                        <option value="online-consultation">Tư Vấn Trực Tuyến</option>
                        <option value="home-survey">Khảo Sát Tại Nhà</option>
                        <option value="center-appointment">Đặt lịch Khám Tại Trung Tâm</option>
                        <option value="home-treatment">Đặt lịch khám tại nhà</option>
                    </select>
                </div>

                {/* Hiển thị số điện thoại và nội dung tư vấn cho "Tư Vấn Trực Tuyến" */}
                {specialty === "online-consultation" && (
                    <>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Số Điện Thoại *</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Miêu Tả Nội Dung Cần Tư Vấn *</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Hiển thị địa chỉ cho "Khảo Sát Tại Nhà" và "Điều Trị Tại Nhà" */}
                {(specialty === "home-survey" || specialty === "home-treatment") && (
                    <>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Số Điện Thoại *</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="district">Quận *</label>
                            <select
                                id="district"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            >
                                <option value="Ho Chi Minh">Sài Gòn</option>
                                <option value="District 1">Quận 1</option>
                                <option value="District 2">Quận 2</option>
                                <option value="District 3">Quận 3</option>
                                {/* Thêm các quận khác tại đây */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Địa Chỉ Chi Tiết *</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                {/* Hiển thị số điện thoại, miêu tả và chọn bác sĩ cho "Đặt lịch Khám Tại Trung Tâm" */}
                {specialty === "center-appointment" && (
                    <>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Số Điện Thoại *</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Miêu Tả Vấn Đề Cần Điều Trị *</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="doctor">Chọn Bác Sĩ (Không bắt buộc)</label>
                            <select
                                id="doctor"
                                value={doctor}
                                onChange={(e) => setDoctor(e.target.value)}
                            >
                                <option value="">Chọn Bác Sĩ</option>
                                <option value="dr1">Bác Sĩ A</option>
                                <option value="dr2">Bác Sĩ B</option>
                                {/* Thêm các bác sĩ khác tại đây */}
                            </select>
                        </div>
                    </>
                )}

                <button type="submit" className="submit-button">
                    Đặt ngay
                </button>
            </form>
        </>
    );
}

export default BookingPage;
