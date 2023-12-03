import React, { useMemo, useEffect, useState } from "react";
import { useGetAllTaskDataQuery } from "../../redux/api/ApiFetching";
import TaskItems from "./TaskItems";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addTaskToTheDatabase } from "../../redux/taskSlice";
import Spinner from "../Category/Spinner";

const TaskList = ({ displayTaskStatus, setIsEditing, isEditing }) => {
  const { data: tasks, error, isLoading } = useGetAllTaskDataQuery();
  const dispatch = useDispatch();
  const taskDataBase = useSelector((state) => state.taskSlice.taskDatabase);
  const importantTaskTotal = useSelector((state) => state.taskSlice);
  const [importantTasks, setImportantTasks] = useState(
    JSON.parse(localStorage.getItem("ImportantTasks")) || []
  );

  // Use useMemo to filter tasks that are not already in taskDatabase
  const newTasks = useMemo(() => {
    if (tasks === undefined) {
      console.log("Tasks is Undefined");
      return [];
    }

    return tasks.filter((task) => {
      if (!task || task.id === undefined) {
        return false;
      }

      return !taskDataBase.some((t) => t.id === task.id);
    });
  }, [tasks]);

  useEffect(() => {
    try {
      // If newTasks has items, dispatch the action to add them to the taskDatabase
      if (newTasks.length > 0) {
        console.log("Deleted Items is storing");
        dispatch(addTaskToTheDatabase(newTasks));
      }
    } catch (error) {
      console.error("Error adding tasks to the database:", error);
    }
  }, [newTasks]);

  useEffect(() => {
    const updatedImportantTasks =
      JSON.parse(localStorage.getItem("ImportantTasks")) || [];
    setImportantTasks(updatedImportantTasks);
  }, [importantTaskTotal.importantLocalData]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Droppable droppableId="taskList">
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="draggable-list "
        >
          {displayTaskStatus ? (
            <>
              {taskDataBase.length > 0 ? (
                taskDataBase.map((item, index) => (
                  <TaskItems
                    key={item.id}
                    displayTaskStatus={displayTaskStatus}
                    task={item}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                    index={index}
                  />
                ))
              ) : (
                <p>No tasks available.</p>
              )}
            </>
          ) : (
            <>
              {importantTasks.length > 0 ? (
                importantTasks.map((items, index) => {
                  return (
                    <TaskItems
                      key={items.id}
                      displayTaskStatus={displayTaskStatus}
                      index={index}
                      task={items}
                    />
                  );
                })
              ) : (
                <div>
                  <h2 className="text-center">Important Task : Empty</h2>
                </div>
              )}
            </>
          )}

          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default TaskList;
