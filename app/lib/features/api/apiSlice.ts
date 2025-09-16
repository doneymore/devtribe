// lib/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";

// Define API response types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  userId: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  id: number;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt: string;
  published?: boolean;
}

export interface UpdatePostRequest {
  id: number;
  title?: string;
  content?: string;
  excerpt?: string;
  published?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const state = getState() as RootState;
    //   const token = state.user.token;

    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }

      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Post", "Auth"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<
      { user: User; token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // User endpoints
    getUsers: builder.query<
      PaginatedResponse<User>,
      {
        page?: number;
        limit?: number;
        search?: string;
      }
    >({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: "/users",
        params: { page, limit, search },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    getUserById: builder.query<User, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation<User, CreateUserRequest>({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    // Post endpoints
    getPosts: builder.query<
      PaginatedResponse<Post>,
      {
        page?: number;
        limit?: number;
        published?: boolean;
        userId?: number;
      }
    >({
      query: ({ page = 1, limit = 10, published, userId } = {}) => ({
        url: "/posts",
        params: {
          page,
          limit,
          ...(published !== undefined && { published }),
          ...(userId && { userId }),
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Post" as const, id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getPostById: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (newPost) => ({
        url: "/posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    updatePost: builder.mutation<Post, UpdatePostRequest>({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
    }),

    deletePost: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Post", id },
        { type: "Post", id: "LIST" },
      ],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  // Auth hooks
  useLoginMutation,
  useLogoutMutation,

  // User hooks
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  // Post hooks
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
