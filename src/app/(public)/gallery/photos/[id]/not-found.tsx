import Link from 'next/link';
import { Images, ArrowLeft } from 'lucide-react';

export default function AlbumNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 rounded-full bg-dark-800 flex items-center justify-center mb-6">
        <Images className="w-10 h-10 text-dark-500" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-white light:text-dark-100 mb-3">
        앨범을 찾을 수 없습니다
      </h1>

      <p className="text-dark-400 text-center mb-8 max-w-md">
        요청하신 사진 앨범이 존재하지 않거나 삭제되었습니다.
        다른 앨범을 확인해보세요.
      </p>

      <Link
        href="/gallery/photos"
        className="inline-flex items-center gap-2 bg-gold-500 text-dark-950 px-6 py-3 rounded-lg font-medium hover:bg-gold-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        사진 갤러리로 돌아가기
      </Link>
    </div>
  );
}
