'use client';

import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Video } from '@/data/gallery';

interface VideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ video, isOpen, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-4xl w-full p-0 bg-dark-950 border-dark-700 overflow-hidden"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          영상 재생 - {video.title}
        </DialogTitle>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-dark-800/80 text-white hover:bg-dark-700 transition-colors flex items-center justify-center"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* YouTube 영상 */}
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* 영상 정보 */}
        <div className="p-4 bg-dark-900">
          <h3 className="text-lg font-semibold text-white light:text-dark-100 mb-1">{video.title}</h3>
          {video.description && (
            <p className="text-dark-300 text-sm">{video.description}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
