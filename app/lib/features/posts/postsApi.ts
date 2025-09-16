import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Post", "User"],
  endpoints: (builder) => ({
    // Query endpoints
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: ["Post"],
    }),
    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: ["User"],
    }),
    // Mutation endpoints
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation<Post, Partial<Post> & Pick<Post, "id">>({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Post", id }],
    }),
    deletePost: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetUsersQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
