import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
}

export const Badge = ({ children, variant = 'info' }: BadgeProps) => {
  const styles: Record<string, React.CSSProperties> = {
    base: {
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      display: 'inline-block'
    },
    info: { backgroundColor: '#e2e8f0', color: '#475569' },
    success: { backgroundColor: '#dcfce7', color: '#166534' },
    warning: { backgroundColor: '#fef3c7', color: '#92400e' },
    error: { backgroundColor: '#fee2e2', color: '#991b1b' }
  };

  return (
    <span style={{ ...styles.base, ...styles[variant] }}>
      {children}
    </span>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = ({ children, variant = 'primary', style, ...props }: ButtonProps) => {
  const baseStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'opacity 0.2s',
    ...style
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: '#2563eb', color: 'white' },
    secondary: { backgroundColor: '#64748b', color: 'white' },
    outline: { backgroundColor: 'transparent', border: '1px solid #e2e8f0', color: '#1e293b' }
  };

  return (
    <button style={{ ...baseStyle, ...variants[variant] }} {...props}>
      {children}
    </button>
  );
};
