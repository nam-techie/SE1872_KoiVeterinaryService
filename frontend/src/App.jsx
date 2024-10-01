import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx" 
import HomePage from './public_pages/HomePage.jsx';
import LoginPage from './public_pages/Login.jsx';
import RegisterPage from './public_pages/Register.jsx'
import ServicesPage from './public_pages/ServicesPage';
import ContactPage from './public_pages/ContactPage';
import Layout from './components/Layout.jsx';
import ContactButton  from "./components/ContactButton.jsx";


function App() {
  return (
    <Router>
      <div>
        <Navbar />  {/* Navbar sẽ hiển thị trên tất cả các trang */}
        <Layout>  {/* Bọc các Routes bên trong Layout */}
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/homepage" element={<HomePage />} />  {/* Trang chủ */}
            <Route path="/login" element={<LoginPage />} />  {/* Trang đăng nhập */}
            <Route path="/services" element={<ServicesPage />} />  {/* Trang dịch vụ */}
            <Route path="/contact" element={<ContactPage />} />  {/* Trang liên hệ */}
            <Route path="/register" element = {<RegisterPage/>}/>{/*Trang đăng kí*/}
          </Routes>
          <ContactButton/>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
