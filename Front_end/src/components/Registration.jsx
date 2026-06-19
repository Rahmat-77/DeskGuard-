import React from 'react';

function Registration({ authMode, setAuthMode, handleRegisterSubmit, fields, setFields }) {
  
  const handleStudentUinChange = (value) => {
    let input = value.slice(0, 4);
    let sanitized = '';

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (i === 1) {
        if (/[a-zA-Z]/.test(char)) sanitized += char.toUpperCase();
      } else {
        if (/\d/.test(char)) sanitized += char;
      }
    }
    setFields({ ...fields, uin: sanitized });
  };

  const handleLibrarianUinChange = (value) => {
    let digits = value.replace(/[^0-9]/g, '').slice(0, 2);
    setFields({ ...fields, uin: `L${digits}` });
  };

  return (
    <div style={{ backgroundColor: 'white', width: '100%' }}>
      <button onClick={() => setAuthMode('landing')} style={{ background: 'none', border: 'none', color: '#0052cc', fontWeight: 'bold', marginBottom: '20px', padding: 0, cursor: 'pointer' }}>← Back</button>
      <h2 style={{ fontSize: '22px', color: '#1e293b', marginBottom: '6px', textTransform: 'capitalize' }}>Create Account</h2>
      <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '24px' }}>Registering as a {authMode.replace('register_', '')}.</p>
      
      <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Left Aligned Label & Input Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label style={{ fontSize: '13px', color: '#1e293b', fontWeight: 'bold' }}>University ID (UIN)</label>
          {authMode === 'register_student' ? (
            <input 
              type="text" 
              placeholder="e.g., 4A12 (Format: Year-Course-No-No)" 
              value={fields.uin} 
              onChange={(e) => handleStudentUinChange(e.target.value)}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} 
              required 
            />
          ) : (
            <input 
              type="text" 
              placeholder="L00" 
              value={fields.uin || 'L'} 
              onChange={(e) => handleLibrarianUinChange(e.target.value)}
              onClick={(e) => { if(!fields.uin) setFields({ ...fields, uin: 'L' }); }}
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid #0052cc', fontSize: '14px', outline: 'none', fontWeight: 'bold', color: '#0052cc', backgroundColor: '#f0f4ff', width: '100%', boxSizing: 'border-box' }} 
              required 
            />
          )}
        </div>

        <input type="text" placeholder="Full Name" value={fields.name} onChange={(e) => setFields({...fields, name: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} required />
        
        <input type="text" placeholder="Institutional Email" value={fields.email} onChange={(e) => setFields({...fields, email: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} required />
        
        <input type="text" placeholder="10-Digit Mobile Number" value={fields.mobile} onChange={(e) => setFields({...fields, mobile: e.target.value.replace(/\D/g, '').slice(0, 10)})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} required />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label style={{ fontSize: '13px', color: '#1e293b', fontWeight: 'bold' }}>Date of Birth</label>
          <input 
            type="date" 
            value={fields.dob} 
            min="1940-01-01"
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setFields({...fields, dob: e.target.value})} 
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box' }} 
            required 
          />
        </div>

        <input type="password" placeholder="Account Password" value={fields.password} onChange={(e) => setFields({...fields, password: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }} required />
        
        <button type="submit" style={{ backgroundColor: '#0052cc', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', marginTop: '10px', cursor: 'pointer' }}>Register Secure Keys</button>
      </form>
    </div>
  );
}

export default Registration;