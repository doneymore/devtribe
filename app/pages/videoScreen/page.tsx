"use client";
import { useEffect, useState } from "react";
import PaginationControls from "@/app/component/reusable/pagination";
import YouTubeVideoSection from "@/app/component/reusable/videos/lastestVideos";
import PreviousStreamsSection from "@/app/component/reusable/videos/previousVideo";
import { getAllLiveStreams, VideoStream } from "@/app/lib/blogServices";

export default function StreamsPage() {
  const [liveStream, setLiveStream] = useState<VideoStream | null>(null);
  const [upcomingStreams, setUpcomingStreams] = useState<VideoStream[]>([]);
  const [previousStreams, setPreviousStreams] = useState<VideoStream[]>([]);
  const [filteredPreviousStreams, setFilteredPreviousStreams] = useState<
    VideoStream[]
  >([]);
  const [filteredUpcomingStreams, setFilteredUpcomingStreams] = useState<
    VideoStream[]
  >([]); // NEW

  const [isLoading, setIsLoading] = useState(true);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        const response = await getAllLiveStreams();

        if (response.result === 1 && response.payload) {
          const live = response.payload.filter((s) => s.status === "live");
          const upcoming = response.payload.filter(
            (s) => s.status === "upcoming"
          );
          const completed = response.payload.filter(
            (s) => s.status === "completed"
          );

          setLiveStream(live[0] || null);
          setUpcomingStreams(upcoming);
          setPreviousStreams(completed);
          setFilteredPreviousStreams(completed);
          setFilteredUpcomingStreams(upcoming); // NEW - Initialize filtered upcoming
        }
      } catch (error) {
        console.error("Error loading streams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStreams();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0f1621] flex items-center justify-center">
        <div className="text-white text-xl">Loading streams...</div>
      </main>
    );
  }

  // Combine upcoming and completed streams for search
  const allSearchableVideos = [
    ...filteredUpcomingStreams,
    ...filteredPreviousStreams,
  ]
    .filter((stream) => stream.youtubeStreamId)
    .map((stream) => ({
      id: stream.youtubeStreamId || stream.id.toString(),
      title: stream.title,
      thumbnail: stream.thumbnailUrl,
      videoId: stream.youtubeStreamId || "",
      backgroundColor: "#1e4d8b",
    }));

  // Handle search from YouTubeVideoSection
  const handleSearch = (query: string) => {
    setCurrentSearchQuery(query);

    if (!query.trim()) {
      setFilteredPreviousStreams(previousStreams);
      setFilteredUpcomingStreams(upcomingStreams); // NEW
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Filter previous streams
    const filteredPrevious = previousStreams.filter(
      (stream) =>
        stream.title.toLowerCase().includes(lowerQuery) ||
        stream.description?.toLowerCase().includes(lowerQuery)
    );

    // Filter upcoming streams - NEW
    const filteredUpcoming = upcomingStreams.filter(
      (stream) =>
        stream.title.toLowerCase().includes(lowerQuery) ||
        stream.description?.toLowerCase().includes(lowerQuery)
    );

    setFilteredPreviousStreams(filteredPrevious);
    setFilteredUpcomingStreams(filteredUpcoming); // NEW
  };

  const handleClearSearch = () => {
    setCurrentSearchQuery("");
    setFilteredPreviousStreams(previousStreams);
    setFilteredUpcomingStreams(upcomingStreams); // NEW
  };

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

  return (
    <main className="min-h-screen bg-[#0f1621]">
      <YouTubeVideoSection
        mainVideo={{
          title: liveStream?.title || "No Live Stream",
          description:
            liveStream?.description || "Check back later for live content",
          videoId: liveStream?.youtubeStreamId || "",
          showLiveBadge: liveStream?.status === "live", // Using "live" status
        }}
        additionalVideos={allSearchableVideos}
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No streams found
              </h3>
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
              {/* <button
                onClick={handleClearSearch}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Clear Search & View All Streams
              </button> */}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
