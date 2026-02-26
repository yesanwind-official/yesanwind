import { Metadata } from 'next';
import Link from 'next/link';
import { MemberCard } from '@/components/features/members';
import { instrumentGroups, groupMembersByInstrument } from '@/data/members';
import { getMembersByPart } from '@/lib/members';
import { toUIMember } from '@/lib/member-helpers';
import { ArrowLeft, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: '금관 파트 | 단원 소개 | 예산윈드오케스트라',
  description: '예산윈드오케스트라 금관 파트 단원들을 소개합니다. 호른, 트럼펫, 트롬본, 유포니움, 튜바 등.',
};

export default async function BrassPage() {
  const dbMembers = await getMembersByPart('brass');
  const brassMembers = dbMembers.map(toUIMember);
  const groupedMembers = groupMembersByInstrument(brassMembers);

  // 악기 그룹 순서
  const instrumentOrder = ['horn', 'trumpet', 'trombone', 'euphonium', 'tuba'];

  return (
    <div className="container-custom">
      {/* Breadcrumb / Back Link */}
      <div className="mb-8">
        <Link
          href="/members"
          className="inline-flex items-center gap-2 text-dark-400 hover:text-gold-500 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>전체 단원 목록</span>
        </Link>
      </div>

      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center">
            <Music className="w-6 h-6 text-gold-500" />
          </div>
          <div>
            <span className="text-gold-500 text-sm font-medium tracking-widest uppercase block">
              Brass Section
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white light:text-dark-100">금관 파트</h2>
          </div>
        </div>
        <p className="text-dark-300 max-w-2xl mt-4">
          웅장하고 화려한 음색으로 오케스트라의 힘과 깊이를 더하는 금관 파트입니다.
          팡파르부터 서정적인 선율까지 다양한 표현을 담당합니다.
        </p>
      </div>

      {/* Part Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {instrumentOrder.map((instrumentType) => {
          const members = groupedMembers.get(instrumentType) || [];
          const groupInfo = instrumentGroups[instrumentType];

          return (
            <div
              key={instrumentType}
              className="bg-dark-800/50 border border-dark-700 rounded-lg p-4 text-center"
            >
              <span className="block text-2xl font-bold text-gold-500 mb-1">
                {members.length}
              </span>
              <span className="text-dark-300 text-sm">{groupInfo?.label || instrumentType}</span>
            </div>
          );
        })}
      </div>

      {/* Members by Instrument Group */}
      <div className="space-y-16">
        {instrumentOrder.map((instrumentType) => {
          const members = groupedMembers.get(instrumentType) || [];
          const groupInfo = instrumentGroups[instrumentType];

          if (members.length === 0) return null;

          return (
            <section key={instrumentType}>
              {/* Instrument Group Header */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-white light:text-dark-100">
                  {groupInfo?.label || instrumentType}
                </h3>
                <div className="flex-1 h-px bg-dark-700" />
                <span className="text-dark-400 text-sm">{members.length}명</span>
              </div>

              {/* Instrument Description */}
              <p className="text-dark-400 text-sm mb-6">
                {getInstrumentDescription(instrumentType)}
              </p>

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
                      part="금관"
                      position={member.position}
                      profileImage={member.profileImage}
                    />
                  ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

// 악기별 설명
function getInstrumentDescription(instrumentType: string): string {
  const descriptions: Record<string, string> = {
    horn: '오케스트라에서 목관과 금관을 연결하는 역할을 합니다. 부드러우면서도 풍부한 음색으로 화성의 중심을 담당합니다.',
    trumpet: '화려하고 밝은 음색으로 팡파르와 주요 멜로디를 담당합니다. 오케스트라의 빛나는 사운드를 만들어냅니다.',
    trombone: '슬라이드를 이용한 독특한 주법으로 글리산도 등 다양한 표현이 가능합니다. 웅장한 화성과 선율을 담당합니다.',
    euphonium: '부드럽고 따뜻한 음색을 가진 중저음 금관악기로, 관악 오케스트라에서 중요한 역할을 합니다.',
    tuba: '금관 섹션의 베이스를 담당하며, 오케스트라 전체의 화성적 기반을 제공하는 중요한 악기입니다.',
  };

  return descriptions[instrumentType] || '';
}
