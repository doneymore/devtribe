"use client";
import { HeroSection } from "@/app/component/reusable/heroSection";
import { Navbar } from "@/app/component/reusable/navItem";
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
    </div>
  );
};

export default LandingPage;
