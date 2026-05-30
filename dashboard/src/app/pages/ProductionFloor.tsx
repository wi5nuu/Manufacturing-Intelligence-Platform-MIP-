import React from 'react';
import { FloorCanvas } from '../../components/floor-map/FloorCanvas.tsx';

export const ProductionFloor = () => {
  return (
    <div>
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2>Production Floor Map</h2>
          <p style={{ color: '#64748b', margin: 0 }}>Real-time status of all lines and machines</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Active Machines</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>12 / 15</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Current Shift</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Morning (08:00 - 16:00)</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '1rem' }}>
        <FloorCanvas />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div className="card">
          <h4>Line A Throughput</h4>
          <h2 style={{ color: '#2563eb' }}>1,240 <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#64748b' }}>units/hr</span></h2>
        </div>
        <div className="card">
          <h4>Line B Throughput</h4>
          <h2 style={{ color: '#2563eb' }}>890 <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#64748b' }}>units/hr</span></h2>
        </div>
        <div className="card">
          <h4>Avg. Cycle Time</h4>
          <h2 style={{ color: '#2563eb' }}>42.5 <span style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#64748b' }}>sec</span></h2>
        </div>
      </div>
    </div>
  );
};
