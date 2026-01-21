import { Metadata } from 'next';
import { ConcertCard } from '@/components/features/concerts';
import { getConcertsByCategory } from '@/data/mock-concerts';

export const metadata: Metadata = {
  title: '정기연주회',
  description:
    '예산윈드오케스트라의 정기연주회 일정입니다. 매년 봄, 가을에 열리는 정기연주회 정보를 확인하세요.',
};

export default function RegularConcertsPage() {
  const regularConcerts = getConcertsByCategory('regular');

  // 날짜순 정렬 (예정된 공연이 먼저, 그 다음 지난 공연)
  const sortedConcerts = regularConcerts.sort((a, b) => {
    // 상태별 우선순위: upcoming > ongoing > completed > cancelled
    const statusOrder = { upcoming: 0, ongoing: 1, completed: 2, cancelled: 3 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;

    // 같은 상태면 날짜순 (예정: 가까운 순, 완료: 최신 순)
    if (a.status === 'upcoming') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const upcomingConcerts = sortedConcerts.filter((c) => c.status === 'upcoming');
  const pastConcerts = sortedConcerts.filter((c) => c.status === 'completed');

  return (
    <div>
      {/* 정기연주회 안내 */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-3">정기연주회 안내</h2>
        <p className="text-dark-300 leading-relaxed">
          예산윈드오케스트라는 매년 봄(3-4월)과 가을(10-11월)에 정기연주회를 개최합니다.
          클래식 관악 레퍼토리부터 영화음악, 팝 편곡까지 다양한 프로그램으로 구성되며,
          지역 주민들에게 수준 높은 문화 공연을 선사합니다.
        </p>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <div className="bg-dark-900/50 rounded-lg p-4 text-center">
            <p className="text-gold-500 text-2xl font-bold">2회</p>
            <p className="text-dark-400 text-sm mt-1">연간 정기연주회</p>
          </div>
          <div className="bg-dark-900/50 rounded-lg p-4 text-center">
            <p className="text-gold-500 text-2xl font-bold">봄 / 가을</p>
            <p className="text-dark-400 text-sm mt-1">개최 시기</p>
          </div>
          <div className="bg-dark-900/50 rounded-lg p-4 text-center">
            <p className="text-gold-500 text-2xl font-bold">47회</p>
            <p className="text-dark-400 text-sm mt-1">누적 횟수</p>
          </div>
        </div>
      </div>

      {/* 예정된 정기연주회 */}
      {upcomingConcerts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white light:text-dark-100">예정된 정기연주회</h2>
              <p className="text-dark-400 text-sm mt-1">
                {upcomingConcerts.length}개의 공연이 예정되어 있습니다
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingConcerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
        </section>
      )}

      {/* 지난 정기연주회 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white light:text-dark-100">지난 정기연주회</h2>
            <p className="text-dark-400 text-sm mt-1">
              역대 정기연주회 기록
            </p>
          </div>
        </div>

        {pastConcerts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pastConcerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-dark-800/50 border border-dark-700 rounded-lg">
            <p className="text-dark-400">지난 정기연주회 기록이 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
