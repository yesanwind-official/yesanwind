import { Metadata } from 'next';
import { getNotices, getTotalPages, notices } from '@/data/posts';
import { PostListItem, Pagination } from '@/components/features/board';

export const metadata: Metadata = {
  title: '공지사항',
  description: '예산윈드오케스트라 공지사항 - 연주회 일정, 단원 모집, 주요 안내사항',
};

interface NoticePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NoticePage({ searchParams }: NoticePageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 10;
  const totalPages = getTotalPages('notice', limit);
  const posts = getNotices({ page: currentPage, limit, pinnedFirst: true });

  // 전체 게시글 수 계산 (고정 공지 제외한 번호 계산용)
  const totalNotices = notices.length;
  const pinnedCount = notices.filter((n) => n.isPinned).length;

  // 번호 계산 함수
  const getPostNumber = (index: number, isPinned: boolean) => {
    if (isPinned) return 0; // 고정 글은 번호 대신 아이콘 표시
    const nonPinnedIndex = index - (posts.slice(0, index).filter((p) => p.isPinned).length);
    return totalNotices - pinnedCount - ((currentPage - 1) * limit) - nonPinnedIndex;
  };

  return (
    <div>
      {/* 테이블 헤더 (데스크톱) */}
      <div className="hidden md:flex items-center gap-4 px-4 py-3 bg-dark-800 border-b border-dark-700 rounded-t-lg text-sm font-medium text-dark-300">
        <div className="w-16 text-center">번호</div>
        <div className="flex-1">제목</div>
        <div className="w-10 text-center">첨부</div>
        <div className="w-28 text-center">작성일</div>
        <div className="w-20 text-center">조회수</div>
      </div>

      {/* 게시글 목록 */}
      <div className="bg-dark-800/30 border border-dark-700 md:border-t-0 md:rounded-t-none rounded-lg overflow-hidden divide-y divide-dark-700/50">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <PostListItem
              key={post.id}
              post={post}
              index={getPostNumber(index, post.isPinned || false)}
              showNumber={true}
            />
          ))
        ) : (
          <div className="py-20 text-center text-dark-400">
            등록된 공지사항이 없습니다.
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/board/notice"
        className="mt-8"
      />
    </div>
  );
}
