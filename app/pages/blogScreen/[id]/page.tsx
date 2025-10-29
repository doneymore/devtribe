"use client";

import BlogDetailPage from "@/app/component/reusable/blog/blogDetails/blogdetail";
import { BlogPost } from "@/app/lib/blogServices";
import { getBlogPostById } from "@/app/lib/blogServices";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formatBlogDate } from "@/app/utils/dateformatter";
import { getImageSrc } from "@/app/utils/convertBase64toImage";

const BlogDetailPageRoute = () => {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const id = params.id as string;
        
        if (!id) {
          setError(true);
          return;
        }

        const blogPost = await getBlogPostById(id);
        console.log(blogPost, "fetchedBlogPost");
        if (blogPost) {
          setPost(blogPost);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadPost();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Post Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          The blog post you're looking for doesn't exist.
        </p>
        <button
          onClick={() => router.push("/pages/blogScreen")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Blog
        </button>
      </div>
    );
  }
 const getValidImageUrl = (): string | null => {
    const blogImage = getImageSrc(post.blogImage);
    const thumbnailImage = getImageSrc(post.thumnailImage);
    
    // Return the first non-empty, non-null image
    if (blogImage && blogImage.trim() !== "") return blogImage;
    if (thumbnailImage && thumbnailImage.trim() !== "") return thumbnailImage;
    
    return null; // Return null if no valid image
  };
  // Transform the API response to match BlogDetailPost interface
    const transformedPost = {
    imageUrl: getValidImageUrl() || "", // Empty string as fallback, but we'll handle it in the component
    title: post.blogTItle,
    author: {
      name: post.createdBy,
      avatar: "",
    },
    publishedDate: formatBlogDate(post.dateCreated),
    content: post.blogBody,
    likes: post.likes,
    isLiked: false,
  };

  // Transform comments from API response to match Comment interface
  const transformedComments = post.comments.map(comment => ({
    id: comment.commentId,
    author: {
      name: comment.createdBy,
      avatar: "", // API doesn't provide comment author avatar
    },
    content: comment.comment,
    timestamp: formatBlogDate(comment.dateCreated),
    likes: 0, // API doesn't provide comment likes
    isLiked: false,
    replies: [], // API doesn't provide nested replies
  }));

  return (
    <BlogDetailPage
      post={transformedPost}
      comments={transformedComments}
      onBack={() => router.push("/pages/blogScreen")}
    />
  );
};

export default BlogDetailPageRoute;