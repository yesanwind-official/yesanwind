'use client';

import { useState, useMemo } from 'react';
import { MemberCard } from '@/components/features/members';
import { allMembers, partLabels } from '@/data/members';
import { cn } from '@/lib/utils';
import { Filter } from 'lucide-react';
import type { Metadata } from 'next';

const filterOptions = [
  { value: 'all', label: '전체' },
  { value: 'conductor', label: '지휘자' },
  { value: 'woodwind', label: '목관' },
  { value: 'brass', label: '금관' },
  { value: 'percussion', label: '타악기' },
];

export default function MembersPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredMembers = useMemo(() => {
    if (activeFilter === 'all') {
      return allMembers;
    }
    return allMembers.filter((member) => member.part === activeFilter);
  }, [activeFilter]);

  // 파트별로 그룹핑
  const groupedMembers = useMemo(() => {
    const groups: Record<string, typeof allMembers> = {};

    filteredMembers.forEach((member) => {
      const partKey = member.part;
      if (!groups[partKey]) {
        groups[partKey] = [];
      }
      groups[partKey].push(member);
    });

    return groups;
  }, [filteredMembers]);

  return (
    <div className="container-custom">
      {/* Filter Section */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white light:text-dark-100">전체 단원</h2>
            <p className="text-dark-400 text-sm mt-1">
              총 <span className="text-gold-500 font-medium">{filteredMembers.length}</span>명의 단원
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-dark-400" />
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setActiveFilter(option.value)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    activeFilter === option.value
                      ? 'bg-gold-500 text-dark-950'
                      : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white light:hover:text-dark-100 border border-dark-600'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Members Grid - Grouped by Part */}
      {activeFilter === 'all' ? (
        <div className="space-y-16">
          {Object.entries(groupedMembers).map(([part, members]) => (
            <section key={part}>
              {/* Part Header */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-white light:text-dark-100">
                  {partLabels[part] || part}
                </h3>
                <div className="flex-1 h-px bg-dark-700" />
                <span className="text-dark-400 text-sm">{members.length}명</span>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members
                  .sort((a, b) => a.order - b.order)
                  .map((member) => (
                    <MemberCard
                      key={member.id}
                      id={member.id}
                      name={member.name}
                      instrument={member.instrument}
                      part={partLabels[member.part]}
                      position={member.position}
                      profileImage={member.profileImage}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        /* Single Filter - No Grouping */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMembers
            .sort((a, b) => a.order - b.order)
            .map((member) => (
              <MemberCard
                key={member.id}
                id={member.id}
                name={member.name}
                instrument={member.instrument}
                part={partLabels[member.part]}
                position={member.position}
                profileImage={member.profileImage}
              />
            ))}
        </div>
      )}

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-16">
          <p className="text-dark-400">해당 파트에 등록된 단원이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
