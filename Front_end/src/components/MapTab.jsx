import React from 'react';

function MapTab({ desks, setCurrentTab, triggerQRScanner }) {
  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box' }}>
      <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#1e293b', fontWeight: 'bold' }}>Library Map</h3>
      <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>Choose an available desk from the map below to book your seat:</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', background: '#f1f5f9', padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', fontSize: '12px', border: '1px dashed #94a3b8' }}>🚽 <b>Washroom</b><br/><span style={{ color: '#64748b' }}>Floor 1 - North Wing Corridor</span></div>
        <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px', fontSize: '12px', border: '1px dashed #94a3b8' }}>📚 <b>Reference Stacks</b><br/><span style={{ color: '#64748b' }}>Row C - Science & Tech</span></div>
      </div>

      {['Floor 1', 'Floor 2'].map((floorName) => (
        <div key={floorName} style={{ marginBottom: '30px' }}>
          <h4 style={{ fontSize: '15px', color: '#0052cc', margin: '0 0 12px 0', fontWeight: 'bold', borderBottom: '2px solid #e2e8f0', paddingBottom: '6px' }}>📍 {floorName}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))', gap: '10px' }}>
            {desks.filter(d => d.floor === floorName).map((d) => (
              <div 
                key={d.id} 
                onClick={() => { if (d.status === 'free') triggerQRScanner(d); }} 
                style={{ 
                  backgroundColor: d.status === 'free' ? '#2ecc71' : d.status === 'away' ? '#f1c40f' : '#e74c3c', 
                  color: 'white', height: '55px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '14px', 
                  cursor: d.status === 'free' ? 'pointer' : 'not-allowed', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' 
                }}
              >
                {d.desk_number}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MapTab;