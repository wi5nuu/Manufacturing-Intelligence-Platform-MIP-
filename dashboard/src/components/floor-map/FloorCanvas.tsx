import React from 'react';
import { MachineNode } from './MachineNode.tsx';

const mockMachines: any[] = [
  { id: '1', name: 'LINE-A-PRESS-01', x: 50, y: 50, status: 'running', oee: 78 },
  { id: '2', name: 'LINE-A-CNC-02', x: 200, y: 50, status: 'warning', oee: 65 },
  { id: '3', name: 'LINE-A-ROBOT-01', x: 350, y: 50, status: 'running', oee: 92 },
  { id: '4', name: 'LINE-B-WELD-01', x: 50, y: 200, status: 'fault', oee: 45 },
  { id: '5', name: 'LINE-B-PACK-01', x: 200, y: 200, status: 'idle', oee: 0 },
];

export const FloorCanvas = () => {
  const handleMachineClick = (id: string) => {
    console.log(`Machine clicked: ${id}`);
  };

  return (
    <div style={{ background: '#f1f5f9', borderRadius: '12px', padding: '1rem', overflow: 'auto' }}>
      <svg width="800" height="400" style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        {/* Floor grid */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f1f5f9" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Machine Nodes */}
        {mockMachines.map(m => (
          <MachineNode
            key={m.id}
            {...m}
            onClick={handleMachineClick}
          />
        ))}

        {/* Legend */}
        <g transform="translate(600, 300)">
          <text x="0" y="0" style={{ fontSize: '12px', fontWeight: 'bold' }}>Status Legend</text>
          <circle cx="5" cy="20" r="5" fill="#10b981" /><text x="15" y="24" style={{ fontSize: '10px' }}>Running</text>
          <circle cx="5" cy="40" r="5" fill="#f59e0b" /><text x="15" y="44" style={{ fontSize: '10px' }}>Warning</text>
          <circle cx="5" cy="60" r="5" fill="#ef4444" /><text x="15" y="64" style={{ fontSize: '10px' }}>Fault</text>
          <circle cx="5" cy="80" r="5" fill="#94a3b8" /><text x="15" y="84" style={{ fontSize: '10px' }}>Idle/Maintenance</text>
        </g>
      </svg>
    </div>
  );
};
