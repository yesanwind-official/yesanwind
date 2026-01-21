'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import type { ConcertProgram } from '@/types';

interface ProgramListProps {
  programs: ConcertProgram[];
  className?: string;
}

function ProgramListComponent({ programs, className }: ProgramListProps) {
  if (!programs || programs.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)}>
      {programs.map((program, index) => (
        <div
          key={program.order}
          className="bg-dark-800/50 border border-dark-600 rounded-lg p-4 transition-colors hover:border-dark-500"
        >
          <div className="flex items-start gap-4">
            {/* 순서 번호 */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center">
              <span className="text-gold-500 font-semibold text-sm">{program.order}</span>
            </div>

            {/* 프로그램 정보 */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white light:text-dark-100 font-medium mb-1">{program.title}</h4>
              <p className="text-dark-300 text-sm">
                {program.composer}
                {program.arranger && (
                  <span className="text-dark-400"> / arr. {program.arranger}</span>
                )}
              </p>

              {/* 추가 정보 */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                {program.duration && (
                  <span className="text-dark-400 text-xs">{program.duration}</span>
                )}
                {program.soloist && (
                  <span className="text-gold-500/80 text-xs">
                    Soloist: {program.soloist}
                  </span>
                )}
                {program.notes && (
                  <span className="text-dark-400 text-xs italic">{program.notes}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const ProgramList = memo(ProgramListComponent);
