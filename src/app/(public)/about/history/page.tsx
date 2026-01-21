import { Metadata } from 'next';
import { Calendar, Award, Users, Music, Star, Building } from 'lucide-react';

export const metadata: Metadata = {
  title: '연혁',
  description: '1998년 창단 이래 27년간 지역 문화 발전에 기여해온 예산윈드오케스트라의 발자취를 소개합니다.',
};

// Mock Data - 연혁 데이터
const historyData = [
  {
    year: '2024',
    events: [
      {
        date: '2024.11',
        title: '제46회 정기연주회',
        description: '예산문화예술회관 대공연장에서 성황리에 개최',
        icon: Music,
        highlight: true,
      },
      {
        date: '2024.06',
        title: '제45회 정기연주회',
        description: '여름밤의 세레나데',
        icon: Music,
      },
      {
        date: '2024.03',
        title: '지역 축제 초청 공연',
        description: '예산 봄꽃축제 개막식 축하공연',
        icon: Star,
      },
    ],
  },
  {
    year: '2023',
    events: [
      {
        date: '2023.12',
        title: '창단 25주년 기념 특별연주회',
        description: '지역 예술가 및 동문 연주자와 함께한 특별 무대',
        icon: Award,
        highlight: true,
      },
      {
        date: '2023.10',
        title: '충남 관악 페스티벌 대상 수상',
        description: '충청남도 관악 합주 경연대회 대상',
        icon: Award,
        highlight: true,
      },
      {
        date: '2023.05',
        title: '학교 방문 연주회',
        description: '예산군 관내 초등학교 10개교 순회 연주',
        icon: Building,
      },
    ],
  },
  {
    year: '2022',
    events: [
      {
        date: '2022.11',
        title: '제42회 정기연주회',
        description: '코로나19 이후 첫 전면 대면 공연',
        icon: Music,
        highlight: true,
      },
      {
        date: '2022.08',
        title: '신규 단원 20명 영입',
        description: '청년층 단원 대거 합류로 세대 교체 활발',
        icon: Users,
      },
    ],
  },
  {
    year: '2020-2021',
    events: [
      {
        date: '2021.06',
        title: '온라인 연주회 개최',
        description: '비대면 시대, 유튜브 라이브 스트리밍 연주회 진행',
        icon: Music,
      },
      {
        date: '2020.03',
        title: '코로나19로 인한 공연 잠정 중단',
        description: '온라인 합주 연습으로 단원 유대 유지',
        icon: Calendar,
      },
    ],
  },
  {
    year: '2018',
    events: [
      {
        date: '2018.11',
        title: '창단 20주년 기념연주회',
        description: '예산문화예술회관 대공연장 전석 매진',
        icon: Award,
        highlight: true,
      },
      {
        date: '2018.05',
        title: '해외 교류 연주회',
        description: '일본 치바현 관악 오케스트라와 교류 공연',
        icon: Star,
      },
    ],
  },
  {
    year: '2015',
    events: [
      {
        date: '2015.09',
        title: '전국 관악 합주 경연대회 금상',
        description: '전국 규모 대회 첫 금상 수상',
        icon: Award,
        highlight: true,
      },
      {
        date: '2015.04',
        title: '신규 연습실 이전',
        description: '예산문화예술회관 내 전용 연습실 확보',
        icon: Building,
      },
    ],
  },
  {
    year: '2010',
    events: [
      {
        date: '2010.11',
        title: '제20회 정기연주회',
        description: '창단 이래 20회 정기연주회 달성',
        icon: Music,
      },
      {
        date: '2010.06',
        title: '단원 50명 돌파',
        description: '지역 최대 규모 관악 오케스트라로 성장',
        icon: Users,
        highlight: true,
      },
    ],
  },
  {
    year: '2005',
    events: [
      {
        date: '2005.12',
        title: '예산군 문화예술 공로상 수상',
        description: '지역 문화 발전 기여 공로 인정',
        icon: Award,
      },
      {
        date: '2005.03',
        title: '청소년 관악 교실 개설',
        description: '지역 청소년 대상 관악기 교육 프로그램 시작',
        icon: Users,
      },
    ],
  },
  {
    year: '1998',
    events: [
      {
        date: '1998.09',
        title: '제1회 창단 연주회',
        description: '예산군민회관에서 200여 명 관객과 함께한 첫 무대',
        icon: Music,
        highlight: true,
      },
      {
        date: '1998.03',
        title: '예산윈드오케스트라 창단',
        description: '지역 음악인 15명이 모여 창단',
        icon: Star,
        highlight: true,
      },
    ],
  },
];

