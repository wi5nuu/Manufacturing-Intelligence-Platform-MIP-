import React from 'react';
import { Badge } from '../ui/index.tsx';
import { AlertCircle, Clock } from 'lucide-react';

interface AlertCardProps {
  machine: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  time: string;
  description: string;
}

export const AlertCard = ({ machine, title, severity, time, description }: AlertCardProps) => {
  const severityMap: Record<string, 'error' | 'warning' | 'info' | 'success'> = {
    critical: 'error',
    high: 'error',
    medium: 'warning',
    low: 'info'
  };

  return (
    <div className="card" style={{ borderLeft: `4px solid ${severity === 'critical' ? '#ef4444' : '#f59e0b'}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={18} color={severity === 'critical' ? '#ef4444' : '#f59e0b'} />
          <strong style={{ fontSize: '1rem' }}>{machine}</strong>
        </div>
        <Badge variant={severityMap[severity]}>{severity.toUpperCase()}</Badge>
      </div>
      <h4 style={{ margin: '0 0 0.5rem 0' }}>{title}</h4>
      <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#64748b' }}>{description}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#94a3b8' }}>
        <Clock size={12} />
        {new Date(time).toLocaleString()}
      </div>
    </div>
  );
};
