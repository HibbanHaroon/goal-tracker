import React from "react";

const ClockIcon = (props) => {
  const size = props.size || 48;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="black"
    >
      <rect width="24" height="24" fill="black" />
      <g
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="10" />
      </g>
    </svg>
  );
};

export default ClockIcon;
