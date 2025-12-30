"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// import BlogDetailPage from "@/app/component/reusable/blog/blogDetails/blogdetail";
import { BlogPost, BlogComment } from "@/app/lib/blogServices";
import { getBlogPostById } from "@/app/lib/blogServices";
import { formatBlogDate } from "@/app/utils/dateformatter";
import { getImageSrc } from "@/app/utils/convertBase64toImage";
import BlogDetailPage from "@/app/[locale]/component/reusable/blog/blogDetails/blogdetail";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import { selectBlogUserId } from "@/app/lib/features/auth/blogSlice";

const BlogDetailPageRoute = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const locale = useLocale();
  const blogUserId = useSelector(selectBlogUserId);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(false);

        if (!params?.id) {
          setError(true);
          return;
        }

     const blogPost = await getBlogPostById(params.id, blogUserId || undefined);

        if (blogPost) {
          setPost(blogPost);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [params?.id]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

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
          onClick={() => router.push(`/${locale}/pages/blogScreen`)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  /* ================= IMAGE PICKER ================= */

  const getValidImageUrl = (): string | null => {
    const blogImage = getImageSrc(post.blogImage);
    const thumbnailImage = getImageSrc(post.thumnailImage);

    if (blogImage?.trim()) return blogImage;
    if (thumbnailImage?.trim()) return thumbnailImage;

    return null;
  };

  /* ================= POST TRANSFORM ================= */

  const transformedPost = {
    id: post.blogId,
    imageUrl: getValidImageUrl() ?? "",
    title: post.blogTItle,
    author: {
      name: post.createdBy,
      avatar: "",
    },
    publishedDate: formatBlogDate(post.dateCreated),
    content: post.blogBody,
    likes: post.likes,
    isLiked: post.hasCurrentUserLiked ?? false,
  };

  /* ================= COMMENTS TRANSFORM ================= */

  const transformedComments = post.comments.map(
    (comment: BlogComment, index: number) => ({
      id: index + 1, // generated safe ID
      author: {
        name: comment.emailAddress,
        avatar: "",
      },
      content: comment.comment,
      timestamp: "", // API does not provide date
      likes: 0,
      isLiked: false,
      replies: [],
    })
  );

  return (
    <BlogDetailPage
      post={transformedPost}
      comments={transformedComments}
      onBack={() => router.push(`/${locale}/pages/blogScreen`)}
    />
  );
};

export default BlogDetailPageRoute;
