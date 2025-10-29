import React from 'react';
import { ThumbsUp, MessageSquare } from 'lucide-react';

// Types
interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  videoId: string;
  backgroundColor?: string;
}

interface MainVideoSection {
  title?: string;
  description?: string;
  videoId: string;
  showLiveBadge?: boolean;
}

interface YouTubeVideoSectionProps {
  mainVideo: MainVideoSection;
  additionalVideos?: VideoItem[];
  maxWidth?: string;
  backgroundColor?: string;
  titleColor?: string;
  showShadow?: boolean;
}

const YouTubeVideoSection: React.FC<YouTubeVideoSectionProps> = ({
  mainVideo,
  additionalVideos = [],
  maxWidth = "1227px",
  backgroundColor = "white",
  titleColor = "#1a4d7a",
  showShadow = true
}) => {
  const [playingVideo, setPlayingVideo] = React.useState<string | null>(null);

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(videoId);
  };

  return (
    <div className="w-full" style={{ backgroundColor }}>
      {/* Main Featured Video Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {(mainVideo.title || mainVideo.description) && (
            <div className="text-center mb-8 lg:mb-12">
              {mainVideo.title && (
                <h2 
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                  style={{
                    fontFamily: 'Georgia, serif',
                    color: titleColor,
                    lineHeight: '1.2'
                  }}
                >
                  {mainVideo.title}
                </h2>
              )}
              {mainVideo.description && (
                <p 
                  className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto px-4 leading-relaxed"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  {mainVideo.description.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < mainVideo.description!.split('\n').length - 1 && (
                        <br className="hidden sm:block" />
                      )}
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>
          )}

          {/* Main Video Container */}
          <div className="relative w-full" style={{ maxWidth, margin: '0 auto' }}>
            <div 
              className={`relative w-full overflow-hidden ${showShadow ? 'shadow-2xl' : ''}`}
              style={{
                paddingBottom: '56.4%',
                background: '#000',
                borderRadius: '15px'
              }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${mainVideo.videoId}?rel=0&modestbranding=1`}
                title={mainVideo.title || "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none', borderRadius: '15px' }}
              />
            </div>

            {/* LIVE Badge */}
            {mainVideo.showLiveBadge && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 z-10">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                LIVE
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Videos List */}
      {additionalVideos.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-20 py-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {additionalVideos.map((video) => (
              <div
                key={video.id}
                className="relative rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] cursor-pointer group"
                style={{ backgroundColor: video.backgroundColor || '#1e4d8b' }}
                onClick={() => handleVideoClick(video.videoId)}
              >
                <div className="flex flex-col sm:flex-row items-stretch">
                  {/* Thumbnail/Video Section */}
                  <div className="relative w-full sm:w-2/5 lg:w-1/3 aspect-video sm:aspect-auto">
                    {playingVideo === video.videoId ? (
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: 'none' }}
                      />
                    ) : (
                      <>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <svg
                              className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-4">
                        {video.title}
                      </h3>
                    </div>

                    {/* YouTube Actions */}
                    <div className="flex items-center gap-6 mt-4">
                      <button 
                        className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span className="text-sm font-medium">Like</span>
                      </button>
                      
                      <button 
                        className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span className="text-sm font-medium">Comment</span>
                      </button>

                      {/* YouTube Logo */}
                      <div className="ml-auto">
                        <svg
                          className="w-8 h-8 text-white opacity-90"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mobile optimization */}
      <style jsx>{`
        @media (max-width: 640px) {
          iframe {
            border-radius: 10px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default YouTubeVideoSection;