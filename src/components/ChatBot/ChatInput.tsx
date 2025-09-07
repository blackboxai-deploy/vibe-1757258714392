'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import VoiceControls from './VoiceControls';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled: boolean;
  placeholder?: string;
}

export default function ChatInput({ 
  onSendMessage, 
  isDisabled, 
  placeholder = "Type your message..." 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isDisabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleVoiceInput = (text: string) => {
    setMessage(prev => prev + (prev ? ' ' : '') + text);
    if (textareaRef.current) {
      textareaRef.current.focus();
      // Auto-resize after voice input
      textareaRef.current.style.height = '44px';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleVoiceToggle = (enabled: boolean) => {
    setIsVoiceEnabled(enabled);
  };

  const canSend = message.trim().length > 0 && !isDisabled;

  return (
    <div className="border-t border-white/20 dark:border-slate-700/30 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl">
      <div className="p-4">
        <div className="flex items-end space-x-3">
          {/* Voice Controls */}
          <VoiceControls
            onVoiceInput={handleVoiceInput}
            onVoiceToggle={handleVoiceToggle}
            isVoiceEnabled={isVoiceEnabled}
          />
          
          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={isDisabled}
              className="w-full px-4 py-3 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border border-white/30 dark:border-slate-600/30 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '44px', maxHeight: '120px' }}
              rows={1}
            />
            
            {/* Character Counter */}
            {message.length > 0 && (
              <div className="absolute bottom-1 right-14 text-xs text-slate-400 dark:text-slate-500">
                {message.length}
              </div>
            )}
          </div>

          {/* Send Button */}
          <button
            onClick={handleSubmit}
            disabled={!canSend}
            className={`p-3 rounded-2xl transition-all duration-200 shadow-lg ${
              canSend
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${
                canSend ? 'hover:scale-110' : ''
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>

        {/* Input Hints */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
            <span>Press Enter to send</span>
            <span>Shift + Enter for new line</span>
          </div>
          
          {isVoiceEnabled && (
            <div className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Voice enabled</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}