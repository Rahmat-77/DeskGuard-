import React from 'react';

function SignIn({ setAuthMode, handleSignInSubmit, signInRole, setSignInRole, signInEmail, setSignInEmail, signInPassword, setSignInPassword }) {
  return (
    <div style={{ width: '100%' }}>
      <button onClick={() => setAuthMode('landing')} style={{ background: 'none', border: 'none', color: '#0052cc', fontWeight: 'bold', marginBottom: '20px', padding: 0, cursor: 'pointer' }}>← Back</button>
      <h2 style={{ fontSize: '22px', color: '#1e293b', marginBottom: '20px' }}>Sign In to Portal</h2>
      
      <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '10px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
          <button type="button" onClick={() => setSignInRole('student')} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', backgroundColor: signInRole === 'student' ? 'white' : 'transparent', boxShadow: signInRole === 'student' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>Student</button>
          <button type="button" onClick={() => setSignInRole('librarian')} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', backgroundColor: signInRole === 'librarian' ? 'white' : 'transparent', boxShadow: signInRole === 'librarian' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>Librarian</button>
        </div>
        
        <input 
          type="text" 
          placeholder="Email Address" 
          value={signInEmail} 
          onChange={(e) => setSignInEmail(e.target.value)} 
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} 
          required 
        />
        <input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} required />
        
        <button type="submit" style={{ backgroundColor: '#0052cc', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}>Verify & Authorize</button>
      </form>
    </div>
  );
}

export default SignIn;