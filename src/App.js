import React, {useEffect, useState } from 'react';
import './App.css';

const liff = window.liff;

function App() {
  const closeApp = (event) => {
    event.preventDefault();
    liff.sendMessages([{
      type: 'text',
      text: "Thank you, Bye!"
    }]).then(() => {
      liff.closeWindow();
    })
  }

  const [profile, setProfile] = useState({})
  useEffect(() => {
    liff.init(async () => {
      /*
        @return
        userId: string
        displayName: string
        pictureUrl: string
      */
      let profile = await liff.getProfile();
      setProfile(profile)
    }); 
  }, [])

  return (
    <div className="App">
        <img src={profile.pictureUrl} width={150} height={150} />
        <pre>
          userId: { profile.userId } <br />
          displayName: { profile.displayName }
        </pre>
        <button color="primary" onClick={closeApp}>Close</button>
    </div>
  );
}

export default App;
