'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme';

const navigation = [
  { name: '홈', href: '/' },
  { name: '오케스트라 소개', href: '/about' },
  { name: '단원 소개', href: '/members' },
  { name: '공연 안내', href: '/concerts' },
  { name: '갤러리', href: '/gallery' },
  { name: '게시판', href: '/board' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === '/';
  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !isHomePage
          ? 'bg-dark-950 shadow-lg border-b border-dark-700/50'
          : 'bg-dark-950/90 backdrop-blur-md border-b border-dark-700/50'
      )}
    >
      <nav className="container-custom" aria-label="Global">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
            {/* Logo Icon - 음표/악기 심볼 */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500 to-gold-600 rounded-lg opacity-20 group-hover:opacity-30 transition-opacity" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-gold-500"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg lg:text-xl font-bold tracking-wide text-white light:text-dark-100 group-hover:text-gold-400 transition-colors">
                YESAN WIND
              </span>
              <span className="hidden sm:block text-[10px] text-dark-300 tracking-widest uppercase">
                Orchestra
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 relative',
                  isActiveLink(item.href)
                    ? 'text-gold-500'
                    : 'text-dark-100 hover:text-gold-500',
                  'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
                  'after:h-0.5 after:bg-gold-500 after:transition-all after:duration-300',
                  isActiveLink(item.href) ? 'after:w-6' : 'after:w-0 hover:after:w-6'
                )}
              >
                {item.name}
              </Link>
            ))}
            {/* Theme Toggle */}
            <div className="ml-2 pl-2 border-l border-dark-700">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                className="lg:hidden p-2 text-dark-100 hover:text-gold-500 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-950 rounded-lg"
                aria-label="메뉴 열기"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </SheetTrigger>

            {/* Mobile Menu Panel */}
            <SheetContent
              side="right"
              className="w-80 bg-dark-900 border-l border-dark-700 p-0"
            >
              <SheetHeader className="p-6 border-b border-dark-700">
                <SheetTitle className="text-left">
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-gold-500/10 rounded-lg">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-6 h-6 text-gold-500"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="block font-serif text-lg font-bold text-white light:text-dark-100">
                        YESAN WIND
                      </span>
                      <span className="block text-xs text-dark-400">
                        Orchestra
                      </span>
                    </div>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 px-4 py-6">
                <ul className="space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'block py-3 px-4 rounded-lg text-base font-medium transition-all duration-200',
                          isActiveLink(item.href)
                            ? 'bg-gold-500/10 text-gold-500 border-l-2 border-gold-500'
                            : 'text-dark-100 hover:bg-dark-800 hover:text-gold-500'
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-dark-700 bg-dark-950">
                <div className="space-y-3">
                  <p className="text-dark-400 text-sm">연락처</p>
                  <p className="text-white light:text-dark-100 font-medium">041-123-4567</p>
                  <p className="text-dark-300 text-sm">info@yesanwind.or.kr</p>
                </div>
              </div>
            </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
