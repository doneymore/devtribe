import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  targetId: string;
}

interface SectionNavbarProps {
  items: NavItem[];
}

const SectionNavbar: React.FC<SectionNavbarProps> = ({ items }) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle smooth scrolling to sections
  const handleNavClick = (targetId: string, id: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = items
        .map((item) => document.getElementById(item.targetId))
        .filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(items[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top spacing - responsive */}
      <div className="h-2 sm:h-3 md:h-4 bg-white"></div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center py-3 lg:py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 lg:gap-x-6 xl:gap-x-8">
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => handleNavClick(item.targetId, item.id)}
                  className={`px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-all duration-200 hover:text-blue-600 relative whitespace-nowrap ${
                    activeSection === item.id
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-200"></span>
                  )}
                </button>
                {/* Vertical divider between items - hidden on last item */}
                {index < items.length - 1 && (
                  <div className="h-5 lg:h-6 w-px bg-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Navigation Header */}
        <div className="md:hidden flex items-center justify-between py-3">
          <div className="text-base sm:text-lg font-semibold text-gray-800">
            Navigation
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
        </div>

        {/* Mobile & Tablet Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3">
            <div className="flex flex-col space-y-1">
              {items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.targetId, item.id)}
                    className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 rounded-lg ${
                      activeSection === item.id
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                  {/* Horizontal divider between items - hidden on last item */}
                  {index < items.length - 1 && (
                    <div className="w-full h-px bg-gray-200 my-1"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom spacing - responsive */}
      <div className="h-2 sm:h-3 md:h-4 bg-white"></div>
    </nav>
  );
};

export { SectionNavbar };
