import React, { useState } from "react";
import ButtonGroups from "../Category/ButtonGroups";
import TickMark from "../SVG/TickMark";
import { Draggable } from "react-beautiful-dnd";

const TaskItems = ({ task, index, displayTaskStatus }) => {
  const taskKey = `task_${task.id}_completed`;

  // const displayStarIcon = null;

  const [setActive, setAllActive] = useState(
    localStorage.getItem(taskKey) === "true"
  );
  const handleChanges = () => {
    const newSetActive = !setActive;
    setAllActive(newSetActive);

    // Store the updated state in local storage
    localStorage.setItem(taskKey, newSetActive);
  };

  const handleInput = () => {};

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`tasks flex items-center justify-between bg-[#253043] text-white w-full  p-5 rounded-lg mb-2 shadow-md hover:bg-slate-950 hover:shadow-lg hover:translate-y-1 cursor-pointer ${
            setActive ? "" : ""
          }`}
        >
          <div
            onClick={handleChanges}
            className={`w-full flex items-center justify-between p-2`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id={`option-${task.id}`}
                name="radio-group"
                className="hidden"
                checked={setActive}
                onChange={handleInput}
              />
              <label htmlFor={`option-${task.id}`} className="cursor-pointer">
                <TickMark setActive={setActive} />
              </label>
            </div>

            <p
              className={`text-sm md:text-lg font-semibold  text-white text-center flex-grow ${
                setActive
                  ? "text-green-500 line-through  text-center "
                  : "text-gray-800 text-center"
              }`}
            >
              {task.task}
            </p>
          </div>

          {displayTaskStatus ? (
            <>
              {setActive ? (
                <div className="mr-4 md:mr-16">
                  <h2 className="text-sm md:text-base">Completed</h2>
                </div>
              ) : (
                <ButtonGroups
                  setActive={setActive}
                  taskId={task.id}
                  // editMode={editMode}
                />
              )}
            </>
          ) : (
            <>
              <ButtonGroups
                setActive={setActive}
                taskId={task.id}
                displayStarIcon={!displayTaskStatus}
              />
            </>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskItems;
