import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function PostNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 rounded-full bg-dark-800 flex items-center justify-center mb-6">
        <FileQuestion className="w-10 h-10 text-dark-400" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">
        게시글을 찾을 수 없습니다
      </h2>

      <p className="text-dark-400 text-center mb-8 max-w-md">
        요청하신 게시글이 존재하지 않거나 삭제되었을 수 있습니다.
        <br />
        URL을 확인하시거나 목록에서 다시 선택해 주세요.
      </p>

      <Link
        href="/board"
        className="inline-flex items-center gap-2 px-6 py-3 border border-gold-500 text-gold-500 rounded-lg font-medium hover:bg-gold-500 hover:text-dark-950 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        게시판으로 돌아가기
      </Link>
    </div>
  );
}
