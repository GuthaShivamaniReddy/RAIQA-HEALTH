"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode, isAutoMode, setAutoMode } = useTheme();

  const handleToggle = () => {
    if (isAutoMode) {
      // If in auto mode, switch to manual mode and toggle
      setAutoMode(false);
      toggleDarkMode();
    } else {
      // If in manual mode, just toggle
      toggleDarkMode();
    }
  };

  const handleAutoToggle = () => {
    setAutoMode(!isAutoMode);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Auto/Manual Mode Toggle */}
      <button
        onClick={handleAutoToggle}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105 ${
          isAutoMode
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {isAutoMode ? "AUTO" : "MANUAL"}
      </button>

      {/* Theme Switch */}
      <button
        onClick={handleToggle}
        className="group relative w-14 h-7 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        {/* Switch Track */}
        <div
          className={`w-full h-full rounded-full transition-colors duration-300 shadow-inner ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-500 to-purple-600"
              : "bg-gray-200"
          }`}
        >
          {/* Switch Thumb */}
          <div
            className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 transform shadow-md ${
              isDarkMode ? "translate-x-7 bg-white" : "translate-x-0.5 bg-white"
            }`}
          >
            {/* Icon inside thumb */}
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-xs">{isDarkMode ? "☀️" : "🌙"}</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
