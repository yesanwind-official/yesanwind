import { Metadata } from 'next';
import { getPressReleases, getTotalPages } from '@/data/posts';
import { PostCard, Pagination } from '@/components/features/board';

export const metadata: Metadata = {
  title: '언론보도',
  description: '예산윈드오케스트라 언론보도 - 뉴스, 기사, 미디어 보도',
};

interface PressPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PressPage({ searchParams }: PressPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 9;
  const totalPages = getTotalPages('press', limit);
  const posts = getPressReleases({ page: currentPage, limit });

  return (
    <div>
      {/* 카드 그리드 */}
      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-dark-400 bg-dark-800/30 border border-dark-700 rounded-lg">
          등록된 언론보도가 없습니다.
        </div>
      )}

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/board/press"
        className="mt-10"
      />
    </div>
  );
}
