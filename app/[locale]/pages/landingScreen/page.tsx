"use client";
import React from "react";

import { blog } from "@/public/assests/image";
import { useTranslations } from "next-intl";
import { WelcomeSection } from "../../component/reusable/landingpage/heroSection1";
import BlogPage from "../../component/reusable/landingpage/blog";
import { KnowledgeJourneySection } from "../../component/reusable/landingpage/explore";
import { AboutSection } from "../../component/reusable/landingpage/portfolio";
import VideoStreams from "../../component/reusable/landingpage/videoStream";

const LandingPage = () => {
  const t = useTranslations("home");
  const videoData = [
    {
      id: "1",
      title: "Here you will find everything to spark your inspiration!",
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: "2",
      title: "Awareness Month, a dedicated time to raise awareness",
      videoId: "dQw4w9WgXcQ",
    },
    {
      id: "3",
      title: "Latest post heading sample text",
      videoId: "dQw4w9WgXcQ",
    },
  ];

  return (
    <div>
      <WelcomeSection
        description={`${t("welcome1")}`}
        title={`${t("welcome0")}`}
        subtitle={`${t("welcome2")}`}
        subtitle1={`${t("subtitle")}`}
      />

      <BlogPage
        title={`${t("blog")}`}
        description={`${t("blog1")}`}
        ctaText={`${t("blogtext")}`}
        backgroundImage={blog}
      />

      {/* <BlogHeroSection
        title="SECNEEDLE BLOG"
        description="Welcome to our blog - home of everything there is to know about cybersecurity and how you can secure your networks. Here you will find everything to spark your inspiration!"
        buttonText="SUBSCRIBE"
        onButtonClick={() => alert("Subscribe clicked!")}
      /> */}
      <KnowledgeJourneySection
        title={`${t("journey")}`}
        description={`${t("description")}`}
        buttonText={`${t("journeybtn")}`}
        onButtonClick={() => alert("Explore clicked!")}
      />
      <AboutSection
        greeting={`${t("about1")}`}
        name={`${t("aboutname")}`}
        title={`${t("abouttitle")}`}
        description={`${t("aboutdes")}`}
        buttonText={`${t("aboutbtn")}`}
        onButtonClick={() => alert("View Portfolio clicked!")}
      />

      {/* <BlogCardsSection /> */}
      <VideoStreams videos={videoData} />
    </div>
  );
};

export default LandingPage;
