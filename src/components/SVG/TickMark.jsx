import React, { useState } from "react";

const TickMark = ({ setActive }) => {
  const [isStarAnimated, setStarAnimated] = useState(false);

  const handleStarClick = () => {
    setStarAnimated(true);
    // Add your logic for handling the "Important" button click
    // (e.g., updating the task's importance in your state or making an API call)
  };
  return (
    <>
      <div
        className={`relative flex items-center justify-center w-8 h-8 border-2 ${
          setActive
            ? "border-green-600 disabled:cursor-not-allowed"
            : "border-gray-300"
        } rounded-full`}
      >
        {setActive && (
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
        {!setActive && (
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        )}
      </div>
    </>
  );
};

export default TickMark;
