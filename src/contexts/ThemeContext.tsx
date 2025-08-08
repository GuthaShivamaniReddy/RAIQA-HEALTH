"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isAutoMode: boolean;
  setAutoMode: (autoMode: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAutoMode, setAutoMode] = useState(true);

  // Function to check if it's night time (6 PM to 6 AM)
  const isNightTime = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 18 || hour < 6; // 6 PM to 6 AM
  };

  useEffect(() => {
    // Load theme preferences from localStorage
    const savedTheme = localStorage.getItem("theme");
    const savedAutoMode = localStorage.getItem("autoMode");

    if (savedAutoMode !== null) {
      setAutoMode(savedAutoMode === "true");
    }

    if (savedTheme && savedAutoMode !== "true") {
      setIsDarkMode(savedTheme === "dark");
    } else if (isAutoMode) {
      setIsDarkMode(isNightTime());
    }
  }, []);

  // Auto-switch theme based on time
  useEffect(() => {
    if (!isAutoMode) return;

    const checkTime = () => {
      const shouldBeDark = isNightTime();
      if (shouldBeDark !== isDarkMode) {
        setIsDarkMode(shouldBeDark);
        localStorage.setItem("theme", shouldBeDark ? "dark" : "light");
      }
    };

    // Check immediately
    checkTime();

    // Set up interval to check every minute
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, [isAutoMode, isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    // When manually toggling, turn off auto mode
    setAutoMode(false);
    localStorage.setItem("autoMode", "false");
  };

  const handleSetAutoMode = (autoMode: boolean) => {
    setAutoMode(autoMode);
    localStorage.setItem("autoMode", autoMode.toString());
    if (autoMode) {
      const shouldBeDark = isNightTime();
      setIsDarkMode(shouldBeDark);
      localStorage.setItem("theme", shouldBeDark ? "dark" : "light");
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        isAutoMode,
        setAutoMode: handleSetAutoMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
