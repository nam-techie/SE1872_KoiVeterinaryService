import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {PublicRoute, RestrictedRoute, RoleBasedRoute} from "./routes/workingRoutes.jsx";
import ServiceIntro from "./pages/ServiceIntro.jsx";
import AboutMe from "./pages/AboutMe.jsx";
import DoctorDashBoard from "./pages/doctor_Pages/DoctorDashBoard.jsx";
import GoogleLoginSuccess from "./pages/GoogleLoginSuccess.jsx";
import CustomerBookingPage from "./pages/customer_Pages/CustomerBookingPage.jsx";
import LoadingCat from "./components/LoadingCat.jsx";
import DoctorAppointmentPage from "./pages/doctor_Pages/DoctorAppointmentPage.jsx";
import ForgotPassword from "./pages/ForgotPassWord.jsx";
import VerifyOTP from "./pages/Verify-OTP.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import TermAndRefund from "./pages/TermAndRefund.jsx";
import FindDoctor from './pages/FindDoctor';
import Dashboard from "./pages/admin_Pages/Dashboard.jsx";
import DoctorSchedulePage from "./pages/doctor_Pages/DoctorSchedulePage.jsx";
import PageTitle from "./components/PageTitle.jsx";
import CustomerAppointmentPage from "./pages/customer_Pages/CustomerAppointmentPage.jsx";
import AdminDashboard from "./pages/admin_Pages/Dashboard.jsx";


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

                    {/*Trang dành cho customer */}
                    <Route path="/customer/booking" element={
                        <PageTitle title="Book an Appointment">
                            <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                                <CustomerBookingPage/>
                            </RoleBasedRoute>
                        </PageTitle>
                    }/>

                    <Route path="/customer/manage-appointment" element={
                        <PageTitle title="Quản lí lịch hẹn">
                            <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                                <CustomerAppointmentPage/>
                            </RoleBasedRoute>
                        </PageTitle>
                    }/>


                    {/*Trang chỉ doctor và admin truy cập được*/}
                    <Route path="/doctor/dashboard" element={
                        <PageTitle title="Tổng quan">
                            <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                                <DoctorDashBoard/>
                            </RoleBasedRoute>
                        </PageTitle>
                    }/>

                    <Route path="/doctor/manage-appointment" element={
                        <PageTitle title="Lịch đặt">
                            <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                                <DoctorAppointmentPage/>
                            </RoleBasedRoute>
                        </PageTitle>
                    }/>

                    <Route path="/doctor/work-schedule" element={
                        <PageTitle title="Lịch làm việc">
                            <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                                <DoctorSchedulePage/>
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
