import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx" 
import HomePage from './public_pages/HomePage.jsx';
import LoginPage from './public_pages/Login.jsx';
import RegisterPage from './public_pages/Register.jsx'
import ServicesPage from './public_pages/ServicesPage';
import Layout from './components/Layout.jsx';
import ContactButton  from "./components/ContactButton.jsx";
import AboutMe from "./public_pages/AboutMe.jsx";
import BookingPage from "./public_pages/BookingPage.jsx"
import TermAndRefund from "./public_pages/TermAndRefund.jsx";
import ForgotPassword from "./public_pages/ForgotPassword.jsx";

import ResetPassword from "./public_pages/ResetPassword.jsx";

function App() {
  return (
    <Router>
      <div>
        <Navbar />  {/* Navbar sẽ hiển thị trên tất cả các trang */}
        <Layout>  {/* Bọc các Routes bên trong Layout */}
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/AboutMe" element={<AboutMe />} />
            <Route path="/register" element = {<RegisterPage/>}/>
            <Route path="/bookingpage" element = {<BookingPage/>}/>
            <Route path="/termandrefunds" element={<TermAndRefund/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/reset-password" element={<ResetPassword/>}/>
          </Routes>
          <ContactButton/>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
