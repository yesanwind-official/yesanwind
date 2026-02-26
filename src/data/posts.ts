/**
 * 게시판 UI 타입 정의
 */

export interface Post {
  id: string;
  category: 'notice';
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  views: number;
  isPinned?: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
}
