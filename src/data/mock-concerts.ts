/**
 * Mock 공연 데이터
 */

import type { ConcertWithLabels, ConcertDetail, Performer } from '@/types/concert';
import type { ConcertProgram } from '@/types';

// 출연진 Mock 데이터
const performers: Performer[] = [
  {
    id: '1',
    name: '김영수',
    role: '상임지휘자',
    bio: '서울대학교 음악대학 졸업, 독일 베를린 국립음대 지휘과 석사',
  },
  {
    id: '2',
    name: '박지현',
    role: '협연 피아니스트',
    instrument: '피아노',
    bio: '한국예술종합학교 졸업, 쇼팽 국제 콩쿠르 입상',
  },
];

// 프로그램 Mock 데이터
const regularProgram: ConcertProgram[] = [
  {
    order: 1,
    title: 'Festive Overture, Op. 96',
    composer: 'Dmitri Shostakovich',
    arranger: 'Donald Hunsberger',
    duration: '6분',
  },
  {
    order: 2,
    title: 'Armenian Dances, Part I',
    composer: 'Alfred Reed',
    duration: '11분',
  },
  {
    order: 3,
    title: 'First Suite in E-flat for Military Band',
    composer: 'Gustav Holst',
    duration: '12분',
  },
  {
    order: 4,
    title: 'The Lord of the Rings',
    composer: 'Johan de Meij',
    duration: '45분',
    notes: '전 5악장',
  },
];

const specialProgram: ConcertProgram[] = [
  {
    order: 1,
    title: 'Spring',
    composer: 'Antonio Vivaldi',
    arranger: 'Calvin Custer',
    duration: '10분',
  },
  {
    order: 2,
    title: 'Cherry Blossoms',
    composer: '한국 민요',
    arranger: '김동진',
    duration: '5분',
  },
  {
    order: 3,
    title: 'Spring Breeze',
    composer: '예산윈드오케스트라 위촉곡',
    duration: '8분',
  },
];

