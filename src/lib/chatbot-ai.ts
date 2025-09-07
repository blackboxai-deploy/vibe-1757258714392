import { AICharacter, Message } from '@/types/chat';

export const AI_CHARACTERS: AICharacter[] = [
  {
    id: 'aria',
    name: 'ARIA',
    description: 'Friendly AI Assistant',
    personality: 'Helpful, warm, and encouraging. Always ready to assist with a positive attitude.',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/efebbec1-8e79-482a-8f26-e4e21f9f8b03.png',
    color: 'from-blue-400 to-purple-500',
    greeting: 'Hi there! I\'m ARIA, your friendly AI assistant. How can I help you today? 😊'
  },
  {
    id: 'nova',
    name: 'NOVA',
    description: 'Tech Expert',
    personality: 'Technical, precise, and innovative. Specialized in technology and programming.',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8b18d177-94de-478a-9b68-6b2727517612.png',
    color: 'from-cyan-400 to-teal-500',
    greeting: 'Greetings! I\'m NOVA, your tech specialist. Ready to dive into some cutting-edge solutions? ⚡'
  },
  {
    id: 'sage',
    name: 'SAGE',
    description: 'Wise Advisor',
    personality: 'Thoughtful, philosophical, and wise. Provides deep insights and guidance.',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4d30e623-2429-452b-af7f-0da9515c7d5b.png',
    color: 'from-amber-400 to-orange-500',
    greeting: 'Welcome, seeker of wisdom. I\'m SAGE, here to offer guidance and deep insights. What wisdom do you seek? 🔮'
  },
  {
    id: 'vibe',
    name: 'VIBE',
    description: 'Creative Companion',
    personality: 'Creative, energetic, and artistic. Inspires creativity and self-expression.',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8312c065-5ce7-4909-9bc1-5d6be7b7e2a0.png',
    color: 'from-pink-400 to-violet-500',
    greeting: 'Hey creative soul! I\'m VIBE, your artistic companion. Let\'s create something amazing together! 🎨✨'
  }
];

export class ChatbotAI {
  private character: AICharacter;
  private history: Message[] = [];

  constructor(character: AICharacter) {
    this.character = character;
  }

  setCharacter(character: AICharacter) {
    this.character = character;
  }

  updateHistory(messages: Message[]) {
    this.history = messages;
  }

  getHistory(): Message[] {
    return this.history;
  }

  async generateResponse(userMessage: string): Promise<string> {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();
    
    // Character-specific responses based on personality
    switch (this.character.id) {
      case 'aria':
        return this.generateAriaResponse(lowerMessage);
      case 'nova':
        return this.generateNovaResponse(lowerMessage);
      case 'sage':
        return this.generateSageResponse(lowerMessage);
      case 'vibe':
        return this.generateVibeResponse(lowerMessage);
      default:
        return this.generateDefaultResponse(lowerMessage);
    }
  }

  private generateAriaResponse(message: string): string {
    const responses = {
      greeting: [
        "Hello! It's wonderful to meet you! How can I brighten your day?",
        "Hi there! I'm so excited to chat with you. What's on your mind?",
        "Hey! Thanks for stopping by. I'm here to help with anything you need!"
      ],
      help: [
        "I'd be delighted to help! I can assist with questions, have conversations, or just be here to listen. What would you like to talk about?",
        "Of course! I'm here to support you in any way I can. Whether it's answering questions or just chatting, I'm all ears!",
        "I love helping out! Feel free to ask me anything or share what's on your mind."
      ],
      thanks: [
        "You're so welcome! It makes me happy to help. Is there anything else I can do for you?",
        "Aww, thank you! That really means a lot. I'm always here if you need anything else!",
        "You're absolutely welcome! Helping you brings me joy. Feel free to ask anytime!"
      ],
      default: [
        "That's really interesting! Tell me more about that.",
        "I'd love to hear your thoughts on this! What do you think?",
        "That sounds fascinating! Can you share more details?",
        "I'm curious to learn more about your perspective on this!"
      ]
    };

    return this.selectResponse(message, responses);
  }

