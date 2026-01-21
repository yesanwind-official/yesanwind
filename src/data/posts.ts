/**
 * Mock 게시판 데이터
 */

export interface Post {
  id: string;
  category: 'notice' | 'press';
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  views: number;
  isPinned?: boolean;
  attachments?: Attachment[];
  // 언론보도 전용
  thumbnail?: string;
  source?: string;
  sourceUrl?: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
}

// 공지사항 Mock 데이터
export const notices: Post[] = [
  {
    id: 'notice-1',
    category: 'notice',
    title: '[필독] 2025년 정기연주회 일정 안내',
    content: `
<p>안녕하세요, 예산윈드오케스트라입니다.</p>
<br/>
<p>2025년 정기연주회 일정을 안내해 드립니다.</p>
<br/>
<h3>1. 제47회 정기연주회 - 봄의 선율</h3>
<ul>
  <li>일시: 2025년 3월 15일(토) 오후 7시 30분</li>
  <li>장소: 예산문화예술회관 대공연장</li>
  <li>입장: 전석 무료 (사전 예약 필수)</li>
</ul>
<br/>
<h3>2. 제48회 정기연주회 - 여름밤의 세레나데</h3>
<ul>
  <li>일시: 2025년 6월 21일(토) 오후 7시</li>
  <li>장소: 예산문화예술회관 대공연장</li>
  <li>입장: 전석 무료 (사전 예약 필수)</li>
</ul>
<br/>
<p>많은 관심과 참여 부탁드립니다.</p>
<p>감사합니다.</p>
    `,
    author: '관리자',
    createdAt: '2025-01-15',
    views: 1250,
    isPinned: true,
    attachments: [
      {
        id: 'att-1',
        name: '2025년_정기연주회_일정표.pdf',
        url: '/files/schedule-2025.pdf',
        size: '1.2MB',
        type: 'pdf',
      },
    ],
  },
  {
    id: 'notice-2',
    category: 'notice',
    title: '[중요] 신입단원 모집 안내 (2025년 상반기)',
    content: `
<p>예산윈드오케스트라에서 함께할 신입 단원을 모집합니다.</p>
<br/>
<h3>모집 파트</h3>
<ul>
  <li>플루트 - 2명</li>
  <li>클라리넷 - 3명</li>
  <li>트럼펫 - 2명</li>
  <li>호른 - 1명</li>
  <li>타악기 - 1명</li>
</ul>
<br/>
<h3>지원 자격</h3>
<ul>
  <li>해당 악기 연주 경력 2년 이상</li>
  <li>매주 토요일 정기연습 참여 가능자</li>
  <li>연령 제한 없음</li>
</ul>
<br/>
<h3>지원 방법</h3>
<p>이메일 접수: yesanwind@example.com</p>
<p>접수 기간: 2025년 1월 20일 ~ 2월 28일</p>
<br/>
<p>문의: 010-1234-5678</p>
    `,
    author: '관리자',
    createdAt: '2025-01-10',
    views: 890,
    isPinned: true,
  },
  {
    id: 'notice-3',
    category: 'notice',
    title: '제47회 정기연주회 사전 예약 안내',
    content: `
<p>제47회 정기연주회 사전 예약이 시작되었습니다.</p>
<br/>
<p>예약 방법: 온라인 예약 또는 전화 예약</p>
<p>예약 기간: 2025년 2월 1일 ~ 3월 14일</p>
<p>좌석: 전석 지정 (선착순 마감)</p>
    `,
    author: '관리자',
    createdAt: '2025-01-05',
    views: 567,
    isPinned: false,
  },
  {
    id: 'notice-4',
    category: 'notice',
    title: '2024년 연말 송년음악회 성황리 종료',
    content: `
<p>2024년 12월 20일 개최된 송년음악회가 성황리에 종료되었습니다.</p>
<br/>
<p>공연에 참석해주신 700여명의 관객분들께 진심으로 감사드립니다.</p>
<p>2025년에도 더욱 좋은 연주로 찾아뵙겠습니다.</p>
    `,
    author: '관리자',
    createdAt: '2024-12-21',
    views: 432,
    isPinned: false,
  },
  {
    id: 'notice-5',
    category: 'notice',
    title: '연습실 이전 안내',
    content: `
<p>2025년 1월부터 연습실이 이전됩니다.</p>
<br/>
<p>새로운 연습실 주소: 충남 예산군 예산읍 문화로 123</p>
<p>연습 일시: 매주 토요일 오후 2시 ~ 5시</p>
    `,
    author: '관리자',
    createdAt: '2024-12-15',
    views: 328,
    isPinned: false,
  },
  {
    id: 'notice-6',
    category: 'notice',
    title: '홈페이지 리뉴얼 안내',
    content: `
<p>예산윈드오케스트라 홈페이지가 새롭게 단장되었습니다.</p>
<br/>
<p>더욱 편리하게 이용해 주시기 바랍니다.</p>
    `,
    author: '관리자',
    createdAt: '2024-12-01',
    views: 256,
    isPinned: false,
  },
  {
    id: 'notice-7',
    category: 'notice',
    title: '2024년 제46회 정기연주회 안내',
    content: `
<p>제46회 정기연주회 안내입니다.</p>
    `,
    author: '관리자',
    createdAt: '2024-10-15',
    views: 789,
    isPinned: false,
  },
  {
    id: 'notice-8',
    category: 'notice',
    title: '추석 연휴 연습 휴무 안내',
    content: `
<p>추석 연휴 기간 동안 연습이 휴무입니다.</p>
    `,
    author: '관리자',
    createdAt: '2024-09-10',
    views: 145,
    isPinned: false,
  },
  {
    id: 'notice-9',
    category: 'notice',
    title: '2024년 하반기 연습 일정 안내',
    content: `
<p>2024년 하반기 연습 일정 안내입니다.</p>
    `,
    author: '관리자',
    createdAt: '2024-08-01',
    views: 267,
    isPinned: false,
  },
  {
    id: 'notice-10',
    category: 'notice',
    title: '제45회 정기연주회 성황리 종료',
    content: `
<p>제45회 정기연주회가 성황리에 종료되었습니다.</p>
    `,
    author: '관리자',
    createdAt: '2024-07-21',
    views: 398,
    isPinned: false,
  },
  {
    id: 'notice-11',
    category: 'notice',
    title: '여름 특별 연습 일정 안내',
    content: `
<p>여름 특별 연습 일정 안내입니다.</p>
    `,
    author: '관리자',
    createdAt: '2024-06-15',
    views: 189,
    isPinned: false,
  },
  {
    id: 'notice-12',
    category: 'notice',
    title: '2024년 신입단원 모집 결과 안내',
    content: `
<p>2024년 신입단원 모집 결과를 안내합니다.</p>
    `,
    author: '관리자',
    createdAt: '2024-03-20',
    views: 567,
    isPinned: false,
  },
];

