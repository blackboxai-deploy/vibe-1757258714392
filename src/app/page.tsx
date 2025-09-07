'use client';

import ChatInterface from '@/components/ChatBot/ChatInterface';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-20 p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-sm"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                AI Character Chat
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Modern AI Assistant with Personality
              </p>
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </header>

      {/* Main Chat Interface */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 pb-6">
        <div className="h-full bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20 overflow-hidden">
          <ChatInterface />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Powered by AI Character Technology • 
            <span className="mx-2">•</span>
            Voice & Text Interaction
          </p>
        </div>
      </footer>
    </main>
  );
}