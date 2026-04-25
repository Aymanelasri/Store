import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: '#C9A96E', icon: '✓' },
    error:   { bg: '#E53935', icon: '✕' },
    info:    { bg: '#1a1a1a', icon: 'ℹ' },
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: colors[type].bg,
      color: 'white',
      padding: '14px 20px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: 9999,
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      animation: 'slideIn 0.3s ease',
      minWidth: '280px',
      maxWidth: '380px',
    }}>
      <span style={{
        background: 'rgba(255,255,255,0.25)',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        flexShrink: 0,
      }}>
        {colors[type].icon}
      </span>
      <span style={{ flex: 1 }}>{message}</span>
      <span 
        onClick={onClose}
        style={{ cursor: 'pointer', opacity: 0.7, fontSize: '16px' }}>
        ×
      </span>
    </div>
  );
};

export default Toast;