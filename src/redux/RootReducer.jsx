import { combineReducers } from "@reduxjs/toolkit";
import { taskApi } from "./api/ApiFetching";
import EditSlice from "./EditSlice";
import DragAndDrop from "./slices/DragAndDrop";
import ImportantTaskSlice from "./slices/ImportantTaskSlice";
import ImportantTasks_Or_AllTasks from "./slices/ImportantTasks_Or_AllTasks";
import taskSlice from "./taskSlice";

const rootReducer = combineReducers({
  [taskApi.reducerPath]: taskApi.reducer,
  editTask: EditSlice,
  taskSlice: taskSlice,
  dndSlice: DragAndDrop,
  impTaskSlice: ImportantTaskSlice,
  impOrAll: ImportantTasks_Or_AllTasks,
});

export default rootReducer;
