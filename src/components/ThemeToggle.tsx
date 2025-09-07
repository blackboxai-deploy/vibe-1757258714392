'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-7 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="group relative w-14 h-7 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-full shadow-inner transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <div
        className={`absolute top-0.5 w-6 h-6 bg-white dark:bg-slate-300 rounded-full shadow-lg transform transition-all duration-300 ease-in-out flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'
        }`}
      >
        {/* Sun Icon */}
        <div
          className={`transition-all duration-300 ${
            theme === 'dark' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <svg
            className="w-3 h-3 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        
        {/* Moon Icon */}
        <div
          className={`absolute transition-all duration-300 ${
            theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
        >
          <svg
            className="w-3 h-3 text-slate-700"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </div>
      
      {/* Background Glow Effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
            : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20'
        } opacity-0 group-hover:opacity-100`}
      />
    </button>
  );
}