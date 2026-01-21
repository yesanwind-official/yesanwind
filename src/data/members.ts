import type { CareerItem } from '@/components/features/members';

export interface MemberData {
  id: string;
  name: string;
  nameEn?: string;
  instrument: string;
  part: 'conductor' | 'woodwind' | 'brass' | 'percussion';
  instrumentType: string;
  position?: string;
  profileImage?: string;
  introduction?: string;
  career?: CareerItem[];
  education?: CareerItem[];
  awards?: CareerItem[];
  email?: string;
  order: number;
}

// 지휘자 데이터
export const conductorData: MemberData = {
  id: 'conductor-1',
  name: '김예산',
  nameEn: 'Kim Yesan',
  instrument: '지휘',
  part: 'conductor',
  instrumentType: 'conductor',
  position: '상임지휘자',
  profileImage: '/images/members/conductor.jpg',
  introduction: `예산윈드오케스트라의 음악적 여정을 이끌어가는 김예산 상임지휘자입니다.

클래식 음악의 깊이와 대중 음악의 친근함을 조화롭게 엮어, 지역 주민들에게 수준 높은 문화 공연을 선사하고자 합니다.

27년간 오케스트라와 함께하며, 음악을 통해 지역 사회와 소통하고 문화 발전에 기여하는 것을 소명으로 삼고 있습니다.`,
  career: [
    { year: '2020', description: '예산윈드오케스트라 상임지휘자 취임' },
    { year: '2015', description: '충남관악합주단 객원지휘자' },
    { year: '2010', description: '서울윈드오케스트라 부지휘자' },
    { year: '2005', description: '한국관악지휘자협회 정회원' },
  ],
  education: [
    { year: '2008', description: '한국예술종합학교 지휘과 석사' },
    { year: '2004', description: '서울대학교 음악대학 작곡과 졸업' },
  ],
  awards: [
    { year: '2022', description: '충청남도 문화예술 발전 공로상' },
    { year: '2018', description: '대한민국 관악지휘 콩쿠르 최우수상' },
    { year: '2012', description: '전국관악경연대회 지휘자상' },
  ],
  email: 'conductor@yesanwind.or.kr',
  order: 1,
};

// 목관 파트 단원 데이터
export const woodwindMembers: MemberData[] = [
  // 플루트
  {
    id: 'ww-1',
    name: '이서연',
    instrument: '플루트',
    part: 'woodwind',
    instrumentType: 'flute',
    position: '수석',
    profileImage: '/images/members/flute-1.jpg',
    order: 1,
  },
  {
    id: 'ww-2',
    name: '박지현',
    instrument: '플루트',
    part: 'woodwind',
    instrumentType: 'flute',
    order: 2,
  },
  {
    id: 'ww-3',
    name: '최유진',
    instrument: '플루트',
    part: 'woodwind',
    instrumentType: 'flute',
    order: 3,
  },
  {
    id: 'ww-4',
    name: '정민서',
    instrument: '피콜로',
    part: 'woodwind',
    instrumentType: 'flute',
    order: 4,
  },
  // 오보에
  {
    id: 'ww-5',
    name: '김하은',
    instrument: '오보에',
    part: 'woodwind',
    instrumentType: 'oboe',
    position: '수석',
    order: 5,
  },
  {
    id: 'ww-6',
    name: '이수빈',
    instrument: '오보에',
    part: 'woodwind',
    instrumentType: 'oboe',
    order: 6,
  },
  {
    id: 'ww-7',
    name: '박서현',
    instrument: '잉글리시 호른',
    part: 'woodwind',
    instrumentType: 'oboe',
    order: 7,
  },
  // 클라리넷
  {
    id: 'ww-8',
    name: '정예진',
    instrument: '클라리넷',
    part: 'woodwind',
    instrumentType: 'clarinet',
    position: '수석',
    order: 8,
  },
  {
    id: 'ww-9',
    name: '최민지',
    instrument: '클라리넷',
    part: 'woodwind',
    instrumentType: 'clarinet',
    order: 9,
  },
  {
    id: 'ww-10',
    name: '김지은',
    instrument: '클라리넷',
    part: 'woodwind',
    instrumentType: 'clarinet',
    order: 10,
  },
  {
    id: 'ww-11',
    name: '이서윤',
    instrument: '베이스 클라리넷',
    part: 'woodwind',
    instrumentType: 'clarinet',
    order: 11,
  },
  // 바순
  {
    id: 'ww-12',
    name: '박준영',
    instrument: '바순',
    part: 'woodwind',
    instrumentType: 'bassoon',
    position: '수석',
    order: 12,
  },
  {
    id: 'ww-13',
    name: '김태현',
    instrument: '바순',
    part: 'woodwind',
    instrumentType: 'bassoon',
    order: 13,
  },
  // 색소폰
  {
    id: 'ww-14',
    name: '이민재',
    instrument: '알토 색소폰',
    part: 'woodwind',
    instrumentType: 'saxophone',
    position: '수석',
    order: 14,
  },
  {
    id: 'ww-15',
    name: '정현우',
    instrument: '테너 색소폰',
    part: 'woodwind',
    instrumentType: 'saxophone',
    order: 15,
  },
  {
    id: 'ww-16',
    name: '최재훈',
    instrument: '바리톤 색소폰',
    part: 'woodwind',
    instrumentType: 'saxophone',
    order: 16,
  },
];

