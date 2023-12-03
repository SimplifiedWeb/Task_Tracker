import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddTaskMutation,
  useEditTaskItemsMutation,
} from "../../redux/api/ApiFetching";
import { editModeTask, editModeTaskData } from "../../redux/EditSlice";
import { editTaskData } from "../../redux/taskSlice";
import { Droppable } from "react-beautiful-dnd";
import DeleteDropItem from "../SVG/DeleteDropItem";
import toast from "react-hot-toast";
import Spinner from "../Category/Spinner";
import { useRef } from "react";
import { toggleInputFocus } from "../../redux/slices/ImportantTaskSlice";

const TaskCreation = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();
  const inputFocus = useRef();

  const [addTask, { isLoading }] = useAddTaskMutation();
  const [editTaskItems] = useEditTaskItemsMutation();
  const [showEditStatus, setShowEditStatus] = useState("");
  const editStatus = useSelector((state) => state.editTask);
  const editValue = useSelector((state) => state.taskSlice);
  const dndStatus = useSelector((state) => state.dndSlice);
  const inputFocusStatus = useSelector(
    (state) => state.impTaskSlice.InputStatus
  );

  const handleChange = (e) => {
    const data = e.target.value;
    setTask(data);
  };

  const handleTaskAdd = async (e) => {
    e.preventDefault();
    try {
      if (!editStatus.editStatus) {
        await addTask({ task });
        toast.success("Added SuccessFully!");
      } else {
        if (task) {
          dispatch(editModeTaskData(task));
          dispatch(editTaskData(task));
          dispatch(editModeTask(false));
          await editTaskItems({
            id: editStatus.editIndexTask,
            task: {
              task,
            },
          });
          toast.success("Edited SuccessFully!");

          // inputFocus.current.focus();
        } else {
          console.error("Invalid task data:", task);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setTask("");
    dispatch(toggleInputFocus());
  };
  useEffect(() => {
    if (inputFocusStatus) {
      inputFocus.current.focus();
    }
  }, [inputFocusStatus]);

  useEffect(() => {
    if (editStatus.editStatus) {
      setShowEditStatus("Editing Mode");
      setTask(editValue.editValue.task);
    } else {
      setShowEditStatus("Simpler Mode");
    }
  }, [editStatus, addTask, editTaskItems]);

  return (
    <Droppable droppableId="dustBin">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="main"
        >
          <div className="lg:w-7/12  create-Task mx-auto my-3 p-5 bg-gradient-to-r from-slate-600 to-black-700 rounded-md shadow-md ">
            {dndStatus.status && (
              <div className="overlay">
                <div className="overlay-content">
                  <DeleteDropItem />
                </div>
              </div>
            )}
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4 md:mr-4 ">
                    Create a Task
                  </h2>
                  <div className="-mt-2 md:-mt-4 bg-gray-800 p-1 md:p-2">
                    {showEditStatus === "Editing Mode" ? (
                      <div className="flex items-center">
                        <p className="mr-1 md:mr-2 font-bold text-gray-400">
                          {showEditStatus}
                        </p>
                        <span className="w-2 h-2 md:w-4 md:h-4 bg-yellow-300 rounded-full inline-block animate-bg-yellow"></span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p className="mr-1 md:mr-2 font-bold text-gray-400">
                          {showEditStatus}
                        </p>
                        <span className="w-2 h-2 md:w-4 md:h-4 bg-green-300 rounded-full inline-block animate-bg-green"></span>
                      </div>
                    )}
                  </div>
                </div>
                <form className="flex flex-col md:flex-row items-center">
                  <input
                    type="text"
                    onChange={handleChange}
                    value={task}
                    ref={inputFocus}
                    className="flex-grow px-4 py-2 mb-2 text-lg w-10/12 md:mr-2 border-[#414e62] bg-white text-black border-none rounded-md focus:outline-none md:w-1/2 lg:w-1/3"
                    placeholder="Enter your cute task..."
                  />
                  <button
                    onClick={handleTaskAdd}
                    disabled={task === ""}
                    className="w-full md:w-auto px-4 py-3 lg:mt-[-10px] bg-[#576b7c] text-[#e5e5e5] rounded-md  focus:outline-none "
                  >
                    {!editStatus.editStatus ? "Add" : "Edit"}
                  </button>
                </form>
              </>
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskCreation;
