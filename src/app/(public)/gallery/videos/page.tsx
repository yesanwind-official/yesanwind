import { Metadata } from 'next';
import { Video } from 'lucide-react';
import { getAllVideos } from '@/lib/gallery';
import { VideosPageContent } from './VideosPageContent';

export const metadata: Metadata = {
  title: '영상 갤러리 | 예산윈드오케스트라',
  description: '예산윈드오케스트라의 공연, 연습, 인터뷰 영상을 만나보세요.',
};

export default async function VideosPage() {
  const sortedVideos = await getAllVideos();

  return (
    <div>
      {/* 페이지 소개 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
            <Video className="w-5 h-5 text-gold-500" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white light:text-dark-100">영상 갤러리</h2>
            <p className="text-dark-400 text-sm">Video Gallery</p>
          </div>
        </div>
        <p className="text-dark-300">
          예산윈드오케스트라의 공연, 연습, 인터뷰 영상입니다. 영상을 클릭하면 바로 재생됩니다.
        </p>
      </div>

      {/* 영상 통계 */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-dark-700">
        <div className="flex items-center gap-2">
          <span className="text-dark-400 text-sm">전체 영상</span>
          <span className="text-gold-500 font-semibold">{sortedVideos.length}개</span>
        </div>
      </div>

      {/* 영상 그리드 (클라이언트 컴포넌트) */}
      {sortedVideos.length > 0 ? (
        <VideosPageContent videos={sortedVideos} />
      ) : (
        <div className="text-center py-16 bg-dark-800/50 rounded-lg border border-dark-700">
          <Video className="w-16 h-16 text-dark-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white light:text-dark-100 mb-2">영상이 없습니다</h3>
          <p className="text-dark-400">아직 등록된 영상이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
