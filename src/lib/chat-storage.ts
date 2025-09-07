import { Message, ChatSession, AICharacter } from '@/types/chat';

const STORAGE_KEYS = {
  MESSAGES: 'chatbot_messages',
  SESSIONS: 'chatbot_sessions',
  CURRENT_CHARACTER: 'chatbot_current_character',
  SETTINGS: 'chatbot_settings'
};

export class ChatStorage {
  // Save messages to localStorage
  static saveMessages(messages: Message[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  }

  // Load messages from localStorage
  static loadMessages(): Message[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (stored) {
        const messages = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        return messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
    
    return [];
  }

  // Save current character
  static saveCurrentCharacter(character: AICharacter): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_CHARACTER, JSON.stringify(character));
    } catch (error) {
      console.error('Failed to save current character:', error);
    }
  }

  // Load current character
  static loadCurrentCharacter(): AICharacter | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_CHARACTER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load current character:', error);
    }
    
    return null;
  }

  // Save chat session
  static saveChatSession(session: ChatSession): void {
    if (typeof window === 'undefined') return;
    
    try {
      const sessions = this.loadChatSessions();
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.push(session);
      }
      
      // Keep only the last 10 sessions
      const limitedSessions = sessions.slice(-10);
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(limitedSessions));
    } catch (error) {
      console.error('Failed to save chat session:', error);
    }
  }

  // Load all chat sessions
  static loadChatSessions(): ChatSession[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (stored) {
        const sessions = JSON.parse(stored);
        // Convert date strings back to Date objects
        return sessions.map((session: any) => ({
          ...session,
          createdAt: new Date(session.createdAt),
          lastActive: new Date(session.lastActive),
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
      }
    } catch (error) {
      console.error('Failed to load chat sessions:', error);
    }
    
    return [];
  }

  // Save settings (voice, theme preferences, etc.)
  static saveSettings(settings: any): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  // Load settings
  static loadSettings(): any {
    if (typeof window === 'undefined') return {};
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
    
    return {};
  }

  // Clear all data
  static clearAll(): void {
    if (typeof window === 'undefined') return;
    
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  // Export chat data as JSON
  static exportChatData(): string {
    const data = {
      messages: this.loadMessages(),
      sessions: this.loadChatSessions(),
      currentCharacter: this.loadCurrentCharacter(),
      settings: this.loadSettings(),
      exportedAt: new Date().toISOString()
    };
    
    return JSON.stringify(data, null, 2);
  }

  // Import chat data from JSON
  static importChatData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.messages) this.saveMessages(data.messages);
      if (data.currentCharacter) this.saveCurrentCharacter(data.currentCharacter);
      if (data.settings) this.saveSettings(data.settings);
      
      return true;
    } catch (error) {
      console.error('Failed to import chat data:', error);
      return false;
    }
  }
}