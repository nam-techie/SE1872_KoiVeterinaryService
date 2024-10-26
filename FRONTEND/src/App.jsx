import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {PublicRoute, RestrictedRoute, RoleBasedRoute} from "./routes/workingRoutes.jsx";
import ServiceIntro from "./pages/ServiceIntro.jsx";
import AboutMe from "./pages/AboutMe.jsx";
import DoctorDashBoard from "./pages/doctor_Pages/DoctorDashBoard.jsx";
import GoogleLoginSuccess from "./pages/GoogleLoginSuccess.jsx";
import BookingPage from "./pages/customer_Pages/BookingPage.jsx";
import LoadingCat from "./components/LoadingCat.jsx";
import DoctorAppointment from "./pages/doctor_Pages/DoctorAppointment.jsx";
import ForgotPassword from "./pages/ForgotPassWord.jsx";
import VerifyOTP from "./pages/Verify-OTP.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import TermAndRefund from "./pages/TermAndRefund.jsx";
import FindDoctor from './pages/FindDoctor';
import Dashboard from "./pages/admin_Pages/Dashboard.jsx";
import DoctorWorkSchedule from "./pages/doctor_Pages/DoctorWorkSchedule.jsx";
import DoctorBooking from "./pages/doctor_Pages/DoctorBooking.jsx";
import {Helmet} from 'react-helmet';
import PageTitle from "./components/PageTitle.jsx";


function App() {


    return (
        <>
            <Router>
                <Routes>
                    {/*Trang công khai với tất cả mọi actor*/}
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route path="/verify-otp" element={<VerifyOTP/>}/>
                    <Route path="/reset-password" element={<ResetPassword/>}/>


                    {/* Trang công khai */}
                    <Route path="/" element={
                        <PageTitle title="Home">
                            <PublicRoute><HomePage/></PublicRoute>
                        </PageTitle>
                    }/>
                    <Route path="/homepage" element={
                        <PageTitle title="Home">
                            <PublicRoute><HomePage/></PublicRoute>
                        </PageTitle>
                    }/>
                    <Route path="/service" element={
                        <PageTitle title="Our Services">
                            <PublicRoute><ServiceIntro/></PublicRoute>
                        </PageTitle>
                    }/>
                    <Route path="/aboutme" element={<PublicRoute><AboutMe/></PublicRoute>}/>
                    <Route path="/success" element={<PublicRoute><GoogleLoginSuccess/></PublicRoute>}/>
                    <Route path="/loading" element={<PublicRoute><LoadingCat/></PublicRoute>}/>
                    <Route path="/faqs" element={<PublicRoute><FAQPage/></PublicRoute>}/>
                    <Route path="/terms" element={<PublicRoute><TermAndRefund/></PublicRoute>}/>
                    <Route path="/doctor-list" element={<PublicRoute><FindDoctor/></PublicRoute>}/>

                    {/* Trang không cho phép truy cập nếu đã đăng nhập (có token) */}
                    <Route path="/login" element={
                        <PageTitle title="Login">
                            <RestrictedRoute><Login/></RestrictedRoute>
                        </PageTitle>
                    }/>
                    <Route path="/register" element={
                        <PageTitle title="Register">
                            <RestrictedRoute><Register/></RestrictedRoute>
                        </PageTitle>
                    }/>

                    Trang chỉ customer và admin truy cập được (doctor không truy cập được)
                    <Route path="/customer/booking-page" element={
                        <PageTitle title="Book an Appointment">
                            <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                                <BookingPage/>
                            </RoleBasedRoute>
                        </PageTitle>
                    }/>


                    {/*Trang chỉ doctor và admin truy cập được*/}
                    <Route path="/doctor/doctor-dashboard" element={
                        <PageTitle title="Tổng quan">
                            <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                                <DoctorDashBoard/>
                            </RoleBasedRoute>
                        </PageTitle>
                    }/>

                    <Route path="/doctor/doctor-appointment" element={
                        <PageTitle title="Lịch đặt">
                            <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                                <DoctorAppointment/>
                            </RoleBasedRoute>
                        </PageTitle>
                    }/>

                    <Route path="/doctor/doctor-work-schedule" element={
                        <PageTitle title="Lịch làm việc">
                            <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                                <DoctorWorkSchedule/>
                            </RoleBasedRoute>
                        </PageTitle>
                    }/>

                    <Route path="/doctor/doctor-booking" element={
                        <PageTitle title="Thêm dịch vụ">
                            <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                                <DoctorBooking/>
                            </RoleBasedRoute>
                        </PageTitle>
                    }/>

                    {/* Trang chỉ admin truy cập được */}
                    <Route path="/admin" element={
                        <RoleBasedRoute allowedRoles={['ADMIN']}>
                            <Dashboard/>
                        </RoleBasedRoute>
                    }/>

                </Routes>
            </Router>

        </>
    )
}

export default App
