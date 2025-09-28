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

  // Optional: Track active section based on scroll position
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
      {/* White spacing top */}
      <div className="h-4 bg-white"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center py-4">
          <div className="flex space-x-8">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.targetId, item.id)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 relative ${
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
            ))}
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="md:hidden flex items-center justify-between py-4">
          <div className="text-lg font-semibold text-gray-800">Navigation</div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.targetId, item.id)}
                  className={`w-full text-left px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                    activeSection === item.id
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* White spacing bottom */}
      <div className="h-4 bg-white"></div>
    </nav>
  );
};
export { SectionNavbar };
