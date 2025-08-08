"use client";

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface CounterProps {
  onAdd: (value: number) => void;
}

export default function Counter({ onAdd }: CounterProps) {
  const [count, setCount] = useState(0);
  const { isDarkMode } = useTheme();

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => Math.max(0, prev - 1));
  };

  const handleAdd = () => {
    if (count > 0) {
      onAdd(count);
      setCount(0); // Reset counter to 0 after adding
    }
  };

  return (
    <div className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-gray-800/80 border-gray-600' : 'bg-gray-50/80 border-gray-200'}`}>
      <div className="text-center">
        <h2 className={`text-2xl font-bold mb-8 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Counter</h2>

        {/* Counter Display */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
            <div className={`relative backdrop-blur-sm border rounded-2xl px-12 py-8 shadow-lg transition-colors duration-300 ${isDarkMode ? 'bg-gray-700/90 border-gray-600' : 'bg-white/90 border-gray-200'}`}>
              <span className={`text-6xl font-bold bg-clip-text text-transparent transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-r from-white to-blue-400' : 'bg-gradient-to-r from-gray-800 to-blue-600'}`}>
                {count}
              </span>
            </div>
          </div>
        </div>

        {/* Counter Controls */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <button
            onClick={decrement}
            className="group relative w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={count === 0}
          >
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">−</span>
          </button>

          <button
            onClick={increment}
            className="group relative w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
          >
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">+</span>
          </button>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          disabled={count === 0}
          className="group relative w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:transform-none"
        >
          <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative text-lg">Add to List</span>
        </button>
      </div>
    </div>
  );
}
