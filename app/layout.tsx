import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AuraTrack - Track Your Emotional Aura',
  description:
    'Log your daily moods, track emotional trends, and visualize patterns over time. Understand yourself better with AuraTrack.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body >{children}</body>
    </html>
  );
}
