import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["TaskData"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64fd9a32596493f7af7e5ae8.mockapi.io",
    headers: { "content-type": "application/json" },
  }),
  endpoints: (builder) => ({
    getAllTaskData: builder.query({
      query: () => "/tasks",
      providesTags: ["TaskData"],
    }),
    addTask: builder.mutation({
      query: (taskData) => {
        console.log("Task Data:", taskData); // Add this line to check the data
        return {
          url: "/tasks", // Use 'url' instead of 'URL'
          method: "POST",
          body: taskData,
        };
      },
      invalidatesTags: ["TaskData"],
    }),
    deleteTask: builder.mutation({
      query: (id) => {
        console.log("Task Id:", id);
        return {
          url: `/tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["TaskData"],
    }),
    editTaskItems: builder.mutation({
      query: ({ id, task }) => {
        console.log("Task id: ", id);
        console.log("Data:", task);
        return {
          url: `/tasks/${id}`,
          method: "PUT",
          body: task, // No need to stringify
        };
      },
      invalidatesTags: ["TaskData"],
    }),
  }),
});

export const {
  useGetAllTaskDataQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useEditTaskItemsMutation,
} = taskApi;
