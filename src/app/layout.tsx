import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import { Providers } from '@/lib/providers';
import { ThemeScript } from '@/components/theme';
import './globals.css';

// Playfair Display (영문 세리프 제목용)
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: '예산윈드오케스트라',
    template: '%s | 예산윈드오케스트라',
  },
  description:
    '예산윈드오케스트라는 충청남도 예산군을 기반으로 활동하는 관악 오케스트라입니다. 음악으로 하나되는 예산, 예산윈드오케스트라가 함께합니다.',
  keywords: [
    '예산',
    '오케스트라',
    '관악',
    '윈드오케스트라',
    '예산군',
    '음악',
    '클래식',
    '공연',
  ],
  authors: [{ name: '예산윈드오케스트라' }],
  creator: '예산윈드오케스트라',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '예산윈드오케스트라',
    title: '예산윈드오케스트라',
    description: '음악으로 하나되는 예산, 예산윈드오케스트라가 함께합니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Pretendard 한글 폰트 CDN */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <ThemeScript />
      </head>
      <body className={`${playfairDisplay.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
