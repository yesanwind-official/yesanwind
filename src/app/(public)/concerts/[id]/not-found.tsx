import Link from 'next/link';
import { Music, ArrowLeft } from 'lucide-react';

export default function ConcertNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-dark-800 mb-6">
          <Music className="w-10 h-10 text-dark-400" />
        </div>
        <h2 className="text-2xl font-bold text-white light:text-dark-100 mb-3">
          공연을 찾을 수 없습니다
        </h2>
        <p className="text-dark-400 mb-6 max-w-md">
          요청하신 공연 정보가 존재하지 않거나 삭제되었습니다.
          <br />
          공연 목록에서 다른 공연을 확인해 주세요.
        </p>
        <Link
          href="/concerts"
          className="inline-flex items-center gap-2 btn-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          공연 목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
