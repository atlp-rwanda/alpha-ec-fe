import React from 'react';
import './TickIcon.css';

const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="200"
    height="200"
    className="tick-icon"
  >
    <path
      fill="none"
      stroke="#4caf50"
      strokeWidth="1"
      d="M2 20 l10 10 l20 -20"
    />
  </svg>
);

export default TickIcon;
