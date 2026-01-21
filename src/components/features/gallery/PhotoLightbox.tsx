'use client';

import { useCallback, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { Photo } from '@/data/gallery';

interface PhotoLightboxProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function PhotoLightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: PhotoLightboxProps) {
  const currentPhoto = photos[currentIndex];

  // 키보드 네비게이션
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    },
    [isOpen, onPrevious, onNext, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!currentPhoto) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-dark-950/95 border-dark-700 overflow-hidden"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          사진 보기 - {currentPhoto.alt}
        </DialogTitle>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-dark-800/80 text-white hover:bg-dark-700 transition-colors flex items-center justify-center"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 이미지 컨테이너 */}
        <div className="relative flex items-center justify-center min-h-[60vh] max-h-[85vh]">
          {/* 이전 버튼 */}
          {photos.length > 1 && (
            <button
              onClick={onPrevious}
              className={cn(
                'absolute left-4 z-40 w-12 h-12 rounded-full bg-dark-800/80 text-white',
                'hover:bg-gold-500 hover:text-dark-950 transition-colors',
                'flex items-center justify-center',
                'focus:outline-none focus:ring-2 focus:ring-gold-500'
              )}
              aria-label="이전 사진"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* 이미지 */}
          <div className="relative w-full h-full flex items-center justify-center p-12">
            {currentPhoto.src ? (
              <Image
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                width={currentPhoto.width}
                height={currentPhoto.height}
                className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
                priority
              />
            ) : (
              <div className="flex items-center justify-center text-dark-500">
                <ImageIcon className="w-24 h-24" />
              </div>
            )}
          </div>

          {/* 다음 버튼 */}
          {photos.length > 1 && (
            <button
              onClick={onNext}
              className={cn(
                'absolute right-4 z-40 w-12 h-12 rounded-full bg-dark-800/80 text-white',
                'hover:bg-gold-500 hover:text-dark-950 transition-colors',
                'flex items-center justify-center',
                'focus:outline-none focus:ring-2 focus:ring-gold-500'
              )}
              aria-label="다음 사진"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* 하단 정보 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-950/90 to-transparent p-6">
          <div className="flex items-center justify-between">
            <p className="text-white text-sm">{currentPhoto.alt}</p>
            <span className="text-dark-300 text-sm">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
