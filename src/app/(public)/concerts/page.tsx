import { Metadata } from 'next';
import { ConcertCard } from '@/components/features/concerts';
import { getUpcomingConcerts, getCompletedConcerts } from '@/lib/concerts';

export const metadata: Metadata = {
  title: '공연 안내',
  description:
    '예산윈드오케스트라의 공연 일정을 확인하세요. 정기연주회, 기획공연, 특별공연 등 다양한 공연 정보를 제공합니다.',
};

export default async function ConcertsPage() {
  // Supabase에서 예정된 공연과 종료된 공연을 병렬 조회
  const [upcomingConcerts, completedConcerts] = await Promise.all([
    getUpcomingConcerts(),
    getCompletedConcerts(),
  ]);

  // 가까운 공연 순으로 정렬 (getUpcomingConcerts가 이미 date asc로 정렬하지만 안전장치)
  const sortedConcerts = [...upcomingConcerts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // 최근 종료 공연 최대 4개
  const recentCompleted = completedConcerts.slice(0, 4);

  return (
    <div>
      {/* 예정된 공연 섹션 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white light:text-dark-100">예정된 공연</h2>
            <p className="text-dark-400 text-sm mt-1">
              {sortedConcerts.length}개의 공연이 예정되어 있습니다
            </p>
          </div>
        </div>

        {sortedConcerts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedConcerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-dark-800/50 border border-dark-700 rounded-lg">
            <p className="text-dark-400">현재 예정된 공연이 없습니다.</p>
            <p className="text-dark-500 text-sm mt-2">
              곧 새로운 공연 일정이 공개될 예정입니다.
            </p>
          </div>
        )}
      </section>

      {/* 최근 공연 미리보기 */}
      {recentCompleted.length > 0 && (
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white light:text-dark-100">최근 공연</h2>
              <p className="text-dark-400 text-sm mt-1">
                지난 공연 기록을 확인하세요
              </p>
            </div>
            <a
              href="/concerts/archive"
              className="text-gold-500 hover:text-gold-400 text-sm font-medium transition-colors"
            >
              전체 보기
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentCompleted.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
