/**
 * 공연 관련 확장 타입 정의
 */

import type { Concert, ConcertProgram, ConcertCategory, ConcertStatus } from './index';

// 공연 카드용 확장 타입
export interface ConcertWithLabels extends Concert {
  categoryLabel: string;
  statusLabel: string;
}

// 공연 상세 페이지용 타입
export interface ConcertDetail extends Concert {
  performers?: Performer[];
  conductor?: string;
  guest_conductor?: string;
  collaborators?: string[];
  sponsors?: string[];
  notes?: string;
  youtube_link?: string;
  live_stream_link?: string;
}

// 출연진 정보
export interface Performer {
  id: string;
  name: string;
  role: string;
  instrument?: string;
  bio?: string;
  image?: string;
}

// 공연 필터 타입
export interface ConcertFilter {
  category?: ConcertCategory;
  status?: ConcertStatus;
  year?: number;
}

// 카테고리 레이블 매핑
export const CATEGORY_LABELS: Record<ConcertCategory, string> = {
  regular: '정기연주회',
  special: '기획공연',
  festival: '축제/행사',
  charity: '자선연주회',
  collaboration: '협연',
};

// 상태 레이블 매핑
export const STATUS_LABELS: Record<ConcertStatus, string> = {
  upcoming: '예매중',
  ongoing: '공연중',
  completed: '종료',
  cancelled: '취소',
};

// 상태별 배지 스타일
export const STATUS_BADGE_STYLES: Record<ConcertStatus, string> = {
  upcoming: 'bg-gold-500 text-dark-950',
  ongoing: 'bg-green-500 text-white',
  completed: 'bg-dark-500 text-dark-200',
  cancelled: 'bg-red-500 text-white',
};
