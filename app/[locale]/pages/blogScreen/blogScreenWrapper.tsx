//@typescript-eslint/no-explicit-any
"use client";

import React, { useEffect, useState } from "react";
import { blog, blog_post } from "@/public/assests/image";
import { getAllBlogPostsByUserId } from "@/app/lib/blogServices";
import { formatBlogDate } from "@/app/utils/dateformatter";
import { createExcerpt } from "@/app/utils/createExcerptOfImage";
import { getImageSrc } from "@/app/utils/convertBase64toImage";
import { useSelector } from "react-redux";
import { selectBlogUserId } from "@/app/lib/features/auth/blogSlice";
import { useAuth } from "@/app/lib/hooks/useAuths";
import BlogGrid from "../../component/reusable/blog/blogCards/blogGrid";
import { BlogHeroSection } from "../../component/reusable/blog/hero";
import { BlogCard } from "../../component/reusable/blog/blogPost";
import { AllBlogPostsResponse, BlogPost, UIBlogPost } from "@/app/types";
import { mapBlogPostToUI } from "@/app/lib/blogMapper";

interface BlogGridProps {
  posts: UIBlogPost[];
  itemsPerPage: number;
}

export default function BlogScreenClient() {
  const blogUserId = useSelector(selectBlogUserId);
  const { user } = useAuth();
  const [posts, setPosts] = useState<UIBlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<UIBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllBlogPostsByUserId(user?.id);

        if (Array.isArray(data.payload)) {
          const mappedPosts = data.payload.map((post) => mapBlogPostToUI(post));
          setPosts(mappedPosts);
          setFeaturedPost(mappedPosts[0] ?? null);
        }
      } catch (err) {
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogPosts();
  }, [blogUserId]);

  // const normalizedPosts: BlogPost[] = postsData?.payload ?? [];

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
          image={featuredPost.image}
          imageAlt={featuredPost.title}
          title={featuredPost.title}
          author={featuredPost.author}
          date={featuredPost.date}
          excerpt={featuredPost.description}
          slug={featuredPost.slug}
        />
      )}

      {/* Blog Grid */}
      {/* <BlogGrid
        posts={normalizedPosts.map((post: BlogPost) => ({
          id: post.blogId,
          title: post.blogTItle,
          description: createExcerpt(post.blogBody, 150),
          author: post.createdBy,
          date: formatBlogDate(post.dateCreated),
          image: getImageSrc(post.thumnailImage ?? null) ?? blog_post,
          slug: post.blogId.toString(),
          likes: typeof post.likes === "number" ? post.likes : 0,
          comments: Array.isArray(post.comments) ? post.comments.length : 0,
          isLiked: post.hasCurrentuserLiked ?? false,
        }))}
        itemsPerPage={9}
        className="mb-8"
      /> */}
      <BlogGrid posts={posts} itemsPerPage={9} />
    </div>
  );
}
