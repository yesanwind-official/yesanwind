'use client';

import { useState } from 'react';
import { VideoCard, VideoModal } from '@/components/features/gallery';
import type { Video } from '@/data/gallery';

interface GalleryVideoSectionProps {
  videos: Video[];
}

export function GalleryVideoSection({ videos }: GalleryVideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => setSelectedVideo(video)}
          />
        ))}
      </div>

      {/* 영상 모달 */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
}
