
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
import FAQPage from "./pages/FAQPage.jsx";


function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* Trang công khai*/}
          <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>}/>
          <Route path="/homepage" element={<PublicRoute><HomePage /></PublicRoute>}/>
          <Route path="/service" element={<PublicRoute><ServiceIntro /></PublicRoute>}/>
          <Route path="/aboutme" element={<PublicRoute><AboutMe /></PublicRoute>}/>
          <Route path="/success" element={<PublicRoute><GoogleLoginSuccess /></PublicRoute>}/>
          <Route path="/loading" element={<PublicRoute><LoadingCat/></PublicRoute>}/>
          <Route path="/faqs" element={<PublicRoute><FAQPage/></PublicRoute>}/>

          {/* Trang không cho phép truy cập nếu đã đăng nhập (có token) */}
          <Route path="/login" element={<RestrictedRoute><Login /></RestrictedRoute>} />
          <Route path="/register" element={<RestrictedRoute><Register /></RestrictedRoute>} />

           Trang chỉ customer và admin truy cập được (doctor không truy cập được)
          <Route path="/customer/booking-page" element={
            <RoleBasedRoute allowedRoles={['CUSTOMER', 'ADMIN']}>
                <BookingPage/>
            </RoleBasedRoute>
          } />

           Trang chỉ doctor và admin truy cập được
          <Route path="/doctor/doctor-dashboard" element={
            <RoleBasedRoute allowedRoles={['DOCTOR', 'ADMIN']}>
              <DoctorDashBoard/>
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
