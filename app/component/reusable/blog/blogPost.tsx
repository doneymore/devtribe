import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface BlogCardProps {
  image: StaticImageData | string;
  imageAlt: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  slug: string;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  image,
  imageAlt,
  title,
  author,
  date,
  excerpt,
  slug,
  className = "",
}) => {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
            {/* Left Image Section - 60% on desktop */}
            <div className="w-full lg:w-3/5">
              <div className="relative w-full h-64 lg:h-[460px]">
                <Link
                  href={`/pages/blogScreen/${slug}`}
                  className="block relative w-full h-64 lg:h-[460px] group"
                >
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover rounded-2xl group-hover:opacity-90 transition-opacity duration-200"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </Link>
              </div>
            </div>

            {/* Right Content Section - 40% on desktop */}
            <div className="w-full lg:w-2/5 flex flex-col justify-between">
              {/* Title */}
              <div className="mb-4 lg:mb-6">
                <Link
                  href={`/pages/blogScreen/${slug}`}
                  className="block group"
                >
                  <h2
                    className="font-roboto font-medium text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] text-[#005DFF] mb-3 lg:mb-4 hover:text-blue-700 transition-colors duration-200"
                    style={{
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      verticalAlign: "middle",
                    }}
                  >
                    {title}
                  </h2>
                </Link>
                <div className="flex justify-between sm:items-center gap-2 mb-4 lg:mb-6">
                  <span className="text-gray-600 text-sm lg:text-base">
                    By {author}
                  </span>
                  <span className="text-gray-500 text-sm lg:text-base">
                    {date}
                  </span>
                </div>
              </div>

              {/* Excerpt */}
              <div className="flex-1 mb-6 lg:mb-8">
                <p
                  className="font-segoe text-[#464343] text-lg sm:text-xl lg:text-2xl xl:text-[28px] text-justify"
                  style={{
                    fontWeight: 300,
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    verticalAlign: "middle",
                  }}
                >
                  {excerpt}
                </p>
              </div>

              {/* See Full Link */}
              <div className="flex justify-end">
                <Link
                  href={`/pages/blogScreen/${slug}`}
                  className="inline-flex items-center text-[#005DFF] hover:text-blue-700 font-medium text-base lg:text-lg transition-colors duration-200 group"
                >
                  See full
                  <svg
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
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
          </div>
        </div>
      </div>
    </section>
  );
};
