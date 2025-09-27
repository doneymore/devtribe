import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, ExternalLink } from "lucide-react";
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
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeClick = () => {
    onLike(post.id);
  };

  const handleCommentClick = () => {
    onCommentClick(post.id);
  };

  return (
    <div
      className="w-full max-w-[432px] h-auto min-h-[400px] sm:h-[516px] bg-white rounded-[20px] sm:rounded-[41px] shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-32 sm:h-40 md:h-48 w-full overflow-hidden">
        <Image
          src={blog_story}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content Section with Gradient Background */}
      <div
        className="p-4 sm:p-6 flex-1 flex flex-col justify-between"
        style={{
          background:
            "linear-gradient(117.42deg, rgba(249, 247, 247, 0.1) 19.16%, rgba(148, 203, 255, 0.4) 80.19%)",
        }}
      >
        <div className="flex-grow">
          <h3
            className="text-[#00173A] mb-3 leading-tight line-clamp-2"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(18px, 4vw, 25px)",
              lineHeight: "100%",
              letterSpacing: "0%",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {post.title}
          </h3>

          <div
            className="flex items-center justify-between mb-4"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 500,
              fontSize: "clamp(14px, 3vw, 18px)",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            <span className="text-[#6F6E6ED6]">By {post.author}</span>
            <span className="text-[#6F6E6ED6]">{post.date}</span>
          </div>

          <p
            className="text-[#464343] mb-4 text-justify"
            style={{
              fontFamily: "Segoe UI, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2.5vw, 16px)",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            {post.description}
          </p>

          {/* Read More Link - Updated for dynamic routing */}
          <Link
            href={`/blogScreen/${post.id}`}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 mb-4"
          >
            <span className="text-sm font-medium mr-1">Read more</span>
            <ExternalLink size={16} />
          </Link>
        </div>

        <div className="flex items-center justify-start space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={handleLikeClick}
            className={`flex items-center space-x-1 transition-all duration-200 px-2 py-1.5 rounded-full ${
              post.isLiked
                ? "text-red-500 bg-red-50 hover:bg-red-100"
                : "text-gray-600 hover:text-red-500 hover:bg-red-50"
            }`}
          >
            <Heart
              size={16}
              className={`transition-all duration-200 ${
                post.isLiked ? "fill-current" : ""
              } ${isHovered && !post.isLiked ? "scale-110" : ""}`}
            />
            <span className="text-xs font-medium">{post.likes}</span>
          </button>

          <button
            onClick={handleCommentClick}
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all duration-200 px-2 py-1.5 rounded-full"
          >
            <MessageCircle size={16} />
            <span className="text-xs font-medium">{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
