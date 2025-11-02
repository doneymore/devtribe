"use client";
import React from "react";
import Image, { type StaticImageData } from "next/image";

interface BlogPost {
  id: number;
  title: string;
  image: string;
}

interface BlogPageProps {
  title?: string;
  description?: string;
  backgroundImage?: string | StaticImageData;
  posts?: BlogPost[];
  className?: string;
}

const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: "Other post heading sample tex...",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80"
  },
  {
    id: 2,
    title: "Other post heading sample tex...",
    image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=400&q=80"
  },
  {
    id: 3,
    title: "Other post heading sample tex...",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&q=80"
  }
];

export const BlogPage: React.FC<BlogPageProps> = ({
  title = "SECNEEDLE BLOG",
  description = "Welcome to our blog - home of everything there is to know about cybersecurity and how you can secure your networks. Here you will find everything to spark your inspiration!",
  backgroundImage,
  posts = defaultPosts,
  className = "",
}) => {
  return (
    <section
      className={`relative min-h-screen py-12 md:py-16 lg:py-20 ${className}`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${typeof backgroundImage === "string"
              ? backgroundImage
              : (backgroundImage && typeof backgroundImage === "object" && "src" in backgroundImage
                  ? (backgroundImage as StaticImageData).src
                  : String(backgroundImage)
            )})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          {/* Title with underline */}
          <h1
            className="text-white mb-6 md:mb-8 font-normal inline-block"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              lineHeight: "1.2",
              letterSpacing: "0.3em",
              borderBottom: "3px solid white",
              paddingBottom: "0.3em",
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="text-white max-w-4xl mx-auto px-4"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.25rem)",
              lineHeight: "1.7",
              letterSpacing: "0.01em",
            }}
          >
            {description}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border-2 border-white/30 hover:border-white/60 transition-all duration-300">
                {/* Post Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Post Title */}
                <div className="p-4 md:p-5">
                  <h3 className="text-white text-base md:text-lg font-medium line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;