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
