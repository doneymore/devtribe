"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { bg_blog, blog_right } from "@/public/assests/image";

export const BlogHeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (): void => {
    console.log("Searching for:", searchQuery);
    // Handle search logic here
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bg_blog.src})`,
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
            {/* Left Content - 60% on desktop */}
            <div className="w-full lg:w-3/5 text-center lg:text-left">
              {/* Main Heading with Poppins font styling */}
              <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#0D3294] mb-8 lg:mb-12 leading-none tracking-normal">
                Let's Explore
                <br />
                <span className="">New</span>
                <br />
                Possibilities...
              </h1>

              {/* Search Bar with radius and icon inside */}
              <div className="mb-6 lg:mb-8">
                <div className="relative max-w-lg sm:max-w-xl mx-auto lg:mx-0">
                  <div className="relative">
                    {/* Search Icon inside input */}
                    <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <Search className="w-5 h-5" />
                    </div>

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchQuery(e.target.value)
                      }
                      placeholder="HOW TO, etc..."
                      className="w-full pl-14 pr-40 py-4 text-gray-700 bg-white border-0 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-base"
                    />

                    {/* Search Button - Much wider to match image */}
                    <button
                      onClick={handleSearch}
                      type="button"
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#0D3294] hover:bg-blue-700 text-white px-12 py-4 rounded-xl transition-colors duration-200 font-semibold text-base shadow-lg min-w-[120px]"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Hashtags with proper spacing */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 text-sm sm:text-base max-w-sm mx-auto lg:mx-0">
                <span className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors font-medium">
                  #Design
                </span>
                <span className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors font-medium">
                  #Develop
                </span>
                <span className="text-blue-600 hover:text-blue-700 cursor-pointer transition-colors font-medium">
                  #Market
                </span>
              </div>
            </div>

            {/* Right Image - 40% on desktop with specific dimensions */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
                <div
                  className="relative w-full"
                  style={{
                    aspectRatio: "531.9 / 492.35", // Maintaining the original aspect ratio
                  }}
                >
                  <Image
                    src={blog_right}
                    alt="Blog Illustration"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