// 공연 목록 Mock 데이터
export const mockConcerts: ConcertWithLabels[] = [
  // 예정된 공연
  {
    id: '1',
    title: '제47회 정기연주회 - 봄의 선율',
    subtitle: '새로운 시작을 알리는 봄의 하모니',
    description:
      '예산윈드오케스트라의 47번째 정기연주회입니다. 봄의 설렘과 희망을 담은 다채로운 프로그램으로 관객 여러분을 찾아갑니다.',
    category: 'regular',
    categoryLabel: '정기연주회',
    date: '2025-03-15',
    time: '19:30',
    end_time: '21:30',
    venue: '예산문화예술회관 대공연장',
    venue_address: '충남 예산군 예산읍 군청로 1',
    poster_image: '/images/concerts/poster-47th.jpg',
    ticket_info: '전석 무료 (사전 예약 필수)',
    ticket_price: '무료',
    ticket_link: 'https://ticket.example.com/47th',
    status: 'upcoming',
    statusLabel: '예매중',
    is_featured: true,
    program: regularProgram,
    created_at: '2025-01-01',
    updated_at: '2025-01-15',
  },
  {
    id: '2',
    title: '봄의 향연 - 특별 기획공연',
    subtitle: '지역 예술가와 함께하는 특별한 무대',
    description:
      '예산 지역의 다양한 예술가들과 함께하는 특별 기획공연입니다. 클래식과 다양한 장르의 융합을 경험하세요.',
    category: 'special',
    categoryLabel: '기획공연',
    date: '2025-04-20',
    time: '15:00',
    end_time: '17:00',
    venue: '예산문화예술회관 소공연장',
    venue_address: '충남 예산군 예산읍 군청로 1',
    poster_image: '/images/concerts/poster-spring.jpg',
    ticket_info: '전석 10,000원',
    ticket_price: '10,000원',
    status: 'upcoming',
    statusLabel: '예매예정',
    is_featured: false,
    program: specialProgram,
    created_at: '2025-01-05',
    updated_at: '2025-01-10',
  },
  {
    id: '3',
    title: '제48회 정기연주회 - 여름밤의 세레나데',
    subtitle: '한여름 밤의 클래식 선물',
    description:
      '무더운 여름밤을 시원하게 만들어줄 아름다운 선율의 향연. 여름 저녁의 낭만을 음악으로 느껴보세요.',
    category: 'regular',
    categoryLabel: '정기연주회',
    date: '2025-06-21',
    time: '19:00',
    end_time: '21:00',
    venue: '예산문화예술회관 대공연장',
    venue_address: '충남 예산군 예산읍 군청로 1',
    poster_image: '/images/concerts/poster-48th.jpg',
    ticket_info: '전석 무료 (사전 예약 필수)',
    ticket_price: '무료',
    status: 'upcoming',
    statusLabel: '예매예정',
    is_featured: false,
    created_at: '2025-01-10',
    updated_at: '2025-01-10',
  },
  {
    id: '4',
    title: '예산 축제 특별 공연',
    subtitle: '예산 사과 축제 기념 야외 공연',
    description: '예산 사과 축제를 기념하는 야외 특별 공연입니다.',
    category: 'festival',
    categoryLabel: '축제/행사',
    date: '2025-10-15',
    time: '14:00',
    end_time: '15:30',
    venue: '예산 종합운동장',
    venue_address: '충남 예산군 예산읍',
    status: 'upcoming',
    statusLabel: '예매예정',
    is_featured: false,
    created_at: '2025-01-15',
    updated_at: '2025-01-15',
  },
  // 지난 공연
  {
    id: '5',
    title: '제46회 정기연주회 - 가을의 멜로디',
    subtitle: '풍성한 가을의 선율',
    description: '2024년 가을, 예산윈드오케스트라의 46번째 정기연주회가 성황리에 개최되었습니다.',
    category: 'regular',
    categoryLabel: '정기연주회',
    date: '2024-11-15',
    time: '19:30',
    venue: '예산문화예술회관 대공연장',
    venue_address: '충남 예산군 예산읍 군청로 1',
    poster_image: '/images/concerts/poster-46th.jpg',
    status: 'completed',
    statusLabel: '종료',
    is_featured: false,
    created_at: '2024-09-01',
    updated_at: '2024-11-16',
  },
  {
    id: '6',
    title: '송년음악회 2024',
    subtitle: '한 해를 마무리하는 감동의 선율',
    description: '2024년을 마무리하며 관객 여러분께 감사의 마음을 전하는 송년음악회입니다.',
    category: 'special',
    categoryLabel: '기획공연',
    date: '2024-12-20',
    time: '19:00',
    venue: '예산문화예술회관 대공연장',
    venue_address: '충남 예산군 예산읍 군청로 1',
    poster_image: '/images/concerts/poster-newyear.jpg',
    status: 'completed',
    statusLabel: '종료',
    is_featured: false,
    created_at: '2024-10-01',
    updated_at: '2024-12-21',
  },
  {
    id: '7',
    title: '제45회 정기연주회 - 여름의 환희',
    subtitle: '시원한 여름날의 음악 축제',
    description: '2024년 여름 정기연주회.',
    category: 'regular',
    categoryLabel: '정기연주회',
    date: '2024-07-20',
    time: '19:30',
    venue: '예산문화예술회관 대공연장',
    venue_address: '충남 예산군 예산읍 군청로 1',
    status: 'completed',
    statusLabel: '종료',
    is_featured: false,
    created_at: '2024-05-01',
    updated_at: '2024-07-21',
  },
  {
    id: '8',
    title: '제44회 정기연주회',
    subtitle: '봄날의 하모니',
    description: '2024년 봄 정기연주회.',
    category: 'regular',
    categoryLabel: '정기연주회',
    date: '2024-03-15',
    time: '19:30',
    venue: '예산문화예술회관 대공연장',
    venue_address: '충남 예산군 예산읍 군청로 1',
    status: 'completed',
    statusLabel: '종료',
    is_featured: false,
    created_at: '2024-01-01',
    updated_at: '2024-03-16',
  },
  {
    id: '9',
    title: '2023 송년음악회',
    subtitle: '한 해의 마무리',
    description: '2023년 송년음악회.',
    category: 'special',
    categoryLabel: '기획공연',
    date: '2023-12-22',
    time: '19:00',
    venue: '예산문화예술회관 대공연장',
    venue_address: '충남 예산군 예산읍 군청로 1',
    status: 'completed',
    statusLabel: '종료',
    is_featured: false,
    created_at: '2023-10-01',
    updated_at: '2023-12-23',
  },
  {
    id: '10',
    title: '제43회 정기연주회',
    subtitle: '가을 콘서트',
    description: '2023년 가을 정기연주회.',
    category: 'regular',
    categoryLabel: '정기연주회',
    date: '2023-10-20',
    time: '19:30',
    venue: '예산문화예술회관 대공연장',
    venue_address: '충남 예산군 예산읍 군청로 1',
    status: 'completed',
    statusLabel: '종료',
    is_featured: false,
    created_at: '2023-08-01',
    updated_at: '2023-10-21',
  },
];

// 공연 상세 데이터
export const mockConcertDetails: Record<string, ConcertDetail> = {
  '1': {
    ...mockConcerts[0],
    performers: performers,
    conductor: '김영수',
    notes:
      '본 공연은 예산군 문화재단의 후원으로 진행됩니다. 공연 시작 10분 전까지 입장을 완료해 주시기 바랍니다.',
    sponsors: ['예산군', '예산군 문화재단', '충남문화재단'],
  },
  '2': {
    ...mockConcerts[1],
    performers: [performers[0]],
    conductor: '김영수',
    guest_conductor: '이정민',
    collaborators: ['예산 합창단', '예산 청소년 오케스트라'],
  },
};

// 유틸리티 함수
export function getConcertById(id: string): ConcertWithLabels | undefined {
  return mockConcerts.find((concert) => concert.id === id);
}

export function getConcertDetailById(id: string): ConcertDetail | undefined {
  const detail = mockConcertDetails[id];
  if (detail) return detail;

  const concert = getConcertById(id);
  if (concert) {
    return {
      ...concert,
      performers: [],
      conductor: '김영수',
    };
  }
  return undefined;
}

export function getUpcomingConcerts(): ConcertWithLabels[] {
  return mockConcerts.filter((concert) => concert.status === 'upcoming');
}

export function getCompletedConcerts(): ConcertWithLabels[] {
  return mockConcerts.filter((concert) => concert.status === 'completed');
}

export function getConcertsByCategory(category: string): ConcertWithLabels[] {
  return mockConcerts.filter((concert) => concert.category === category);
}

export function getConcertsByYear(year: number): ConcertWithLabels[] {
  return mockConcerts.filter((concert) => {
    const concertYear = new Date(concert.date).getFullYear();
    return concertYear === year;
  });
}

export function getAvailableYears(): number[] {
  const years = mockConcerts.map((concert) => new Date(concert.date).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
}
