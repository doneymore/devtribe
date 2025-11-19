import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// Types
interface StreamVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
  episodeNumber?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

interface PreviousStreamsSectionProps {
  title?: string;
  videos: StreamVideo[];
  itemsPerPage?: number;
  backgroundColor?: string;
  PaginationComponent: React.ComponentType<PaginationProps>;
}

const PreviousStreamsSection: React.FC<PreviousStreamsSectionProps> = ({
  title = "Previous Streams",
  videos,
  itemsPerPage = 9,
  backgroundColor = "white",
  PaginationComponent,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  // Pagination logic
  const totalPages = Math.ceil(videos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideos = videos.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setPlayingVideo(null);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setPlayingVideo(null);
    }
  };

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(videoId);
  };

  return (
    <section
      className="py-12 px-4 sm:px-6 lg:px-20"
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        {title && (
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-gray-900"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {title}
          </h2>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentVideos.map((video) => (
            <div
              key={video.id}
              className="relative group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              onClick={() => handleVideoClick(video.videoId)}
            >
              {/* Video/Thumbnail Container */}
              <div className="relative aspect-video bg-gray-900">
                {playingVideo === video.videoId ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: "none" }}
                  />
                ) : (
                  <>
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
                    />

                    {/* Episode Badge */}
                    {video.episodeNumber && (
                      <div className="absolute top-4 right-4 bg-white text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {video.episodeNumber}
                      </div>
                    )}

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                        <Play
                          className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                          fill="white"
                        />
                      </div>
                    </div>

                    {/* YouTube Logo Watermark */}
                    <div className="absolute bottom-4 right-4 opacity-80 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-12 h-12 text-white drop-shadow-lg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>

              {/* Video Title */}
              <div className="p-4 bg-gray-50">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-tight">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && PaginationComponent && (
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            canGoPrevious={currentPage > 1}
            canGoNext={currentPage < totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        )}
      </div>
    </section>
  );
};

export default PreviousStreamsSection;
