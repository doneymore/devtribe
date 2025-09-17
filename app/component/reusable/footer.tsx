import React from "react";
import { Facebook, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

interface FooterSection {
  title: string;
  links: string[];
}

interface FooterProps {
  className?: string;
  sections?: FooterSection[];
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
  };
}

const defaultSections: FooterSection[] = [
  {
    title: "Resources",
    links: [
      "Secneedle Blog",
      "Customer Story",
      "Creators Network",
      "Solution Providers",
    ],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Support", "Developer Network"],
  },
  {
    title: "Company",
    links: ["About Secneedle", "Contact us"],
  },
];

const Footer: React.FC<FooterProps> = ({
  className = "",
  sections = defaultSections,
  socialLinks = {},
}) => {
  const socialIcons = [
    { Icon: Facebook, href: socialLinks.facebook, key: "facebook" },
    { Icon: Linkedin, href: socialLinks.linkedin, key: "linkedin" },
    { Icon: Twitter, href: socialLinks.twitter, key: "twitter" },
    { Icon: Youtube, href: socialLinks.youtube, key: "youtube" },
    { Icon: Instagram, href: socialLinks.instagram, key: "instagram" },
  ];

  return (
    <footer className={`bg-[#00173A] text-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Footer Sections */}
            {sections.map((section, index) => (
              <div key={index} className="text-center sm:text-left">
                <h3
                  className="text-white mb-6"
                  style={{
                    fontFamily: "Neuton, serif",
                    fontWeight: 700,
                    fontSize: "clamp(24px, 4vw, 36px)",
                    lineHeight: "20px",
                    letterSpacing: "0px",
                  }}
                >
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href="#"
                        className="text-white hover:text-gray-300 transition-colors duration-200"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 200,
                          fontSize: "16px",
                          lineHeight: "20px",
                          letterSpacing: "0px",
                        }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Follow Us Section */}
            <div className="text-center sm:text-left">
              <h3
                className="text-white mb-6"
                style={{
                  fontFamily: "Neuton, serif",
                  fontWeight: 700,
                  fontSize: "clamp(24px, 4vw, 36px)",
                  lineHeight: "20px",
                  letterSpacing: "0px",
                }}
              >
                Follow us
              </h3>
              <div className="flex justify-center sm:justify-start space-x-4">
                {socialIcons.map(({ Icon, href, key }) => (
                  <a
                    key={key}
                    href={href || "#"}
                    className="w-10 h-10 bg-white bg-opacity-10 hover:bg-white hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 border border-white border-opacity-20"
                    aria-label={`Follow us on ${key}`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white border-opacity-20 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 200,
                  fontSize: "14px",
                  letterSpacing: "0px",
                }}
              >
                Privacy Policy
              </a>
              <span className="hidden sm:inline text-white text-opacity-60">
                |
              </span>
              <a
                href="#"
                className="text-white hover:text-gray-300 transition-colors duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 200,
                  fontSize: "14px",
                  letterSpacing: "0px",
                }}
              >
                Terms of Services
              </a>
              <span className="hidden sm:inline text-white text-opacity-60">
                |
              </span>
              <span
                className="text-white"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 200,
                  fontSize: "14px",
                  letterSpacing: "0px",
                }}
              >
                Copyright 2025
              </span>
            </div>

            {/* Company Credit */}
            <div>
              <span
                className="text-white"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 200,
                  fontSize: "14px",
                  letterSpacing: "0px",
                }}
              >
                devtribe@2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
