'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

function PaginationComponent({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  // 표시할 페이지 번호 계산
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 항상 첫 페이지 표시
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // 현재 페이지 주변
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // 항상 마지막 페이지 표시
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl;
    return `${baseUrl}?page=${page}`;
  };

  return (
    <nav
      className={cn('flex items-center justify-center gap-1', className)}
      aria-label="페이지 네비게이션"
    >
      {/* 첫 페이지 */}
      <Link
        href={getPageUrl(1)}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200',
          hasPrev
            ? 'text-dark-300 hover:text-white light:hover:text-dark-100 hover:bg-dark-700'
            : 'text-dark-600 pointer-events-none'
        )}
        aria-label="첫 페이지"
        aria-disabled={!hasPrev}
      >
        <ChevronsLeft className="w-4 h-4" />
      </Link>

      {/* 이전 페이지 */}
      <Link
        href={getPageUrl(currentPage - 1)}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200',
          hasPrev
            ? 'text-dark-300 hover:text-white light:hover:text-dark-100 hover:bg-dark-700'
            : 'text-dark-600 pointer-events-none'
        )}
        aria-label="이전 페이지"
        aria-disabled={!hasPrev}
      >
        <ChevronLeft className="w-4 h-4" />
      </Link>

      {/* 페이지 번호 */}
      <div className="flex items-center gap-1 mx-2">
        {pageNumbers.map((page, index) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center w-9 h-9 text-dark-400"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={getPageUrl(page)}
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200',
                currentPage === page
                  ? 'bg-gold-500 text-dark-950'
                  : 'text-dark-300 hover:text-white light:hover:text-dark-100 hover:bg-dark-700'
              )}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* 다음 페이지 */}
      <Link
        href={getPageUrl(currentPage + 1)}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200',
          hasNext
            ? 'text-dark-300 hover:text-white light:hover:text-dark-100 hover:bg-dark-700'
            : 'text-dark-600 pointer-events-none'
        )}
        aria-label="다음 페이지"
        aria-disabled={!hasNext}
      >
        <ChevronRight className="w-4 h-4" />
      </Link>

      {/* 마지막 페이지 */}
      <Link
        href={getPageUrl(totalPages)}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200',
          hasNext
            ? 'text-dark-300 hover:text-white light:hover:text-dark-100 hover:bg-dark-700'
            : 'text-dark-600 pointer-events-none'
        )}
        aria-label="마지막 페이지"
        aria-disabled={!hasNext}
      >
        <ChevronsRight className="w-4 h-4" />
      </Link>
    </nav>
  );
}

export const Pagination = memo(PaginationComponent);
