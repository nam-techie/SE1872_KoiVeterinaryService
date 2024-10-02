import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx" 
import HomePage from './public_pages/HomePage.jsx';
import LoginPage from './public_pages/Login.jsx';
import RegisterPage from './public_pages/Register.jsx'
import ServicesPage from './public_pages/ServicesPage';
import ContactPage from './public_pages/ContactPage';
import Layout from './components/Layout.jsx';
import ContactButton  from "./components/ContactButton.jsx";
import AboutMe from "./public_pages/AboutMe.jsx";


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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element = {<RegisterPage/>}/>
          </Routes>
          <ContactButton/>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
