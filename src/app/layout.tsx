import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeInitializer } from '@/components/ui/ThemeInitializer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Claude Mastery — Interactive Learning for Claude Code & API',
  description:
    'Master Claude Code slash commands, hooks, skills, GSD plugin, API cost optimization, and live API usage through interactive lessons, a command browser, cost calculator, and hands-on playground.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <ThemeInitializer />
          <TooltipProvider delayDuration={300}>
            {children}
          </TooltipProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
