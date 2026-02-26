import { Metadata } from 'next';
import { Images } from 'lucide-react';
import { PhotoAlbumCard } from '@/components/features/gallery';
import { getAllAlbums } from '@/lib/gallery';

export const metadata: Metadata = {
  title: '사진 갤러리 | 예산윈드오케스트라',
  description: '예산윈드오케스트라의 공연, 연습, 행사 사진 앨범을 만나보세요.',
};

export default async function PhotosPage() {
  const sortedAlbums = await getAllAlbums();

  return (
    <div>
      {/* 페이지 소개 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center">
            <Images className="w-5 h-5 text-gold-500" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white light:text-dark-100">사진 앨범</h2>
            <p className="text-dark-400 text-sm">Photo Albums</p>
          </div>
        </div>
        <p className="text-dark-300">
          예산윈드오케스트라의 공연, 연습, 행사 사진 앨범입니다. 앨범을 클릭하면 전체 사진을 볼 수 있습니다.
        </p>
      </div>

      {/* 앨범 통계 */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-dark-700">
        <div className="flex items-center gap-2">
          <span className="text-dark-400 text-sm">전체 앨범</span>
          <span className="text-gold-500 font-semibold">{sortedAlbums.length}개</span>
        </div>
        <div className="w-px h-4 bg-dark-600" />
        <div className="flex items-center gap-2">
          <span className="text-dark-400 text-sm">총 사진</span>
          <span className="text-gold-500 font-semibold">
            {sortedAlbums.reduce((acc, album) => acc + album.photoCount, 0)}장
          </span>
        </div>
      </div>

      {/* 앨범 그리드 */}
      {sortedAlbums.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {sortedAlbums.map((album) => (
            <PhotoAlbumCard key={album.id} album={album} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-dark-800/50 rounded-lg border border-dark-700">
          <Images className="w-16 h-16 text-dark-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white light:text-dark-100 mb-2">앨범이 없습니다</h3>
          <p className="text-dark-400">아직 등록된 사진 앨범이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
