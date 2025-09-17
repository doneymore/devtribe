import React, { useState } from "react";
import { Star } from "lucide-react";

interface BlogPost {
  id: number;
  videoUrl: string; // YouTube, Vimeo, or other video platform URL
  avatar: string;
  author: string;
  date: string;
  title?: string;
  content: string;
  rating: number;
  views: string;
}

interface BlogCardsSectionProps {
  posts?: BlogPost[];
  className?: string;
}

const defaultPosts: BlogPost[] = [
  {
    id: 1,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&cs=tinysrgb",
    author: "Sarah Lane",
    date: "9th June 2025",
    content:
      "Online Incident & Cybersecurity Awareness Month is not just about present growth in traditional trends but cybersec cyber instead a cyber digital future. The dynamic cybersecurity landscape requires constant awareness and continuous learning. This positioning, we become part of a broader effort to enlighten and raise more awareness and inspire the digital world safely. The threat adapts to us unique individuals and personal factors of responsibility will play critical importance.",
    rating: 4.7,
    views: "1.5k reviews",
  },
  {
    id: 2,
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&cs=tinysrgb",
    author: "Samuel",
    date: "26th September 2025",
    content:
      "The new Cybersecurity Awareness Month post offers you the chance to join a global movement emphasizing the importance of achieving the latest five. Against these urgent challenges, protecting sensitive data becomes more important than ever. As we celebrate cybersecurity understanding cybersecurity challenges and solutions. If it starts even first risk providing present information, it's about creating a culture of security, when your organization can become part of awareness.",
    rating: 4.7,
    views: "8.8k reviews",
  },
  {
    id: 3,
    videoUrl: "https://www.youtube.com/embed/2Xc9gXyf2G4",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&cs=tinysrgb",
    author: "John Smith",
    date: "28th October 2025",
    content:
      "October is Cybersecurity Awareness Month, a dedicated time to raise awareness about the importance of cybersecurity. Whether you're an individual or an organization, participating in this global initiative helps create a safer digital environment for everyone. From personal data protection to advanced organizational security measures, cybersecurity affects us all. Take proactive steps to help fortify the networks and reduce errors, and help strengthen the critical connections and communications. Small actions can make a cybersecurity foundation, making impossible everyone, whether we move in an.",
    rating: 4.7,
    views: "6.8k reviews",
  },
];

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <div className="bg-white rounded-b-[20px] shadow-lg overflow-hidden max-w-[390px] w-full mx-auto">
      {/* Video Section - Responsive Iframe */}
      <div className="relative w-full">
        <div className="relative w-full h-0 pb-[79.73%] overflow-hidden rounded-t-[20px]">
          <iframe
            src={post.videoUrl}
            title={post.title || `Video by ${post.author}`}
            className="absolute top-0 left-0 w-full h-full rounded-t-[20px]"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-900 text-sm">{post.author}</p>
            <p className="text-gray-500 text-xs">{post.date}</p>
          </div>
        </div>

        {/* Content Text */}
        <p
          className="text-gray-700 text-sm leading-[17px] text-justify bg-[#D9D9D973] rounded-[10px] p-2"
          style={{
            fontFamily: "Gurajada, serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "17px",
            letterSpacing: "0px",
          }}
        >
          {post.content}
        </p>

        {/* Rating and Views */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900">
              {post.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500">{post.views}</span>
        </div>
      </div>
    </div>
  );
};

const BlogCardsSection: React.FC<BlogCardsSectionProps> = ({
  posts = defaultPosts,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"Latest" | "Popular">("Latest");

  return (
    <section className={`py-12 lg:py-16 bg-[#BEBFC9] ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-[#BEBFC9] rounded-lg shadow-sm border border-gray-200 p-1">
            {(["Latest", "Popular"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogCardsSection;
