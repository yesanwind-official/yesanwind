'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Megaphone, Newspaper } from 'lucide-react';

// 서브 네비게이션 메뉴 아이템
const subNavItems = [
  {
    name: '공지사항',
    href: '/board/notice',
    icon: Megaphone,
  },
  {
    name: '언론보도',
    href: '/board/press',
    icon: Newspaper,
  },
];

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 게시글 상세 페이지인지 확인
  const isDetailPage = /^\/board\/(notice|press)\/[^/]+$/.test(pathname);

  // 현재 활성화된 메뉴 확인
  const getActiveItem = () => {
    if (pathname.startsWith('/board/notice')) return '/board/notice';
    if (pathname.startsWith('/board/press')) return '/board/press';
    return '';
  };

  const activeItem = getActiveItem();

  return (
    <div className="min-h-screen bg-dark-900">
      {/* 페이지 헤더 */}
      <section className="relative bg-dark-950 pt-20 lg:pt-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.05),transparent_50%)]" />
        </div>

        <div className="relative container-custom py-12 md:py-16 lg:py-20">
          <div className="text-center">
            <span className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-3 block">
              Board
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white light:text-dark-100 mb-4">
              게시판
            </h1>
            <p className="text-dark-300 text-base md:text-lg max-w-2xl mx-auto">
              예산윈드오케스트라의 공지사항과 언론보도를 확인하세요
            </p>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* 서브 네비게이션 */}
      {!isDetailPage && (
        <nav className="bg-dark-900 border-b border-dark-700 sticky top-16 lg:top-20 z-40">
          <div className="container-custom">
            <ul className="flex items-center justify-center gap-1 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {subNavItems.map((item) => {
                const isActive = activeItem === item.href;
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
                        isActive
                          ? 'bg-gold-500/10 text-gold-500 border border-gold-500/30'
                          : 'text-dark-300 hover:text-white light:hover:text-dark-100 hover:bg-dark-800'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      )}

      {/* 페이지 컨텐츠 */}
      <div className="container-custom py-8 md:py-12">{children}</div>
    </div>
  );
}
