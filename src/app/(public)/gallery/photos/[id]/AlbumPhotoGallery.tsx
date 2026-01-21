'use client';

import { useState, useCallback } from 'react';
import { PhotoGrid, PhotoLightbox } from '@/components/features/gallery';
import type { Photo } from '@/data/gallery';

interface AlbumPhotoGalleryProps {
  photos: Photo[];
}

export function AlbumPhotoGallery({ photos }: AlbumPhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePhotoClick = useCallback((index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  const handleClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      {/* 사진 그리드 */}
      <PhotoGrid photos={photos} onPhotoClick={handlePhotoClick} />

      {/* 라이트박스 모달 */}
      <PhotoLightbox
        photos={photos}
        currentIndex={currentPhotoIndex}
        isOpen={lightboxOpen}
        onClose={handleClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
}
