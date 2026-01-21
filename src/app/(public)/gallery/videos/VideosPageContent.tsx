'use client';

import { useState } from 'react';
import { VideoCard, VideoModal } from '@/components/features/gallery';
import type { Video } from '@/data/gallery';

interface VideosPageContentProps {
  videos: Video[];
}

export function VideosPageContent({ videos }: VideosPageContentProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <>
      {/* 영상 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
