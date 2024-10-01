import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx" 
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx'
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import Layout from './components/Layout.jsx';  

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
        </Layout>
      </div>
    </Router>
  );
}

export default App;