// 주요 이정표 통계
const milestones = [
  { value: '1998', label: '창단년도' },
  { value: '47+', label: '정기연주회' },
  { value: '50+', label: '현재 단원수' },
  { value: '10+', label: '수상 경력' },
];

export default function HistoryPage() {
  return (
    <div className="space-y-12">
      {/* Milestone Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        {milestones.map((milestone) => (
          <div
            key={milestone.label}
            className="text-center p-6 rounded-lg bg-dark-800 border border-dark-700 hover:border-gold-500/30 transition-colors"
          >
            <span className="block text-3xl md:text-4xl font-bold text-gold-500 mb-2">
              {milestone.value}
            </span>
            <span className="block text-sm text-dark-300">{milestone.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center Line - Desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-dark-700 -translate-x-1/2" />

        {/* Timeline Items */}
        <div className="space-y-8 lg:space-y-0">
          {historyData.map((yearGroup, groupIndex) => (
            <div key={yearGroup.year} className="relative">
              {/* Year Label */}
              <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:z-10 mb-6 lg:mb-0">
                <div className="inline-flex items-center justify-center px-6 py-2 bg-gold-500 text-dark-950 font-bold rounded-full text-lg shadow-lg shadow-gold-500/20">
                  {yearGroup.year}
                </div>
              </div>

              {/* Events */}
              <div className="lg:pt-16 space-y-4 lg:space-y-6">
                {yearGroup.events.map((event, eventIndex) => {
                  const isLeft = eventIndex % 2 === 0;
                  const IconComponent = event.icon;

                  return (
                    <div
                      key={`${yearGroup.year}-${eventIndex}`}
                      className={`relative lg:w-[calc(50%-2rem)] ${
                        isLeft ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
                      }`}
                    >
                      {/* Connector Line - Desktop */}
                      <div
                        className={`hidden lg:block absolute top-6 w-8 h-px bg-dark-600 ${
                          isLeft ? 'right-0' : 'left-0'
                        }`}
                      />

                      {/* Connector Dot - Desktop */}
                      <div
                        className={`hidden lg:block absolute top-5 w-3 h-3 rounded-full ${
                          event.highlight ? 'bg-gold-500' : 'bg-dark-500'
                        } ${isLeft ? '-right-[1.625rem]' : '-left-[1.625rem]'}`}
                      />

                      {/* Event Card */}
                      <div
                        className={`group p-5 rounded-lg border transition-all duration-300 ${
                          event.highlight
                            ? 'bg-dark-800 border-gold-500/30 hover:border-gold-500/50'
                            : 'bg-dark-800/50 border-dark-700 hover:border-dark-600'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                              event.highlight
                                ? 'bg-gold-500/20 text-gold-500'
                                : 'bg-dark-700 text-dark-400 group-hover:text-gold-500'
                            } transition-colors`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <span className="text-dark-400 text-sm">{event.date}</span>
                            <h3
                              className={`font-semibold mt-1 ${
                                event.highlight ? 'text-gold-400' : 'text-white light:text-dark-100'
                              }`}
                            >
                              {event.title}
                            </h3>
                            <p className="text-dark-300 text-sm mt-1">
                              {event.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Spacer between year groups */}
              {groupIndex < historyData.length - 1 && (
                <div className="h-8 lg:h-12" />
              )}
            </div>
          ))}
        </div>

        {/* Timeline End */}
        <div className="flex justify-center mt-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-dark-700" />
            <div className="w-3 h-3 bg-gold-500 rounded-full" />
            <div className="w-8 h-px bg-dark-700" />
          </div>
        </div>
      </div>

      {/* Future Vision */}
      <div className="mt-16 p-8 bg-dark-800 border border-dark-700 rounded-lg text-center">
        <h3 className="text-xl font-bold text-white light:text-dark-100 mb-3">
          앞으로의 발자취
        </h3>
        <p className="text-dark-300 max-w-2xl mx-auto">
          예산윈드오케스트라는 앞으로도 지역 문화 발전을 위해 더욱 노력하겠습니다.
          <br className="hidden md:block" />
          음악으로 하나되는 예산, 그 꿈을 향해 함께 나아갑니다.
        </p>
      </div>
    </div>
  );
}
