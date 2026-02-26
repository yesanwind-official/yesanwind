'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, LogIn, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme';
import { getClient } from '@/lib/supabase/client';

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
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 로그인 상태 감지
  useEffect(() => {
    const supabase = getClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAdmin(!!user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session?.user);
    });

    return () => subscription.unsubscribe();
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
            <Image
              src="/images/logo.png"
              alt="예산윈드오케스트라"
              width={40}
              height={40}
              unoptimized
              className="w-10 h-10 object-contain"
            />
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
            {/* Theme Toggle + Login/Admin */}
            <div className="ml-2 pl-2 border-l border-dark-700 flex items-center gap-1">
              <ThemeToggle />
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  관리자
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-dark-200 hover:text-gold-500 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  로그인
                </Link>
              )}
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
                    <Image
                      src="/images/logo.png"
                      alt="예산윈드오케스트라"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain"
                    />
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
                {isAdmin ? (
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 mb-4 rounded-lg bg-gold-500/10 text-gold-500 hover:bg-gold-500/20 font-medium text-sm transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    관리자 페이지
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 mb-4 rounded-lg bg-gold-500/10 text-gold-500 hover:bg-gold-500/20 font-medium text-sm transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    관리자 로그인
                  </Link>
                )}
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
