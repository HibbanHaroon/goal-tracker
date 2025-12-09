import React from "react";

const UserIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 24}
      height={props.height || 24}
      viewBox="0 0 75 100"
      fill="currentColor"
    >
      <path d="M56.9142 21.211C56.9142 32.926 47.4181 42.422 35.7032 42.422C23.9882 42.422 14.4922 32.9259 14.4922 21.211C14.4922 9.496 23.9883 0 35.7032 0C47.4182 0 56.9142 9.4961 56.9142 21.211Z" />
      <path d="M37.285 50.527C16.699 50.527 0 67.226 0 87.812C0 94.5503 5.4492 100 12.188 100H62.364C69.1023 100 74.552 94.5508 74.552 87.812C74.5715 67.226 57.871 50.527 37.285 50.527Z" />
    </svg>
  );
};

export default UserIcon;
