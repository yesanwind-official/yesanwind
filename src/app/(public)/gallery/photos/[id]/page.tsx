import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Images } from 'lucide-react';
import { getAlbumById } from '@/lib/gallery';
import { formatGalleryDate } from '@/data/gallery';
import { AlbumPhotoGallery } from './AlbumPhotoGallery';

// 동적 렌더링 (Supabase에서 데이터 조회)
export const dynamic = 'force-dynamic';

interface AlbumPageProps {
  params: Promise<{ id: string }>;
}

// 메타데이터 생성
export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const { id } = await params;
  const album = await getAlbumById(id);

  if (!album) {
    return {
      title: '앨범을 찾을 수 없습니다 | 예산윈드오케스트라',
    };
  }

  return {
    title: `${album.title} | 사진 갤러리 | 예산윈드오케스트라`,
    description: album.description || `예산윈드오케스트라 ${album.title} 사진 앨범입니다.`,
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { id } = await params;
  const album = await getAlbumById(id);

  if (!album) {
    notFound();
  }

  return (
    <div>
      {/* 뒤로가기 링크 */}
      <Link
        href="/gallery/photos"
        className="inline-flex items-center gap-2 text-dark-300 hover:text-gold-500 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>사진 갤러리로 돌아가기</span>
      </Link>

      {/* 앨범 헤더 */}
      <div className="mb-8 pb-6 border-b border-dark-700">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {/* 카테고리 배지 */}
            <span className="inline-block bg-gold-500/10 text-gold-500 px-3 py-1 rounded-full text-sm font-medium mb-3">
              {album.categoryLabel}
            </span>

            {/* 앨범 제목 */}
            <h1 className="text-2xl md:text-3xl font-bold text-white light:text-dark-100 mb-2">
              {album.title}
            </h1>

            {/* 설명 */}
            {album.description && (
              <p className="text-dark-300 text-base max-w-3xl">{album.description}</p>
            )}
          </div>
        </div>

        {/* 메타 정보 */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-dark-400">
            <Calendar className="w-4 h-4" />
            <span>{formatGalleryDate(album.date)}</span>
          </div>
          <div className="w-px h-4 bg-dark-600" />
          <div className="flex items-center gap-1.5 text-dark-400">
            <Images className="w-4 h-4" />
            <span>{album.photoCount}장의 사진</span>
          </div>
        </div>
      </div>

      {/* 사진 그리드 (클라이언트 컴포넌트) */}
      <AlbumPhotoGallery photos={album.photos} />
    </div>
  );
}
