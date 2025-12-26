// components/PaginationControls.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-6 mt-8 px-4">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center justify-center rounded-[20px] border-[3px] transition-all duration-200 ${
          canGoPrevious
            ? "border-blue-400 text-blue-500 hover:bg-blue-500 hover:text-white"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
        }`}
        style={{
          width: "clamp(100px, 25vw, 137px)",
          height: "53px",
          padding: "11px 8px",
          gap: "10px",
        }}
      >
        <ChevronLeft size={16} className="sm:inline block" />
        <span className="font-medium text-xs sm:text-sm hidden sm:inline">
          Previous
        </span>
        <span className="font-medium text-xs sm:hidden">Prev</span>
      </button>

      <span className="text-blue-600 font-medium px-2 sm:px-4 text-sm sm:text-base whitespace-nowrap">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`flex items-center justify-center rounded-[20px] border-[3px] transition-all duration-200 ${
          canGoNext
            ? "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
            : "border-gray-300 text-gray-400 cursor-not-allowed"
        }`}
        style={{
          width: "clamp(90px, 22vw, 123px)",
          height: "53px",
          padding: "11px 8px",
        }}
      >
        <span className="font-medium text-xs sm:text-sm hidden sm:inline">
          Next
        </span>
        <span className="font-medium text-xs sm:hidden">Next</span>
        <ChevronRight size={16} className="sm:inline block" />
      </button>
    </div>
  );
};

export default PaginationControls;
