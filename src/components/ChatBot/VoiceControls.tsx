'use client';

import { useState, useEffect } from 'react';
import { VoiceSynthesis } from '@/lib/voice-synthesis';

interface VoiceControlsProps {
  onVoiceInput: (text: string) => void;
  onVoiceToggle: (enabled: boolean) => void;
  isVoiceEnabled: boolean;
}

export default function VoiceControls({ 
  onVoiceInput, 
  onVoiceToggle, 
  isVoiceEnabled 
}: VoiceControlsProps) {
  const [isListening, setIsListening] = useState(false);
  const [voiceInstance, setVoiceInstance] = useState<VoiceSynthesis | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const voice = new VoiceSynthesis();
    setVoiceInstance(voice);
    setIsSupported(voice.isRecognitionSupported() && voice.isSynthesisSupported());
  }, []);

  const startListening = async () => {
    if (!voiceInstance || !isSupported) return;
    
    try {
      setIsListening(true);
      setError(null);
      
      const result = await voiceInstance.startListening();
      if (result.trim()) {
        onVoiceInput(result);
      }
    } catch (error: any) {
      setError(error.message || 'Voice recognition failed');
      console.error('Voice recognition error:', error);
    } finally {
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (voiceInstance) {
      voiceInstance.stopListening();
      setIsListening(false);
    }
  };

  const toggleVoice = () => {
    const newState = !isVoiceEnabled;
    onVoiceToggle(newState);
    
    if (!newState && voiceInstance) {
      voiceInstance.stopSpeaking();
    }
  };

  if (!isSupported) {
    return null; // Don't render if voice features aren't supported
  }

  return (
    <div className="flex items-center space-x-2">
      {/* Voice Input Button */}
      <button
        onClick={isListening ? stopListening : startListening}
        disabled={!isSupported}
        className={`p-3 rounded-full transition-all duration-200 shadow-lg border ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white border-red-400 animate-pulse'
            : 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/20 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300'
        } hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
      >
        {isListening ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v3a1 1 0 11-2 0V7zM12 9a1 1 0 10-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        )}
      </button>

      {/* Voice Toggle Button */}
      <button
        onClick={toggleVoice}
        className={`p-2.5 rounded-full transition-all duration-200 shadow-lg border ${
          isVoiceEnabled
            ? 'bg-blue-500 hover:bg-blue-600 text-white border-blue-400'
            : 'bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border-white/20 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300'
        } hover:shadow-xl`}
        aria-label={`${isVoiceEnabled ? 'Disable' : 'Enable'} voice responses`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isVoiceEnabled 
              ? "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6 10l6-6v4c0 1.105-.895 2-2 2H6z"
              : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            }
          />
        </svg>
      </button>

      {/* Status Indicators */}
      {isListening && (
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-100/80 dark:bg-red-900/20 backdrop-blur-sm rounded-full border border-red-200 dark:border-red-800">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-red-700 dark:text-red-300">
            Listening...
          </span>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-100/80 dark:bg-red-900/20 backdrop-blur-sm rounded-full border border-red-200 dark:border-red-800">
          <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-xs font-medium text-red-700 dark:text-red-300">
            Voice Error
          </span>
        </div>
      )}
    </div>
  );
}