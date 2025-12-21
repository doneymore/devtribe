import { Metadata } from "next";

import WhoWeAreSection from "@/app/component/reusable/aboutUs/info";
import WhereWeAreHeadedSection from "@/app/component/reusable/aboutUs/whereWe";
import TeamSection from "@/app/component/reusable/aboutUs/teamMembers";

import { getImageSrc } from "@/app/utils/convertBase64toImage";
import { getAboutUsSettings, parseAboutUsData } from "@/app/lib/contactUs";

// ================= SEO =================
export const metadata: Metadata = {
  title: "About Us | Secneedle",
  description:
    "Learn more about Secneedle, our mission, vision, and the cybersecurity professionals behind our success.",
  openGraph: {
    title: "About Us | Secneedle",
    description:
      "Meet the team and learn where Secneedle is headed in the future of cybersecurity.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const revalidate = 3600;

// ================= PAGE =================
export default async function AboutUsPage() {
  const response = await getAboutUsSettings();
  const aboutData = parseAboutUsData(response);

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Unable to load About Us data.</p>
      </div>
    );
  }

  // ✅ Convert base64 logo → data URL
  const logoSrc = getImageSrc(aboutData.logo);

  return (
    <main className="min-h-screen">
      <WhoWeAreSection
        description={aboutData.whoWeAre}
        imageUrl={logoSrc ?? undefined}
        imageAlt={`${aboutData.appName} logo`}
      />

      <WhereWeAreHeadedSection
        description={aboutData.whereWeAreHeaded}
      />

      <TeamSection teamMembers={aboutData.teamMembers} />
    </main>
  );
}
