// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
// import Pagess from 'Pages' 
// PatientQRDisplay.jsx
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react'; // npm install qrcode.react

function App() {
  return (
    <div className="App">
      <a 
       href="/Med/1medtrace.html"
      >
        Enter App
      </a>
    </div>
  );
}
function PatientQRDisplay() {
  const [payload, setPayload] = useState(null);

  const fetchToken = async () => {
    const res = await fetch('/api/patient/qr-token', {
      credentials: 'include', // sends patient's session cookie
    });
    const data = await res.json();
    setPayload(data.payload);
  };

  useEffect(() => {
    fetchToken();                          // load one immediately
    const interval = setInterval(fetchToken, 40000); // refresh before the 45s expiry
    return () => clearInterval(interval);
  }, []);

  if (!payload) return <p>Loading...</p>;

  return (
    <div>
      <QRCodeSVG value={payload} size={256} level="M" />
      <p>This code refreshes automatically</p>
    </div>
  );
}
export default App;
