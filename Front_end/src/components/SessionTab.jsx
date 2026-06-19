import React from 'react';

function SessionTab({ sessionsCompleted, selectedDesk }) {
  return (
    <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', color: '#1e293b' }}>My Session History</h3>
        <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '24px', textAlign: 'center', lineHeight: '1.4' }}>View your study sessions and hours logged for today.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sessionsCompleted > 0 ? (
            <div style={{ borderLeft: '3px solid #0052cc', paddingLeft: '14px' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>Desk {selectedDesk?.desk_number || 'A-101'} • Checked In</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>Active session currently running</div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px', fontSize: '13px', lineHeight: '1.5' }}>
              No study history found for today yet.<br />
              <span style={{ fontSize: '12px', color: '#64748b' }}>Choose a seat from the Map tab and scan its QR code to start tracking your time.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SessionTab;