"use client";

import React, { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

interface ContactInfo {
  location: string;
  email: string;
  phone: string;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
}

interface FooterProps {
  contactInfo?: ContactInfo;
  socialLinks?: SocialLinks;
  onSubmit?: (data: FormData) => void;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  headline: string;
  query: string;
}

export const Footer: React.FC<FooterProps> = ({
  contactInfo = {
    location: "Muzaffargar, Lagos",
    email: "secneele@gmail.com",
    phone: "+234001312712",
  },
  socialLinks = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
  onSubmit,
  className = "",
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    headline: "",
    query: "",
  });

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset
    setFormData({
      name: "",
      email: "",
      headline: "",
      query: "",
    });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <footer
      className={`w-full py-12 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor: "#091248" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Section - Contact Info */}
          <div className="space-y-6">
            <h2
              className="text-white mb-6"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(24px, 4vw, 32px)",
                lineHeight: "1.2",
              }}
            >
              Have a Query in Mind?
            </h2>

            <p
              className="text-white mb-8"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 2vw, 16px)",
                lineHeight: "1.5",
              }}
            >
              You can reach out to me via email or social media platforms to
              discuss the query.
            </p>

            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-white flex-shrink-0" />
                <span
                  className="text-white"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 2vw, 16px)",
                  }}
                >
                  {contactInfo.location}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-white flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-white hover:underline"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 2vw, 16px)",
                  }}
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-white flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-white hover:underline"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 2vw, 16px)",
                  }}
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div>
            <h3
              className="text-white mb-6"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(24px, 4vw, 32px)",
                lineHeight: "1.2",
              }}
            >
              Send Me Email
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-400 transition-colors"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              />

              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-400 transition-colors"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              />

              <input
                type="text"
                placeholder="Headline"
                value={formData.headline}
                onChange={(e) => handleChange("headline", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-400 transition-colors"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              />

              <textarea
                placeholder="Details about Query"
                value={formData.query}
                onChange={(e) => handleChange("query", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-transparent border-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              />

              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                Send
              </button>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <p
                className="text-white text-center mb-3"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                }}
              >
                or
              </p>
              <div className="flex justify-center gap-4">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-[#091248]" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-[#091248]" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-[#091248]" />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-[#091248]" />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5 text-[#091248]" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white/70">
            <a
              href="/privacy-policy"
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              Privacy Policy
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href="/terms-of-services"
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              Terms of Services
            </a>
            <span className="hidden sm:inline">|</span>
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              Copyright 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
