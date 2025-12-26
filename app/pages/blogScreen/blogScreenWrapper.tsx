"use client";

import React, { useEffect, useState } from "react";
import { BlogCard } from "@/app/component/reusable/blog/blogPost";
import { BlogHeroSection } from "@/app/component/reusable/blog/hero";
import BlogGrid from "@/app/component/reusable/blog/blogCards/blogGrid";
import { blog, blog_post } from "@/public/assests/image";
import { getAllBlogPostsByUserId } from "@/app/lib/blogServices";
import { formatBlogDate } from "@/app/utils/dateformatter";
import { createExcerpt } from "@/app/utils/createExcerptOfImage";
import { getImageSrc } from "@/app/utils/convertBase64toImage";
import { useSelector } from "react-redux";
import { selectBlogUserId } from "@/app/lib/features/auth/blogSlice";
import { useAuth } from "@/app/lib/hooks/useAuths";

export default function BlogScreenClient() {
  const blogUserId = useSelector(selectBlogUserId);
  const { user } = useAuth();
  const [postsData, setPostsData] = useState<any>(null);
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);

        // Use authenticated user's ID from Redux, or fallback to default
        const data = await getAllBlogPostsByUserId(user?.id || undefined);

        if (data?.payload && Array.isArray(data.payload)) {
          setPostsData(data);
          if (data.payload.length > 0) {
            setFeaturedPost(data.payload[0]);
          }
        }
      } catch (err) {
        console.error("Error loading blog data:", err);
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, [blogUserId]); // Re-fetch when user authentication changes

  const normalizedPosts =
    postsData?.payload && Array.isArray(postsData.payload)
      ? postsData.payload
      : [];

  if (loading) {
    return (
      <div className="min-h-screen">
        <BlogHeroSection />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">
              Loading blog posts...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <BlogHeroSection />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-red-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-red-600 mb-4 text-lg font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BlogHeroSection />

      {/* Featured Post */}
      {featuredPost && (
        <BlogCard
          image={getImageSrc(featuredPost.thumnailImage) ?? blog_post}
          imageAlt={featuredPost.blogTItle}
          title={featuredPost.blogTItle}
          author={featuredPost.createdBy}
          date={formatBlogDate(featuredPost.dateCreated)}
          excerpt={createExcerpt(featuredPost.blogBody, 300)}
          slug={featuredPost.blogId.toString()}
        />
      )}

      {/* Blog Grid */}
      <BlogGrid
        posts={normalizedPosts.map((post: any) => ({
          id: post.blogId,
          title: post.blogTItle,
          description: createExcerpt(post.blogBody, 150),
          author: post.createdBy,
          date: formatBlogDate(post.dateCreated),
          image: getImageSrc(post.thumnailImage) ?? blog_post,
          slug: post.blogId.toString(),
          likes: typeof post.likes === "number" ? post.likes : 0,
          comments: Array.isArray(post.comments) ? post.comments.length : 0,
          isLiked: post.hasCurrentuserLiked ?? false,
        }))}
        itemsPerPage={9}
        className="mb-8"
      />
    </div>
  );
}
