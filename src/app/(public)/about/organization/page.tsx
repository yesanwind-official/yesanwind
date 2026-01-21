import { Metadata } from 'next';
import { Users, Music2, Drum, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: '조직도',
  description: '예산윈드오케스트라의 조직 구조와 파트별 구성을 소개합니다. 목관, 금관, 타악기 파트의 단원들을 만나보세요.',
};

// 조직 구조 데이터
const organizationStructure = {
  leadership: [
    {
      position: '단장',
      name: '박문화',
      description: '오케스트라 운영 총괄',
    },
    {
      position: '음악감독 겸 상임지휘자',
      name: '김예산',
      description: '음악적 방향 및 지휘',
    },
    {
      position: '부단장',
      name: '이화음',
      description: '단장 업무 보조 및 대외협력',
    },
  ],
  staff: [
    { position: '총무', name: '최관리', description: '행정 업무 총괄' },
    { position: '악보관리', name: '정악보', description: '악보 관리 및 배포' },
    { position: '홍보', name: '한소식', description: '홍보 및 SNS 운영' },
    { position: '회계', name: '오재무', description: '재정 관리' },
  ],
};

// 파트별 구성 데이터
const partsData = [
  {
    id: 'woodwind',
    name: '목관 파트',
    englishName: 'Woodwind',
    icon: Wind,
    color: 'emerald',
    description: '부드럽고 서정적인 음색으로 오케스트라의 멜로디를 이끌어가는 파트입니다.',
    instruments: [
      { name: '플루트 (Flute)', count: 6, leader: '김선율' },
      { name: '피콜로 (Piccolo)', count: 1, leader: null },
      { name: '오보에 (Oboe)', count: 3, leader: '박서정' },
      { name: '클라리넷 (Clarinet)', count: 8, leader: '이맑음' },
      { name: '베이스 클라리넷 (Bass Clarinet)', count: 2, leader: null },
      { name: '바순 (Bassoon)', count: 3, leader: '정깊이' },
      { name: '색소폰 (Saxophone)', count: 4, leader: '최재즈' },
    ],
    totalMembers: 27,
  },
  {
    id: 'brass',
    name: '금관 파트',
    englishName: 'Brass',
    icon: Music2,
    color: 'amber',
    description: '웅장하고 화려한 사운드로 오케스트라의 힘과 깊이를 더하는 파트입니다.',
    instruments: [
      { name: '호른 (Horn)', count: 4, leader: '송둥근' },
      { name: '트럼펫 (Trumpet)', count: 5, leader: '강빛남' },
      { name: '트롬본 (Trombone)', count: 4, leader: '윤웅장' },
      { name: '베이스 트롬본 (Bass Trombone)', count: 1, leader: null },
      { name: '유포니움 (Euphonium)', count: 3, leader: '임부드' },
      { name: '튜바 (Tuba)', count: 2, leader: '조깊은' },
    ],
    totalMembers: 19,
  },
  {
    id: 'percussion',
    name: '타악기 파트',
    englishName: 'Percussion',
    icon: Drum,
    color: 'rose',
    description: '리듬과 악센트로 음악에 생동감을 불어넣는 파트입니다.',
    instruments: [
      { name: '팀파니 (Timpani)', count: 1, leader: '배리듬' },
      { name: '스네어 드럼 (Snare Drum)', count: 2, leader: null },
      { name: '베이스 드럼 (Bass Drum)', count: 1, leader: null },
      { name: '심벌즈 (Cymbals)', count: 1, leader: null },
      { name: '실로폰/마림바 (Xylophone/Marimba)', count: 2, leader: null },
      { name: '기타 타악기', count: 2, leader: null },
    ],
    totalMembers: 9,
  },
];

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-500',
    hover: 'hover:border-emerald-500/50',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-500',
    hover: 'hover:border-amber-500/50',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    text: 'text-rose-500',
    hover: 'hover:border-rose-500/50',
  },
};

