"use client";

import React, { useState, useEffect } from "react";

interface NavItem {
  id: string;
  label: string;
  targetId: string;
}

interface SectionNavbarProps {
  items: NavItem[];
  className?: string;
  activeColor?: string;
  hoverColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

 export const SectionNavbar: React.FC<SectionNavbarProps> = ({
  items,
  className = "",
  activeColor = "#005DFF",
  hoverColor = "#0D1651CC",
  backgroundColor = "#D9D9D9",
  textColor = "#0D1651",
}) => {
  const [activeSection, setActiveSection] = useState<string>("");

  // Smooth scroll to section
  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => ({
        id: item.targetId,
        element: document.getElementById(item.targetId),
      }));

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <nav className={`w-full sticky top-0 z-40 shadow-md ${className}`}>
      {/* White section on top */}
      <div className="w-full bg-white h-12"></div>

      {/* Navigation content with gray background */}
      <div className="w-full" style={{ backgroundColor }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center py-4">
            <ul className="flex items-center space-x-8 xl:space-x-12">
              {items.map((item, index) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.targetId)}
                    className="relative transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: "'Gurajada', serif",
                      fontWeight: 400,
                      fontSize: "clamp(24px, 3vw, 36px)",
                      lineHeight: "30px",
                      letterSpacing: "0px",
                      color:
                        activeSection === item.targetId
                          ? activeColor
                          : textColor,
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== item.targetId) {
                        e.currentTarget.style.color = hoverColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== item.targetId) {
                        e.currentTarget.style.color = textColor;
                      }
                    }}
                  >
                    {item.label}
                    {/* Active indicator */}
                    {activeSection === item.targetId && (
                      <span
                        className="absolute -bottom-2 left-0 right-0 h-1 rounded-full transition-all duration-300"
                        style={{ backgroundColor: activeColor }}
                      />
                    )}
                  </button>
                  {index < items.length - 1 && (
                    <span
                      className="mx-4 xl:mx-6"
                      style={{ color: textColor, opacity: 0.5 }}
                    >
                      |
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden items-center justify-center py-3">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.targetId)}
                    className="relative transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: "'Gurajada', serif",
                      fontWeight: 400,
                      fontSize: "clamp(20px, 4vw, 28px)",
                      lineHeight: "26px",
                      letterSpacing: "0px",
                      color:
                        activeSection === item.targetId
                          ? activeColor
                          : textColor,
                    }}
                    onMouseEnter={(e) => {
                      if (activeSection !== item.targetId) {
                        e.currentTarget.style.color = hoverColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeSection !== item.targetId) {
                        e.currentTarget.style.color = textColor;
                      }
                    }}
                  >
                    {item.label}
                    {activeSection === item.targetId && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
                        style={{ backgroundColor: activeColor }}
                      />
                    )}
                  </button>
                  {index < items.length - 1 && (
                    <span
                      style={{ color: textColor, opacity: 0.5 }}
                      className="text-sm"
                    >
                      |
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile Navigation - Horizontal scroll */}
          <div className="md:hidden py-3">
            <div className="flex items-center overflow-x-auto scrollbar-hide space-x-6 px-2">
              {items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.targetId)}
                    className="relative flex-shrink-0 transition-all duration-300"
                    style={{
                      fontFamily: "'Gurajada', serif",
                      fontWeight: 400,
                      fontSize: "18px",
                      lineHeight: "22px",
                      letterSpacing: "0px",
                      color:
                        activeSection === item.targetId
                          ? activeColor
                          : textColor,
                    }}
                    onTouchStart={(e) => {
                      if (activeSection !== item.targetId) {
                        e.currentTarget.style.color = hoverColor;
                      }
                    }}
                    onTouchEnd={(e) => {
                      if (activeSection !== item.targetId) {
                        e.currentTarget.style.color = textColor;
                      }
                    }}
                  >
                    {item.label}
                    {activeSection === item.targetId && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
                        style={{ backgroundColor: activeColor }}
                      />
                    )}
                  </button>
                  {index < items.length - 1 && (
                    <span
                      style={{ color: textColor, opacity: 0.5 }}
                      className="text-xs flex-shrink-0"
                    >
                      |
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* White section on bottom */}
      <div className="w-full bg-white h-12"></div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};

// Demo component to show usage
// const PortfolioDemo = () => {
//   const navItems = [
//     { id: "about", label: "About", targetId: "about-section" },
//     { id: "skills", label: "Skills", targetId: "skills-section" },
//     { id: "experience", label: "Experience", targetId: "experience-section" },
//     { id: "projects", label: "Projects", targetId: "projects-section" },
//     {
//       id: "education",
//       label: "Education & Certification",
//       targetId: "education-section",
//     },
//     {
//       id: "conferences",
//       label: "Conferences",
//       targetId: "conferences-section",
//     },
//     { id: "contact", label: "Contact", targetId: "contact-section" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <SectionNavbar items={navItems} />

//       {/* Demo sections */}
//       <div className="space-y-0">
//         {navItems.map((item) => (
//           <div
//             key={item.id}
//             id={item.targetId}
//             className="min-h-screen flex items-center justify-center bg-white border-b border-gray-200 p-8"
//           >
//             <div className="text-center">
//               <h2 className="text-3xl font-bold text-gray-800 mb-4">
//                 {item.label}
//               </h2>
//               <p className="text-gray-600 text-lg">
//                 This is the {item.label.toLowerCase()} section content.
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PortfolioDemo;
