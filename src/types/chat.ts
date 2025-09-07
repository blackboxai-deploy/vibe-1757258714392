export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  character?: AICharacter;
  isTyping?: boolean;
}

export interface AICharacter {
  id: string;
  name: string;
  description: string;
  personality: string;
  avatar: string;
  color: string;
  greeting: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  character: AICharacter;
  createdAt: Date;
  lastActive: Date;
}

export interface VoiceSettings {
  enabled: boolean;
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
}

export interface ChatState {
  messages: Message[];
  currentCharacter: AICharacter;
  isTyping: boolean;
  voiceSettings: VoiceSettings;
  theme: 'light' | 'dark';
}