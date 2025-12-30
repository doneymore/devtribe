"use client";
import { useState } from "react";
// import PaginationControls from "@/app/component/reusable/pagination";
// import YouTubeVideoSection from "@/app/component/reusable/videos/lastestVideos";
// import PreviousStreamsSection from "@/app/component/reusable/videos/previousVideo";
import { VideoStream } from "@/app/lib/blogServices";
import YouTubeVideoSection from "../../component/reusable/videos/lastestVideos";
import PreviousStreamsSection from "../../component/reusable/videos/previousVideo";
import PaginationControls from "../../component/reusable/pagination";

interface StreamsClientWrapperProps {
  initialLiveStream: VideoStream | null;
  initialUpcomingStreams: VideoStream[];
  initialPreviousStreams: VideoStream[];
  error: string | null;
}

export default function StreamsClientWrapper({
  initialLiveStream,
  initialUpcomingStreams,
  initialPreviousStreams,
  error,
}: StreamsClientWrapperProps) {
  const [liveStream] = useState<VideoStream | null>(initialLiveStream);
  const [upcomingStreams] = useState<VideoStream[]>(initialUpcomingStreams);
  const [previousStreams] = useState<VideoStream[]>(initialPreviousStreams);

  const [filteredPreviousStreams, setFilteredPreviousStreams] = useState<
    VideoStream[]
  >(initialPreviousStreams);
  const [filteredUpcomingStreams, setFilteredUpcomingStreams] = useState<
    VideoStream[]
  >(initialUpcomingStreams);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  // Handle search from YouTubeVideoSection
  const handleSearch = (query: string) => {
    setCurrentSearchQuery(query);

    if (!query.trim()) {
      setFilteredPreviousStreams(previousStreams);
      setFilteredUpcomingStreams(upcomingStreams);
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Filter previous streams
    const filteredPrevious = previousStreams.filter(
      (stream) =>
        stream.title.toLowerCase().includes(lowerQuery) ||
        stream.description?.toLowerCase().includes(lowerQuery)
    );

    // Filter upcoming streams
    const filteredUpcoming = upcomingStreams.filter(
      (stream) =>
        stream.title.toLowerCase().includes(lowerQuery) ||
        stream.description?.toLowerCase().includes(lowerQuery)
    );

    setFilteredPreviousStreams(filteredPrevious);
    setFilteredUpcomingStreams(filteredUpcoming);
  };

  const handleClearSearch = () => {
    setCurrentSearchQuery("");
    setFilteredPreviousStreams(previousStreams);
    setFilteredUpcomingStreams(upcomingStreams);
  };

  // Combine upcoming and completed streams for search
  const featuredStream = liveStream;

  // Show ALL upcoming streams in the additional videos section
  const additionalUpcomingVideos = filteredUpcomingStreams
    .filter((stream) => stream.youtubeStreamId)
    .map((stream) => ({
      id: stream.youtubeStreamId || stream.id.toString(),
      title: stream.title,
      thumbnail: stream.thumbnailUrl,
      videoId: stream.youtubeStreamId || "",
      backgroundColor: "#1e4d8b",
    }));

  // Map filtered previous streams for display
  const mappedPreviousStreams = filteredPreviousStreams
    .filter((stream) => stream.youtubeStreamId)
    .map((stream) => ({
      id: stream.youtubeStreamId || stream.id.toString(),
      title: stream.title,
      thumbnail: stream.thumbnailUrl,
      videoId: stream.youtubeStreamId || "",
    }));

  const totalSearchResults =
    filteredUpcomingStreams.length + filteredPreviousStreams.length;

  if (error) {
    return (
      <main className="min-h-screen bg-[#0f1621] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-2xl mb-4">Unable to load streams</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f1621]">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: liveStream?.title || "Live Stream",
            description:
              liveStream?.description || "Watch our live cybersecurity content",
            thumbnailUrl: liveStream?.thumbnailUrl || "",
            uploadDate: liveStream?.dateCreated || new Date().toISOString(),
            contentUrl: liveStream?.videoUrl || "",
            embedUrl: liveStream?.youtubeStreamId
              ? `https://www.youtube.com/embed/${liveStream.youtubeStreamId}`
              : "",
            publisher: {
              "@type": "Organization",
              name: "Your Organization Name",
              logo: {
                "@type": "ImageObject",
                url: "https://yoursite.com/logo.png",
              },
            },
          }),
        }}
      />

      <YouTubeVideoSection
        mainVideo={{
          title: featuredStream?.title || "No Stream Available",
          description:
            featuredStream?.description || "Check back later for live content",
          videoId: featuredStream?.youtubeStreamId || "",
          showLiveBadge: featuredStream?.status === "live",
        }}
        additionalVideos={additionalUpcomingVideos}
        maxWidth="1227px"
        backgroundColor="white"
        titleColor="#1a4d7a"
        showShadow={true}
        searchPlaceholder="Search videos..."
        onSearch={handleSearch}
      />

      {/* Show Previous Streams section only if there are results OR no search */}
      {(mappedPreviousStreams.length > 0 || !currentSearchQuery) && (
        <PreviousStreamsSection
          title={
            currentSearchQuery
              ? `Previous Streams - Search Results (${mappedPreviousStreams.length})`
              : "Previous Streams"
          }
          videos={mappedPreviousStreams}
          itemsPerPage={9}
          PaginationComponent={PaginationControls}
          searchQuery={currentSearchQuery}
          onClearSearch={handleClearSearch}
        />
      )}

      {currentSearchQuery && totalSearchResults === 0 && (
        <section className="px-4 sm:px-6 lg:px-20 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              {/* Search Icon */}
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Message */}
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                No streams found
              </h2>
              <p className="text-gray-600 mb-2 text-lg">
                We couldn't find any streams matching
              </p>
              <p className="text-gray-800 font-semibold mb-6 text-xl">
                "{currentSearchQuery}"
              </p>

              {/* Suggestions */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6 max-w-md mx-auto">
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Try searching for:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• Different keywords or phrases</li>
                  <li>• Broader search terms</li>
                  <li>• Episode numbers or dates</li>
                  <li>• Stream topics or themes</li>
                </ul>
              </div>

              {/* Clear Search Button */}
              <button
                onClick={handleClearSearch}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Clear Search & View All Streams
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
