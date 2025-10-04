"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ConferenceItem {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  readMoreUrl: string;
}

interface ConferencesContentProps {
  conferences?: ConferenceItem[];
  className?: string;
}

const ConferenceCard: React.FC<{ item: ConferenceItem }> = ({ item }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* Conference Logo/Image */}
      <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-sm">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 224px, 224px"
          />
        </div>
      </div>

      {/* Conference Description */}
      <div className="flex-1">
        <p
          style={{
            fontFamily: "Times New Roman, serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 2.5vw, 18px)",
            lineHeight: "1.4",
            letterSpacing: "0px",
            color: "#000000",
          }}
        >
          <span style={{ fontWeight: 700 }}>{item.name}:</span>{" "}
          {item.description}
        </p>
        <a
          href={item.readMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 hover:underline"
          style={{
            fontFamily: "Times New Roman, serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 2.5vw, 18px)",
            color: "#0066cc",
          }}
        >
          Read more
        </a>
      </div>
    </div>
  );
};

const ConferencesContent: React.FC<ConferencesContentProps> = ({
  conferences = [
    {
      name: "Black Hat",
      description:
        "This is one of the most recognized and technical conferences in the industry, with events held annually in the U.S., Europe, and Asia. It focuses on briefings and hands-on training that showcase the latest security research, threats, and vulnerabilities.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      imageAlt: "Black Hat Conference Logo",
      readMoreUrl: "https://www.blackhat.com",
    },
    {
      name: "RSA Conference",
      description:
        "A long-running, premier conference that brings together leading experts, vendors, and security professionals. It's an excellent event for networking, staying on top of industry trends, and learning about a wide range of security topics.",
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=400&h=300&fit=crop",
      imageAlt: "RSA Conference Logo",
      readMoreUrl: "https://www.rsaconference.com",
    },
    {
      name: "DEF CON",
      description:
        "The world's largest and most famous hacker convention, typically held alongside Black Hat in Las Vegas. It offers a more casual, community-driven atmosphere with hands-on workshops, live hacking demonstrations, and Capture The Flag (CTF) competitions.",
      image:
        "https://images.unsplash.com/photo-1558403194-611308249627?w=400&h=300&fit=crop",
      imageAlt: "DEF CON Logo",
      readMoreUrl: "https://www.defcon.org",
    },
  ],
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

  return (
    <div className={className}>
      {/* Conferences List */}
      <div className="space-y-8">
        {visibleConferences.map((conference, index) => (
          <ConferenceCard
            key={currentPage * itemsPerPage + index}
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

