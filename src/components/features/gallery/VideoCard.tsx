'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Play, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Video } from '@/data/gallery';
import { formatGalleryDate } from '@/data/gallery';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  className?: string;
}

function VideoCardComponent({ video, onClick, className }: VideoCardProps) {
  // YouTube 썸네일 URL 생성
  const thumbnailUrl =
    video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <button
      onClick={onClick}
      className={cn(
        'group block w-full text-left bg-dark-800 light:bg-white border border-dark-600 light:border-gray-200 rounded-lg overflow-hidden',
        'transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5',
        'focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900 light:focus:ring-offset-white',
        className
      )}
    >
      {/* 썸네일 */}
      <div className="relative aspect-video overflow-hidden bg-dark-700 light:bg-gray-100">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 카테고리 배지 */}
        <div className="absolute top-3 left-3 bg-gold-500/90 text-dark-950 px-2.5 py-1 rounded text-xs font-medium">
          {video.categoryLabel}
        </div>

        {/* 재생 시간 */}
        <div className="absolute bottom-3 right-3 bg-dark-950/90 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>

        {/* 재생 버튼 오버레이 */}
        <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 text-dark-950 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-white light:text-dark-100 mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-dark-300 light:text-dark-600 text-sm mb-2 line-clamp-2">{video.description}</p>
        )}
        <div className="flex items-center gap-1.5 text-dark-400 light:text-dark-500 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatGalleryDate(video.date)}</span>
        </div>
      </div>
    </button>
  );
}

export const VideoCard = memo(VideoCardComponent);
