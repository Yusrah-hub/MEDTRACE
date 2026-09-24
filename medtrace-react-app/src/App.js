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
      {/* Background glow element */}
      <div style={styles.glow} />

      <div style={styles.card}>
        <div style={styles.badge}>
          <span style={styles.badgeDot} />
          SYSTEM ONLINE
        </div>

        <h1 style={styles.title}>MedTrace Portal</h1>
        <p style={styles.subtitle}>
          Secure Supply Chain & Verification System
        </p>

        <a href="/Med/1medtrace.html" style={styles.button}>
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
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    padding: '20px',
  },
  glow: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(10,15,29,0) 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    backdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '40px 32px',
    maxWidth: '440px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    zIndex: 1,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '20px',
    border: '1px solid rgba(56, 189, 248, 0.2)',
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#38bdf8',
    boxShadow: '0 0 8px #38bdf8',
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    color: '#ffffff',
  },
  subtitle: {
    margin: '0 0 32px 0',
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.5',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: '100%',
    padding: '14px 24px',
    backgroundColor: '#0ea5e9',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    textDecoration: 'none',
    borderRadius: '10px',
    boxShadow: '0 4px 14px 0 rgba(14, 165, 233, 0.39)',
    boxSizing: 'border-box',
  },
  buttonIcon: {
    fontSize: '14px',
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
