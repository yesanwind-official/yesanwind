/**
 * 공통 타입 정의
 */

// API Response 타입
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Pagination 타입
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 공통 엔티티 타입
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

// User Role 타입
export type UserRole = 'admin' | 'member' | 'guest';

/**
 * 오케스트라 관련 타입
 */

// 단원 정보
export interface Member extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  instrument: string;
  part: string;
  position?: string; // 수석, 부수석 등
  join_date: string;
  status: 'active' | 'inactive' | 'leave';
  profile_image?: string;
  introduction?: string;
}

// 악기 파트 타입
export type InstrumentPart =
  | 'flute'
  | 'oboe'
  | 'clarinet'
  | 'bassoon'
  | 'saxophone'
  | 'horn'
  | 'trumpet'
  | 'trombone'
  | 'euphonium'
  | 'tuba'
  | 'percussion'
  | 'conductor';

// 공연 카테고리
export type ConcertCategory =
  | 'regular'      // 정기연주회
  | 'special'      // 특별연주회
  | 'festival'     // 축제/행사
  | 'charity'      // 자선연주회
  | 'collaboration'; // 협연

// 공연 상태
export type ConcertStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

// 공연 정보
export interface Concert extends BaseEntity {
  title: string;
  subtitle?: string;
  description?: string;
  category: ConcertCategory;
  date: string;
  time: string;
  end_time?: string;
  venue: string;
  venue_address?: string;
  poster_image?: string;
  gallery_images?: string[];
  program?: ConcertProgram[];
  ticket_info?: string;
  ticket_price?: string;
  ticket_link?: string;
  status: ConcertStatus;
  is_featured?: boolean;
}

// 연주 프로그램
export interface ConcertProgram {
  order: number;
  title: string;
  composer: string;
  arranger?: string;
  duration?: string;
  soloist?: string;
  notes?: string;
}

// 공지사항 카테고리
export type NoticeCategory = 'notice' | 'news' | 'press' | 'recruitment';

// 공지사항/뉴스
export interface Notice extends BaseEntity {
  title: string;
  content: string;
  category: NoticeCategory;
  author_id: string;
  author_name?: string;
  is_pinned: boolean;
  is_important?: boolean;
  view_count: number;
  thumbnail_image?: string;
  attachments?: Attachment[];
  published_at?: string;
}

// 첨부파일
export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

// 갤러리
export interface Gallery extends BaseEntity {
  title: string;
  description?: string;
  images: GalleryImage[];
  concert_id?: string;
  date: string;
  category?: string;
  view_count?: number;
}

// 갤러리 이미지
export interface GalleryImage {
  id: string;
  url: string;
  thumbnail_url?: string;
  alt?: string;
  order: number;
}

/**
 * 프론트엔드 전용 타입
 */

// 네비게이션 메뉴 아이템
export interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
  isExternal?: boolean;
}

// 소셜 링크
export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// 통계 카드
export interface StatItem {
  value: string | number;
  label: string;
  sublabel?: string;
}

// 섹션 헤더 props
export interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

// 홈페이지 섹션 데이터 타입
export interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
}

// 홈페이지 통계
export interface OrchestraStats {
  years: number;
  members: number;
  concerts: number;
  audience: number;
}

// SEO 메타데이터
export interface PageSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}
