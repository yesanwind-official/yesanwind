'use client';

import { memo } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Photo } from '@/data/gallery';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
  className?: string;
}

function PhotoGridComponent({ photos, onPhotoClick, className }: PhotoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4',
        className
      )}
    >
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          onClick={() => onPhotoClick(index)}
          className={cn(
            'group relative overflow-hidden rounded-lg bg-dark-700 light:bg-gray-100',
            'aspect-square',
            'transition-all duration-300 hover:ring-2 hover:ring-gold-500/50',
            'focus:outline-none focus:ring-2 focus:ring-gold-500'
          )}
        >
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-dark-500 light:text-dark-400">
              <ImageIcon className="w-10 h-10" />
            </div>
          )}

          {/* 호버 오버레이 */}
          <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gold-500/90 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-dark-950"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export const PhotoGrid = memo(PhotoGridComponent);
