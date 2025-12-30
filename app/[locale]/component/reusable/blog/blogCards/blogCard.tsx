import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle } from "lucide-react";
import { blog_story } from "@/public/assests/image";
import { BlogPost } from "../types";
import { useAuth } from "@/app/lib/hooks/useAuths";
import {
  createOrLoginUser,
  likeBlogPost,
  unlikeBlogPost,
} from "@/app/lib/blogServices";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBlogUserId,
  selectBlogUserEmail,
  setBlogUser,
} from "@/app/lib/features/auth/blogSlice";
import { useLocale } from "next-intl";
import { UIBlogPost } from "@/app/types";

interface BlogCardGridProps {
  post: BlogPost | UIBlogPost;
  onLike: (id: number) => void;
  onCommentClick: (id: number) => void;
  onAuthRequired: () => void;
}

const BlogCard: React.FC<BlogCardGridProps> = ({
  post,
  onLike,
  onCommentClick,
  onAuthRequired,
}) => {
  const { isAuthenticated, user, auth } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const blogUserId = useSelector(selectBlogUserId);
  const blogUserEmail = useSelector(selectBlogUserEmail);
  const [isProcessing, setIsProcessing] = useState(false);
  const locale = useLocale();

  const handleCardClick = () => {
    router.push(`/${locale}/pages/blogScreen/${post.id}`);
  };

  const ensureUserAuthenticated = async () => {
    if (!isAuthenticated || !user?.id || !auth?.token) {
      onAuthRequired();
      return { userId: null, email: null };
    }

    // If we already have userId in Redux, return it
    if (blogUserId && blogUserEmail) {
      return { userId: blogUserId, email: blogUserEmail };
    }

    try {
      setIsProcessing(true);

      const result = await createOrLoginUser({
        email: user.email,
        name: user.name || "Anonymous User",
        token: auth.token,
      });

      if (!result || result.result !== 1 || !result.payload) {
        console.error("Failed to authenticate user with backend");
        return { userId: null, email: null };
      }

      // Save user info to Redux store
      dispatch(setBlogUser(result));
      return {
        userId: result.payload.userId,
        email: result.payload.emailAddress,
      };
    } catch (error) {
      console.error("Error during authentication:", error);
      return { userId: null, email: null };
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProcessing) return;

    const { userId } = await ensureUserAuthenticated();

    if (!userId) {
      console.log("User not authenticated, stopping like action");
      return;
    }

    try {
      setIsProcessing(true);
      // Call API based on current like status
      const response = post.isLiked
        ? await unlikeBlogPost(Number(post.id), userId)
        : await likeBlogPost(Number(post.id), userId);

      if (response.result === 1) {
        // Update local state through parent callback
        onLike(post.id);
      } else {
        console.error("Failed to update like status:", response.message);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/${locale}/pages/blogScreen/${post.id}`);
  };

  const handleSeeAllClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/${locale}/pages/blogScreen/${post.id}`);
  };

  return (
    <div onClick={handleCardClick} className="group block cursor-pointer">
      <div
        className="w-full bg-gradient-to-br from-gray-100 to-blue-100 rounded-[20px] shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl 
  hover:-translate-y-2 
  hover:scale-[1.02]
  transform"
      >
        <div className="flex flex-row h-[220px] sm:h-[240px] lg:h-[260px]">
          {/* Image Section - Left Side - Fixed percentage */}
          <div className="relative w-[35%] flex-shrink-0 group-hover:brightness-95 transition-all duration-200">
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
              className="text-[#1a1a1a] mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
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
                  disabled={isProcessing}
                  className={`flex items-center space-x-1.5 transition-colors duration-200 ${
                    post.isLiked
                      ? "text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                  aria-label={post.isLiked ? "Unlike post" : "Like post"}
                >
                  <Heart
                    size={16}
                    className={`transition-all duration-200 ${
                      post.isLiked ? "fill-red-500" : "fill-none"
                    }`}
                  />
                  <span className="text-[13px] font-medium">{post.likes}</span>
                </button>

                <button
                  onClick={handleCommentClick}
                  disabled={isProcessing}
                  className={`flex items-center space-x-1.5 text-gray-600 hover:text-blue-600 transition-colors ${
                    isProcessing ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="View comments"
                >
                  <MessageCircle size={16} />
                  <span className="text-[13px]">{post.comments}</span>
                </button>
              </div>

              {/* See All button */}
              <button
                onClick={handleSeeAllClick}
                className="text-blue-600 hover:text-blue-800 transition-colors text-[14px] font-medium whitespace-nowrap z-10 relative"
              >
                See All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
