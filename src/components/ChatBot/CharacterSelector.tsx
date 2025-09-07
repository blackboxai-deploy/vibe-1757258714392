'use client';

import { AICharacter } from '@/types/chat';
import { AI_CHARACTERS } from '@/lib/chatbot-ai';
import { useState } from 'react';

interface CharacterSelectorProps {
  currentCharacter: AICharacter;
  onCharacterChange: (character: AICharacter) => void;
}

export default function CharacterSelector({ 
  currentCharacter, 
  onCharacterChange 
}: CharacterSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (characterId: string) => {
    setImageErrors(prev => ({ ...prev, [characterId]: true }));
  };

  const handleCharacterSelect = (character: AICharacter) => {
    onCharacterChange(character);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-3 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700/20 shadow-lg hover:shadow-xl transition-all duration-200 group"
        aria-label="Select AI Character"
      >
        {/* Current Character Avatar */}
        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${currentCharacter.color} p-0.5`}>
          {!imageErrors[currentCharacter.id] ? (
            <img
              src={currentCharacter.avatar}
              alt={`${currentCharacter.name} avatar`}
              className="w-full h-full rounded-full bg-white dark:bg-slate-800 object-cover"
              onError={() => handleImageError(currentCharacter.id)}
            />
          ) : (
            <div className={`w-full h-full rounded-full bg-gradient-to-r ${currentCharacter.color} flex items-center justify-center text-white text-sm font-bold`}>
              {currentCharacter.name[0]}
            </div>
          )}
        </div>
        
        {/* Character Info */}
        <div className="text-left">
          <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
            {currentCharacter.name}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {currentCharacter.description}
          </div>
        </div>
        
        {/* Dropdown Arrow */}
        <div className={`text-slate-500 dark:text-slate-400 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute top-full mt-2 left-0 right-0 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-xl shadow-2xl overflow-hidden animate-slideDown">
            <div className="p-2">
              {AI_CHARACTERS.map((character) => (
                <button
                  key={character.id}
                  onClick={() => handleCharacterSelect(character)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-white/50 dark:hover:bg-slate-700/50 ${
                    character.id === currentCharacter.id 
                      ? 'bg-blue-50/50 dark:bg-blue-900/20' 
                      : ''
                  }`}
                >
                  {/* Character Avatar */}
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${character.color} p-0.5 flex-shrink-0`}>
                    {!imageErrors[character.id] ? (
                      <img
                        src={character.avatar}
                        alt={`${character.name} avatar`}
                        className="w-full h-full rounded-full bg-white dark:bg-slate-800 object-cover"
                        onError={() => handleImageError(character.id)}
                      />
                    ) : (
                      <div className={`w-full h-full rounded-full bg-gradient-to-r ${character.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {character.name[0]}
                      </div>
                    )}
                  </div>
                  
                  {/* Character Details */}
                  <div className="text-left flex-1">
                    <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {character.name}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                      {character.description}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500 mt-0.5 line-clamp-2">
                      {character.personality}
                    </div>
                  </div>
                  
                  {/* Selected Indicator */}
                  {character.id === currentCharacter.id && (
                    <div className="text-blue-500 dark:text-blue-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}