"use client";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../types";
import { usePagination } from "@/app/lib/hooks/usePagination";
import BlogCard from "./blogCard";
import PaginationControls from "../../pagination";
import GoogleAuthModal from "../../landingpage/googleAuth";
import { useDispatch, useSelector } from "react-redux";

// Import from authSlice for liked posts
import {
  selectLikedPosts,
  toggleLikedPost,
} from "@/app/lib/features/auth/authSlice";

// Import from blogSlice for blog user ID
import { selectBlogUserId } from "@/app/lib/features/auth/blogSlice";
import { UIBlogPost } from "@/app/types";

interface BlogGridProps {
  posts: UIBlogPost[];
  itemsPerPage?: number;
  className?: string;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  itemsPerPage = 8,
  className = "",
}) => {
  const dispatch = useDispatch();
  const blogUserId = useSelector(selectBlogUserId);


  const [blogPosts, setBlogPosts] = useState<UIBlogPost[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToNext,
    goToPrevious,
    canGoNext,
    canGoPrevious,
  } = usePagination({
    totalItems: blogPosts.length,
    itemsPerPage,
  });

  const currentPosts = blogPosts.slice(
    paginatedData.startIndex,
    paginatedData.endIndex
  );

 useEffect(() => {
  const postsWithLikedState = posts.map((post) => {
    const postId = typeof post.id === "string" ? parseInt(post.id, 10) : post.id;
    return {
      ...post,
      id: postId,
      isLiked: post.isLiked, // ✅ Already comes from API via BlogScreen
      comments: typeof post.comments === "number" ? post.comments : 0,
      likes: typeof post.likes === "number" ? post.likes : 0,
    };
  });
  setBlogPosts(postsWithLikedState);
}, [posts]);

  const handleLike = (id: number | string) => {
    // Convert id to number for consistency
    const numericId = typeof id === "string" ? parseInt(id, 10) : id;

    setBlogPosts((prevPosts) =>
      prevPosts.map((post) => {
        const postId =
          typeof post.id === "string" ? parseInt(post.id, 10) : post.id;
        return postId === numericId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post;
      })
    );

  
  };

  const handleCommentClick = (id: number | string) => {
    // console.log(`Comment clicked for post ${id}`);
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  return (
    <section className={`relative w-full ${className}`}>
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Section Title */}
          <h1
            className="text-left text-gray-500 mb-6"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(18px, 3vw, 24px)",
              lineHeight: "1.2",
            }}
          >
            Latest article
          </h1>

          {/* Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {currentPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onLike={handleLike}
                onCommentClick={handleCommentClick}
                onAuthRequired={handleAuthRequired}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
                onPrevious={goToPrevious}
                onNext={goToNext}
              />
            </div>
          )}
        </div>
      </div>

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </section>
  );
};

export default BlogGrid;
