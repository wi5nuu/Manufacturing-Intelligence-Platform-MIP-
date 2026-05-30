export const formatNumber = (val: number, decimals: number = 2) => {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatPercent = (val: number) => {
  return `${formatNumber(val, 1)}%`;
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'running': return '#10b981';
    case 'warning': return '#f59e0b';
    case 'fault': return '#ef4444';
    case 'idle':
    case 'maintenance': return '#94a3b8';
    default: return '#e2e8f0';
  }
};
