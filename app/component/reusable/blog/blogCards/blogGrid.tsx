"use client";
import React, { useState } from "react";
import { BlogPost } from "../types";
import { usePagination } from "@/app/lib/hooks/usePagination";
import BlogCard from "./blogCard";
import PaginationControls from "../../pagination";

interface BlogGridProps {
  posts: BlogPost[];
  itemsPerPage?: number;
  className?: string;
}

const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  itemsPerPage = 8,
  className = "",
}) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(posts);

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

  const handleLike = (id: number) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleCommentClick = (id: number) => {
    console.log(`Comment clicked for post ${id}`);
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
    </section>
  );
};

export default BlogGrid;
