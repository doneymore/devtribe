import React from 'react';

interface VideoStream {
  id: string;
  title: string;
  videoId: string; // YouTube video ID
  thumbnailUrl?: string; // Optional custom thumbnail
}

interface VideoStreamsProps {
  videos: VideoStream[];
  title?: string;
}

const VideoStreams: React.FC<VideoStreamsProps> = ({ 
  videos, 
  title = "Latest Video Streams" 
}) => {
  return (
    <section className="w-full bg-[#cddefc] py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <h2 className="text-[#4A5568] text-lg sm:text-xl font-medium mb-8">
          {title}
        </h2>

        {/* Video Grid with Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {videos.map((video, index) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              className={getCardClassName(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Helper function to apply staggered positioning
const getCardClassName = (index: number): string => {
  const position = index % 3;
  
  // First card: normal (down)
  // Second card: move up
  // Third card: normal (down) - same as first
  
  if (position === 1) {
    return 'lg:-mt-12'; // Middle card moves up on large screens
  }
  
  return ''; // First and third cards stay at normal position
};

interface VideoCardProps {
  video: VideoStream;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, className = '' }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className={`group relative ${className}`}>
      {/* White border container - 4px border, radius only on top corners */}
      <div className="border-4 border-white rounded-t-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden">
        {/* Video container with fixed aspect ratio based on 424x268 */}
        <div className="relative w-full bg-gray-900" style={{ aspectRatio: '424/268' }}>
          {!isPlaying ? (
            // Thumbnail view with play button overlay
            <div 
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={video.thumbnailUrl || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg 
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-sm sm:text-base font-medium line-clamp-2">
                  {video.title}
                </p>
              </div>
            </div>
          ) : (
            // YouTube iframe
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoStreams;