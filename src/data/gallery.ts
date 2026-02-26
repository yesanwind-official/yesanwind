/**
 * 갤러리 타입 정의 및 유틸리티
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

// 유틸리티 함수
export function formatGalleryDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}
