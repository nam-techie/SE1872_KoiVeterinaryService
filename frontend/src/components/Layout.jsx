import { useLocation } from 'react-router-dom';
import Footer from './Footer.jsx';

function Layout({ children }) {
  const location = useLocation(); 

  return (
    <>
      <div>{children}</div>  {}
      {location.pathname !== '/login' && location.pathname !=='/register' && <Footer />}  {}
    </>
  );
}

export default Layout;
