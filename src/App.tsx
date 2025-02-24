import { useEffect, useState } from 'react'
import LoadingComp from './components/loadingComp/loadingComp';
import Cursor from './components/cursorAnimation/cursor';

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <Cursor />
          <h1>hello world</h1>
        </>
      )}
    </>
  )
}

export default App
