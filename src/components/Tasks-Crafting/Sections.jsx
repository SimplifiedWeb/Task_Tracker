// Sections.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showImportantTasks,
  showAllTasks,
} from "../../redux/slices/ImportantTasks_Or_AllTasks";

const Sections = () => {
  const dispatch = useDispatch();
  const displayAllTasks = useSelector(
    (state) => state.impOrAll.displayAllTasks
  );

  const handleAllTasksLists = () => {
    dispatch(showAllTasks());
  };

  const handleImportantLists = () => {
    dispatch(showImportantTasks());
  };

  return (
    <div className="route-btn flex sm:flex-col bg-slate-700 justify-around text-large h-14 md:sticky md:top-0">
      <button
        className={`category-btns bg-[#576b7c] hover:bg-[#404040] ${
          displayAllTasks ? "bg-[#576b7c]" : ""
        }`}
        onClick={handleAllTasksLists}
      >
        All Tasks
      </button>

      <button
        className={`category-btns bg-[#ff6f61] hover:bg-[#e05146]  ${
          !displayAllTasks ? "bg-[#ff6f61]" : ""
        }`}
        onClick={handleImportantLists}
      >
        Important
      </button>
    </div>
  );
};

export default Sections;
