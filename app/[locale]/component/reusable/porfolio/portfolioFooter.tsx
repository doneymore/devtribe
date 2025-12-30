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
  Loader2,
} from "lucide-react";
import { createContactUs } from "@/app/lib/footerService";
import Link from "next/link";

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

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const PortfolioFooter: React.FC<FooterProps> = ({
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
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    // Clear previous messages
    setErrorMessage(null);
    setSuccessMessage(null);

    // Basic validation
    if (!formData.name.trim()) {
      setErrorMessage("Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage("Email is required.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.query.trim()) {
      setErrorMessage("Please enter your message.");
      return;
    }

    setLoading(true);

    try {
      const [firstName, ...rest] = formData.name.trim().split(" ");
      const lastName = rest.join(" ") || " ";

      const success = await createContactUs({
        emailAddress: formData.email.trim(),
        firstName,
        lastName,
        message: formData.headline
          ? `${formData.headline}\n\n${formData.query}`
          : formData.query,
      });

      if (!success) {
        throw new Error("API returned failure");
      }

      setSuccessMessage(
        "✅ Your message has been sent successfully. We’ll get back to you shortly."
      );

      setFormData({
        name: "",
        email: "",
        headline: "",
        query: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "❌ Unable to send your message right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className={`w-full py-8 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor: "#091248" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Section - Contact Info */}
          <div className="space-y-4">
            <h2
              className="text-white mb-4"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(20px, 3vw, 28px)",
                lineHeight: "1.2",
              }}
            >
              Have a Query in Mind?
            </h2>

            <p
              className="text-white mb-6"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.8vw, 15px)",
                lineHeight: "1.5",
              }}
            >
              You can reach out to me via email or social media platforms to
              discuss the query.
            </p>

            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span
                  className="text-white pt-2"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1.8vw, 15px)",
                  }}
                >
                  {contactInfo.location}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>

                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-white hover:underline pt-2"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1.8vw, 15px)",
                  }}
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-white hover:underline pt-2"
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1.8vw, 15px)",
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
              className="text-white mb-4"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(20px, 3vw, 28px)",
                lineHeight: "1.2",
              }}
            >
              Send Me Email
            </h3>
            {successMessage && (
              <div className="mb-3 text-green-400 text-sm text-center font-medium">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-3 text-red-400 text-sm text-center font-medium">
                {errorMessage}
              </div>
            )}

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-transparent border-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-400 transition-colors"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                }}
              />

              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-transparent border-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-400 transition-colors"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                }}
              />

              <input
                type="text"
                placeholder="Headline"
                value={formData.headline}
                onChange={(e) => handleChange("headline", e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-transparent border-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-400 transition-colors"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                }}
              />

              <textarea
                placeholder="Details about Query"
                value={formData.query}
                onChange={(e) => handleChange("query", e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-2xl bg-transparent border-2 border-white text-white placeholder-white focus:outline-none focus:border-blue-400 transition-colors resize-none"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                }}
              />

              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-10 py-2 rounded-full transition-all duration-200 flex items-center gap-2
    ${
      loading
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-white text-[#091248] hover:bg-gray-100 active:scale-95"
    }`}
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 500,
                    fontSize: "14px",
                  }}
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-4">
              <p
                className="text-white text-center mb-2"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                }}
              >
                or
              </p>
              <div className="flex justify-center gap-3">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6 text-white" fill="white" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6 text-white" fill="white" />
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-white" fill="white" />
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6 text-white" fill="white" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-4 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-white/70">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "11px",
              }}
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">|</span>
            <Link
              href="/terms-of-services"
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "11px",
              }}
            >
              Terms of Services
            </Link>
            <span className="hidden sm:inline">|</span>
            <p
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "11px",
              }}
            >
              DevTribe 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
