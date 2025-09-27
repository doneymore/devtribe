// components/BlogDetailPage.tsx
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, MessageCircle, Send, User } from "lucide-react";
import { BlogDetailPost, Comment, Reply } from "../types";

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
  const [postData, setPostData] = useState(post);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const handlePostLike = () => {
    setPostData((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
  };

  const handleCommentLike = (commentId: number) => {
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

  const handleReplyLike = (commentId: number, replyId: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      isLiked: !reply.isLiked,
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                    }
                  : reply
              ),
            }
          : comment
      )
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "/api/placeholder/40/40",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleAddReply = (commentId: number) => {
    if (!replyText.trim()) return;

    const reply: Reply = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "/api/placeholder/40/40",
      },
      content: replyText,
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      )
    );

    setReplyText("");
    setReplyingTo(null);
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
            <Image
              src={postData.imageUrl}
              alt={postData.title}
              fill
              className="object-cover"
              style={{ borderRadius: "15px 15px 0 0" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1215px"
              priority
            />
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

            {/* Content Sections */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    What is Lorem Ipsum?
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    Where does it come from?
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                    Extremes of Good and Evil) by Cicero, written in 45 BC. This
                    book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum,
                    "Lorem ipsum dolor sit amet..", comes from a line in section
                    1.10.32.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    Why do we use it?
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </p>
                </section>
              </div>
            </div>

            {/* Like Button */}
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-200">
              <button
                onClick={handlePostLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  postData.isLiked
                    ? "text-red-500 bg-red-50 hover:bg-red-100"
                    : "text-gray-600 hover:text-red-500 hover:bg-red-50"
                }`}
              >
                <Heart
                  size={20}
                  className={postData.isLiked ? "fill-current" : ""}
                />
                <span className="font-medium">{postData.likes}</span>
              </button>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Comments ({comments.length})
              </h3>

              {/* Add Comment */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
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
                    className="px-6 py-2 bg-[#E1EFFF] text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium"
                  >
                    Post
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
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                        {comment.author.avatar ? (
                          <Image
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User size={16} className="text-gray-400" />
                          </div>
                        )}
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
                      <button
                        onClick={() =>
                          setReplyingTo(
                            replyingTo === comment.id ? null : comment.id
                          )
                        }
                        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors duration-200"
                      >
                        <MessageCircle size={16} />
                        <span>Reply</span>
                      </button>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="ml-13 mt-4 bg-gray-50 p-3 rounded-lg">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="w-full p-2 border border-gray-300 rounded resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={2}
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleAddReply(comment.id)}
                            className="px-4 py-1 bg-[#E1EFFF] text-blue-700 rounded hover:bg-blue-100 transition-colors duration-200"
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="ml-13 mt-4 space-y-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                              {reply.author.avatar ? (
                                <Image
                                  src={reply.author.avatar}
                                  alt={reply.author.name}
                                  width={32}
                                  height={32}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <User size={14} className="text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-gray-900 text-sm">
                                  {reply.author.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {reply.timestamp}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">
                                {reply.content}
                              </p>
                              <button
                                onClick={() =>
                                  handleReplyLike(comment.id, reply.id)
                                }
                                className={`flex items-center space-x-1 text-xs mt-2 transition-colors duration-200 ${
                                  reply.isLiked
                                    ? "text-red-500"
                                    : "text-gray-500 hover:text-red-500"
                                }`}
                              >
                                <Heart
                                  size={12}
                                  className={
                                    reply.isLiked ? "fill-current" : ""
                                  }
                                />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;
