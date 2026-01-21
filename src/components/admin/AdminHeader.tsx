'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Menu, Bell, User, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

function AdminHeaderComponent({ onMenuClick }: AdminHeaderProps) {
  const handleLogout = () => {
    console.log('Logout clicked');
    // TODO: Implement logout with Supabase Auth
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-neutral-200 bg-white px-4 shadow-sm">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="mr-4 md:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">메뉴 열기</span>
      </Button>

      {/* Left side - Breadcrumb or title area */}
      <div className="flex flex-1 items-center">
        <h1 className="text-lg font-semibold text-neutral-900">
          예산윈드오케스트라 관리자
        </h1>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        {/* View site link */}
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
          <Link href="/" target="_blank" className="gap-2 text-neutral-600 hover:text-neutral-900">
            <Home className="h-4 w-4" />
            <span>사이트 보기</span>
          </Link>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-neutral-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          <span className="sr-only">알림</span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-gold-500 text-[#1a1a1a] font-medium">
                  관
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-2 px-2 py-1.5">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gold-500 text-[#1a1a1a] text-sm">
                  관
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">관리자</span>
                <span className="text-xs text-neutral-500">admin@yesanwind.or.kr</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>계정 설정</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export const AdminHeader = memo(AdminHeaderComponent);
