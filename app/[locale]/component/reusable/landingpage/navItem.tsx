"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { secneedle } from "@/public/assests/image";
import { useAuth } from "@/app/lib/hooks/useAuths";
import { logout } from "@/app/lib/features/auth/authSlice";
import { useLocale, useTranslations } from "next-intl";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const t = useTranslations("nav");

  const languageRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, user } = useAuth();

  const locale = useLocale();

  useEffect(() => {
    const reverseLocaleMap: Record<string, string> = {
      en: "ENG",
      fr: "FR",
      es: "ES",
    };

    setSelectedLanguage(reverseLocaleMap[locale]);
  }, [locale]);

  // Navigation items with their routes
  const navItems = [
    { key: "home", href: `/${locale}` },
    { key: "blog", href: `/${locale}/pages/blogScreen` },
    { key: "videos", href: `/${locale}/pages/videoScreen` },
    { key: "services", href: `/${locale}/pages/servicesScreen` },
    { key: "portfolio", href: `/${locale}/pages/portfolioScreen` },
    { key: "activities", href: `/${locale}/pages/activityScreen` },
    { key: "about", href: `/${locale}/pages/contactScreen` },
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
    { code: "ES", name: "Spanish", flag: "🇪🇸" },
  ];

  const localeMap: Record<string, string> = {
    ENG: "en",
    FR: "fr",
    ES: "es",
  };
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
    const locale = localeMap[language.code];

    setSelectedLanguage(language.code);
    setIsLanguageOpen(false);

    // Remove current locale from pathname
    const segments = pathname.split("/");
    segments[1] = locale;

    router.replace(segments.join("/"));
  };

  const handleLogout = () => {
    logout();
    router.push(`/${locale}`);
  };

  return (
    <nav className="bg-primary-nav text-white shadow-lg relative z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <Link
              href={`/${locale}`}
              className="rounded-full flex items-center justify-center overflow-hidden"
            >
              <Image
                src={secneedle}
                alt="SecNeedle Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 py-1 sm:py-2 object-cover"
              />
            </Link>
          </div>

          {/* Desktop (1536px+): Full navigation with all items */}
          <div className="hidden min-[1536px]:flex items-center space-x-6 font-times flex-1 justify-center cursor-pointer">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`transition-colors duration-200 font-medium relative group text-base whitespace-nowrap px-3 py-1.5 ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {t(item.key)}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-200 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Right Side - Language + Auth Buttons + Hamburger for 767-1536px */}
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

            {/* Auth Buttons - Show only on desktop (1536px+) */}
            <div className="hidden min-[1536px]:flex items-center space-x-4 font-orelega">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user?.picture}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                  {/* <button
                    onClick={handleLogout}
                    className="text-white hover:text-red-300 transition-colors duration-200 font-medium px-4 py-2 text-base"
                  >
                    Logout
                  </button> */}
                </div>
              ) : (
                <Link
                  href="/pages/blogScreen"
                  className="text-white hover:text-blue-200 transition-colors duration-200 font-medium px-4 py-2 text-base"
                >
                  {/* Login */}
                </Link>
              )}
            </div>

            {/* Hamburger Menu Button - Show from 0px to 1535px */}
            <button
              className="min-[1536px]:hidden p-1.5 sm:p-2 rounded-lg hover:bg-blue-700/50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu - Show from 0px to 1535px */}
        {isMenuOpen && (
          <div className="min-[1536px]:hidden absolute top-full left-0 right-0 bg-blue-900 border-t border-blue-700 shadow-xl">
            <div className="px-4 py-4 space-y-2 sm:space-y-3 max-h-[80vh] overflow-y-auto">
              {/* Navigation Links */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg transition-colors duration-200 font-medium text-sm sm:text-base relative ${
                      isActive(item.href)
                        ? "bg-blue-800 text-white"
                        : "text-white hover:text-blue-200 hover:bg-blue-800/50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.key)}
                    {isActive(item.href) && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r"></span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Auth Section */}
              <div className="pt-3 sm:pt-4 border-t border-blue-700 space-y-2 sm:space-y-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-blue-800/50 rounded-lg">
                      <img
                        src={user?.picture}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                      <div>
                        <p className="text-white font-medium">{user?.name}</p>
                        <p className="text-blue-200 text-sm">{user?.email}</p>
                      </div>
                    </div>
                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 font-medium px-6 py-3 rounded-lg text-sm sm:text-base"
                    >
                      {t("logout")}
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/pages/blogScreen"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 bg-white text-primary-nav hover:bg-gray-100 transition-colors duration-200 font-medium rounded-lg text-sm sm:text-base"
                  >
                    {/* {t("login")} */}
                  </Link>
                )}
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
