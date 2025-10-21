"use client";
import React, { useState } from "react";
import { Play, Users, Facebook, Twitter, Instagram, Linkedin, Search } from "lucide-react";

interface Stream {
  id: string;
  title: string;
  thumbnail: string;
  videoId?: string;
  viewers?: number;
  isLive?: boolean;
}

interface StreamSection {
  title: string;
  streams: Stream[];
}

interface YouTubeStreamsProps {
  sections: StreamSection[];
  headerTitle?: string;
  headerBgColor?: string;
  className?: string;
  showSocialLinks?: boolean;
}

export const YouTubeStreams: React.FC<YouTubeStreamsProps> = ({
  sections,
  headerTitle = "Video Streams",
  headerBgColor = "bg-[#1e3a5f]",
  showSocialLinks = true,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={`w-full ${className}`}>
      {/* Header Section with Search */}
      <header className={`${headerBgColor} py-4 px-4 sm:px-6`}>
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-[#f59e0b]" />
              <h1 className="text-white text-xl sm:text-2xl font-semibold">
                {headerTitle}
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white rounded-full py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f59e0b]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Render each section */}
        {sections.map((section, index) => (
          <StreamSection 
            key={index} 
            section={section} 
            isFirst={index === 0}
            searchQuery={searchQuery}
          />
        ))}

        {/* Social Media Links */}
        {/* {showSocialLinks && <SocialLinks />} */}
      </div>
    </div>
  );
};

interface StreamSectionProps {
  section: StreamSection;
  isFirst?: boolean;
  searchQuery?: string;
}

const StreamSection: React.FC<StreamSectionProps> = ({ section, isFirst, searchQuery = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter streams based on search query
  const filteredStreams = section.streams.filter(stream =>
    stream.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = isFirst ? 1 : 6;
  const totalPages = Math.ceil(filteredStreams.length / itemsPerPage);

  // Calculate displayed streams
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedStreams = filteredStreams.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (filteredStreams.length === 0) {
    return null; // Hide section if no results
  }

  return (
    <section className={`${!isFirst ? "mt-12" : ""}`}>
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-white text-lg sm:text-xl font-semibold bg-[#2d4a6a] py-3 px-4 rounded-t-lg inline-block">
          {section.title}
        </h2>
      </div>

      {/* Streams Grid */}
      <div className={`grid gap-4 sm:gap-6 ${
        isFirst 
          ? "grid-cols-1" 
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}>
        {displayedStreams.map((stream) => (
          <StreamCard key={stream.id} stream={stream} featured={isFirst} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

interface StreamCardProps {
  stream: Stream;
  featured?: boolean;
}

const StreamCard: React.FC<StreamCardProps> = ({ stream, featured }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="group relative rounded-lg overflow-hidden bg-[#1a2332] hover:shadow-xl transition-all duration-300"
    >
      {/* Thumbnail/Video Container */}
      <div className="relative w-full aspect-video bg-gray-900 overflow-hidden">
        {!isPlaying ? (
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            {/* Thumbnail Image */}
            <img
              src={stream.thumbnail}
              alt={stream.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Live Badge */}
            {stream.isLive && (
              <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 z-20">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            )}

            {/* Viewers Count */}
            {stream.viewers && (
              <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 z-20">
                <Users className="w-3 h-3" />
                {stream.viewers.toLocaleString()}
              </div>
            )}
          </div>
        ) : (
          // YouTube Iframe
          stream.videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${stream.videoId}?autoplay=1&rel=0`}
              title={stream.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )
        )}
      </div>

      {/* Title Caption - White Background */}
      <div className="bg-white p-3 sm:p-4">
        <p className="text-gray-900 text-xs sm:text-sm font-medium line-clamp-2">
          {stream.title}
        </p>
      </div>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm text-white bg-[#2d4a6a] rounded hover:bg-[#3d5a7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`min-w-[32px] h-8 px-2 rounded flex items-center justify-center transition-colors text-sm ${
              currentPage === page
                ? "bg-[#f59e0b] text-white font-semibold"
                : page === '...'
                ? "text-white cursor-default"
                : "bg-[#2d4a6a] text-white hover:bg-[#3d5a7a]"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm text-white bg-[#2d4a6a] rounded hover:bg-[#3d5a7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

const SocialLinks: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-gray-700">
      <div className="flex justify-center items-center gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5 text-[#1e3a5f]" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default YouTubeStreams;