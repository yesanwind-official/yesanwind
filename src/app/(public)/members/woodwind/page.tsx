import { Metadata } from 'next';
import Link from 'next/link';
import { MemberCard } from '@/components/features/members';
import { woodwindMembers, instrumentGroups, groupMembersByInstrument } from '@/data/members';
import { ArrowLeft, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: '목관 파트 | 단원 소개 | 예산윈드오케스트라',
  description: '예산윈드오케스트라 목관 파트 단원들을 소개합니다. 플루트, 오보에, 클라리넷, 바순, 색소폰 등.',
};

export default function WoodwindPage() {
  const groupedMembers = groupMembersByInstrument(woodwindMembers);

  // 악기 그룹 순서
  const instrumentOrder = ['flute', 'oboe', 'clarinet', 'bassoon', 'saxophone'];

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
              Woodwind Section
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white light:text-dark-100">목관 파트</h2>
          </div>
        </div>
        <p className="text-dark-300 max-w-2xl mt-4">
          관악 오케스트라의 아름다운 선율을 담당하는 목관 파트입니다.
          플루트부터 색소폰까지 다양한 목관악기의 조화로운 음색을 만들어갑니다.
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
                      part="목관"
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
    flute: '밝고 맑은 음색으로 오케스트라의 주요 멜로디를 담당합니다. 피콜로는 한 옥타브 높은 소리로 화려한 효과를 더합니다.',
    oboe: '독특하고 서정적인 음색으로 오케스트라의 튜닝 기준음을 제공합니다. 잉글리시 호른은 더욱 깊고 따뜻한 음색을 가집니다.',
    clarinet: '넓은 음역대와 다양한 표현력을 가진 악기로, 목관 섹션의 중추적 역할을 합니다.',
    bassoon: '목관 섹션의 저음부를 담당하며, 풍부하고 깊은 음색으로 화성의 기반을 제공합니다.',
    saxophone: '클래식부터 재즈까지 다양한 장르에서 활약하는 악기로, 관악 오케스트라에서 독특한 색채를 더합니다.',
  };

  return descriptions[instrumentType] || '';
}
