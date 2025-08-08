"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface ListViewProps {
  numbers: number[];
  onRemove: (index: number) => void;
  onReset: () => void;
}

export default function ListView({
  numbers,
  onRemove,
  onReset,
}: ListViewProps) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortedNumbers, setSortedNumbers] = useState<number[]>([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const sorted = [...numbers].sort((a, b) => {
      return sortOrder === "asc" ? a - b : b - a;
    });
    setSortedNumbers(sorted);
  }, [numbers, sortOrder]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const getHighestAndLowest = () => {
    if (numbers.length === 0) return { highest: null, lowest: null };
    const highest = Math.max(...numbers);
    const lowest = Math.min(...numbers);
    return { highest, lowest };
  };

  const { highest, lowest } = getHighestAndLowest();

  return (
    <div
      className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-800/80 border-gray-600"
          : "bg-gray-50/80 border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h2
          className={`text-2xl font-bold transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Numbers List
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={onReset}
            className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Reset</span>
          </button>
          <button
            onClick={toggleSort}
            className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">
              Sort {sortOrder === "asc" ? "↑" : "↓"}
            </span>
          </button>
        </div>
      </div>

      {sortedNumbers.length === 0 ? (
        <div className="text-center py-12">
          <div
            className={`text-lg mb-4 transition-colors duration-300 ${
              isDarkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            📝
          </div>
          <p
            className={`text-lg transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-400"
            }`}
          >
            No numbers added yet
          </p>
          <p
            className={`text-sm mt-2 transition-colors duration-300 ${
              isDarkMode ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Use the counter above to add some numbers
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedNumbers.map((number, index) => {
            // Find all indices of this number to handle duplicates
            const allIndices = numbers
              .map((num, idx) => (num === number ? idx : -1))
              .filter((idx) => idx !== -1);

            // Use the index in the sorted array to create unique keys
            const originalIndex = allIndices[index % allIndices.length];
            const isHighest = number === highest && highest !== lowest;
            const isLowest = number === lowest && lowest !== highest;

            return (
              <div
                key={`${number}-${originalIndex}-${index}`}
                className={`group relative backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isHighest
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30"
                    : isLowest
                    ? "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/30"
                    : isDarkMode
                    ? "bg-gray-700/80 hover:bg-gray-600/90 border-gray-600"
                    : "bg-white/80 hover:bg-white/90 border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-lg"></div>
                      <div
                        className={`relative backdrop-blur-sm border rounded-xl px-4 py-2 shadow-sm transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-gray-600/90 border-gray-500"
                            : "bg-white/90 border-gray-200"
                        }`}
                      >
                        <span
                          className={`text-2xl font-bold transition-colors duration-300 ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {number}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-400 text-sm">
                        #{originalIndex + 1}
                      </span>
                      {isHighest && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full border transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-green-500/20 text-green-300 border-green-400/30"
                              : "bg-green-500/20 text-green-700 border-green-400/30"
                          }`}
                        >
                          Highest
                        </span>
                      )}
                      {isLowest && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full border transition-colors duration-300 ${
                            isDarkMode
                              ? "bg-red-500/20 text-red-300 border-red-400/30"
                              : "bg-red-500/20 text-red-700 border-red-400/30"
                          }`}
                        >
                          Lowest
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(originalIndex)}
                    className={`group/remove relative w-8 h-8 rounded-full hover:bg-red-500/40 font-bold text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                      isDarkMode
                        ? "bg-red-500/20 text-red-300 hover:text-red-200"
                        : "bg-red-500/20 text-red-600 hover:text-red-700"
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover/remove:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative">×</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

             <div className={`mt-8 pt-6 border-t transition-colors duration-300 ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
         <div className="text-center">
           <p className={`text-lg transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
             Total numbers:{" "}
             <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
               {numbers.length}
             </span>
           </p>
         </div>
       </div>
    </div>
  );
}
