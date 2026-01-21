'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ConcertWithLabels } from '@/types/concert';
import type { ConcertStatus } from '@/types';

interface ConcertCardProps {
  concert: ConcertWithLabels;
  className?: string;
}

// 상태별 배지 스타일
const statusBadgeStyles: Record<ConcertStatus, string> = {
  upcoming: 'bg-gold-500 text-dark-950',
  ongoing: 'bg-green-500 text-white',
  completed: 'bg-dark-500 text-dark-200',
  cancelled: 'bg-red-500/80 text-white',
};

// 날짜 포맷 함수
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function ConcertCardComponent({ concert, className }: ConcertCardProps) {
  const formattedDate = formatDate(concert.date);
  const badgeStyle = statusBadgeStyles[concert.status];

  return (
    <Link
      href={`/concerts/${concert.id}`}
      className={cn(
        'group block bg-dark-800 border border-dark-600 rounded-lg overflow-hidden',
        'transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5',
        className
      )}
    >
      {/* 포스터 이미지 영역 */}
      <div className="relative aspect-[3/4] overflow-hidden bg-dark-700">
        {/* Placeholder or Image */}
        {concert.poster_image ? (
          <Image
            src={concert.poster_image}
            alt={concert.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-dark-500">
            <Calendar className="w-16 h-16" />
          </div>
        )}

        {/* 날짜 배지 */}
        <div className="absolute top-4 left-4 bg-gold-500 text-dark-950 px-3 py-1.5 rounded text-sm font-semibold">
          {formattedDate}
        </div>

        {/* 상태 배지 */}
        <div
          className={cn(
            'absolute top-4 right-4 px-2.5 py-1 rounded text-xs font-medium',
            badgeStyle
          )}
        >
          {concert.statusLabel}
        </div>

        {/* 호버 오버레이 */}
        <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white light:text-dark-100 font-medium flex items-center gap-2">
            자세히 보기
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="p-5">
        <span className="inline-block text-gold-500 text-sm font-medium mb-2">
          {concert.categoryLabel}
        </span>
        <h3 className="text-lg font-semibold text-white light:text-dark-100 mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors">
          {concert.title}
        </h3>
        {concert.subtitle && (
          <p className="text-dark-300 text-sm mb-2 line-clamp-1">{concert.subtitle}</p>
        )}
        <p className="text-dark-400 text-sm flex items-center gap-1.5">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{concert.venue}</span>
        </p>
      </div>
    </Link>
  );
}

export const ConcertCard = memo(ConcertCardComponent);
