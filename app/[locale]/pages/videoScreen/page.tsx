import { Metadata } from "next";
import { getAllLiveStreams } from "@/app/lib/blogServices";
import StreamsClientWrapper from "./streamsClientWrapper";

// SEO Metadata
export const metadata: Metadata = {
  title: "Live Streams & Video Archive | Your Site Name",
  description: "Watch our live cybersecurity streams and browse our archive of previous episodes covering threat intelligence, AI security, phishing, and more.",
  keywords: ["live streams", "cybersecurity", "video archive", "threat intelligence", "security education"],
  openGraph: {
    title: "Live Streams & Video Archive",
    description: "Watch live cybersecurity content and explore our video archive",
    type: "website",
    images: [
      {
        url: "/og-image-streams.jpg", // Add your OG image
        width: 1200,
        height: 630,
        alt: "Live Streams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Streams & Video Archive",
    description: "Watch live cybersecurity content and explore our video archive",
    images: ["/og-image-streams.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Force dynamic rendering to always fetch fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable caching for real-time stream status

export default async function StreamsPage() {
  let streamsData = null;
  let error = null;

  try {
    streamsData = await getAllLiveStreams();
  } catch (err) {
    console.error("Error fetching streams:", err);
    error = "Failed to load streams";
  }

  // Prepare streams data
  const liveStream = streamsData?.payload?.find((s) => s.status === "live") || null;
  const upcomingStreams = streamsData?.payload?.filter((s) => s.status === "upcoming") || [];
  const previousStreams = streamsData?.payload?.filter((s) => s.status === "completed") || [];

  return (
    <StreamsClientWrapper
      initialLiveStream={liveStream}
      initialUpcomingStreams={upcomingStreams}
      initialPreviousStreams={previousStreams}
      error={error}
    />
  );
}