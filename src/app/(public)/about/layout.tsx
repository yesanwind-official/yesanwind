'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const subNavigation = [
  { name: '인사말', href: '/about' },
  { name: '연혁', href: '/about/history' },
  { name: '조직도', href: '/about/organization' },
  { name: '오시는 길', href: '/about/location' },
];

interface PageHeaderProps {
  title: string;
  subtitle: string;
  englishTitle: string;
}

function PageHeader({ title, subtitle, englishTitle }: PageHeaderProps) {
  return (
    <div className="relative bg-dark-950 pt-20 lg:pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.05),transparent_50%)]" />
      </div>

      <div className="relative container-custom py-12 md:py-16 lg:py-20">
        <div className="text-center">
          {/* English Title */}
          <span className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-3 block">
            {englishTitle}
          </span>

          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white light:text-dark-100 mb-4">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-dark-300 text-base md:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Decorative Line */}
          <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-6" />
        </div>
      </div>
    </div>
  );
}

function SubNavigation() {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/about') {
      return pathname === '/about';
    }
    return pathname === href;
  };

  return (
    <div className="bg-dark-900 border-b border-dark-700 sticky top-16 lg:top-20 z-40">
      <div className="container-custom">
        <nav className="flex overflow-x-auto scrollbar-hide" aria-label="서브 메뉴">
          <ul className="flex min-w-full md:justify-center">
            {subNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex items-center px-5 md:px-8 py-4 text-sm md:text-base font-medium transition-all duration-300 border-b-2 whitespace-nowrap',
                    isActiveLink(item.href)
                      ? 'text-gold-500 border-gold-500 bg-gold-500/5'
                      : 'text-dark-300 border-transparent hover:text-gold-400 hover:border-gold-500/50'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

// Page titles configuration
const pageTitles: Record<string, PageHeaderProps> = {
  '/about': {
    title: '인사말',
    subtitle: '예산윈드오케스트라를 찾아주신 여러분을 진심으로 환영합니다',
    englishTitle: 'Greeting',
  },
  '/about/history': {
    title: '연혁',
    subtitle: '27년간 지역 문화 발전에 기여해온 예산윈드오케스트라의 발자취',
    englishTitle: 'History',
  },
  '/about/organization': {
    title: '조직도',
    subtitle: '예산윈드오케스트라의 구성원과 조직 구조를 소개합니다',
    englishTitle: 'Organization',
  },
  '/about/location': {
    title: '오시는 길',
    subtitle: '예산윈드오케스트라 연습실 및 공연장 안내',
    englishTitle: 'Location',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const headerProps = pageTitles[pathname] || pageTitles['/about'];

  return (
    <div className="min-h-screen bg-dark-900">
      <PageHeader {...headerProps} />
      <SubNavigation />
      <div className="container-custom py-12 md:py-16 lg:py-20">
        {children}
      </div>
    </div>
  );
}
