"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CertificationItem {
  title: string;
  subtitle?: string;
  institution: string;
  year: string;
  image: string;
}

interface EducationCertificationProps {
  certifications?: CertificationItem[];
  className?: string;
}

const CertificationCard: React.FC<{ item: CertificationItem }> = ({ item }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Certificate Image */}
      <div className="w-full aspect-[4/3] relative mb-4 rounded-lg overflow-hidden shadow-md">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Certificate Info */}
      <div className="text-center space-y-1">
        <h3
          style={{
            fontFamily: "Gurajada, serif",
            fontWeight: 700,
            fontSize: "clamp(16px, 2.5vw, 40px)",
            lineHeight: "1.3",
            color: "#0E508B",
          }}
          className="text-7xl"
        >
          {item.title}
        </h3>
        {item.subtitle && (
          <p
            style={{
              fontFamily: "Gurajada, serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 2vw, 25px)",
              lineHeight: "1.3",
              color: "#1a3a5c",
            }}
          >
            {item.subtitle}
          </p>
        )}
        <p
          style={{
            fontFamily: "Gurajada, serif",
            fontWeight: 400,
            fontSize: "clamp(12px, 1.8vw, 25px)",
            lineHeight: "1.3",
            color: "#666",
          }}
        >
          {item.institution}, {item.year}
        </p>
      </div>
    </div>
  );
};

const EducationCertificationContent: React.FC<
  Omit<EducationCertificationProps, "title">
> = ({
  certifications = [
    {
      title: "Software Engineering",
      subtitle: "Degree",
      institution: "Western Governors University",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
    },
    {
      title: "Information Technology",
      subtitle: "Management Degree",
      institution: "Western Governors University",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=400&fit=crop",
    },
    {
      title: "SANS GCIH",
      subtitle: "",
      institution: "GIAC",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=600&h=400&fit=crop",
    },
    {
      title: "Investigating Windows",
      subtitle: "Endpoint",
      institution: "13Cubed",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    },
    {
      title: "Investigating Windows",
      subtitle: "Memory",
      institution: "13Cubed",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
    },
    {
      title: "Security+",
      subtitle: "",
      institution: "CompTIA",
      year: "2022",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    },
  ],
  className = "",
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 9; // 3 rows × 3 columns
  const totalPages = Math.ceil(certifications.length / itemsPerPage);

  const visibleCertifications = certifications.slice(
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
      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {visibleCertifications.map((cert, index) => (
          <CertificationCard
            key={currentPage * itemsPerPage + index}
            item={cert}
          />
        ))}
      </div>

      {/* Carousel Navigation */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-10">
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

export default EducationCertificationContent;
