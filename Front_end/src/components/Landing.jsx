import React from 'react';

function Landing({ setAuthMode }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px', width: '100%' }}>
      {/* Icon swapped from generic defense shield to study motif */}
      <div style={{ fontSize: '64px', marginBottom: '12px' }}>📖</div>
      <h1 style={{ fontSize: '28px', color: '#1e293b', fontWeight: '800', margin: '0' }}>DeskGuard</h1>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '40px' }}>Real-Time Library Seat Booking Platform</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
        <button onClick={() => setAuthMode('register_student')} style={{ padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold', textAlign: 'left', cursor: 'pointer' }}>🎓 Register as Student</button>
        <button onClick={() => setAuthMode('register_librarian')} style={{ padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontWeight: 'bold', textAlign: 'left', cursor: 'pointer' }}>👩‍💼 Register as Librarian Staff</button>
        <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '10px 0' }}></div>
        <button onClick={() => setAuthMode('signin')} style={{ padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: '#0052cc', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>Already Registered? Sign In ➔</button>
      </div>
    </div>
  );
}

export default Landing;