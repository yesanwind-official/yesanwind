import { Metadata } from 'next';
import { ArchiveFilter } from '@/components/features/concerts/ArchiveFilter';
import { getCompletedConcerts, getAvailableYears } from '@/lib/concerts';

export const metadata: Metadata = {
  title: '지난 공연',
  description:
    '예산윈드오케스트라의 지난 공연 아카이브입니다. 연도별로 지난 공연 기록을 확인하세요.',
};

export default async function ConcertArchivePage() {
  const [completedConcerts, availableYears] = await Promise.all([
    getCompletedConcerts(),
    getAvailableYears(),
  ]);

  return (
    <div>
      {/* 아카이브 안내 */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-3">공연 아카이브</h2>
        <p className="text-dark-300 leading-relaxed">
          예산윈드오케스트라의 지난 공연 기록을 연도별로 확인하실 수 있습니다.
          각 공연의 프로그램과 사진 등 상세 정보를 제공합니다.
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="text-dark-400">
            총 <span className="text-gold-500 font-semibold">{completedConcerts.length}</span>개의 공연 기록
          </span>
        </div>
      </div>

      {/* 필터 및 공연 목록 (클라이언트 컴포넌트) */}
      <ArchiveFilter concerts={completedConcerts} years={availableYears} />
    </div>
  );
}
