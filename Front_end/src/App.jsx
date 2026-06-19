import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Registration from './components/Registration';
import SignIn from './components/SignIn';
import HomeTab from './components/HomeTab';
import MapTab from './components/MapTab';
import SessionTab from './components/SessionTab';
import ProfileTab from './components/ProfileTab';

function App() {
  // ================= DATA PERSISTENCE INITIALIZATION =================
  const [registeredStudents, setRegisteredStudents] = useState(() => {
    const saved = localStorage.getItem('dg_students');
    return saved ? JSON.parse(saved) : [];
  });

  const [registeredLibrarians, setRegisteredLibrarians] = useState(() => {
    const saved = localStorage.getItem('dg_librarians');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUserData, setCurrentUserData] = useState(() => {
    const saved = localStorage.getItem('dg_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeUserRole, setActiveUserRole] = useState(() => {
    return localStorage.getItem('dg_user_role') || null;
  });

  const [authMode, setAuthMode] = useState(() => {
    return localStorage.getItem('dg_user_role') ? 'logged_in' : 'landing';
  });

  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalStudySeconds, setTotalStudySeconds] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);

  useEffect(() => {
    localStorage.setItem('dg_students', JSON.stringify(registeredStudents));
  }, [registeredStudents]);

  useEffect(() => {
    localStorage.setItem('dg_librarians', JSON.stringify(registeredLibrarians));
  }, [registeredLibrarians]);

  useEffect(() => {
    if (currentUserData) {
      localStorage.setItem('dg_current_user', JSON.stringify(currentUserData));
      localStorage.setItem('dg_user_role', activeUserRole);
    } else {
      localStorage.removeItem('dg_current_user');
      localStorage.removeItem('dg_user_role');
    }
  }, [currentUserData, activeUserRole]);

  useEffect(() => {
    if (currentUserData && activeUserRole === 'student') {
      setSessionsCompleted(currentUserData.sessionsCompleted || 0);
      setTotalStudySeconds(currentUserData.totalStudySeconds || 0);
    } else {
      setSessionsCompleted(0);
      setTotalStudySeconds(0);
    }
  }, [currentUserData, activeUserRole]);

  // Unified Registration Form Fields State
  const [fields, setFields] = useState({ uin: '', name: '', email: '', mobile: '', dob: '', password: '' });
  
  // Sign In Input States
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInRole, setSignInRole] = useState('student');

  // Navigation Coordinate States
  const [currentTab, setCurrentTab] = useState('home'); 
  const [studentSubView, setStudentSubView] = useState('dashboard'); 
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [showStillHerePrompt, setShowStillHerePrompt] = useState(false);

  const [studySeconds, setStudySeconds] = useState(7200); 
  const [awayMinutes, setAwayMinutes] = useState(20);
  const [awaySeconds, setAwaySeconds] = useState(0); 

  const [desks, setDesks] = useState([
    { id: 1, desk_number: 'A-101', status: 'free', floor: 'Floor 1' },
    { id: 2, desk_number: 'A-102', status: 'occupied', floor: 'Floor 1' },
    { id: 3, desk_number: 'A-103', status: 'away', floor: 'Floor 1' },
    { id: 4, desk_number: 'A-104', status: 'free', floor: 'Floor 1' },
    { id: 5, desk_number: 'A-105', status: 'abandoned', floor: 'Floor 1' },
    { id: 6, desk_number: 'A-106', status: 'free', floor: 'Floor 1' },
    { id: 7, desk_number: 'B-201', status: 'free', floor: 'Floor 2' },
    { id: 8, desk_number: 'B-202', status: 'occupied', floor: 'Floor 2' },
    { id: 9, desk_number: 'B-203', status: 'free', floor: 'Floor 2' },
    { id: 10, desk_number: 'B-204', status: 'away', floor: 'Floor 2' },
    { id: 11, desk_number: 'B-205', status: 'free', floor: 'Floor 2' },
    { id: 12, desk_number: 'B-206', status: 'free', floor: 'Floor 2' },
  ]);

  useEffect(() => {
    let interval = null;
    if (activeUserRole === 'student' && currentTab === 'home' && studentSubView === 'active_session' && !showStillHerePrompt) {
      interval = setInterval(() => {
        if (studySeconds > 0) setStudySeconds((prev) => prev - 1);
        else {
          clearInterval(interval);
          setShowStillHerePrompt(true);
        }
      }, 1000);
    } else if (activeUserRole === 'student' && currentTab === 'home' && studentSubView === 'away') {
      interval = setInterval(() => {
        if (awaySeconds > 0) setAwaySeconds(awaySeconds - 1);
        else if (awaySeconds === 0 && awayMinutes > 0) {
          setAwayMinutes(awayMinutes - 1);
          setAwaySeconds(59);
        } else if (awayMinutes === 0 && awaySeconds === 0) {
          clearInterval(interval);
          setDesks(desks.map(d => d.id === selectedDesk.id ? { ...d, status: 'abandoned' } : d));
          handleEndSession();
          alert("Away window expired. Your seat position has been safely reset.");
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [studentSubView, currentTab, activeUserRole, studySeconds, awayMinutes, awaySeconds, showStillHerePrompt]);

  const formatStudyTime = (totalSecs) => {
    const hrs = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSecs % 60).padStart(2, '0');
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const formatSummaryDisplay = (totalSecs) => {
    const hrs = String(Math.floor(totalSecs / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSecs % 3600) / 60)).padStart(2, '0');
    return `${hrs}h ${mins}m`;
  };

  const calculateRealAge = (dobString) => {
    if (!dobString) return '';
    const birthDate = new Date(dobString);
    const today = new Date();
    if (isNaN(birthDate.getTime())) return 'Invalid Date';
    let computedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      computedAge--;
    }
    return computedAge >= 0 ? `${computedAge} Years` : 'Invalid Date';
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (authMode === 'register_student') {
      const studentUinRegex = /^\d[a-zA-Z]\d{2}$/;
      if (!studentUinRegex.test(fields.uin)) {
        alert("Invalid Student UIN format! It must follow the 'Year Course Number Number' format (e.g., 4A12, 1B99).");
        return;
      }
    } else {
      const librarianUinRegex = /^L\d{2}$/;
      if (!librarianUinRegex.test(fields.uin)) {
        alert("Invalid Librarian UIN format! It must consist of the letter 'L' followed by exactly two numeric digits (e.g., L24).");
        return;
      }
    }
    
    if (!/^[a-zA-Z\s]{2,30}$/.test(fields.name.trim())) {
      alert("Invalid Name Structure! Please enter alphabetic characters only.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(fields.email)) {
      alert("Invalid Email Format! The address must contain both an '@' symbol and a valid domain extension dot.");
      return;
    }
    if (!/^\d{10}$/.test(fields.mobile)) {
      alert("Invalid Mobile Number! Please provide an authentic 10-digit number.");
      return;
    }

    const newUserRecord = { 
      ...fields, 
      sessionsCompleted: 0, 
      totalStudySeconds: 0 
    };

    if (authMode === 'register_student') {
      setRegisteredStudents([...registeredStudents, newUserRecord]);
      alert("Registration Successful! Please Sign In as a Student.");
    } else {
      setRegisteredLibrarians([...registeredLibrarians, newUserRecord]);
      alert("Registration Successful! Please Sign In as a Librarian.");
    }
    setFields({ uin: '', name: '', email: '', mobile: '', dob: '', password: '' });
    setAuthMode('signin');
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(signInEmail)) {
      alert("Please check your email formatting structure signature.");
      return;
    }

    const db = signInRole === 'student' ? registeredStudents : registeredLibrarians;
    const accountFound = db.find(user => user.email === signInEmail && user.password === signInPassword);

    if (accountFound) {
      setCurrentUserData(accountFound);
      setActiveUserRole(signInRole);
      setAuthMode('logged_in');
      setCurrentTab('home');
      setStudentSubView('dashboard');
    } else {
      alert("Account credentials unrecognized!");
    }
  };

  const triggerQRScanner = (desk) => {
    setSelectedDesk(desk);
    setStudentSubView('scanner');
    setCurrentTab('home'); 
  };

  const confirmQRCheckIn = () => {
    setDesks(desks.map(d => d.id === selectedDesk.id ? { ...d, status: 'occupied' } : d));
    setStudySeconds(7200); 
    setSessionStartTime(Date.now()); 
    setStudentSubView('active_session');
  };

  const handleGoAwayMode = () => {
    setDesks(desks.map(d => d.id === selectedDesk.id ? { ...d, status: 'away' } : d));
    setAwayMinutes(20); setAwaySeconds(0);
    setStudentSubView('away');
  };

  const handleEndSession = () => {
    if (selectedDesk) setDesks(desks.map(d => d.id === selectedDesk.id ? { ...d, status: 'free' } : d));
    
    if (sessionStartTime && activeUserRole === 'student') {
      const secondsElapsed = Math.floor((Date.now() - sessionStartTime) / 1000);
      if (secondsElapsed > 0) {
        const updatedSecs = totalStudySeconds + secondsElapsed;
        const updatedCount = sessionsCompleted + 1;

        setTotalStudySeconds(updatedSecs);
        setSessionsCompleted(updatedCount);

        const updatedUser = { 
          ...currentUserData, 
          totalStudySeconds: updatedSecs, 
          sessionsCompleted: updatedCount 
        };
        setCurrentUserData(updatedUser);

        setRegisteredStudents(prevStudents => 
          prevStudents.map(student => 
            student.email === currentUserData.email ? updatedUser : student
          )
        );
      }
    }

    setSessionStartTime(null);
    setSelectedDesk(null); 
    setShowStillHerePrompt(false);
    setStudentSubView('dashboard'); 
    setCurrentTab('home');
  };

  const handleResetDesk = (id) => {
    setDesks(desks.map(d => d.id === id ? { ...d, status: 'free' } : d));
  };

  const handleLogout = () => {
    if (studentSubView === 'active_session' || studentSubView === 'away') {
      handleEndSession();
    }
    setSessionStartTime(null); setSelectedDesk(null); setShowStillHerePrompt(false);
    setStudentSubView('dashboard'); setActiveUserRole(null); setCurrentUserData(null); setAuthMode('landing');
  };

  // Dynamic Theme Controller Logic (Fresh, eye-safe, attractive configurations)
  const themeColor = activeUserRole === 'student' ? '#16a34a' : activeUserRole === 'librarian' ? '#dc2626' : '#0052cc';

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f4f6f9', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0 }}>
      <div style={{ width: '100%', maxWidth: activeUserRole === 'librarian' ? '900px' : '480px', minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', boxShadow: '0 0 30px rgba(0,0,0,0.06)', position: 'relative', boxSizing: 'border-box', paddingBottom: activeUserRole === 'student' ? '75px' : '0', transition: 'max-width 0.2s ease-in-out' }}>
        
        {showStillHerePrompt && selectedDesk && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999, padding: '20px' }}>
            <div style={{ backgroundColor: '#1e293b', color: 'white', padding: '30px 20px', borderRadius: '16px', textAlign: 'center', width: '100%', maxWidth: '380px' }}>
              <h2>Are you still using Desk {selectedDesk.desk_number}?</h2>
              <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '20px' }}>Confirm presence parameters to lock assignment.</p>
              <button onClick={() => { setShowStillHerePrompt(false); setStudySeconds(7200); }} style={{ width: '100%', backgroundColor: '#2ecc71', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>Yes, I am here</button>
              <button onClick={handleEndSession} style={{ width: '100%', backgroundColor: 'transparent', color: '#ef4444', border: '2px solid #ef4444', padding: '10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>End Session</button>
            </div>
          </div>
        )}

        {/* DYNAMIC HEADER CORE: Tint transitions dynamically matching user role bounds */}
        <header style={{ backgroundColor: themeColor, color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background-color 0.2s ease' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📖</span> DeskGuard
          </div>
          {activeUserRole && <button onClick={handleLogout} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>Logout</button>}
        </header>

        <main style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column' }}>
          
          {!activeUserRole && authMode === 'landing' && <Landing setAuthMode={setAuthMode} />}
          {!activeUserRole && (authMode === 'register_student' || authMode === 'register_librarian') && <Registration authMode={authMode} setAuthMode={setAuthMode} handleRegisterSubmit={handleRegisterSubmit} fields={fields} setFields={setFields} />}
          {!activeUserRole && authMode === 'signin' && <SignIn setAuthMode={setAuthMode} handleSignInSubmit={handleSignInSubmit} signInRole={signInRole} setSignInRole={setSignInRole} signInEmail={signInEmail} setSignInEmail={setSignInEmail} signInPassword={signInPassword} setSignInPassword={setSignInPassword} />}

          {activeUserRole === 'student' && currentUserData && (
            <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
              {currentTab === 'home' && <HomeTab currentUserData={currentUserData} studentSubView={studentSubView} setStudentSubView={setStudentSubView} selectedDesk={selectedDesk} formatStudyTime={formatStudyTime} studySeconds={studySeconds} awayMinutes={awayMinutes} awaySeconds={awaySeconds} handleGoAwayMode={handleGoAwayMode} handleEndSession={handleEndSession} confirmQRCheckIn={confirmQRCheckIn} todayStudyTimeStr={formatSummaryDisplay(totalStudySeconds)} sessionsCompleted={sessionsCompleted} totalTimeStr={formatStudyTime(totalStudySeconds)} setCurrentTab={setCurrentTab} themeColor={themeColor} />}
              {currentTab === 'map' && <MapTab desks={desks} setCurrentTab={setCurrentTab} triggerQRScanner={triggerQRScanner} />}
              {currentTab === 'session' && <SessionTab sessionsCompleted={sessionsCompleted} selectedDesk={selectedDesk} />}
              {currentTab === 'profile' && <ProfileTab currentUserData={currentUserData} calculateRealAge={calculateRealAge} themeColor={themeColor} />}
            </div>
          )}

          {activeUserRole === 'librarian' && currentUserData && (
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '20px', color: '#1e293b' }}>Library Management Portal</h3>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Staff Account: <b style={{ color: '#1e293b' }}>{currentUserData.name}</b></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '10px' }}>
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>TOTAL REGISTERED DESKS</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '6px', color: '#1e293b' }}>{desks.length}</div>
                </div>
                <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#2ecc71', fontWeight: 'bold' }}>AVAILABLE UNITS</div>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2ecc71', marginTop: '4px' }}>{desks.filter(d => d.status === 'free').length}</div>
                </div>
              </div>

              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
                <h4 style={{ margin: '0 0 14px 0', fontSize: '14px', color: '#1e293b', fontWeight: 'bold' }}>Account Details</h4>
                <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}><td style={{ padding: '12px 0', color: '#64748b' }}>University ID (UIN)</td><td style={{ padding: '12px 0', fontWeight: 'bold', color: themeColor, textAlign: 'right' }}>{currentUserData.uin}</td></tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}><td style={{ padding: '12px 0', color: '#64748b' }}>Email Address</td><td style={{ padding: '12px 0', fontWeight: 'bold', color: '#1e293b', textAlign: 'right' }}>{currentUserData.email}</td></tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}><td style={{ padding: '12px 0', color: '#64748b' }}>Mobile Number</td><td style={{ padding: '12px 0', fontWeight: 'bold', color: '#1e293b', textAlign: 'right' }}>{currentUserData.mobile}</td></tr>
                    <tr><td style={{ padding: '12px 0', color: '#64748b' }}>Age</td><td style={{ padding: '12px 0', fontWeight: 'bold', color: '#1e293b', textAlign: 'right' }}>{calculateRealAge(currentUserData.dob)}</td></tr>
                  </tbody>
                </table>
              </div>

              <h4 style={{ margin: '15px 0 5px 0', fontWeight: 'bold', color: '#1e293b', fontSize: '15px' }}>Violator Operational Queue</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {desks.filter(d => d.status !== 'free').map((d) => (
                  <div key={d.id} style={{ backgroundColor: 'white', padding: '16px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>Desk {d.desk_number}</div>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: d.status === 'away' ? '#f1c40f' : '#ef4444' }}>{d.status.toUpperCase()}</span>
                    </div>
                    <button onClick={() => handleResetDesk(d.id)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Reset</button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* BOTTOM TASKBAR: Dynamically tracks themeColor highlighting states */}
        {activeUserRole === 'student' && (
          <nav style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '65px', backgroundColor: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 9999 }}>
            <div onClick={() => { setCurrentTab('home'); setStudentSubView('dashboard'); }} style={{ textAlign: 'center', cursor: 'pointer', color: currentTab === 'home' ? themeColor : '#94a3b8', fontSize: '11px', fontWeight: 'bold' }}><div style={{ fontSize: '18px' }}>🏠</div>Home</div>
            <div onClick={() => setCurrentTab('map')} style={{ textAlign: 'center', cursor: 'pointer', color: currentTab === 'map' ? themeColor : '#94a3b8', fontSize: '11px', fontWeight: 'bold' }}><div style={{ fontSize: '18px' }}>📍</div>Map</div>
            <div onClick={() => setCurrentTab('session')} style={{ textAlign: 'center', cursor: 'pointer', color: currentTab === 'session' ? themeColor : '#94a3b8', fontSize: '11px', fontWeight: 'bold' }}><div style={{ fontSize: '18px' }}>📝</div>My Session</div>
            <div onClick={() => setCurrentTab('profile')} style={{ textAlign: 'center', cursor: 'pointer', color: currentTab === 'profile' ? themeColor : '#94a3b8', fontSize: '11px', fontWeight: 'bold' }}><div style={{ fontSize: '18px' }}>👤</div>Profile</div>
          </nav>
        )}
      </div>
    </div>
  );
}

export default App;