import React from "react";

const QuoteIcon = (props) => {
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
        <path d="M14 14a2 2 0 0 0 2-2V8h-2" />
        <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
        <path d="M8 14a2 2 0 0 0 2-2V8H8" />
      </g>
    </svg>
  );
};

export default QuoteIcon;