// 금관 파트 단원 데이터
export const brassMembers: MemberData[] = [
  // 호른
  {
    id: 'br-1',
    name: '김도현',
    instrument: '호른',
    part: 'brass',
    instrumentType: 'horn',
    position: '수석',
    order: 1,
  },
  {
    id: 'br-2',
    name: '이승우',
    instrument: '호른',
    part: 'brass',
    instrumentType: 'horn',
    order: 2,
  },
  {
    id: 'br-3',
    name: '박성민',
    instrument: '호른',
    part: 'brass',
    instrumentType: 'horn',
    order: 3,
  },
  {
    id: 'br-4',
    name: '정재원',
    instrument: '호른',
    part: 'brass',
    instrumentType: 'horn',
    order: 4,
  },
  // 트럼펫
  {
    id: 'br-5',
    name: '최동현',
    instrument: '트럼펫',
    part: 'brass',
    instrumentType: 'trumpet',
    position: '수석',
    order: 5,
  },
  {
    id: 'br-6',
    name: '김준서',
    instrument: '트럼펫',
    part: 'brass',
    instrumentType: 'trumpet',
    order: 6,
  },
  {
    id: 'br-7',
    name: '이현준',
    instrument: '트럼펫',
    part: 'brass',
    instrumentType: 'trumpet',
    order: 7,
  },
  {
    id: 'br-8',
    name: '박지훈',
    instrument: '트럼펫',
    part: 'brass',
    instrumentType: 'trumpet',
    order: 8,
  },
  // 트롬본
  {
    id: 'br-9',
    name: '정우진',
    instrument: '트롬본',
    part: 'brass',
    instrumentType: 'trombone',
    position: '수석',
    order: 9,
  },
  {
    id: 'br-10',
    name: '최성훈',
    instrument: '트롬본',
    part: 'brass',
    instrumentType: 'trombone',
    order: 10,
  },
  {
    id: 'br-11',
    name: '김민준',
    instrument: '베이스 트롬본',
    part: 'brass',
    instrumentType: 'trombone',
    order: 11,
  },
  // 유포니움
  {
    id: 'br-12',
    name: '이태현',
    instrument: '유포니움',
    part: 'brass',
    instrumentType: 'euphonium',
    position: '수석',
    order: 12,
  },
  {
    id: 'br-13',
    name: '박준호',
    instrument: '유포니움',
    part: 'brass',
    instrumentType: 'euphonium',
    order: 13,
  },
  // 튜바
  {
    id: 'br-14',
    name: '정석현',
    instrument: '튜바',
    part: 'brass',
    instrumentType: 'tuba',
    position: '수석',
    order: 14,
  },
  {
    id: 'br-15',
    name: '최민수',
    instrument: '튜바',
    part: 'brass',
    instrumentType: 'tuba',
    order: 15,
  },
];

