'use client';

import { Message } from '@/types/chat';
import { useState } from 'react';

interface MessageBubbleProps {
  message: Message;
  onSpeak?: (text: string) => void;
}

export default function MessageBubble({ message, onSpeak }: MessageBubbleProps) {
  const [imageError, setImageError] = useState(false);
  const isUser = message.sender === 'user';
  const timestamp = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className={`flex items-start space-x-3 animate-slideIn ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      {/* Avatar - only for AI messages */}
      {!isUser && message.character && (
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${message.character.color} p-0.5`}>
            {!imageError ? (
              <img
                src={message.character.avatar}
                alt={`${message.character.name} avatar`}
                className="w-full h-full rounded-full bg-white dark:bg-slate-800 object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className={`w-full h-full rounded-full bg-gradient-to-r ${message.character.color} flex items-center justify-center text-white text-xs font-bold`}>
                {message.character.name[0]}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message Content */}
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'ml-auto' : ''}`}>
        {/* Message Bubble */}
        <div 
          className={`rounded-2xl px-4 py-3 shadow-lg backdrop-blur-md border transition-all duration-200 hover:shadow-xl group ${
            isUser
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-sm border-blue-400/20'
              : 'bg-white/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 rounded-bl-sm border-white/20 dark:border-slate-700/20'
          }`}
        >
          {/* Character Name - only for AI messages */}
          {!isUser && message.character && (
            <div className="mb-1">
              <span className={`text-xs font-semibold bg-gradient-to-r ${message.character.color} bg-clip-text text-transparent`}>
                {message.character.name}
              </span>
            </div>
          )}
          
          {/* Message Text */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </div>
          
          {/* Action Buttons */}
          {!isUser && onSpeak && (
            <div className="flex items-center justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onSpeak(message.content)}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                aria-label="Speak message"
              >
                <svg
                  className="w-4 h-4 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <div className={`text-xs text-slate-500 dark:text-slate-400 mt-1 ${
          isUser ? 'text-right mr-1' : 'ml-1'
        }`}>
          {timestamp}
        </div>
      </div>

      {/* User Avatar Placeholder */}
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">YOU</span>
          </div>
        </div>
      )}
    </div>
  );
}