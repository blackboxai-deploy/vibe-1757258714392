'use client';

import { AICharacter } from '@/types/chat';

interface TypingIndicatorProps {
  character: AICharacter;
  isVisible: boolean;
}

export default function TypingIndicator({ character, isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <div className="flex items-start space-x-3 animate-fadeIn">
      {/* Character Avatar */}
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${character.color} p-0.5`}>
          <img
            src={character.avatar}
            alt={`${character.name} avatar`}
            className="w-full h-full rounded-full bg-white dark:bg-slate-800 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <div className={`hidden w-full h-full rounded-full bg-gradient-to-r ${character.color} flex items-center justify-center text-white text-xs font-bold`}>
            {character.name[0]}
          </div>
        </div>
      </div>

      {/* Typing Bubble */}
      <div className="max-w-xs lg:max-w-md">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl rounded-bl-sm px-4 py-3 shadow-lg border border-white/20 dark:border-slate-700/20">
          <div className="flex items-center space-x-2">
            {/* Character Name */}
            <span className={`text-xs font-semibold bg-gradient-to-r ${character.color} bg-clip-text text-transparent`}>
              {character.name}
            </span>
            
            {/* Typing Animation */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce"></div>
            </div>
          </div>
          
          {/* Typing Text */}
          <div className="mt-1">
            <span className="text-sm text-slate-600 dark:text-slate-300 animate-pulse">
              {character.name} is typing...
            </span>
          </div>
        </div>
        
        {/* Timestamp */}
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-1">
          now
        </div>
      </div>
    </div>
  );
}