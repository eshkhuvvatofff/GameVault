import { useEffect, useState } from 'react'
import LoadingComp from './components/loadingComp/loadingComp';
import Cursor from './components/cursorAnimation/cursor';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Particles from './components/Backgrounds/ParticleBG/Particle';

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* {loading ? (
        <LoadingComp />
      ) : ( */}
      <>
        <Cursor />
        <Particles />
        <Header />
        <h1>hello world</h1>
        <Footer />
      </>
      {/* )} */}
    </>
  )
}

export default App
