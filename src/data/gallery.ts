/**
 * 갤러리 Mock 데이터
 */

// 사진 타입
export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

// 앨범 타입
export interface Album {
  id: string;
  title: string;
  description?: string;
  date: string;
  coverImage: string;
  photoCount: number;
  photos: Photo[];
  category: 'concert' | 'rehearsal' | 'event' | 'etc';
  categoryLabel: string;
}

// 영상 타입
export interface Video {
  id: string;
  title: string;
  description?: string;
  date: string;
  youtubeId: string;
  thumbnailUrl: string;
  duration: string;
  category: 'concert' | 'rehearsal' | 'interview' | 'etc';
  categoryLabel: string;
}

// Mock 앨범 데이터
export const mockAlbums: Album[] = [
  {
    id: '1',
    title: '제47회 정기연주회',
    description: '2025년 봄, 예산문화예술회관에서 개최된 정기연주회 현장 사진입니다.',
    date: '2025-03-15',
    coverImage: '/images/gallery/albums/47th-concert/cover.jpg',
    photoCount: 24,
    category: 'concert',
    categoryLabel: '연주회',
    photos: [
      { id: '1-1', src: '/images/gallery/albums/47th-concert/01.jpg', alt: '공연 전경', width: 1200, height: 800 },
      { id: '1-2', src: '/images/gallery/albums/47th-concert/02.jpg', alt: '지휘자', width: 800, height: 1200 },
      { id: '1-3', src: '/images/gallery/albums/47th-concert/03.jpg', alt: '목관 섹션', width: 1200, height: 800 },
      { id: '1-4', src: '/images/gallery/albums/47th-concert/04.jpg', alt: '금관 섹션', width: 1200, height: 800 },
      { id: '1-5', src: '/images/gallery/albums/47th-concert/05.jpg', alt: '타악기 섹션', width: 800, height: 1200 },
      { id: '1-6', src: '/images/gallery/albums/47th-concert/06.jpg', alt: '전체 연주 모습', width: 1600, height: 900 },
      { id: '1-7', src: '/images/gallery/albums/47th-concert/07.jpg', alt: '협연자', width: 800, height: 1200 },
      { id: '1-8', src: '/images/gallery/albums/47th-concert/08.jpg', alt: '관객석', width: 1200, height: 800 },
      { id: '1-9', src: '/images/gallery/albums/47th-concert/09.jpg', alt: '플루트 솔로', width: 1200, height: 800 },
      { id: '1-10', src: '/images/gallery/albums/47th-concert/10.jpg', alt: '클라리넷 섹션', width: 1200, height: 800 },
      { id: '1-11', src: '/images/gallery/albums/47th-concert/11.jpg', alt: '트럼펫 섹션', width: 800, height: 1200 },
      { id: '1-12', src: '/images/gallery/albums/47th-concert/12.jpg', alt: '피날레', width: 1600, height: 900 },
    ],
  },
  {
    id: '2',
    title: '제46회 정기연주회',
    description: '2024년 가을, 풍성한 선율로 가득했던 정기연주회입니다.',
    date: '2024-11-15',
    coverImage: '/images/gallery/albums/46th-concert/cover.jpg',
    photoCount: 18,
    category: 'concert',
    categoryLabel: '연주회',
    photos: [
      { id: '2-1', src: '/images/gallery/albums/46th-concert/01.jpg', alt: '공연 전경', width: 1200, height: 800 },
      { id: '2-2', src: '/images/gallery/albums/46th-concert/02.jpg', alt: '지휘자 인사', width: 1200, height: 800 },
      { id: '2-3', src: '/images/gallery/albums/46th-concert/03.jpg', alt: '연주 모습', width: 1200, height: 800 },
      { id: '2-4', src: '/images/gallery/albums/46th-concert/04.jpg', alt: '앙코르', width: 1600, height: 900 },
      { id: '2-5', src: '/images/gallery/albums/46th-concert/05.jpg', alt: '단체 사진', width: 1600, height: 900 },
      { id: '2-6', src: '/images/gallery/albums/46th-concert/06.jpg', alt: '꽃다발 전달', width: 1200, height: 800 },
    ],
  },
  {
    id: '3',
    title: '2024 송년음악회',
    description: '한 해를 마무리하며 함께했던 감동의 순간들입니다.',
    date: '2024-12-20',
    coverImage: '/images/gallery/albums/year-end-2024/cover.jpg',
    photoCount: 15,
    category: 'concert',
    categoryLabel: '연주회',
    photos: [
      { id: '3-1', src: '/images/gallery/albums/year-end-2024/01.jpg', alt: '송년음악회 시작', width: 1200, height: 800 },
      { id: '3-2', src: '/images/gallery/albums/year-end-2024/02.jpg', alt: '크리스마스 캐롤', width: 1200, height: 800 },
      { id: '3-3', src: '/images/gallery/albums/year-end-2024/03.jpg', alt: '관객 참여', width: 1200, height: 800 },
      { id: '3-4', src: '/images/gallery/albums/year-end-2024/04.jpg', alt: '피날레 및 인사', width: 1600, height: 900 },
    ],
  },
  {
    id: '4',
    title: '2024 정기 연습 현장',
    description: '매주 토요일, 열정적으로 연습하는 단원들의 모습입니다.',
    date: '2024-09-01',
    coverImage: '/images/gallery/albums/rehearsal-2024/cover.jpg',
    photoCount: 12,
    category: 'rehearsal',
    categoryLabel: '연습',
    photos: [
      { id: '4-1', src: '/images/gallery/albums/rehearsal-2024/01.jpg', alt: '합주 연습', width: 1200, height: 800 },
      { id: '4-2', src: '/images/gallery/albums/rehearsal-2024/02.jpg', alt: '파트 연습', width: 1200, height: 800 },
      { id: '4-3', src: '/images/gallery/albums/rehearsal-2024/03.jpg', alt: '지휘자 지도', width: 1200, height: 800 },
      { id: '4-4', src: '/images/gallery/albums/rehearsal-2024/04.jpg', alt: '휴식 시간', width: 1200, height: 800 },
    ],
  },
  {
    id: '5',
    title: '예산 사과 축제 공연',
    description: '예산 사과 축제에서 펼친 야외 특별 공연입니다.',
    date: '2024-10-15',
    coverImage: '/images/gallery/albums/apple-festival/cover.jpg',
    photoCount: 20,
    category: 'event',
    categoryLabel: '행사',
    photos: [
      { id: '5-1', src: '/images/gallery/albums/apple-festival/01.jpg', alt: '야외 무대 설치', width: 1200, height: 800 },
      { id: '5-2', src: '/images/gallery/albums/apple-festival/02.jpg', alt: '공연 시작', width: 1200, height: 800 },
      { id: '5-3', src: '/images/gallery/albums/apple-festival/03.jpg', alt: '관객들과 함께', width: 1600, height: 900 },
      { id: '5-4', src: '/images/gallery/albums/apple-festival/04.jpg', alt: '축제 분위기', width: 1200, height: 800 },
      { id: '5-5', src: '/images/gallery/albums/apple-festival/05.jpg', alt: '단체 기념사진', width: 1600, height: 900 },
    ],
  },
  {
    id: '6',
    title: '제45회 정기연주회',
    description: '2024년 여름, 시원한 선율로 가득했던 정기연주회입니다.',
    date: '2024-07-20',
    coverImage: '/images/gallery/albums/45th-concert/cover.jpg',
    photoCount: 16,
    category: 'concert',
    categoryLabel: '연주회',
    photos: [
      { id: '6-1', src: '/images/gallery/albums/45th-concert/01.jpg', alt: '여름 정기연주회', width: 1200, height: 800 },
      { id: '6-2', src: '/images/gallery/albums/45th-concert/02.jpg', alt: '연주 모습', width: 1200, height: 800 },
      { id: '6-3', src: '/images/gallery/albums/45th-concert/03.jpg', alt: '협연자와 함께', width: 1200, height: 800 },
    ],
  },
  {
    id: '7',
    title: '단원 워크샵',
    description: '2024년 단원 친목 및 연주력 향상 워크샵입니다.',
    date: '2024-05-10',
    coverImage: '/images/gallery/albums/workshop-2024/cover.jpg',
    photoCount: 10,
    category: 'event',
    categoryLabel: '행사',
    photos: [
      { id: '7-1', src: '/images/gallery/albums/workshop-2024/01.jpg', alt: '워크샵 강의', width: 1200, height: 800 },
      { id: '7-2', src: '/images/gallery/albums/workshop-2024/02.jpg', alt: '그룹 활동', width: 1200, height: 800 },
      { id: '7-3', src: '/images/gallery/albums/workshop-2024/03.jpg', alt: '친목 시간', width: 1200, height: 800 },
    ],
  },
  {
    id: '8',
    title: '제44회 정기연주회',
    description: '2024년 봄의 시작을 알린 정기연주회입니다.',
    date: '2024-03-15',
    coverImage: '/images/gallery/albums/44th-concert/cover.jpg',
    photoCount: 14,
    category: 'concert',
    categoryLabel: '연주회',
    photos: [
      { id: '8-1', src: '/images/gallery/albums/44th-concert/01.jpg', alt: '봄 정기연주회', width: 1200, height: 800 },
      { id: '8-2', src: '/images/gallery/albums/44th-concert/02.jpg', alt: '연주 장면', width: 1200, height: 800 },
    ],
  },
];