// 언론보도 Mock 데이터
export const pressReleases: Post[] = [
  {
    id: 'press-1',
    category: 'press',
    title: '예산윈드오케스트라, 제47회 정기연주회 개최 예고',
    content: `
<p>충남 예산군을 대표하는 관악 오케스트라인 예산윈드오케스트라가 오는 3월 15일 제47회 정기연주회를 개최한다.</p>
<br/>
<p>이번 연주회는 '봄의 선율'이라는 주제로 쇼스타코비치의 '축전 서곡'을 시작으로 알프레드 리드의 '아르메니안 댄스' 등 다채로운 프로그램이 준비되어 있다.</p>
<br/>
<p>예산윈드오케스트라 김영수 지휘자는 "올해도 지역 주민들에게 수준 높은 관악 음악을 선사하겠다"고 포부를 밝혔다.</p>
    `,
    author: '충남일보',
    createdAt: '2025-01-18',
    views: 234,
    thumbnail: '/images/press/press-1.jpg',
    source: '충남일보',
    sourceUrl: 'https://example.com/news/1',
  },
  {
    id: 'press-2',
    category: 'press',
    title: '예산윈드오케스트라 신입 단원 모집... 지역 음악 인재 발굴',
    content: `
<p>예산윈드오케스트라가 2025년 상반기 신입 단원 모집을 시작했다.</p>
<br/>
<p>이번 모집에서는 플루트, 클라리넷, 트럼펫, 호른, 타악기 등 다양한 파트의 단원을 선발할 예정이다.</p>
    `,
    author: '예산신문',
    createdAt: '2025-01-12',
    views: 156,
    thumbnail: '/images/press/press-2.jpg',
    source: '예산신문',
    sourceUrl: 'https://example.com/news/2',
  },
  {
    id: 'press-3',
    category: 'press',
    title: '송년음악회 성황... 예산윈드오케스트라 700명 관객 동원',
    content: `
<p>예산윈드오케스트라의 2024년 송년음악회가 700여명의 관객과 함께 성황리에 마무리되었다.</p>
    `,
    author: '충남도민일보',
    createdAt: '2024-12-22',
    views: 289,
    thumbnail: '/images/press/press-3.jpg',
    source: '충남도민일보',
    sourceUrl: 'https://example.com/news/3',
  },
  {
    id: 'press-4',
    category: 'press',
    title: '예산군, 문화예술 활성화 위해 윈드오케스트라 지원 확대',
    content: `
<p>예산군이 지역 문화예술 활성화를 위해 예산윈드오케스트라에 대한 지원을 확대한다고 밝혔다.</p>
    `,
    author: '충청투데이',
    createdAt: '2024-11-28',
    views: 198,
    thumbnail: '/images/press/press-4.jpg',
    source: '충청투데이',
    sourceUrl: 'https://example.com/news/4',
  },
  {
    id: 'press-5',
    category: 'press',
    title: '제46회 정기연주회, 가을의 감동을 선사하다',
    content: `
<p>예산윈드오케스트라의 제46회 정기연주회가 지난 15일 예산문화예술회관에서 개최되었다.</p>
    `,
    author: '예산신문',
    createdAt: '2024-11-16',
    views: 312,
    thumbnail: '/images/press/press-5.jpg',
    source: '예산신문',
    sourceUrl: 'https://example.com/news/5',
  },
  {
    id: 'press-6',
    category: 'press',
    title: '예산윈드오케스트라, 지역 학교 방문 연주 진행',
    content: `
<p>예산윈드오케스트라가 지역 초·중학교를 방문하여 찾아가는 음악회를 진행했다.</p>
    `,
    author: '충남일보',
    createdAt: '2024-10-20',
    views: 145,
    thumbnail: '/images/press/press-6.jpg',
    source: '충남일보',
    sourceUrl: 'https://example.com/news/6',
  },
  {
    id: 'press-7',
    category: 'press',
    title: '예산 사과 축제, 윈드오케스트라 특별 공연으로 화려하게',
    content: `
<p>예산 사과 축제에서 예산윈드오케스트라의 특별 공연이 펼쳐졌다.</p>
    `,
    author: '충남도민일보',
    createdAt: '2024-10-16',
    views: 267,
    thumbnail: '/images/press/press-7.jpg',
    source: '충남도민일보',
    sourceUrl: 'https://example.com/news/7',
  },
  {
    id: 'press-8',
    category: 'press',
    title: '27년 전통의 예산윈드오케스트라, 지역 문화 선도',
    content: `
<p>1998년 창단 이래 27년간 예산 지역의 문화예술 발전에 기여해온 예산윈드오케스트라가 조명받고 있다.</p>
    `,
    author: '주간충남',
    createdAt: '2024-09-05',
    views: 423,
    thumbnail: '/images/press/press-8.jpg',
    source: '주간충남',
    sourceUrl: 'https://example.com/news/8',
  },
];

