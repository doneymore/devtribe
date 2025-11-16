"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Conference {
  conferenceId: string;
  title: string;
  description: string;
  yearAttended: number;
  logoImageBase64?: string | null;
  logoImage?: string | null;
  conferenceUrl?: string | null;
  dateCreated: string;
}

interface ConferencesContentProps {
  conferences?: Conference[];
  className?: string;
}

const ConferenceCard: React.FC<{ item: Conference }> = ({ item }) => {
  // Default conference/security-themed images
  const defaultImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop", // Conference hall
    "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop", // Tech conference
    "https://images.unsplash.com/photo-1558403194-611308249627?w=400&h=300&fit=crop", // Hacker convention
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop", // Tech presentation
  ];

  // Use logoImageBase64 or logoImage if available, otherwise use a default image
  const getImageSrc = () => {
    if (item.logoImageBase64) {
      return `data:image/png;base64,${item.logoImageBase64}`;
    }
    if (item.logoImage) {
      return `data:image/png;base64,${item.logoImage}`;
    }
    // Use hash of conferenceId to consistently select an image
    const hash = item.conferenceId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return defaultImages[hash % defaultImages.length];
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
      {/* Conference Logo/Image */}
      <div className="flex-shrink-0 w-full sm:w-44 md:w-48 lg:w-52">
        <div className="relative w-full aspect-[4/3]">
          <Image
            src={getImageSrc()}
            alt={`${item.title} Logo`}
            fill
            className="object-contain rounded-3xl"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 176px, (max-width: 1024px) 192px, 208px"
          />
        </div>
      </div>

      {/* Conference Description */}
      <div className="flex-1">
        <p
          style={{
            fontFamily: "Times New Roman, serif",
            fontWeight: 400,
            fontSize: "clamp(15px, 2.2vw, 18px)",
            lineHeight: "1.5",
            letterSpacing: "0px",
            color: "#000000",
          }}
        >
          <span style={{ fontWeight: 700 }}>
            {item.title} ({item.yearAttended}):
          </span>{" "}
          {item.description}
        </p>
        {item.conferenceUrl && (
          <a
            href={item.conferenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 hover:underline"
            style={{
              fontFamily: "Times New Roman, serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 2.2vw, 18px)",
              color: "#0066cc",
            }}
          >
            Read more
          </a>
        )}
      </div>
    </div>
  );
};

const ConferencesContent: React.FC<ConferencesContentProps> = ({
  conferences = [],
  className = "",
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(conferences.length / itemsPerPage);

  const visibleConferences = conferences.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  // Empty state
  if (conferences.length === 0) {
    return (
      <div className={className}>
        <p className="text-center text-gray-500">No conferences available.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Conferences List */}
      <div className="space-y-6">
        {visibleConferences.map((conference) => (
          <ConferenceCard
            key={conference.conferenceId}
            item={conference}
          />
        ))}
      </div>

      {/* Carousel Navigation */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={goToPrevPage}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            aria-label="Previous page"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a3a5c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goToNextPage}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
            aria-label="Next page"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1a3a5c"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ConferencesContent;