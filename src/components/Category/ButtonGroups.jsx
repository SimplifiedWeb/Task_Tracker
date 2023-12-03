import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteTaskMutation } from "../../redux/api/ApiFetching";
import {
  editIndex,
  editModeTask,
  editModeTaskRemove,
} from "../../redux/EditSlice";
import DeleteIcon from "../SVG/DeleteIcon";
import EditIcon from "../SVG/EditIcon";
import CancelIcon from "../SVG/CancelIcon";
import StarIcon from "../SVG/StarIcon";
import toast from "react-hot-toast";

import {
  addImportantTask,
  deleteTaskLocal,
  editIndexData,
  removeImportantTasks,
} from "../../redux/taskSlice";
import Spinner from "../SVG/Spinner";

import { toggleInputFocus } from "../../redux/slices/ImportantTaskSlice";

const ButtonGroups = ({ setActive, taskId, displayStarIcon }) => {
  const taskImportantKey = `task_${taskId}_important`;
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const taskDataBase = useSelector((state) => state.taskSlice.taskDatabase);

  const [importantIconState, setImportantIconState] = useState(
    localStorage.getItem(taskImportantKey) === "true"
  );

  const [deleteState, setDeleteState] = useState(false);
  const editStatus = useSelector((state) => state.editTask);

  const [editMode, setEditMode] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      if (!displayStarIcon) {
        await deleteTask(taskId);
        dispatch(deleteTaskLocal(taskId));
        setDeleteState(false);
      } else {
        setImportantIconState((prevImportantState) => {
          const newSetImportantActive = !prevImportantState;
          localStorage.removeItem(taskImportantKey, newSetImportantActive);
          return newSetImportantActive;
        });
        dispatch(removeImportantTasks(taskId));
      }
      setExpanded(false);
      toast.success("Deleted SuccessFully!!");
    } catch (error) {
      toast.error("Error deleting task:", error);
    }
  };

  const handleCancel = () => {
    setExpanded(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode((prev) => !prev);
    dispatch(toggleInputFocus());
  };

  const handleImportant = async () => {
    try {
      if (importantIconState) {
        setImportantIconState((prevImportantState) => {
          const newSetImportantActive = !prevImportantState;
          localStorage.removeItem(taskImportantKey, newSetImportantActive);
          return newSetImportantActive;
        });
        toast.success("Important Remove!!!");
      } else {
        setImportantIconState((prevImportantState) => {
          const newSetImportantActive = !prevImportantState;
          localStorage.setItem(taskImportantKey, newSetImportantActive);
          return newSetImportantActive;
        });
        toast.success("Important!!!");
      }

      dispatch(addImportantTask(taskId));
    } catch (error) {
      toast.error("Error from the Handle Important Line no 54", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const cleanup = async () => {
      if (isMounted && deleteState) {
        try {
          await handleDelete();
        } catch (error) {
          toast.error("Error during cleanup:", error);
        }
      }
    };

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [deleteState, handleDelete]);

  useEffect(() => {
    if (editStatus.editStatus) {
      dispatch(editModeTaskRemove());
    } else {
      dispatch(editModeTask(editMode));
    }
    dispatch(editIndex(taskId));
    dispatch(editIndexData(taskId));
  }, [setEditMode, editMode]);

  useEffect(() => {
    setEditMode(false);
  }, [taskDataBase]);

  return (
    <>
      <div
        className={`relative operation flex p-2 md:p-4 space-x-2 ${
          setActive ? "hidden " : ""
        }`}
      >
        <button
          className={`px-2 md:px-3 py-1 text-white bg-red-500 rounded focus:outline-none relative hover:bg-red-900`}
          onClick={() => setExpanded(true)}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner size="h-6 w-6" />
            </div>
          )}
          <DeleteIcon size="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {isExpanded && (
          <div className="absolute left-[-163px] top-[-10px] bg-gradient-to-r from-slate-600 to-black-700 p-2 md:p-3 border border-gray-300 rounded-md shadow-md">
            <p className="text-red-600 font-semibold mb-2">Are you sure?</p>
            <div className="flex space-x-2">
              <button
                className="px-2 md:px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>

              <button
                className={`px-2 md:px-3 py-1 text-gray-700 bg-gray-300 rounded hover:bg-gray-400 ${
                  isLoading ? "bg-gray-50 :hover:bg-gray-50" : ""
                }`}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {displayStarIcon ? (
          <></>
        ) : (
          <>
            <button
              className={`px-2 md:px-3 py-1 text-white ${
                setActive
                  ? "disabled:opacity-90 text-transparent"
                  : "bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
              }`}
              onClick={setActive ? () => {} : handleEdit}
            >
              {editMode ? (
                <CancelIcon size="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <EditIcon size="h-5 w-5 md:h-6 md:w-6" />
              )}
            </button>

            <button
              className={`${importantIconState ? "disabled:opacity-90" : ""}`}
              onClick={handleImportant}
            >
              <StarIcon
                importantIconState={importantIconState}
                setImportantIconState={setImportantIconState}
              />
            </button>
          </>
        )}
      </div>
    </>
  );
};
export default ButtonGroups;
