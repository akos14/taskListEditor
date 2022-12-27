import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const feladatOKApiSlice = createApi({
  reducerPath: "feladatOKApi",
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getTaskLists: builder.query({
      query: (limit = 50) => ({
        url: `tasklists?$skip=0&$limit=${limit}`,
      }),
    }),
    getTaskListsNumber: builder.query({
      query: () => ({
        url: "tasklists?$limit=0",
      }),
      transformResponse: (response) => response.total,
    }),
    getTasks: builder.query({
      query: (page = 0) => ({
        url: `tasks?$skip=${page * 10}&$limit=10`,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "authentication",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    create: builder.mutation({
      query: (body) => ({
        url: "tasklists",
        method: "POST",
        body,
      }),
    }),
    modify: builder.mutation({
      query: (tasklist) => ({
        url: `tasklists/${tasklist.id}`,
        method: "PATCH",
        body: { ...tasklist },
      }),
    }),
  }),
});

// reducer
export const feladatOKApiSliceReducer = feladatOKApiSlice.reducer;

// hooks
export const {
  useGetTaskListsQuery,
  useGetTaskListsNumberQuery,
  useGetTasksQuery,
  useLoginMutation,
  useRegisterMutation,
  useCreateMutation,
  useModifyMutation,
} = feladatOKApiSlice;