// 타악기 파트 단원 데이터
export const percussionMembers: MemberData[] = [
  {
    id: 'pc-1',
    name: '김현서',
    instrument: '팀파니',
    part: 'percussion',
    instrumentType: 'timpani',
    position: '수석',
    order: 1,
  },
  {
    id: 'pc-2',
    name: '이승현',
    instrument: '스네어 드럼',
    part: 'percussion',
    instrumentType: 'snare',
    order: 2,
  },
  {
    id: 'pc-3',
    name: '박지성',
    instrument: '베이스 드럼',
    part: 'percussion',
    instrumentType: 'bass_drum',
    order: 3,
  },
  {
    id: 'pc-4',
    name: '정민혁',
    instrument: '심벌즈',
    part: 'percussion',
    instrumentType: 'cymbals',
    order: 4,
  },
  {
    id: 'pc-5',
    name: '최영준',
    instrument: '마림바',
    part: 'percussion',
    instrumentType: 'mallet',
    order: 5,
  },
  {
    id: 'pc-6',
    name: '김승우',
    instrument: '실로폰',
    part: 'percussion',
    instrumentType: 'mallet',
    order: 6,
  },
  {
    id: 'pc-7',
    name: '이준혁',
    instrument: '글로켄슈필',
    part: 'percussion',
    instrumentType: 'mallet',
    order: 7,
  },
  {
    id: 'pc-8',
    name: '박현우',
    instrument: '종합 타악기',
    part: 'percussion',
    instrumentType: 'auxiliary',
    order: 8,
  },
];

// 전체 단원 데이터
export const allMembers: MemberData[] = [
  conductorData,
  ...woodwindMembers,
  ...brassMembers,
  ...percussionMembers,
];

// 파트별 라벨
export const partLabels: Record<string, string> = {
  conductor: '지휘자',
  woodwind: '목관',
  brass: '금관',
  percussion: '타악기',
};

// 악기 그룹 라벨
export const instrumentGroups: Record<string, { label: string; instruments: string[] }> = {
  // 목관
  flute: { label: '플루트', instruments: ['플루트', '피콜로'] },
  oboe: { label: '오보에', instruments: ['오보에', '잉글리시 호른'] },
  clarinet: { label: '클라리넷', instruments: ['클라리넷', '베이스 클라리넷'] },
  bassoon: { label: '바순', instruments: ['바순', '콘트라바순'] },
  saxophone: { label: '색소폰', instruments: ['소프라노 색소폰', '알토 색소폰', '테너 색소폰', '바리톤 색소폰'] },
  // 금관
  horn: { label: '호른', instruments: ['호른'] },
  trumpet: { label: '트럼펫', instruments: ['트럼펫', '코넷', '플루겔호른'] },
  trombone: { label: '트롬본', instruments: ['트롬본', '베이스 트롬본'] },
  euphonium: { label: '유포니움', instruments: ['유포니움', '바리톤'] },
  tuba: { label: '튜바', instruments: ['튜바', 'BBb 튜바', 'CC 튜바'] },
  // 타악기
  timpani: { label: '팀파니', instruments: ['팀파니'] },
  snare: { label: '스네어 드럼', instruments: ['스네어 드럼'] },
  bass_drum: { label: '베이스 드럼', instruments: ['베이스 드럼'] },
  cymbals: { label: '심벌즈', instruments: ['심벌즈'] },
  mallet: { label: '건반 타악기', instruments: ['마림바', '실로폰', '글로켄슈필', '비브라폰', '차임'] },
  auxiliary: { label: '보조 타악기', instruments: ['종합 타악기', '트라이앵글', '탬버린', '우드블록'] },
};

// 유틸리티 함수: 악기 유형별로 그룹핑
export function groupMembersByInstrument(members: MemberData[]): Map<string, MemberData[]> {
  const groups = new Map<string, MemberData[]>();

  members.forEach((member) => {
    const type = member.instrumentType;
    if (!groups.has(type)) {
      groups.set(type, []);
    }
    groups.get(type)!.push(member);
  });

  return groups;
}
