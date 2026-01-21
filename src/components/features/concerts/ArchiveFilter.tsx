'use client';

import { useState, useMemo } from 'react';
import { ConcertCard } from './ConcertCard';
import { cn } from '@/lib/utils';
import type { ConcertWithLabels } from '@/types/concert';

interface ArchiveFilterProps {
  concerts: ConcertWithLabels[];
  years: number[];
}

export function ArchiveFilter({ concerts, years }: ArchiveFilterProps) {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  // 필터링된 공연 목록
  const filteredConcerts = useMemo(() => {
    let filtered = concerts;

    if (selectedYear !== 'all') {
      filtered = filtered.filter((concert) => {
        const concertYear = new Date(concert.date).getFullYear();
        return concertYear === selectedYear;
      });
    }

    // 최신순 정렬
    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [concerts, selectedYear]);

  // 연도별 공연 수
  const concertCountByYear = useMemo(() => {
    const counts: Record<number, number> = {};
    concerts.forEach((concert) => {
      const year = new Date(concert.date).getFullYear();
      counts[year] = (counts[year] || 0) + 1;
    });
    return counts;
  }, [concerts]);

  return (
    <>
      {/* 연도 필터 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedYear('all')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
              selectedYear === 'all'
                ? 'bg-gold-500 text-dark-950'
                : 'bg-dark-800 text-dark-300 hover:text-white light:hover:text-dark-100 hover:bg-dark-700'
            )}
          >
            전체 ({concerts.length})
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
                selectedYear === year
                  ? 'bg-gold-500 text-dark-950'
                  : 'bg-dark-800 text-dark-300 hover:text-white light:hover:text-dark-100 hover:bg-dark-700'
              )}
            >
              {year}년 ({concertCountByYear[year] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* 공연 목록 */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white light:text-dark-100">
              {selectedYear === 'all' ? '전체 공연' : `${selectedYear}년 공연`}
            </h2>
            <p className="text-dark-400 text-sm mt-1">
              {filteredConcerts.length}개의 공연 기록
            </p>
          </div>
        </div>

        {filteredConcerts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredConcerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-dark-800/50 border border-dark-700 rounded-lg">
            <p className="text-dark-400">
              {selectedYear === 'all'
                ? '아직 공연 기록이 없습니다.'
                : `${selectedYear}년에 진행된 공연이 없습니다.`}
            </p>
          </div>
        )}
      </section>

      {/* 연도별 타임라인 (전체 보기일 때만) */}
      {selectedYear === 'all' && years.length > 1 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-white light:text-dark-100 mb-6">연도별 공연 현황</h2>
          <div className="space-y-4">
            {years.map((year) => {
              const count = concertCountByYear[year] || 0;
              const maxCount = Math.max(...Object.values(concertCountByYear));
              const percentage = (count / maxCount) * 100;

              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className="w-full group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-dark-300 font-medium w-16 text-right group-hover:text-gold-500 transition-colors">
                      {year}
                    </span>
                    <div className="flex-1 h-8 bg-dark-800 rounded overflow-hidden">
                      <div
                        className="h-full bg-gold-500/30 group-hover:bg-gold-500/50 transition-all duration-300 flex items-center px-3"
                        style={{ width: `${Math.max(percentage, 10)}%` }}
                      >
                        <span className="text-sm text-white light:text-dark-100 font-medium">{count}회</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
