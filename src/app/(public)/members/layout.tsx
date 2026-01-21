'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Users, Music, Mic2, Drum } from 'lucide-react';

const subNavigation = [
  {
    name: '전체 단원',
    href: '/members',
    icon: Users,
  },
  {
    name: '지휘자',
    href: '/members/conductor',
    icon: Mic2,
  },
  {
    name: '목관',
    href: '/members/woodwind',
    icon: Music,
  },
  {
    name: '금관',
    href: '/members/brass',
    icon: Music,
  },
  {
    name: '타악기',
    href: '/members/percussion',
    icon: Drum,
  },
];

export default function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === '/members') {
      return pathname === '/members';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Page Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-dark-950">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-custom relative">
          <div className="text-center">
            <span className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-4 block">
              Our Members
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white light:text-dark-100 mb-4">
              단원 소개
            </h1>
            <p className="text-dark-300 text-lg max-w-2xl mx-auto">
              예산윈드오케스트라와 함께하는 열정적인 단원들을 소개합니다
            </p>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* Sub Navigation */}
      <nav className="sticky top-16 lg:top-20 z-40 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
        <div className="container-custom">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
            {subNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveLink(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
                    isActive
                      ? 'bg-gold-500/10 text-gold-500 border border-gold-500/30'
                      : 'text-dark-300 hover:text-white light:hover:text-dark-100 hover:bg-dark-800'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="py-12 md:py-16">{children}</div>
    </div>
  );
}
