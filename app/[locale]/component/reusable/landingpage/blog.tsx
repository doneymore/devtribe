"use client";
import React from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

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
  ctaText?: string;
  ctaLink?: string;
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
  title = "",
  description = "",
  backgroundImage,
  posts = defaultPosts,
  className = "",
  ctaText = "",
  ctaLink = "/pages/blogScreen",
}) => {
  return (
    <section
      className={`relative min-h-screen py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-cover bg-center bg-no-repeat overflow-x-hidden ${className}`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${typeof backgroundImage === "string"
              ? backgroundImage
              : (backgroundImage && typeof backgroundImage === "object" && "src" in backgroundImage
                  ? (backgroundImage as StaticImageData).src
                  : String(backgroundImage)
            )})`
          : undefined,
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content Container */}
      <div className="relative font-inter z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 w-full">
          {/* Title with underline */}
          <h1 className="text-white font-inter mb-4 sm:mb-5 md:mb-6 lg:mb-8 font-normal inline-block px-2 w-auto max-w-full text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide sm:tracking-wider md:tracking-widest border-b-2 sm:border-b-[2.5px] md:border-b-3 border-white pb-2 sm:pb-3 md:pb-4 leading-tight break-words">
            {title}
          </h1>

          {/* Description */}
          <p className="text-white w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed sm:leading-relaxed md:leading-loose tracking-tight">
            {description}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 xl:gap-8 w-full mb-8 sm:mb-10 md:mb-12">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 w-full"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/30 hover:border-white/60 transition-all duration-300 w-full">
                {/* Post Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Post Title */}
                <div className="p-3 sm:p-4 md:p-5">
                  <h3 className="text-white font-medium line-clamp-2 text-sm sm:text-base md:text-lg leading-snug">
                    {post.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center w-full">
          <Link
            href={ctaLink}
            className="group inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg"
          >
            {ctaText}
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;