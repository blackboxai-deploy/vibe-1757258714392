'use client';

import { useState, useEffect, useRef } from 'react';
import { Message, AICharacter } from '@/types/chat';
import { ChatbotAI, getDefaultCharacter } from '@/lib/chatbot-ai';
import { VoiceSynthesis } from '@/lib/voice-synthesis';
import { ChatStorage } from '@/lib/chat-storage';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import CharacterSelector from './CharacterSelector';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<AICharacter>(getDefaultCharacter());
  const [chatbot, setChatbot] = useState<ChatbotAI>(new ChatbotAI(getDefaultCharacter()));
  const [voiceInstance] = useState<VoiceSynthesis>(new VoiceSynthesis());
  const [isVoiceEnabled] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Load saved data on component mount
  useEffect(() => {
    const savedMessages = ChatStorage.loadMessages();
    const savedCharacter = ChatStorage.loadCurrentCharacter();
    
    if (savedCharacter) {
      setCurrentCharacter(savedCharacter);
      setChatbot(new ChatbotAI(savedCharacter));
    }
    
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    } else {
      // Add welcome message for first visit
      const welcomeMessage: Message = {
        id: `msg-${Date.now()}`,
        content: currentCharacter.greeting,
        sender: 'ai',
        timestamp: new Date(),
        character: currentCharacter
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      ChatStorage.saveMessages(messages);
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await chatbot.generateResponse(content);
      
      const aiMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        character: currentCharacter
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the response if voice is enabled
      if (isVoiceEnabled && voiceInstance.isSynthesisSupported()) {
        try {
          await voiceInstance.speak(aiResponse);
        } catch (error) {
          console.error('Speech synthesis error:', error);
        }
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        content: "I apologize, but I'm having trouble processing your message right now. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
        character: currentCharacter
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCharacterChange = (character: AICharacter) => {
    setCurrentCharacter(character);
    setChatbot(new ChatbotAI(character));
    ChatStorage.saveCurrentCharacter(character);
    
    // Add character switch message
    const switchMessage: Message = {
      id: `msg-${Date.now()}-switch`,
      content: character.greeting,
      sender: 'ai',
      timestamp: new Date(),
      character: character
    };
    
    setMessages(prev => [...prev, switchMessage]);
  };

  const handleSpeakMessage = async (text: string) => {
    if (!voiceInstance.isSynthesisSupported()) return;
    
    try {
      await voiceInstance.speak(text);
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  const handleClearChat = () => {
    const welcomeMessage: Message = {
      id: `msg-${Date.now()}`,
      content: currentCharacter.greeting,
      sender: 'ai',
      timestamp: new Date(),
      character: currentCharacter
    };
    
    setMessages([welcomeMessage]);
    ChatStorage.saveMessages([welcomeMessage]);
  };

  const handleExportChat = () => {
    const chatData = ChatStorage.exportChatData();
    const blob = new Blob([chatData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-transparent">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-white/20 dark:border-slate-700/30 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          {/* Character Selector */}
          <CharacterSelector
            currentCharacter={currentCharacter}
            onCharacterChange={handleCharacterChange}
          />
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearChat}
              className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border border-white/20 dark:border-slate-600/20 rounded-lg transition-all duration-200 hover:bg-white/80 dark:hover:bg-slate-700/80"
            >
              Clear Chat
            </button>
            <button
              onClick={handleExportChat}
              className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border border-white/20 dark:border-slate-600/20 rounded-lg transition-all duration-200 hover:bg-white/80 dark:hover:bg-slate-700/80"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ scrollbarWidth: 'thin' }}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onSpeak={handleSpeakMessage}
          />
        ))}
        
        {/* Typing Indicator */}
        <TypingIndicator 
          character={currentCharacter} 
          isVisible={isTyping} 
        />
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="flex-shrink-0">
        <ChatInput
          onSendMessage={handleSendMessage}
          isDisabled={isTyping}
          placeholder={`Message ${currentCharacter.name}...`}
        />
      </div>
    </div>
  );
}