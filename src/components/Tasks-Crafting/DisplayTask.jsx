import React, { useEffect, useState } from "react";
import Sections from "./Sections";
import TotalTask from "./TotalTask";
import TaskCreation from "./TaskCreation";
import TaskList from "./Tasks";
// import toast, { Toaster } from "react-hot-toast";
import { DragDropContext } from "react-beautiful-dnd";
import {
  deleteTaskLocal,
  re_order_data_after_DND,
} from "../../redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { draggingStatus } from "../../redux/slices/DragAndDrop";
import { useDeleteTaskMutation } from "../../redux/api/ApiFetching";
import toast from "react-hot-toast";
import TextAnimation from "./TextAnimation";
const DisplayTask = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();

  const dispatch = useDispatch();

  const displayTaskStatus = useSelector(
    (state) => state.impOrAll?.displayAllTasks
  );

  const onDragStart = () => {
    setIsDragging(true);
  };
  const onDragEnd = async (result) => {
    setIsDragging(false);
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === "dustBin") {
      const taskId = result.draggableId;
      console.log(taskId);
      try {
        await deleteTask(taskId);
        dispatch(deleteTaskLocal(taskId));
        // alert("Deleted SuccessFully");
        toast.success("Deleted SuccessFully!");
      } catch (error) {
        console.log("Error from the displayTask:", error);
        toast.error(error);
      }
    }
    dispatch(re_order_data_after_DND({ sourceIndex, destinationIndex }));
  };

  useEffect(() => {
    dispatch(draggingStatus(isDragging));
  }, [isDragging, setIsDragging]);

  return (
    <>
      <div className="content w-full md:w-9/12 centering relative overflow-x-scroll bg-slate-900 text-white">
        <div className="top-bar px-9 pt-5 bg-gradient-to-r  from-black to-black-400 font-extrabold text-6xl text-center ">
          <div className="text-display">
            <TextAnimation />
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <div className="category sticky top-0 w-full ">
            <Sections displayTaskStatus={displayTaskStatus} />
            {displayTaskStatus ? (
              <TaskCreation isDragging={isDragging} />
            ) : (
              <p className="p-4 text-center">Important Task</p>
            )}
          </div>

          <div className="content-bar p-5 w-full md:w-11/12 m-auto h-auto flex justify-around flex-col align-middle vw-25 bg-gradient-to-r from-slate-600 to-rgb(11,17,32) rounded-md shadow-md">
            <TaskList displayTaskStatus={displayTaskStatus} />
          </div>
        </DragDropContext>

        <TotalTask displayTaskStatus={displayTaskStatus} />
      </div>
    </>
  );
};

export default DisplayTask;
