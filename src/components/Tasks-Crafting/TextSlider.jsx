// Didn't use it in the Application it is one of the approach to show the animated texts.
import React, { useEffect, useState } from "react";

const TextSlider = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["Create a task", "Edit your tasks", "Complete tasks"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [texts.length]);

  return <div className="text-base mt-4">{texts[textIndex]}</div>;
};

export default TextSlider;
