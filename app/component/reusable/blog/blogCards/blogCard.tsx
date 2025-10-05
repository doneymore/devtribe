import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { blog_story } from "@/public/assests/image";
import { BlogPost } from "../types";

interface BlogCardGridProps {
  post: BlogPost;
  onLike: (id: number) => void;
  onCommentClick: (id: number) => void;
}

const BlogCard: React.FC<BlogCardGridProps> = ({
  post,
  onLike,
  onCommentClick,
}) => {
  const handleLikeClick = () => {
    onLike(post.id);
  };

  const handleCommentClick = () => {
    onCommentClick(post.id);
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-100 to-blue-100 rounded-[20px] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex flex-row h-[220px] sm:h-[240px] lg:h-[260px]">
        {/* Image Section - Left Side - Fixed percentage */}
        <div className="relative w-[35%] flex-shrink-0">
          <Image
            src={blog_story}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 35vw, (max-width: 1024px) 35vw, 400px"
            priority
          />
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-5 lg:p-7 flex flex-col justify-between">
          {/* Title */}
          <h3
            className="text-[#1a1a1a] mb-2 line-clamp-2"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "1.4",
            }}
          >
            {post.title}
          </h3>

          {/* Author and Date */}
          <div className="flex items-center justify-between mb-3 text-[13px] text-gray-600">
            <span className="truncate mr-2">by {post.author}</span>
            <span className="whitespace-nowrap">{post.date}</span>
          </div>

          {/* Description */}
          <p
            className="text-gray-700 mb-4 line-clamp-3"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "1.6",
            }}
          >
            {post.description}
          </p>

          {/* Footer with interactions and See All button */}
          <div className="flex items-center justify-between mt-auto">
            {/* Like and Comment buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-1.5 transition-colors ${
                  post.isLiked
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <Heart
                  size={16}
                  className={post.isLiked ? "fill-current" : ""}
                />
                <span className="text-[13px]">{post.likes}</span>
              </button>

              <button
                onClick={handleCommentClick}
                className="flex items-center space-x-1.5 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MessageCircle size={16} />
                <span className="text-[13px]">{post.comments}</span>
              </button>
            </div>

            {/* See All button */}
            <Link
              href={`/pages/blogScreen/${post.id}`}
              className="text-blue-600 hover:text-blue-800 transition-colors text-[14px] font-medium whitespace-nowrap"
            >
              See All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
