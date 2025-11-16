"use client";
import PaginationControls from "@/app/component/reusable/pagination";
import YouTubeVideoSection from "@/app/component/reusable/videos/lastestVideos";
import PreviousStreamsSection from "@/app/component/reusable/videos/previousVideo";



export default function StreamsPage() {
 
   const previousStreams = [
    {
      id: "stream-1",
      title: "Defining Threats, Vulnerabilities, And Assets",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: "stream-2",
      title: "Risk Management And Assessment",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      videoId: "inWWhr5tnEA",
    },
    {
      id: "stream-3",
      title: "Man-In-The-Middle (MITM) Attacks",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
      videoId: "abc123def",
      episodeNumber: "EP. 285"
    },
    // ... add more videos
  ];


  return (
    <main className="min-h-screen bg-[#0f1621]">
    <YouTubeVideoSection
        mainVideo={{
          title: "Lorem Ipsum",
          description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\nDonec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.",
          videoId: "inWWhr5tnEA",
          showLiveBadge: true
        }}
        additionalVideos={[
          {
            id: "video-1",
            title: "Identifying Threat Actors And Their Motives",
            thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
            videoId: "dQw4w9WgXcQ",
            backgroundColor: "#1e4d8b"
          },
          {
            id: "video-2",
            title: "Identifying Threat Actors And Their Motives",
            thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
            videoId: "inWWhr5tnEA",
            backgroundColor: "#1e4d8b"
          }
        ]}
        maxWidth="1227px"
        backgroundColor="white"
        titleColor="#1a4d7a"
        showShadow={true}
      />

        <PreviousStreamsSection
        title="Previous Streams"
        videos={previousStreams}
        itemsPerPage={9}
        PaginationComponent={PaginationControls}
      />
      {/* <YouTubeStreams sections={streamSections} /> */}
    </main>
  );
}