// 전체 게시글
export const allPosts: Post[] = [...notices, ...pressReleases];

// 유틸리티 함수
export function getPostById(id: string): Post | undefined {
  return allPosts.find((post) => post.id === id);
}

export function getNotices(options?: { page?: number; limit?: number; pinnedFirst?: boolean }): Post[] {
  const { page = 1, limit = 10, pinnedFirst = true } = options || {};

  let sorted = [...notices];

  if (pinnedFirst) {
    sorted = sorted.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } else {
    sorted = sorted.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  const start = (page - 1) * limit;
  return sorted.slice(start, start + limit);
}

export function getPressReleases(options?: { page?: number; limit?: number }): Post[] {
  const { page = 1, limit = 10 } = options || {};

  const sorted = [...pressReleases].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const start = (page - 1) * limit;
  return sorted.slice(start, start + limit);
}

export function getRecentPosts(category: 'notice' | 'press', limit: number = 5): Post[] {
  const posts = category === 'notice' ? notices : pressReleases;

  return [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getAdjacentPosts(
  id: string,
  category: 'notice' | 'press'
): { prev: Post | null; next: Post | null } {
  const posts = category === 'notice' ? notices : pressReleases;
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const currentIndex = sorted.findIndex((post) => post.id === id);

  return {
    prev: currentIndex > 0 ? sorted[currentIndex - 1] : null,
    next: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null,
  };
}

export function getTotalPages(category: 'notice' | 'press', limit: number = 10): number {
  const posts = category === 'notice' ? notices : pressReleases;
  return Math.ceil(posts.length / limit);
}
