import React from 'react';

const ColoredBackgroundWrapper = ({ children, value }) => {
  const style = {
    backgroundColor: value === 'disponible' ? 'yellow' : 'inherit',
  };

  return <div style={style}>{children}</div>;
};

export default ColoredBackgroundWrapper;
