import React from "react";

const MusicIcon = (props) => {
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
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" fill="white" />
        <circle cx="18" cy="16" r="3" fill="white" />
      </g>
    </svg>
  );
};

export default MusicIcon;
