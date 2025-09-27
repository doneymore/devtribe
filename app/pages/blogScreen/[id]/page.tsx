"use client";

import BlogDetailPage from "@/app/component/reusable/blog/blogDetails/blogdetail";
import {
  sampleComments,
  samplePostCard,
} from "@/app/component/reusable/blog/types";
import { BlogDetailPost, getBlogPostById } from "@/app/lib/blogSerice";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface BlogDetailProps {
  params: {
    id: string;
  };
}

const BlogDetailPageRoute = () => {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogDetailPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const id = params.id as string;
        // Try to get the post by ID
        const blogPost = await getBlogPostById(id);

        if (blogPost) {
          setPost(blogPost);
        } else {
          // If no post found, use sample data for now
          console.log("Using sample post data for ID:", id);
          setPost(samplePostCard);
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
        Loading...
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
          onClick={() => router.push("/blogScreen")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <BlogDetailPage
      post={post}
      comments={sampleComments}
      onBack={() => router.push("/blogScreen")}
    />
  );
};

export default BlogDetailPageRoute;

// Optional: Add generateMetadata if you need SEO
export async function generateMetadata({ params }: BlogDetailProps) {
  try {
    const post = await getBlogPostById(params.id);

    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    return {
      title: post.title,
      description: post.content?.substring(0, 150) + "..." || "Blog post",
      openGraph: {
        title: post.title,
        description: post.content?.substring(0, 150) + "..." || "Blog post",
        images: [post.imageUrl || "/default-blog-image.jpg"],
      },
    };
  } catch (error) {
    return {
      title: "Post Not Found",
    };
  }
}
