import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/animations.css';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'AI Chatbot - Modern Character AI Assistant',
  description: 'A modern AI chatbot with multiple personalities, dark/light themes, and voice interaction capabilities.',
  keywords: ['AI', 'chatbot', 'artificial intelligence', 'voice chat', 'assistant'],
  authors: [{ name: 'BLACKBOX AI' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-colors duration-300">
            <div className="absolute inset-0 bg-grid-slate-100/[0.03] dark:bg-grid-slate-700/[0.05]" />
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}