// Mock 영상 데이터
export const mockVideos: Video[] = [
  {
    id: 'v1',
    title: '제47회 정기연주회 하이라이트',
    description: '2025년 봄 정기연주회의 하이라이트 영상입니다.',
    date: '2025-03-20',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/gallery/videos/47th-highlight.jpg',
    duration: '15:32',
    category: 'concert',
    categoryLabel: '연주회',
  },
  {
    id: 'v2',
    title: '제46회 정기연주회 - Armenian Dances',
    description: 'Alfred Reed의 Armenian Dances 연주 영상입니다.',
    date: '2024-11-20',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/gallery/videos/46th-armenian.jpg',
    duration: '11:45',
    category: 'concert',
    categoryLabel: '연주회',
  },
  {
    id: 'v3',
    title: '2024 송년음악회 - 크리스마스 메들리',
    description: '송년음악회에서 연주한 크리스마스 메들리입니다.',
    date: '2024-12-25',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/gallery/videos/yearend-christmas.jpg',
    duration: '8:20',
    category: 'concert',
    categoryLabel: '연주회',
  },
  {
    id: 'v4',
    title: '연습실 스케치 - 2024년 가을',
    description: '정기연주회를 준비하는 단원들의 모습입니다.',
    date: '2024-10-01',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/gallery/videos/rehearsal-fall.jpg',
    duration: '5:48',
    category: 'rehearsal',
    categoryLabel: '연습',
  },
  {
    id: 'v5',
    title: '예산 사과 축제 공연 풀영상',
    description: '예산 사과 축제 야외 공연 전체 영상입니다.',
    date: '2024-10-18',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/gallery/videos/apple-festival.jpg',
    duration: '45:00',
    category: 'concert',
    categoryLabel: '연주회',
  },
  {
    id: 'v6',
    title: '지휘자 인터뷰 - 김영수',
    description: '예산윈드오케스트라 상임지휘자 김영수의 인터뷰입니다.',
    date: '2024-08-15',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/gallery/videos/conductor-interview.jpg',
    duration: '12:30',
    category: 'interview',
    categoryLabel: '인터뷰',
  },
  {
    id: 'v7',
    title: '제45회 정기연주회 - Festive Overture',
    description: 'Shostakovich의 Festive Overture 연주 영상입니다.',
    date: '2024-07-25',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/gallery/videos/45th-festive.jpg',
    duration: '6:15',
    category: 'concert',
    categoryLabel: '연주회',
  },
  {
    id: 'v8',
    title: '단원 인터뷰 - 플루트 파트',
    description: '플루트 파트 단원들의 인터뷰 영상입니다.',
    date: '2024-06-10',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnailUrl: '/images/gallery/videos/flute-interview.jpg',
    duration: '8:45',
    category: 'interview',
    categoryLabel: '인터뷰',
  },
];

// 유틸리티 함수들
export function getAlbumById(id: string): Album | undefined {
  return mockAlbums.find((album) => album.id === id);
}

export function getRecentAlbums(count: number = 4): Album[] {
  return [...mockAlbums]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getRecentVideos(count: number = 4): Video[] {
  return [...mockVideos]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getAlbumsByCategory(category: Album['category']): Album[] {
  return mockAlbums.filter((album) => album.category === category);
}

export function getVideosByCategory(category: Video['category']): Video[] {
  return mockVideos.filter((video) => video.category === category);
}

export function formatGalleryDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}
