import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Liff } from './liff'
import LineProfile from './LineProfile'

function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Liff
      .init({ liffId: '1653531126-gK0A6XJM' })
      .then(() => {
        setLoading(!loading)
      })
  }, [])

  return (
    <div className="Layout">
      <div className="App">
        {!loading && <LineProfile />}
      </div>
    </div>
  );
}

export default App;