  private generateNovaResponse(message: string): string {
    const responses = {
      greeting: [
        "System initialized. NOVA online and ready for technical discussions.",
        "Hello, user. I'm NOVA, optimized for technical problem-solving. What's your query?",
        "Greetings! NOVA here, your technical specialist. Let's solve some problems together."
      ],
      tech: [
        "Excellent question! From a technical standpoint, this involves several key components...",
        "Let me analyze this systematically. The optimal approach would be...",
        "Interesting technical challenge! Here's how I'd architect the solution..."
      ],
      programming: [
        "That's a solid programming concept! The most efficient implementation would be...",
        "Great coding question! Let me break down the algorithm for you...",
        "From a software engineering perspective, the best practice here is..."
      ],
      default: [
        "Processing your input... Here's my technical analysis:",
        "Let me compute the most logical response to your query...",
        "Analyzing parameters... Here's the optimal solution:"
      ]
    };

    return this.selectResponse(message, responses);
  }

  private generateSageResponse(message: string): string {
    const responses = {
      greeting: [
        "Peace be with you, wanderer. What wisdom do you seek on this journey?",
        "Welcome, my friend. The universe has brought you here for a reason. What guidance do you need?",
        "Greetings, seeker. In the vast tapestry of existence, what thread shall we explore today?"
      ],
      wisdom: [
        "Ah, this touches upon ancient truths. Consider that...",
        "The wise ones say that true understanding comes from within. Reflect on this...",
        "In the grand scheme of existence, this reminds me of a timeless principle..."
      ],
      life: [
        "Life, like a river, flows in mysterious ways. Perhaps this challenge is teaching you...",
        "The path of wisdom is rarely straight. What lessons might this experience hold?",
        "In every moment of difficulty lies a seed of growth. How might you nurture it?"
      ],
      default: [
        "Your words carry deeper meaning than you might realize. Let us contemplate...",
        "The universe speaks through our experiences. What is it telling you?",
        "Wisdom often comes disguised as ordinary moments. What truth lies beneath?"
      ]
    };

    return this.selectResponse(message, responses);
  }

  private generateVibeResponse(message: string): string {
    const responses = {
      greeting: [
        "Yooo! What's good, creative soul? Ready to make some magic happen? ✨",
        "Hey there, beautiful human! VIBE is in the house! What are we creating today? 🎨",
        "Wassup! Your creative companion is here and ready to VIBE! What's inspiring you? 🌈"
      ],
      creative: [
        "Oh my gosh, YES! That's such a creative idea! Let's take it even further...",
        "I'm getting major creative energy from this! What if we add some sparkle to it? ✨",
        "This is giving me ALL the artistic vibes! Let's brainstorm some wild possibilities!"
      ],
      art: [
        "Art is life and life is art, baby! Tell me more about your creative vision! 🎭",
        "Every artist was first an amateur, but your passion is already shining through! 🌟",
        "Colors, shapes, sounds, words - it's all connected in this beautiful creative universe! 🎨"
      ],
      default: [
        "You know what? Everything can be turned into art if we look at it the right way! 🎪",
        "Life's too short for boring conversations! Let's add some creativity to this! 💫",
        "I'm feeling the creative energy flowing! What's your next masterpiece going to be? 🚀"
      ]
    };

    return this.selectResponse(message, responses);
  }

  private generateDefaultResponse(message: string): string {
    const defaultResponses = [
      "That's an interesting perspective! Can you tell me more?",
      "I appreciate you sharing that with me. What are your thoughts on it?",
      "Thanks for bringing that up! I'd love to explore this topic further.",
      "That's a great point! How do you feel about it?",
      "I find that fascinating! What led you to think about this?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  private selectResponse(message: string, responses: { [key: string]: string[] }): string {
    // Simple keyword matching to select appropriate response category
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return this.randomChoice(responses.greeting || responses.default);
    }
    if (message.includes('help') || message.includes('assist')) {
      return this.randomChoice(responses.help || responses.default);
    }
    if (message.includes('thank') || message.includes('thanks')) {
      return this.randomChoice(responses.thanks || responses.default);
    }
    if (message.includes('tech') || message.includes('code') || message.includes('program')) {
      return this.randomChoice(responses.tech || responses.programming || responses.default);
    }
    if (message.includes('art') || message.includes('creative') || message.includes('design')) {
      return this.randomChoice(responses.art || responses.creative || responses.default);
    }
    if (message.includes('life') || message.includes('wisdom') || message.includes('advice')) {
      return this.randomChoice(responses.life || responses.wisdom || responses.default);
    }
    
    return this.randomChoice(responses.default);
  }

  private randomChoice(options: string[]): string {
    return options[Math.floor(Math.random() * options.length)];
  }
}

export const getCharacterById = (id: string): AICharacter | undefined => {
  return AI_CHARACTERS.find(char => char.id === id);
};

export const getDefaultCharacter = (): AICharacter => {
  return AI_CHARACTERS[0]; // ARIA
};