"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { secneedle } from "@/public/assests/image";


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const languageRef = useRef<HTMLDivElement>(null);

  // Navigation items
  const navItems = [
    { name: "Home", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "Videos Stream", href: "#" },
    { name: "Blog", href: "#" },
    { name: "About Us", href: "#" },
  ];

  // Language options
  const languages = [
    { code: "ENG", name: "English", flag: "🇺🇸" },
    { code: "FR", name: "French", flag: "🇫🇷" },
    { code: "PT", name: "Portuguese", flag: "🇵🇹" },
  ];

  // Close language dropdown when clicking outside
  useEffect(() => {
    interface Language {
      code: string;
      name: string;
      flag: string;
    }

    interface NavItem {
      name: string;
      href: string;
    }

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
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="rounded-full flex items-center justify-center overflow-hidden">
              <Image
                src={secneedle}
                alt="SecNeedle Logo"
                className="w-full h-24 py-2 object-cover"
              />
            </div>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-12 font-orelega text-base flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Side - Language + Auth Buttons */}
          <div className="flex items-center space-x-6">
            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-700/50 hover:bg-blue-600/50 transition-colors duration-200 border border-blue-600/30"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium font-neuton">
                  {selectedLanguage}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isLanguageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Language Dropdown Menu */}
              {isLanguageOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageSelect(language)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                        selectedLanguage === language.code
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <div>
                        <div className="font-medium">{language.name}</div>
                        <div className="text-sm text-gray-500">
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

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4 font-orelega">
              <button className="text-white hover:text-blue-200 transition-colors duration-200 font-medium px-4 py-2">
                Login
              </button>
              <button className="bg-white text-primary-nav hover:bg-gray-100 transition-colors duration-200 font-medium px-6 py-2 rounded-full">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-blue-700/50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-blue-900 border-t border-blue-700 shadow-xl">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-white hover:text-blue-200 hover:bg-blue-800/50 rounded-lg transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-blue-700 space-y-3">
                <button
                  className="w-full text-left px-4 py-3 text-white hover:text-blue-200 hover:bg-blue-800/50 rounded-lg transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </button>
                <button
                  className="w-full bg-white text-primary-nav hover:bg-gray-100 transition-colors duration-200 font-medium px-6 py-2 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
