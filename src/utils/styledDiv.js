import React from 'react';

const StyledDiv = ({ children, style }) => (
  <div
    style={{
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      bottom: 8,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      ...style,
    }}
  >
    {children}
  </div>
);

export default StyledDiv;
