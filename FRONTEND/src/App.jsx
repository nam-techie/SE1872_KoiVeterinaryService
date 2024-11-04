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
import AppointmentPage from "./pages/customer_Pages/AppointmentPage.jsx";
import ManageAppointment from "./pages/customer_Pages/ManageAppointment.jsx";
import DoctorWorkSchedule from "./pages/doctor_Pages/DoctorWorkSchedule.jsx";
import CustomerProfile from "./pages/customer_Pages/CustomerProfile.jsx";

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
                    <Route path="/" element={<PublicRoute><HomePage/></PublicRoute>}/>
                    <Route path="/homepage" element={<PublicRoute><HomePage/></PublicRoute>}/>
                    <Route path="/service" element={<PublicRoute><ServiceIntro/></PublicRoute>}/>
                    <Route path="/aboutme" element={<PublicRoute><AboutMe/></PublicRoute>}/>
                    <Route path="/success" element={<PublicRoute><GoogleLoginSuccess/></PublicRoute>}/>
                    <Route path="/loading" element={<PublicRoute><LoadingCat/></PublicRoute>}/>
                    <Route path="/faqs" element={<PublicRoute><FAQPage/></PublicRoute>}/>
                    <Route path="/terms" element={<PublicRoute><TermAndRefund/></PublicRoute>}/>
                    <Route path="/doctor-list" element={<PublicRoute><FindDoctor/></PublicRoute>}/>

                    {/* Trang không cho phép truy cập nếu đã đăng nhập (có token) */}
                    <Route path="/login" element={<RestrictedRoute><Login/></RestrictedRoute>}/>
                    <Route path="/api/register" element={<RestrictedRoute><Register/></RestrictedRoute>}/>

                    Trang chỉ customer và admin truy cập được (doctor không truy cập được)
                    <Route path="/customer/booking-page" element={
                        <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                            <BookingPage/>
                        </RoleBasedRoute>
                    }/>
                    <Route path="/customer/manage-appointment" element={
                        <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                            <ManageAppointment/>
                        </RoleBasedRoute>
                    }/>
                    <Route path="/customer/appointment" element={
                        <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                            <AppointmentPage/>
                        </RoleBasedRoute>
                    }/>
                    <Route path="/customer/profile" element={
                        <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                            <CustomerProfile/>
                        </RoleBasedRoute>
                    }/>

                    Trang chỉ doctor và admin truy cập được
                    <Route path="/doctor/dashboard" element={
                        <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                            <DoctorDashBoard/>
                        </RoleBasedRoute>
                    }/>

                    <Route path="/doctor/manage-appointment" element={
                        <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                            <DoctorAppointment/>
                        </RoleBasedRoute>
                    }/>
                    <Route path="/doctor/work-schedule" element={
                        <RoleBasedRoute allowedRoles={['VETERINARY', 'ADMIN']}>
                            <DoctorWorkSchedule/>
                        </RoleBasedRoute>
                    }/>



                    {/*/!* Trang dashboard của doctor *!/*/}
                    {/*<Route path="/doctor-dashboard" element={*/}
                    {/*  <RoleBasedRoute allowedRoles={['doctor']}>*/}
                    {/*    <DoctorDashboard />*/}
                    {/*  </RoleBasedRoute>*/}
                    {/*} />*/}

                    {/* Trang chỉ admin truy cập được */}
                    <Route path="/admin" element={
                      <RoleBasedRoute allowedRoles={['ADMIN']}>
                        <Dashboard />
                      </RoleBasedRoute>
                    } />

                    {/* Trang không tìm thấy */}
                    {/*<Route path="*" element={<NotFoundPage />} />*/}
                </Routes>
            </Router>

        </>
    )
}

export default App
