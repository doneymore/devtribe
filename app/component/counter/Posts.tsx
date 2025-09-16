"use client";

import { useCreatePostMutation, useDeletePostMutation, useGetPostsQuery } from "@/app/lib/features/api/apiSlice";
import { useState } from "react";


export default function Posts() {
  const { data: posts, error, isLoading } = useGetPostsQuery({});
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [newPostTitle, setNewPostTitle] = useState("");

  const handleCreatePost = async () => {
    if (newPostTitle.trim()) {
      try {
        await createPost({
          title: newPostTitle,
          body: "This is a test post created with RTK Query",
          userId: 1,
        }).unwrap();
        setNewPostTitle("");
      } catch (err) {
        console.error("Failed to create post:", err);
      }
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id).unwrap();
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  if (isLoading) return <div className="p-6">Loading posts...</div>;
  if (error)
    return <div className="p-6 text-red-500">Error loading posts!</div>;

  return (
    <div className="p-6 border rounded-lg bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">RTK Query Posts</h2>

      {/* Create new post */}
      <div className="mb-6 p-4 border rounded bg-white">
        <h3 className="text-lg font-semibold mb-2">Create New Post</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="Post title..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={handleCreatePost}
            disabled={isCreating}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      {/* Posts list */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {posts?.items?.slice(0, 10).map((post: Post) => (
          <div key={post.id} className="p-4 border rounded bg-white">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{post.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{post.body}</p>
                <p className="text-gray-400 text-xs mt-2">
                  ID: {post.id} | User: {post.userId}
                </p>
              </div>
              <button
                onClick={() => handleDeletePost(post.id)}
                disabled={isDeleting}
                className="ml-4 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 disabled:opacity-50"
              >
                {isDeleting ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
