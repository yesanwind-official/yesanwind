'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Images, Video, LayoutGrid } from 'lucide-react';

// 서브 네비게이션 메뉴 아이템
const subNavItems = [
  {
    name: '전체',
    href: '/gallery',
    icon: LayoutGrid,
  },
  {
    name: '사진',
    href: '/gallery/photos',
    icon: Images,
  },
  {
    name: '영상',
    href: '/gallery/videos',
    icon: Video,
  },
];

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 앨범 상세 페이지인지 확인
  const isDetailPage =
    pathname.startsWith('/gallery/photos/') &&
    pathname !== '/gallery/photos';

  return (
    <div className="min-h-screen bg-dark-900">
      {/* 페이지 헤더 */}
      <section className="relative bg-dark-950 pt-20 lg:pt-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.05),transparent_50%)]" />
        </div>

        <div className="relative container-custom py-12 md:py-16">
          <div className="text-center">
            <span className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-3 block">
              Gallery
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white light:text-dark-100 mb-4">
              갤러리
            </h1>
            <p className="text-dark-300 text-base md:text-lg max-w-2xl mx-auto">
              예산윈드오케스트라의 공연, 연습, 행사 사진과 영상을 만나보세요.
            </p>
            <div className="w-16 h-0.5 bg-gold-500 mx-auto mt-6" />
          </div>
        </div>
      </section>

      {/* 서브 네비게이션 - 상세 페이지에서는 숨김 */}
      {!isDetailPage && (
        <nav className="bg-dark-900 border-b border-dark-700 sticky top-16 lg:top-20 z-40">
          <div className="container-custom">
            <ul className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
              {subNavItems.map((item) => {
                const isActive =
                  item.href === '/gallery'
                    ? pathname === '/gallery'
                    : pathname.startsWith(item.href);
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
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
