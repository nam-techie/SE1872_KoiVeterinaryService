import { useLocation } from 'react-router-dom';
import Footer from './Footer.jsx';

function Layout({ children }) {
  const location = useLocation(); 

  return (
    <>
      <div>{children}</div>  {}
      {location.pathname !== '/login' && location.pathname !=='/register' && location.pathname !=='/bookingpage'
           && location.pathname !== '/forgot-password' && location.pathname !== '/reset-password'
          && location.pathname !== '/verify-otp'&& <Footer />}  {}
    </>
  );
}

export default Layout;
