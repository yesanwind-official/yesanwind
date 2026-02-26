import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Images, Video } from 'lucide-react';
import { PhotoAlbumCard } from '@/components/features/gallery';
import { VideoCard } from '@/components/features/gallery';
import { getRecentAlbums, getRecentVideos } from '@/lib/gallery';
import { GalleryVideoSection } from './GalleryVideoSection';

export const metadata: Metadata = {
  title: '갤러리 | 예산윈드오케스트라',
  description: '예산윈드오케스트라의 공연, 연습, 행사 사진과 영상 갤러리입니다.',
};

export default async function GalleryPage() {
  const recentAlbums = await getRecentAlbums(4);
  const recentVideos = await getRecentVideos(4);

  return (
    <div className="space-y-16">
      {/* 최근 사진 앨범 섹션 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Images className="w-5 h-5 text-gold-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white light:text-dark-100">최근 사진</h2>
              <p className="text-dark-400 text-sm">Recent Photos</p>
            </div>
          </div>
          <Link
            href="/gallery/photos"
            className="flex items-center gap-1 text-sm text-gold-500 hover:text-gold-400 transition-colors"
          >
            전체 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {recentAlbums.map((album) => (
            <PhotoAlbumCard key={album.id} album={album} />
          ))}
        </div>

        {recentAlbums.length === 0 && (
          <div className="text-center py-12 bg-dark-800/50 rounded-lg border border-dark-700">
            <Images className="w-12 h-12 text-dark-500 mx-auto mb-3" />
            <p className="text-dark-400">아직 등록된 사진이 없습니다.</p>
          </div>
        )}
      </section>

      {/* 최근 영상 섹션 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Video className="w-5 h-5 text-gold-500" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white light:text-dark-100">최근 영상</h2>
              <p className="text-dark-400 text-sm">Recent Videos</p>
            </div>
          </div>
          <Link
            href="/gallery/videos"
            className="flex items-center gap-1 text-sm text-gold-500 hover:text-gold-400 transition-colors"
          >
            전체 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <GalleryVideoSection videos={recentVideos} />

        {recentVideos.length === 0 && (
          <div className="text-center py-12 bg-dark-800/50 rounded-lg border border-dark-700">
            <Video className="w-12 h-12 text-dark-500 mx-auto mb-3" />
            <p className="text-dark-400">아직 등록된 영상이 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
