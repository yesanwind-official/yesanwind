import { Metadata } from 'next';
import { ConcertCard } from '@/components/features/concerts';
import { getConcertsByCategory } from '@/lib/concerts';

export const metadata: Metadata = {
  title: '기획공연',
  description:
    '예산윈드오케스트라의 특별 기획공연입니다. 송년음악회, 신년음악회, 지역 협력 공연 등 다양한 기획 공연을 확인하세요.',
};

export default async function SpecialConcertsPage() {
  // DB의 concert_type='special'에 해당하는 공연 조회
  const specialConcerts = await getConcertsByCategory('special');

  // 날짜순 정렬 (예정된 공연이 먼저, 그 다음 지난 공연)
  const sortedConcerts = [...specialConcerts].sort((a, b) => {
    const statusOrder = { upcoming: 0, ongoing: 1, completed: 2, cancelled: 3 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;

    if (a.status === 'upcoming') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const upcomingConcerts = sortedConcerts.filter((c) => c.status === 'upcoming');
  const pastConcerts = sortedConcerts.filter((c) => c.status === 'completed');

  return (
    <div>
      {/* 기획공연 안내 */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-3">기획공연 안내</h2>
        <p className="text-dark-300 leading-relaxed">
          예산윈드오케스트라는 정기연주회 외에도 다양한 기획 공연을 진행합니다.
          송년음악회, 신년음악회, 지역 축제 참여, 자선 연주회, 타 단체와의 협연 등
          특별한 무대에서 관객 여러분을 만납니다.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { label: '기획공연', color: 'bg-gold-500/10 text-gold-500' },
            { label: '축제/행사', color: 'bg-blue-500/10 text-blue-400' },
            { label: '자선연주회', color: 'bg-pink-500/10 text-pink-400' },
            { label: '협연', color: 'bg-purple-500/10 text-purple-400' },
          ].map((tag) => (
            <span
              key={tag.label}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${tag.color}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* 예정된 기획공연 */}
      {upcomingConcerts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white light:text-dark-100">예정된 기획공연</h2>
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

      {/* 지난 기획공연 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white light:text-dark-100">지난 기획공연</h2>
            <p className="text-dark-400 text-sm mt-1">역대 기획공연 기록</p>
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
            <p className="text-dark-400">지난 기획공연 기록이 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
