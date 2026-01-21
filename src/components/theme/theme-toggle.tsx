'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore, type Theme } from '@/stores/theme-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: '라이트', icon: Sun },
  { value: 'dark', label: '다크', icon: Moon },
  { value: 'system', label: '시스템', icon: Monitor },
];

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useThemeStore();

  const CurrentIcon = resolvedTheme === 'dark' ? Moon : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-dark-100 hover:text-gold-500 hover:bg-dark-800 dark:text-dark-100 dark:hover:text-gold-500 dark:hover:bg-dark-800 light:text-dark-700 light:hover:text-gold-600 light:hover:bg-dark-100"
          aria-label="테마 변경"
        >
          <CurrentIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-dark-800 border-dark-600 light:bg-white light:border-dark-200"
      >
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={cn(
                'flex items-center gap-2 cursor-pointer',
                'text-dark-100 hover:text-gold-500 hover:bg-dark-700',
                'light:text-dark-700 light:hover:text-gold-600 light:hover:bg-dark-100',
                theme === option.value && 'text-gold-500 light:text-gold-600'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{option.label}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
