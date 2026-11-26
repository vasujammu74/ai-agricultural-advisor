import './globals.css';
import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { LanguageProvider } from '@/components/language-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const display = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'AI Agricultural Advisor — Multilingual AI Assistant for Farmers',
  description:
    'Ask farming questions by voice or text in your language, and detect plant diseases from a photo. AI-powered guidance built for farmers.',
  manifest: '/manifest.webmanifest',
  applicationName: 'AI Agricultural Advisor',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AI Agri Advisor',
  },
  formatDetection: { telephone: false },
  themeColor: '#1f6b3a',
  openGraph: {
    title: 'AI Agricultural Advisor',
    description: 'Multilingual AI Assistant for Farmers',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${display.variable} font-sans antialiased`}>
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
