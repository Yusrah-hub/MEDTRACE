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

// function App() {
//   return (
//     <div className="App">
//       <a 
//        href="/Med/1medtrace.html"
       
//       >
//         Enter App
//       </a>
//     </div>
//   );
// }

function App() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          SYSTEM ONLINE
        </div>

        <h1 style={styles.title}>MedTrace Portal</h1>
        <p style={styles.subtitle}>
          Secure Supply Chain & Verification System
        </p>

        <a href="/medtracer/MEDTRACE1.HTML" style={styles.button}>
          <span style={styles.buttonIcon}>✚</span>
          Enter Application
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0f1d',
    color: '#f8fafc',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    position: 'relative',
    padding: '20px',
  },
  card: {
    background: '#0f172a',
    border: '1px solid #1e293b',
    borderRadius: '12px',
    padding: '40px 32px',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.35)',
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.8px',
    color: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.08)',
    padding: '4px 10px',
    borderRadius: '6px',
    marginBottom: '20px',
    border: '1px solid rgba(56, 189, 248, 0.2)',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#38bdf8',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '26px',
    fontWeight: '700',
    letterSpacing: '-0.3px',
    color: '#ffffff',
  },
  subtitle: {
    margin: '0 0 28px 0',
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.5',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    textDecoration: 'none',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  buttonIcon: {
    fontSize: '16px',
    fontWeight: '400',
  },
};


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
