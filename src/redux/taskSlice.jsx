import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskDatabase: [],
  editIndex: null,
  editValue: "",
  editStatusRedux: null,
  importantLocalData: [],
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,

  reducers: {
    addTaskToTheDatabase: (state, action) => {
      state.taskDatabase = [...state.taskDatabase, ...action.payload];
      // console.log(state.taskDatabase);
    },
    re_order_data_after_DND: (state, action) => {
      try {
        const { sourceIndex, destinationIndex } = action.payload;
        const updatedTaskDatabase = [...state.taskDatabase];

        if (
          sourceIndex >= 0 &&
          destinationIndex >= 0 &&
          sourceIndex < updatedTaskDatabase.length &&
          destinationIndex <= updatedTaskDatabase.length
        ) {
          const [removed] = updatedTaskDatabase.splice(sourceIndex, 1);
          updatedTaskDatabase.splice(destinationIndex, 0, removed);
          state.taskDatabase = updatedTaskDatabase;
        }
      } catch (error) {
        console.error("Error reordering tasks:", error);
      }
    },

    deleteTaskLocal: (state, action) => {
      const taskId = action.payload;

      try {
        if (!taskId) {
          console.error("Invalid task ID:", taskId);
          return;
        }

        console.log("Deleting task with ID:", taskId);
        state.taskDatabase = state.taskDatabase.filter(
          (item) => item?.id !== taskId
        );
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },

    editIndexData: (state, action) => {
      const indexID = action.payload;
      state.editIndex = indexID;
      const plainArray = state.taskDatabase.map((item) =>
        JSON.parse(JSON.stringify(item))
      );
      state.editValue = plainArray.find((item) => item.id === indexID);
      // console.log("New editValue:", state.editValue);
    },

    editTaskData: (state, action) => {
      const task = action.payload;
      const updatedData = state.taskDatabase.map((item) =>
        item.id === state.editIndex ? { ...item, task } : item
      );
      state.taskDatabase = updatedData;
    },
    editStatusRedux: (state, action) => {
      // console.log("Redux Edit Status ", action.payload);
      state.editStatusRedux = action.payload;
    },
    editStatusReduxRemove: (state) => {
      // console.log("Edit Mode Status Null");
      state.editStatusRedux = null;
    },
    addImportantTask: (state, action) => {
      const taskId = action.payload;
      console.log("Toggling task importance for ID:", taskId);

      const existingImportantData = state.importantLocalData;
      console.log("Existing Important Data:", existingImportantData);

      const taskToAdd = state.taskDatabase.find((item) => item.id === taskId);

      // Check if the task is already in the important list
      const isTaskAlreadyImportant = existingImportantData.some(
        (item) => item.id === taskId
      );

      if (isTaskAlreadyImportant) {
        // If task is already important, remove it
        state.importantLocalData = existingImportantData.filter(
          (item) => item.id !== taskId
        );
        console.log(
          "Task removed. Updated Important Data:",
          state.importantLocalData
        );
      } else {
        // If task is not important, add it
        state.importantLocalData = [...existingImportantData, taskToAdd];
        console.log(
          "Task added. Updated Important Data:",
          state.importantLocalData
        );
      }

      // Update localStorage with the updated important data
      localStorage.setItem(
        "ImportantTasks",
        JSON.stringify(state.importantLocalData)
      );
    },

    removeImportantTasks: (state, action) => {
      const taskId = action.payload;

      // Remove the task from importantLocalData in state
      state.importantLocalData = state.importantLocalData.filter(
        (item) => item.id !== taskId
      );

      // Update localStorage with the new importantLocalData
      localStorage.setItem(
        "ImportantTasks",
        JSON.stringify(state.importantLocalData)
      );
    },
  },
});

export const {
  addTaskToTheDatabase,
  addImportantTask,
  removeImportantTasks,
  re_order_data_after_DND,
  deleteTaskLocal,
  editIndexData,
  editTaskData,
  editStatusRedux,
  editStatusReduxRemove,
} = taskSlice.actions;
export default taskSlice.reducer;
