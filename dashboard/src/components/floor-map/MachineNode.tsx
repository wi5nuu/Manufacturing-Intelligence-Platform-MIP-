import React from 'react';

interface MachineNodeProps {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'running' | 'warning' | 'fault' | 'idle';
  oee: number;
  onClick: (id: string) => void;
}

export const MachineNode = ({ id, name, x, y, status, oee, onClick }: MachineNodeProps) => {
  const statusColors = {
    running: '#10b981',
    warning: '#f59e0b',
    fault: '#ef4444',
    idle: '#94a3b8'
  };

  return (
    <g transform={`translate(${x}, ${y})`} style={{ cursor: 'pointer' }} onClick={() => onClick(id)}>
      <rect
        width="120"
        height="80"
        rx="8"
        fill="white"
        stroke={statusColors[status]}
        strokeWidth="3"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
      />
      <text x="10" y="25" style={{ fontSize: '12px', fontWeight: 'bold', fill: '#1e293b' }}>
        {name}
      </text>
      <text x="10" y="50" style={{ fontSize: '10px', fill: '#64748b' }}>
        OEE: {oee}%
      </text>
      <circle cx="100" cy="20" r="6" fill={statusColors[status]} />
    </g>
  );
};
