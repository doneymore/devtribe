import YouTubeStreams from "@/app/component/reusable/videos/videostreams";


export default function StreamsPage() {
  const streamSections = [
    {
      title: "Video Streams",
      streams: [
        {
          id: "featured-1",
          title: "Cybersecurity Best Practices & Pentesting Fundamentals",
          thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
          videoId: "dQw4w9WgXcQ", // Replace with actual YouTube video ID
          isLive: false,
        },
      ],
    },
    {
      title: "Upcoming Streams",
      streams: [
        {
          id: "upcoming-1",
          title: "MentaPata Threat Actors And Their Motives",
          thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
          videoId: "dQw4w9WgXcQ",
          viewers: 234,
          isLive: false,
        },
        {
          id: "upcoming-2",
          title: "MentaPata Threat Actors And Their Motives",
          thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
          videoId: "dQw4w9WgXcQ",
          viewers: 156,
          isLive: false,
        },
      ],
    },
    {
      title: "Previous Streams",
      streams: [
        {
          id: "prev-1",
          title: "Upload on Youtube Part 01",
          thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: "prev-2",
          title: "Upload on Youtube",
          thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: "prev-3",
          title: "Upload on Youtube",
          thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80",
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: "prev-4",
          title: "Interesting YouTube Best Practice",
          thumbnail: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=800&q=80",
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: "prev-5",
          title: "Product Report And Service",
          thumbnail: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&q=80",
          videoId: "dQw4w9WgXcQ",
        },
        {
          id: "prev-6",
          title: "Interesting YouTube Best Practice",
          thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
          videoId: "dQw4w9WgXcQ",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#0f1621]">
      <YouTubeStreams sections={streamSections} />
    </main>
  );
}