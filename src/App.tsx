import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingComp from './components/loadingComp/loadingComp';
import Cursor from './components/cursorAnimation/cursor';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Particles from './components/Backgrounds/ParticleBG/Particle';
import Homepage from './pages/homepage/Homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContent = () => {
  return (
    <>
      <Cursor />
      <Particles />
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        {/* <Route path='/login' element={<LoginPage />} /> */}
        {/* <Route path='/register' element={<RegisterPage />} /> */}
        {/* <Route path='/admin' element={<AdminPage />} /> */}
        {/* <Route path='/game' element={<GamePage />} /> */}
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? <LoadingComp /> :
        <MainContent />
      }
    </Router>
  );
};

export default App;
