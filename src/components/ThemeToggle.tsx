import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(true); // Start with dark mode as default
    const [mounted, setMounted] = useState(false);

    // Set theme on initial load and handle mounted state
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (saved === "light") {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        } else if (saved === "dark" || (!saved && prefersDark)) {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
    }, []);

    // Toggle the 'dark' class on <html>
    const handleToggle = () => {
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <button
                className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="Toggle theme"
            >
                <div className="w-5 h-5" />
            </button>
        );
    }

    return (
        <button
            onClick={handleToggle}
            className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-900 dark:text-white shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-200 dark:border-slate-700"
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Sun className="w-5 h-5 transition-transform duration-300 rotate-0 scale-100" />
            ) : (
                <Moon className="w-5 h-5 transition-transform duration-300 rotate-0 scale-100" />
            )}
        </button>
    );
};

export default ThemeToggle;
