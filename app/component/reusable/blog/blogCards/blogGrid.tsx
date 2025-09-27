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
  itemsPerPage = 9,
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
    // Add your comment handling logic here
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Section Title */}
      <h1
        className="text-left text-[#9B9B9B] mb-8 sm:mb-10 lg:mb-12 px-4"
        style={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 400,
          fontSize: "30px",
          lineHeight: "100%",
          letterSpacing: "0%",
        }}
      >
        Latest Article
      </h1>

      {/* Grid Container with increased vertical gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 place-items-center px-2 sm:px-4">
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
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </div>
  );
};

export default BlogGrid;
