import React from "react";
import { useSelector } from "react-redux";

const TotalTask = ({ displayTaskStatus }) => {
  const taskTotal = useSelector((state) => state.taskSlice);
  const importantTaskTotal = useSelector((state) => state.taskSlice);

  return (
    <>
      <div className="bottom-bar bg-gray-800 text-white p-4 flex justify-center items-center">
        <span className="text-lg mr-2">Total :</span>
        <span className="text-lg font-bold">
          {displayTaskStatus ? (
            <>{taskTotal.taskDatabase.length}</>
          ) : (
            <>{importantTaskTotal.importantLocalData.length}</>
          )}
        </span>
      </div>
    </>
  );
};

export default TotalTask;
