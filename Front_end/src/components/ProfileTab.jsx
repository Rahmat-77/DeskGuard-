import React from 'react';

function ProfileTab({ currentUserData, calculateRealAge }) {
  return (
    <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#1e293b' }}>Student Profile Parameters</h3>
        
        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse', textAlign: 'left' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 0', color: '#64748b', fontWeight: '500', width: '45%' }}>University ID (UIN)</td>
              <td style={{ padding: '14px 0', fontWeight: 'bold', color: '#0052cc', textAlign: 'right' }}>{currentUserData?.uin || 'N/A'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 0', color: '#64748b', fontWeight: '500' }}>Full Name</td>
              <td style={{ padding: '14px 0', fontWeight: 'bold', color: '#1e293b', textAlign: 'right' }}>{currentUserData?.name}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 0', color: '#64748b', fontWeight: '500' }}>Mobile Number</td>
              <td style={{ padding: '14px 0', fontWeight: 'bold', color: '#1e293b', textAlign: 'right' }}>{currentUserData?.mobile}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 0', color: '#64748b', fontWeight: '500' }}>Date of Birth</td>
              <td style={{ padding: '14px 0', fontWeight: 'bold', color: '#1e293b', textAlign: 'right' }}>{currentUserData?.dob}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '14px 0', color: '#64748b', fontWeight: '500' }}>Age</td>
              <td style={{ padding: '14px 0', fontWeight: 'bold', color: '#1e293b', textAlign: 'right' }}>{calculateRealAge(currentUserData?.dob)}</td>
            </tr>
            <tr>
              <td style={{ padding: '14px 0', color: '#64748b', fontWeight: '500' }}>Email Address</td>
              <td style={{ padding: '14px 0', fontWeight: 'bold', color: '#1e293b', textAlign: 'right', wordBreak: 'break-all' }}>{currentUserData?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProfileTab;