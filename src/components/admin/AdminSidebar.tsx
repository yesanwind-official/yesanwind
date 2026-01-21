'use client';

import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Music,
  Users,
  FileText,
  Image,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: '대시보드', href: '/admin', icon: LayoutDashboard },
  { name: '공연 관리', href: '/admin/concerts', icon: Music },
  { name: '단원 관리', href: '/admin/members', icon: Users },
  { name: '게시판 관리', href: '/admin/posts', icon: FileText },
  { name: '갤러리 관리', href: '/admin/gallery', icon: Image },
  { name: '사이트 설정', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

function AdminSidebarComponent({ isCollapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col bg-[#1a1a1a] text-white transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-neutral-800 px-4">
        {!isCollapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500">
              <Music className="h-4 w-4 text-[#1a1a1a]" />
            </div>
            <span className="font-semibold text-white">관리자</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500">
            <Music className="h-4 w-4 text-[#1a1a1a]" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-gold-500/10 text-gold-500'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white light:hover:text-dark-100',
                isCollapsed && 'justify-center px-2'
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className={cn('h-5 w-5 shrink-0', active && 'text-gold-500')} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-neutral-800 p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn(
            'w-full justify-center text-neutral-400 hover:bg-neutral-800 hover:text-white light:hover:text-dark-100',
            !isCollapsed && 'justify-start'
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>접기</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

export const AdminSidebar = memo(AdminSidebarComponent);
