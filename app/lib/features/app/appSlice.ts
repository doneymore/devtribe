// lib/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/", // Replace with your API base URL
  }),
  tagTypes: ["Post", "User"], // Define tag types for cache invalidation
  endpoints: (builder) => ({
    // Example endpoint - get all posts
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["Post"],
    }),

    // Example endpoint - get post by ID
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Example endpoint - create new post
    createPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),

    // Example endpoint - update post
    updatePost: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),

    // Example endpoint - delete post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    // Users endpoint
    getUsers: builder.query({
      query: () => "users",
      providesTags: ["User"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetUsersQuery,
} = apiSlice;
