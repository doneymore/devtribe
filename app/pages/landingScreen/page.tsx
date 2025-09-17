"use client";
import { BlogHeroSection } from "@/app/component/reusable/blog";
import { KnowledgeJourneySection } from "@/app/component/reusable/explore";
import Footer from "@/app/component/reusable/footer";
import { HeroSection } from "@/app/component/reusable/heroSection";
import { Navbar } from "@/app/component/reusable/navItem";
import { AboutSection } from "@/app/component/reusable/portfolio";
import BlogCardsSection from "@/app/component/reusable/streams";
import { hero } from "@/public/assests/image";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection
        title="Master the art"
        subtitle="of secure digital communication."
        description="Cybersecurity Has Rapidly Evolved From A Niche Technical Concern Into A Fundamental Pillar Of Modern Life. As Digital Infrastructures Expand And Data Becomes More Valuable Than Ever, Threats To Privacy, Systems, And Information Continue To Grow In Both Frequency And Sophistication."
        buttonText="Login"
        imageSrc={hero}
        imageAlt="Cyber Security Shield"
        onButtonClick={() => alert("Login clicked!")}
      />
      <AboutSection
        greeting="Hi"
        name="Daniel"
        title="Cybersecurity Analyst"
        description="I am a Cybersecurity Analyst with a strong focus on identifying vulnerabilities, monitoring threats, and implementing security measures to protect digital systems. I am passionate about safeguarding data and ensuring the confidentiality, integrity, and availability of information in today's evolving cyber landscape."
        buttonText="View Portfolio"
        onButtonClick={() => alert("View Portfolio clicked!")}
      />
      <KnowledgeJourneySection
        title="Your Journey To Knowledge Begins Here."
        description="At DigitalDefynd, We Understand That Powerful Ideas Can Shape Thinking And Well-Timed Quote Can Often Drive Home The Importance Of Goals Awareness Better Than Data Or Charts. Whether You're Leading A Boardroom Discussion, Presenting At A Conference, Or Mentoring A Team, Integrating Meaningful Cybersecurity Quotes Into Your Communication Can Reinforce Essential Messages With Clarity And Authority."
        buttonText="Explore"
        onButtonClick={() => alert("Explore clicked!")}
      />
      <BlogHeroSection
        title="SECNEEDLE BLOG"
        description="Welcome to our blog - home of everything there is to know about cybersecurity and how you can secure your networks. Here you will find everything to spark your inspiration!"
        buttonText="SUBSCRIBE"
        onButtonClick={() => alert("Subscribe clicked!")}
      />
      <BlogCardsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
