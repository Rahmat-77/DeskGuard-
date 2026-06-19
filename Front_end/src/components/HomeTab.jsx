import React from 'react';

function HomeTab({ currentUserData, studentSubView, setStudentSubView, selectedDesk, formatStudyTime, studySeconds, awayMinutes, awaySeconds, handleGoAwayMode, handleEndSession, confirmQRCheckIn, todayStudyTimeStr, sessionsCompleted, totalTimeStr, setCurrentTab }) {
  return (
    <div style={{ width: '100%' }}>
      {studentSubView === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '20px', margin: '0', color: '#1e293b' }}>Hi, {currentUserData.name} 👋</h2>
          
          <div style={{ backgroundColor: '#0052cc', color: 'white', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: 'bold' }}>Current Status</span>
            <h3 style={{ fontSize: '24px', margin: '6px 0 8px 0', fontWeight: 'bold' }}>No Active Session</h3>
            <p style={{ fontSize: '14px', opacity: 0.9, margin: '0 0 20px 0' }}>Find a desk and start studying!</p>
            <button onClick={() => setCurrentTab('map')} style={{ backgroundColor: 'white', color: '#0052cc', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Find a Desk</button>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ color: '#64748b', fontSize: '11px', fontWeight: 'bold' }}>🕒 TODAY'S STUDY TIME</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginTop: '4px' }}>{todayStudyTimeStr}</div>
              <div style={{ display: 'flex', gap: '24px', marginTop: '16px', fontSize: '12px', color: '#64748b' }}>
                <div>Sessions: <b>{sessionsCompleted}</b></div>
                <div>Total: <b>{totalTimeStr}</b></div>
              </div>
            </div>
            <div style={{ fontSize: '48px' }}>📚</div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#1e293b', fontWeight: 'bold', textAlign: 'left' }}>How it works</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '10px', fontSize: '11px', textAlign: 'center', color: '#64748b', fontWeight: '600' }}>
              <div><div style={{ fontSize: '20px', marginBottom: '4px' }}>🔍</div>Find a Seat</div>
              <div><div style={{ fontSize: '20px', marginBottom: '4px' }}>📷</div>Scan QR Code</div>
              <div><div style={{ fontSize: '20px', marginBottom: '4px' }}>⏳</div>Start Studying</div>
              <div><div style={{ fontSize: '20px', marginBottom: '4px' }}>⏸️</div>Take a Break</div>
              <div><div style={{ fontSize: '20px', marginBottom: '4px' }}>🏁</div>Leave Seat</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start', textAlign: 'left' }}>
            <span style={{ fontSize: '18px' }}>ℹ️</span>
            <p style={{ margin: 0, fontSize: '12px', color: '#1e40af', lineHeight: '1.5' }}>
              <b>Seating Rule:</b> To keep things fair for everyone, you will be asked to confirm you are still at your desk <b>every 2 hours</b>. If you do not confirm within the timeframe, your seat will be automatically released for other students.
            </p>
          </div>
        </div>
      )}

      {studentSubView === 'active_session' && selectedDesk && (
        <div style={{ backgroundColor: 'white', padding: '30px 24px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ backgroundColor: '#e2f0d9', color: '#385723', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>Active Session</span>
          <h1 style={{ fontSize: '54px', color: '#1e293b', margin: '15px 0', fontWeight: '800' }}>{selectedDesk.desk_number}</h1>
          <div style={{ width: '160px', height: '160px', borderRadius: '50%', border: '6px solid #0052cc', margin: '20px auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b' }}>{formatStudyTime(studySeconds)}</div>
          </div>
          <div style={{ display: 'flex', gap: '12px', width: '100%', flexWrap: 'wrap' }}>
            <button onClick={handleGoAwayMode} style={{ flex: 1, backgroundColor: '#f1c40f', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Away (20 min)</button>
            <button onClick={handleEndSession} style={{ flex: 1, backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>End Session</button>
          </div>
        </div>
      )}

      {studentSubView === 'scanner' && selectedDesk && (
        <div style={{ backgroundColor: 'white', padding: '30px 24px', borderRadius: '16px', border: '1px solid #cbd5e1', textAlign: 'center' }}>
          <h3>Scan QR Code to Check In</h3>
          <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Desk Target Module: <b>{selectedDesk.desk_number}</b></p>
          <div style={{ width: '200px', height: '200px', border: '4px dashed #0052cc', borderRadius: '12px', margin: '0 auto 30px auto', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc', position: 'relative' }}>
            <span style={{ fontSize: '56px' }}>🔲</span>
            <div style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: '#ef4444', top: '50%' }}></div>
          </div>
          <button onClick={confirmQRCheckIn} style={{ width: '100%', backgroundColor: '#0052cc', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>Simulate Camera Stream Scan 📷</button>
        </div>
      )}

      {studentSubView === 'away' && selectedDesk && (
        <div style={{ backgroundColor: 'white', padding: '35px 24px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <h2>Away Break Activated</h2>
          <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#ef4444', margin: '20px 0' }}>{String(awayMinutes).padStart(2, '0')}:{String(awaySeconds).padStart(2, '0')}</div>
          <button onClick={() => setStudentSubView('active_session')} style={{ width: '100%', backgroundColor: '#0052cc', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>I'm Back</button>
        </div>
      )}
    </div>
  );
}

export default HomeTab;