import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Heart, MessageCircle, User } from "lucide-react";
import { useAuth } from "@/app/lib/hooks/useAuths";
import GoogleAuthModal from "../../landingpage/googleAuth";
import {
  likeBlogPost,
  unlikeBlogPost,
  createBlogComment,
  createOrLoginUser,
} from "@/app/lib/blogServices";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBlogUserEmail,
  selectBlogUserId,
  setBlogUser,
} from "@/app/lib/features/auth/blogSlice";
import { useRouter, useParams } from "next/navigation";

interface Author {
  name: string;
  avatar: string;
}

interface Comment {
  id: number;
  author: Author;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface BlogDetailPost {
  id: number;
  imageUrl: string;
  title: string;
  publishedDate: string;
  author: Author;
  content: string;
  likes: number;
  isLiked: boolean;
}

interface BlogDetailPageProps {
  post: BlogDetailPost;
  comments: Comment[];
  onBack?: () => void;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  post,
  comments: initialComments,
  onBack,
}) => {
  const router = useRouter();
  const { isAuthenticated, user, auth } = useAuth();
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const blogUserId = useSelector(selectBlogUserId);
  const blogUserEmail = useSelector(selectBlogUserEmail);

  const [postData, setPostData] = useState(post);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handleAuthRequired = () => {
    setShowAuthModal(true);
  };

  const ensureUserAuthenticated = async () => {
    if (!isAuthenticated || !user?.id || !auth?.token) {
      handleAuthRequired();
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

  const handlePostLike = async () => {
    if (isProcessing) return;

    const { userId } = await ensureUserAuthenticated();
    if (!userId) return;

    try {
      setIsProcessing(true);
      debugger;
      const response = postData.isLiked
        ? await unlikeBlogPost(Number(params?.id), userId)
        : await likeBlogPost(Number(params?.id), userId);

      if (response.result === 1) {
        setPostData((prev) => ({
          ...prev,
          isLiked: !prev.isLiked,
          likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
        }));
      }
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCommentLike = async (commentId: number) => {
    if (isProcessing) return;

    const { userId } = await ensureUserAuthenticated();
    if (!userId) return;

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  const handleAddComment = async () => {
    if (isProcessing || !newComment.trim()) return;

    const { userId, email } = await ensureUserAuthenticated();
    if (!userId || !email || !user) return;

    try {
      setIsProcessing(true);

      const response = await createBlogComment({
        blogId: Number(params?.id),
        comment: newComment,
        emailAddress: email,
      });

      if (response.result === 1) {
        const comment: Comment = {
          id: Date.now(),
          author: {
            name: user.name || "Anonymous User",
            avatar: "",
          },
          content: newComment,
          timestamp: "Just now",
          likes: 0,
          isLiked: false,
        };

        setComments((prev) => [...prev, comment]);
        setNewComment("");
      } else {
        console.error("Failed to create comment:", response.message);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getInitials = (name: string): string => {
    const names = name.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const renderContent = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Blog</span>
        </button>

        {/* Main Content */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[595px]">
            {postData.imageUrl && postData.imageUrl.trim() !== "" ? (
              <Image
                src={postData.imageUrl}
                alt={postData.title}
                fill
                className="object-cover"
                style={{ borderRadius: "15px 15px 0 0" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1215px"
                priority
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300"
                style={{ borderRadius: "15px 15px 0 0" }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User size={40} className="text-gray-600" />
                  </div>
                  <p className="text-gray-600 font-medium text-lg">
                    No Image Available
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Content Container */}
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Title */}
            <h1
              className="text-[#1E4094] mb-4 sm:mb-6"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(24px, 5vw, 48px)",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              {postData.title}
            </h1>

            {/* Published Date */}
            <p
              className="text-[#6F6E6ED6] mb-4"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(16px, 3vw, 25px)",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              {postData.publishedDate}
            </p>

            {/* Author Info */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200">
                {postData.author.avatar ? (
                  <Image
                    src={postData.author.avatar}
                    alt={postData.author.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={20} className="text-gray-400" />
                  </div>
                )}
              </div>
              <span
                className="text-gray-800"
                style={{
                  fontFamily: "Gurajada, serif",
                  fontWeight: 400,
                  fontSize: "clamp(18px, 3vw, 24px)",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {postData.author.name}
              </span>
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={renderContent(postData.content)}
              />
            </div>

            {/* Like Button */}
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
              <button
                onClick={handlePostLike}
                disabled={isProcessing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  postData.isLiked
                    ? "text-red-500 bg-red-50 hover:bg-red-100"
                    : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Heart
                  size={20}
                  className={postData.isLiked ? "fill-current" : ""}
                />
                <span className="font-medium">{postData.likes}</span>
              </button>
            </div>

            {/* Comments Section */}
            <div
              className="p-6 rounded-lg"
              style={{
                background:
                  "linear-gradient(115.42deg, #F9F7F7 10.85%, #578FC5 93.7%)",
              }}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Comments ({comments.length})
              </h3>

              {/* Add Comment */}
              <div className="bg-[#E1EFFF] p-4 rounded-lg mb-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || isProcessing}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                  >
                    {isProcessing ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                  >
                    {/* Comment Header */}
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#578FC5] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium text-sm">
                          {getInitials(comment.author.name)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {comment.author.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                      </div>
                    </div>

                    {/* Comment Actions */}
                    <div className="flex items-center space-x-4 ml-13">
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
                          comment.isLiked
                            ? "text-red-500"
                            : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          size={16}
                          className={comment.isLiked ? "fill-current" : ""}
                        />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Google Auth Modal */}
      <GoogleAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default BlogDetailPage;
