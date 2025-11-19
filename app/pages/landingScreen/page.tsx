"use client";
import BlogPage from "@/app/component/reusable/landingpage/blog";
import { KnowledgeJourneySection } from "@/app/component/reusable/landingpage/explore";
import { WelcomeSection } from "@/app/component/reusable/landingpage/heroSection1";
import { AboutSection } from "@/app/component/reusable/landingpage/portfolio";
import VideoStreams from "@/app/component/reusable/landingpage/videoStream";
import { blog } from "@/public/assests/image";
import React from "react";

const LandingPage = () => {
  const videoData = [
  {
    id: '1',
    title: 'Here you will find everything to spark your inspiration!',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: '2',
    title: 'Awareness Month, a dedicated time to raise awareness',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    id: '3',
    title: 'Latest post heading sample text',
    videoId: 'dQw4w9WgXcQ',
  },
];


  return (
    <div>
      <WelcomeSection />
    
      <BlogPage backgroundImage={blog} />
      
      {/* <BlogHeroSection
        title="SECNEEDLE BLOG"
        description="Welcome to our blog - home of everything there is to know about cybersecurity and how you can secure your networks. Here you will find everything to spark your inspiration!"
        buttonText="SUBSCRIBE"
        onButtonClick={() => alert("Subscribe clicked!")}
      /> */}
      <KnowledgeJourneySection
        title="Your Journey To Knowledge Begins Here."
        description="At DigitalDefynd, We Understand That Powerful Ideas Can Shape Thinking And Well-Timed Quote Can Often Drive Home The Importance Of Goals Awareness Better Than Data Or Charts. Whether You're Leading A Boardroom Discussion, Presenting At A Conference, Or Mentoring A Team, Integrating Meaningful Cybersecurity Quotes Into Your Communication Can Reinforce Essential Messages With Clarity And Authority."
        buttonText="Explore"
        onButtonClick={() => alert("Explore clicked!")}
      />
       <AboutSection
        greeting="Hi"
        name="Daniel"
        title="Cybersecurity Analyst"
        description="I am a Cybersecurity Analyst with a strong focus on identifying vulnerabilities, monitoring threats, and implementing security measures to protect digital systems. I am passionate about safeguarding data and ensuring the confidentiality, integrity, and availability of information in today's evolving cyber landscape."
        buttonText="View Portfolio"
        onButtonClick={() => alert("View Portfolio clicked!")}
      />
      
      {/* <BlogCardsSection /> */}
      <VideoStreams videos={videoData} />
    </div>
  );
};

export default LandingPage;
