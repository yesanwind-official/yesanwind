import { Metadata } from 'next';
import Link from 'next/link';
import { MemberCard } from '@/components/features/members';
import { percussionMembers, instrumentGroups, groupMembersByInstrument } from '@/data/members';
import { ArrowLeft, Drum } from 'lucide-react';

export const metadata: Metadata = {
  title: '타악기 파트 | 단원 소개 | 예산윈드오케스트라',
  description: '예산윈드오케스트라 타악기 파트 단원들을 소개합니다. 팀파니, 스네어 드럼, 마림바, 실로폰 등.',
};

export default function PercussionPage() {
  const groupedMembers = groupMembersByInstrument(percussionMembers);

  // 악기 그룹 순서
  const instrumentOrder = ['timpani', 'snare', 'bass_drum', 'cymbals', 'mallet', 'auxiliary'];

  // 실제로 단원이 있는 그룹만 필터링
  const activeGroups = instrumentOrder.filter((type) => {
    const members = groupedMembers.get(type);
    return members && members.length > 0;
  });

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
            <Drum className="w-6 h-6 text-gold-500" />
          </div>
          <div>
            <span className="text-gold-500 text-sm font-medium tracking-widest uppercase block">
              Percussion Section
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white light:text-dark-100">타악기 파트</h2>
          </div>
        </div>
        <p className="text-dark-300 max-w-2xl mt-4">
          오케스트라에 리듬과 색채를 더하는 타악기 파트입니다.
          팀파니부터 다양한 멜로디 타악기까지, 음악에 생동감을 불어넣습니다.
        </p>
      </div>

      {/* Part Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-4 text-center">
          <span className="block text-2xl font-bold text-gold-500 mb-1">
            {percussionMembers.length}
          </span>
          <span className="text-dark-300 text-sm">전체 단원</span>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-4 text-center">
          <span className="block text-2xl font-bold text-gold-500 mb-1">
            {groupedMembers.get('timpani')?.length || 0}
          </span>
          <span className="text-dark-300 text-sm">팀파니</span>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-4 text-center">
          <span className="block text-2xl font-bold text-gold-500 mb-1">
            {groupedMembers.get('mallet')?.length || 0}
          </span>
          <span className="text-dark-300 text-sm">건반 타악기</span>
        </div>
        <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-4 text-center">
          <span className="block text-2xl font-bold text-gold-500 mb-1">
            {(groupedMembers.get('snare')?.length || 0) +
             (groupedMembers.get('bass_drum')?.length || 0) +
             (groupedMembers.get('cymbals')?.length || 0) +
             (groupedMembers.get('auxiliary')?.length || 0)}
          </span>
          <span className="text-dark-300 text-sm">일반 타악기</span>
        </div>
      </div>

      {/* Percussion Instruments Info */}
      <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-semibold text-white light:text-dark-100 mb-4">타악기 파트 소개</h3>
        <p className="text-dark-300 leading-relaxed mb-4">
          타악기 파트는 오케스트라에서 리듬의 중추를 담당하며, 다양한 악기를 통해 음악에 깊이와 색채를 더합니다.
          팀파니는 화성적 기반과 드라마틱한 효과를, 스네어 드럼과 베이스 드럼은 리듬적 추진력을,
          마림바, 실로폰 등의 건반 타악기는 멜로디와 화성을 담당합니다.
        </p>
        <p className="text-dark-300 leading-relaxed">
          타악기 연주자들은 공연마다 여러 악기를 번갈아 연주하며, 정교한 앙상블과 타이밍이 요구되는
          전문적인 영역입니다.
        </p>
      </div>

      {/* Members Grid - All Together or Grouped */}
      {activeGroups.length > 3 ? (
        // Grouped view if many different instruments
        <div className="space-y-16">
          {activeGroups.map((instrumentType) => {
            const members = groupedMembers.get(instrumentType) || [];
            const groupInfo = instrumentGroups[instrumentType];

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
                        part="타악기"
                        position={member.position}
                        profileImage={member.profileImage}
                      />
                    ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // Simple grid view
        <>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold text-white light:text-dark-100">타악기 단원</h3>
            <div className="flex-1 h-px bg-dark-700" />
            <span className="text-dark-400 text-sm">{percussionMembers.length}명</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {percussionMembers
              .sort((a, b) => a.order - b.order)
              .map((member) => (
                <MemberCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  instrument={member.instrument}
                  part="타악기"
                  position={member.position}
                  profileImage={member.profileImage}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

// 악기별 설명
function getInstrumentDescription(instrumentType: string): string {
  const descriptions: Record<string, string> = {
    timpani: '오케스트라 타악기의 핵심으로, 화성적 뒷받침과 드라마틱한 효과를 담당합니다. 페달로 음정을 조절할 수 있습니다.',
    snare: '날카롭고 선명한 음색으로 리듬의 정확성과 군악적 느낌을 담당합니다.',
    bass_drum: '깊고 웅장한 저음으로 오케스트라의 리듬적 기반을 제공합니다.',
    cymbals: '화려하고 극적인 효과를 만들어내며, 클라이맥스에서 중요한 역할을 합니다.',
    mallet: '마림바, 실로폰, 글로켄슈필 등 건반 타악기로 멜로디와 화성을 연주합니다.',
    auxiliary: '트라이앵글, 탬버린, 우드블록 등 다양한 보조 타악기를 연주합니다.',
  };

  return descriptions[instrumentType] || '';
}
