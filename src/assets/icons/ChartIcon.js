import React from "react";

const ChartIcon = (props) => {
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
        <path d="M3 3v16a2 2 0 0 0 2 2h16" />
        <path d="m19 9-5 5-4-4-3 3" />
      </g>
    </svg>
  );
};

export default ChartIcon;
