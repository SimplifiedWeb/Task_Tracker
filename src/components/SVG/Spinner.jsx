// Spinner.jsx

import React from "react";

const Spinner = ({ size }) => {
  return (
    <div
      className={`animate-spin rounded-full ${size} bg-red-600 border-t-2 border-b-2 border-white`}
    />
  );
};

export default Spinner;
