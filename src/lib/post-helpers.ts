import type { Post, Attachment } from '@/data/posts';
import type { Tables } from '@/types/database';

type DbPost = Tables<'posts'>;
type DbPostAttachment = Tables<'post_attachments'>;

interface DbPostWithAttachmentIds extends DbPost {
  post_attachments?: { id: string }[];
}

interface DbPostWithAttachments extends DbPost {
  post_attachments?: DbPostAttachment[];
}

/**
 * DB 게시글 → UI 게시글 변환
 */
export function toUIPost(dbPost: DbPostWithAttachmentIds): Post {
  return {
    id: dbPost.id,
    category: dbPost.category as 'notice',
    title: dbPost.title,
    content: dbPost.content,
    author: '관리자',
    createdAt: dbPost.published_at.split('T')[0],
    updatedAt: dbPost.updated_at.split('T')[0],
    views: dbPost.view_count,
    isPinned: dbPost.is_pinned,
    attachments: dbPost.post_attachments?.length
      ? dbPost.post_attachments.map((a) => ({
          id: a.id,
          name: '',
          url: '',
          size: '',
          type: '',
        }))
      : undefined,
  };
}

/**
 * DB 게시글(첨부파일 포함) → UI 게시글 변환
 */
export function toUIPostWithAttachments(dbPost: DbPostWithAttachments): Post {
  const attachments: Attachment[] | undefined = dbPost.post_attachments?.length
    ? dbPost.post_attachments
        .sort((a, b) => a.display_order - b.display_order)
        .map((a) => ({
          id: a.id,
          name: a.file_name,
          url: a.file_url,
          size: a.file_size ? formatFileSize(a.file_size) : '',
          type: a.mime_type?.split('/').pop() || '',
        }))
    : undefined;

  return {
    id: dbPost.id,
    category: dbPost.category as 'notice',
    title: dbPost.title,
    content: dbPost.content,
    author: '관리자',
    createdAt: dbPost.published_at.split('T')[0],
    updatedAt: dbPost.updated_at.split('T')[0],
    views: dbPost.view_count,
    isPinned: dbPost.is_pinned,
    attachments,
  };
}

/**
 * 이전/다음 글 → UI Post (간소화)
 */
export function toUIAdjacentPost(
  dbPost: { id: string; title: string; category: string } | null
): Post | null {
  if (!dbPost) return null;
  return {
    id: dbPost.id,
    category: dbPost.category as 'notice',
    title: dbPost.title,
    content: '',
    author: '',
    createdAt: '',
    views: 0,
  };
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}