export default function OrganizationPage() {
  return (
    <div className="space-y-16">
      {/* Leadership Structure */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white light:text-dark-100 mb-3">
            지휘부 및 임원
          </h2>
          <p className="text-dark-300">오케스트라의 운영과 음악적 방향을 이끄는 리더십</p>
        </div>

        {/* Leadership Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {organizationStructure.leadership.map((leader, index) => (
            <div
              key={leader.position}
              className={`relative p-6 rounded-lg bg-dark-800 border transition-all duration-300 ${
                index === 1
                  ? 'border-gold-500/30 hover:border-gold-500/50 md:-mt-4 md:mb-4'
                  : 'border-dark-700 hover:border-dark-600'
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold-500 text-dark-950 text-xs font-bold rounded">
                  MUSIC DIRECTOR
                </div>
              )}
              <div className="text-center">
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-dark-700 flex items-center justify-center">
                  <Users className={`w-8 h-8 ${index === 1 ? 'text-gold-500' : 'text-dark-500'}`} />
                </div>
                <h3 className={`text-lg font-bold ${index === 1 ? 'text-gold-400' : 'text-white light:text-dark-100'}`}>
                  {leader.name}
                </h3>
                <p className="text-gold-500 text-sm mt-1">{leader.position}</p>
                <p className="text-dark-400 text-sm mt-2">{leader.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Staff */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {organizationStructure.staff.map((staff) => (
            <div
              key={staff.position}
              className="p-4 rounded-lg bg-dark-800/50 border border-dark-700 hover:border-dark-600 transition-colors text-center"
            >
              <p className="text-gold-500 text-sm font-medium">{staff.position}</p>
              <p className="text-white light:text-dark-100 font-semibold mt-1">{staff.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center">
        <div className="w-24 h-px bg-dark-700" />
        <div className="w-3 h-3 bg-gold-500 rounded-full mx-4" />
        <div className="w-24 h-px bg-dark-700" />
      </div>

      {/* Parts Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white light:text-dark-100 mb-3">
            파트별 구성
          </h2>
          <p className="text-dark-300">총 55명의 단원이 세 개의 파트로 구성되어 있습니다</p>
        </div>

        {/* Parts Grid */}
        <div className="space-y-8">
          {partsData.map((part) => {
            const colors = colorClasses[part.color as keyof typeof colorClasses];
            const IconComponent = part.icon;

            return (
              <div
                key={part.id}
                className={`p-6 md:p-8 rounded-lg bg-dark-800 border ${colors.border} ${colors.hover} transition-all duration-300`}
              >
                {/* Part Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <IconComponent className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white light:text-dark-100">
                        {part.name}
                      </h3>
                      <span className={`text-sm font-medium ${colors.text}`}>
                        {part.englishName}
                      </span>
                    </div>
                    <p className="text-dark-300 text-sm mt-1">{part.description}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <span className={`text-3xl font-bold ${colors.text}`}>
                      {part.totalMembers}
                    </span>
                    <span className="text-dark-400 text-sm block">명</span>
                  </div>
                </div>

                {/* Instruments Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {part.instruments.map((instrument) => (
                    <div
                      key={instrument.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-dark-900/50 border border-dark-700"
                    >
                      <div className="min-w-0">
                        <p className="text-white light:text-dark-100 text-sm font-medium truncate">
                          {instrument.name}
                        </p>
                        {instrument.leader && (
                          <p className="text-dark-400 text-xs mt-0.5">
                            파트장: {instrument.leader}
                          </p>
                        )}
                      </div>
                      <span className={`flex-shrink-0 ml-3 px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                        {instrument.count}명
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Total Summary */}
      <section className="p-8 bg-gradient-to-br from-dark-800 to-dark-900 border border-gold-500/20 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white light:text-dark-100 mb-2">
              예산윈드오케스트라 단원 현황
            </h3>
            <p className="text-dark-300 text-sm">
              다양한 연령대와 직업을 가진 단원들이 음악에 대한 열정으로 모여 있습니다
            </p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <span className="text-4xl font-bold text-gold-500">55</span>
              <span className="text-dark-300 text-sm block">총 단원수</span>
            </div>
            <div className="w-px h-12 bg-dark-700" />
            <div className="text-center">
              <span className="text-4xl font-bold text-gold-500">3</span>
              <span className="text-dark-300 text-sm block">파트</span>
            </div>
            <div className="w-px h-12 bg-dark-700" />
            <div className="text-center">
              <span className="text-4xl font-bold text-gold-500">19</span>
              <span className="text-dark-300 text-sm block">악기 종류</span>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="text-center">
        <p className="text-dark-300 mb-4">
          예산윈드오케스트라와 함께 음악을 연주하고 싶으신가요?
        </p>
        <a
          href="/board/notice"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-medium rounded-lg transition-colors"
        >
          단원 모집 안내 보기
        </a>
      </section>
    </div>
  );
}
