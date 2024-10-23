
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import  {PublicRoute, RestrictedRoute,RoleBasedRoute} from "./routes/workingRoutes.jsx";
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

function App() {


  return (
    <>
      <Router>
        <Routes>
          {/*Trang công khai với tất cả mọi actor*/}
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/verify-otp" element={<VerifyOTP/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>

          {/* Trang công khai, nhưng bác sĩ không được truy cập */}
          <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>}/>
          <Route path="/homepage" element={<PublicRoute><HomePage /></PublicRoute>}/>
          <Route path="/service" element={<PublicRoute><ServiceIntro /></PublicRoute>}/>
          <Route path="/aboutme" element={<PublicRoute><AboutMe /></PublicRoute>}/>
          <Route path="/login/success" element={<PublicRoute><GoogleLoginSuccess /></PublicRoute>}/>
          <Route path="/loading" element={<PublicRoute><LoadingCat/></PublicRoute>}/>

          {/* Trang không cho phép truy cập nếu đã đăng nhập (có token) */}
          <Route path="/login" element={<RestrictedRoute><Login /></RestrictedRoute>} />
          <Route path="/register" element={<RestrictedRoute><Register /></RestrictedRoute>} />

           {/*Trang chỉ customer và admin truy cập được (doctor không truy cập được)*/}
          <Route path="/customer/booking-page" element={
            <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                <BookingPage/>
            </RoleBasedRoute>
          } />

          {/*Trang chỉ doctor và admin truy cập được*/}
          <Route path="/doctor/doctor-dashboard" element={
            <RoleBasedRoute allowedRoles={['DOCTOR', 'ADMIN']}>
              <DoctorDashBoard/>
            </RoleBasedRoute>
          } />

          <Route path="/doctor/doctor-appointment" element={
            <RoleBasedRoute allowedRoles={['DOCTOR', 'ADMIN']}>
                <DoctorAppointment/>
            </RoleBasedRoute>
          } />

          {/*/!* Trang dashboard của doctor *!/*/}
          {/*<Route path="/doctor-dashboard" element={*/}
          {/*  <RoleBasedRoute allowedRoles={['doctor']}>*/}
          {/*    <DoctorDashboard />*/}
          {/*  </RoleBasedRoute>*/}
          {/*} />*/}

          {/*/!* Trang chỉ admin truy cập được *!/*/}
          {/*<Route path="/admin" element={*/}
          {/*  <RoleBasedRoute allowedRoles={['admin']}>*/}
          {/*    <AdminPage />*/}
          {/*  </RoleBasedRoute>*/}
          {/*} />*/}

          {/* Trang không tìm thấy */}
          {/*<Route path="*" element={<NotFoundPage />} />*/}
        </Routes>
      </Router>

    </>
  )
}

export default App
