'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Images, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Album } from '@/data/gallery';
import { formatGalleryDate } from '@/data/gallery';

interface PhotoAlbumCardProps {
  album: Album;
  className?: string;
}

function PhotoAlbumCardComponent({ album, className }: PhotoAlbumCardProps) {
  return (
    <Link
      href={`/gallery/photos/${album.id}`}
      className={cn(
        'group block bg-dark-800 light:bg-white border border-dark-600 light:border-gray-200 rounded-lg overflow-hidden',
        'transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5',
        className
      )}
    >
      {/* 커버 이미지 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-dark-700 light:bg-gray-100">
        {album.coverImage ? (
          <Image
            src={album.coverImage}
            alt={album.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-dark-500 light:text-dark-400">
            <Images className="w-16 h-16" />
          </div>
        )}

        {/* 카테고리 배지 */}
        <div className="absolute top-3 left-3 bg-gold-500/90 text-dark-950 px-2.5 py-1 rounded text-xs font-medium">
          {album.categoryLabel}
        </div>

        {/* 사진 개수 배지 */}
        <div className="absolute top-3 right-3 bg-dark-950/80 text-white px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1">
          <Images className="w-3.5 h-3.5" />
          {album.photoCount}
        </div>

        {/* 호버 오버레이 */}
        <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-medium">앨범 보기</span>
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-white light:text-dark-100 mb-2 line-clamp-1 group-hover:text-gold-400 transition-colors">
          {album.title}
        </h3>
        {album.description && (
          <p className="text-dark-300 light:text-dark-600 text-sm mb-2 line-clamp-2">{album.description}</p>
        )}
        <div className="flex items-center gap-1.5 text-dark-400 light:text-dark-500 text-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatGalleryDate(album.date)}</span>
        </div>
      </div>
    </Link>
  );
}

export const PhotoAlbumCard = memo(PhotoAlbumCardComponent);
