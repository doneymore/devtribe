"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { secneedle } from "@/public/assests/image";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const languageRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Navigation items with their routes
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/pages/blogScreen" },
    { name: "Videos Stream", href: "/streams" },
    { name: "Portfolio", href: "/pages/portfolioScreen" },
    { name: "Services", href: "/services" },
    { name: "Activities", href: "/pages/activityScreen" },
    { name: "About Us", href: "/about" },
  ];

  // Helper function to check if nav item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Language options
  const languages = [
    { code: "ENG", name: "English", flag: "🇺🇸" },
    { code: "FR", name: "French", flag: "🇫🇷" },
    { code: "PT", name: "Portuguese", flag: "🇵🇹" },
  ];

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef?.current?.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  interface Language {
    code: string;
    name: string;
    flag: string;
  }

  const handleLanguageSelect = (language: Language): void => {
    setSelectedLanguage(language.code);
    setIsLanguageOpen(false);
  };

  return (
    <nav className="bg-primary-nav text-white shadow-lg relative z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <Link
              href="/"
              className="rounded-full flex items-center justify-center overflow-hidden"
            >
              <Image
                src={secneedle}
                alt="SecNeedle Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 py-1 sm:py-2 object-cover"
              />
            </Link>
          </div>

          {/* Navigation - Different layouts for different screen sizes */}

          {/* Tablet Portrait (md): Compact horizontal with 4 items */}
          <div className="hidden md:flex lg:hidden items-center flex-1 justify-center mx-2">
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide max-w-full">
              {navItems.slice(0, 4).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium relative group text-sm whitespace-nowrap px-3 py-1.5 flex-shrink-0 rounded-lg ${
                    isActive(item.href)
                      ? "bg-blue-600 text-white border-2 border-blue-400"
                      : "text-white hover:text-blue-200"
                  }`}
                >
                  {item.name}
                  {!isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
                  )}
                </Link>
              ))}
              {navItems.length > 4 && (
                <button
                  className="text-white hover:text-blue-200 text-sm font-medium flex-shrink-0 px-2"
                  onClick={() => setIsMenuOpen(true)}
                >
                  More
                </button>
              )}
            </div>
          </div>

          {/* Tablet Landscape/Small Laptop (lg): Compact horizontal with 5 items */}
          <div className="hidden lg:flex xl:hidden items-center flex-1 justify-center mx-3">
            <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide max-w-full">
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium relative group text-sm whitespace-nowrap px-3 py-1.5 flex-shrink-0 rounded-lg ${
                    isActive(item.href)
                      ? "bg-blue-600 text-white border-2 border-blue-400"
                      : "text-white hover:text-blue-200"
                  }`}
                >
                  {item.name}
                  {!isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
                  )}
                </Link>
              ))}
              {navItems.length > 5 && (
                <button
                  className="text-white hover:text-blue-200 text-sm font-medium flex-shrink-0 px-2"
                  onClick={() => setIsMenuOpen(true)}
                >
                  More
                </button>
              )}
            </div>
          </div>

          {/* Desktop (xl): Full navigation with 6 items */}
          <div className="hidden xl:flex 2xl:hidden items-center flex-1 justify-center mx-4">
            <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide max-w-full">
              {navItems.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium relative group text-base whitespace-nowrap px-3 py-1.5 flex-shrink-0 rounded-lg ${
                    isActive(item.href)
                      ? "bg-blue-600 text-white border-2 border-blue-400"
                      : "text-white hover:text-blue-200"
                  }`}
                >
                  {item.name}
                  {!isActive(item.href) && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
                  )}
                </Link>
              ))}
              {navItems.length > 6 && (
                <button
                  className="text-white hover:text-blue-200 text-base font-medium flex-shrink-0 px-2"
                  onClick={() => setIsMenuOpen(true)}
                >
                  More
                </button>
              )}
            </div>
          </div>

          {/* Large Desktop (2xl+): Full navigation with all items */}
          <div className="hidden 2xl:flex items-center space-x-6 font-times flex-1 justify-center cursor-pointer">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-200 font-medium relative group text-base whitespace-nowrap px-3 py-1.5 rounded-lg ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white border-2 border-blue-400"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {item.name}
                {!isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Language + Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-blue-700/50 hover:bg-blue-600/50 transition-colors duration-200 border border-blue-600/30"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium font-neuton">
                  {selectedLanguage}
                </span>
                <ChevronDown
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${
                    isLanguageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Language Dropdown Menu */}
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language)}
                      className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                        selectedLanguage === language.code
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-base sm:text-lg">
                        {language.flag}
                      </span>
                      <div>
                        <div className="font-medium text-sm sm:text-base">
                          {language.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {language.code}
                        </div>
                      </div>
                      {selectedLanguage === language.code && (
                        <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons - Show on medium screens and up */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4 font-orelega">
              <button className="text-white hover:text-blue-200 transition-colors duration-200 font-medium px-2 lg:px-3 xl:px-4 py-1.5 lg:py-2 text-sm lg:text-base">
                Login
              </button>
              {/* <button className="bg-white text-primary-nav hover:bg-gray-100 transition-colors duration-200 font-medium px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 rounded-full text-sm lg:text-base whitespace-nowrap">
                Sign Up
              </button> */}
            </div>

            {/* Mobile Menu Button - Show only on small screens */}
            <button
              className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-blue-700/50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Only show on small screens */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-900 border-t border-blue-700 shadow-xl">
            <div className="px-4 py-4 space-y-2 sm:space-y-3">
              {/* Mobile Navigation Links */}
              <div className="grid grid-cols-2 gap-2 sm:block sm:space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base text-center sm:text-left ${
                      isActive(item.href)
                        ? "bg-blue-600 text-white border-2 border-blue-400"
                        : "text-white hover:text-blue-200 hover:bg-blue-800/50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="pt-3 sm:pt-4 border-t border-blue-700 space-y-2 sm:space-y-3">
                <button
                  className="w-full text-center sm:text-left px-3 sm:px-4 py-2 sm:py-3 text-white hover:text-blue-200 hover:bg-blue-800/50 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </button>
                <button
                  className="w-full bg-white text-primary-nav hover:bg-gray-100 transition-colors duration-200 font-medium px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hide scrollbar for horizontal scroll */}
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
