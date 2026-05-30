import React from 'react';
import { OeeGauge } from '../../components/charts/OeeGauge.tsx';
import { TimeSeriesChart } from '../../components/charts/TimeSeriesChart.tsx';

const mockTrendData = [
  { time: '2026-05-31T08:00:00Z', value: 72 },
  { time: '2026-05-31T09:00:00Z', value: 75 },
  { time: '2026-05-31T10:00:00Z', value: 78 },
  { time: '2026-05-31T11:00:00Z', value: 74 },
  { time: '2026-05-31T12:00:00Z', value: 81 },
];

export const ExecutiveDashboard = () => {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <OeeGauge value={78.5} title="Overall OEE" />
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ margin: 0, color: '#64748b' }}>Availability</h4>
          <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>85.0%</h2>
          <div style={{ color: '#10b981', fontSize: '0.875rem' }}>↑ 2.3% vs yesterday</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ margin: 0, color: '#64748b' }}>Performance</h4>
          <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>95.2%</h2>
          <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>↓ 0.5% vs yesterday</div>
        </div>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ margin: 0, color: '#64748b' }}>Quality</h4>
          <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>97.8%</h2>
          <div style={{ color: '#10b981', fontSize: '0.875rem' }}>↑ 0.1% vs yesterday</div>
        </div>
      </div>

      <div className="card">
        <TimeSeriesChart data={mockTrendData} title="OEE Trend (Last 5 Hours)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card">
          <h3>Top Alerts</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
              <span>LINE-A-PRESS-01: High Vibration</span>
              <span style={{ color: '#ef4444' }}>Critical</span>
            </li>
            <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
              <span>LINE-B-WELD-02: Quality Drop</span>
              <span style={{ color: '#f59e0b' }}>Warning</span>
            </li>
          </ul>
        </div>
        <div className="card">
          <h3>Production vs Target</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
            Chart Placeholder (Production Target)
          </div>
        </div>
      </div>
    </div>
  );
};
