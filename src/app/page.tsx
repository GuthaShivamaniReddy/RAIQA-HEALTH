"use client";

import { useState, useEffect } from "react";
import Counter from "@/components/Counter";
import ListView from "@/components/ListView";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useTheme } from "@/contexts/ThemeContext";

export default function Home() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const { isDarkMode } = useTheme();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedNumbers = localStorage.getItem("counterNumbers");
    if (savedNumbers) {
      setNumbers(JSON.parse(savedNumbers));
    }
  }, []);

  // Save data to localStorage whenever numbers change
  useEffect(() => {
    localStorage.setItem("counterNumbers", JSON.stringify(numbers));
  }, [numbers]);

  const handleAdd = (value: number) => {
    setNumbers((prev) => [...prev, value]);
  };

  const handleRemove = (index: number) => {
    setNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setNumbers([]);
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,${
          isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"
        }_1px,transparent_0)] opacity-30`}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute top-0 right-0">
              <DarkModeToggle />
            </div>
            <h1
              className={`text-5xl font-bold mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Counter & List App
            </h1>
          </div>

          {/* App Container */}
          <div className="space-y-8">
            <Counter onAdd={handleAdd} />
            <ListView
              numbers={numbers}
              onRemove={handleRemove}
              onReset={handleReset}
            />
          </div>

          {/* Footer */}
          <div
            className={`text-center mt-12 transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p className="text-sm">
              Built with Next.js • Tailwind CSS • TypeScript
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
