'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Pin, Eye, Paperclip } from 'lucide-react';
import type { Post } from '@/data/posts';

interface PostListItemProps {
  post: Post;
  index: number;
  showNumber?: boolean;
  className?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function PostListItemComponent({ post, index, showNumber = true, className }: PostListItemProps) {
  const isPinned = post.isPinned;
  const hasAttachments = post.attachments && post.attachments.length > 0;

  return (
    <Link
      href={`/board/${post.category}/${post.id}`}
      className={cn(
        'block transition-all duration-200',
        isPinned
          ? 'bg-gold-500/5 hover:bg-gold-500/10 border-l-2 border-gold-500'
          : 'hover:bg-dark-800/50',
        className
      )}
    >
      {/* 데스크톱 뷰 */}
      <div className="hidden md:flex items-center gap-4 px-4 py-4">
        {/* 번호 */}
        {showNumber && (
          <div className="w-16 flex-shrink-0 text-center">
            {isPinned ? (
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gold-500/20">
                <Pin className="w-4 h-4 text-gold-500" />
              </span>
            ) : (
              <span className="text-dark-400 text-sm">{index}</span>
            )}
          </div>
        )}

        {/* 제목 */}
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-medium line-clamp-1 transition-colors',
            isPinned
              ? 'text-gold-400 group-hover:text-gold-300'
              : 'text-white light:text-dark-100 hover:text-gold-400'
          )}>
            {post.title}
          </h3>
        </div>

        {/* 첨부파일 */}
        <div className="w-10 flex-shrink-0 flex justify-center">
          {hasAttachments && (
            <Paperclip className="w-4 h-4 text-dark-400" />
          )}
        </div>

        {/* 작성일 */}
        <div className="w-28 flex-shrink-0 text-center text-sm text-dark-400">
          {formatDate(post.createdAt)}
        </div>

        {/* 조회수 */}
        <div className="w-20 flex-shrink-0 flex items-center justify-center gap-1 text-sm text-dark-400">
          <Eye className="w-3.5 h-3.5" />
          {post.views.toLocaleString()}
        </div>
      </div>

      {/* 모바일 뷰 */}
      <div className={cn(
        'md:hidden p-4',
        isPinned && 'border-l-2 border-gold-500'
      )}>
        <div className="flex items-start gap-3">
          {isPinned && (
            <span className="flex-shrink-0 mt-0.5">
              <Pin className="w-4 h-4 text-gold-500" />
            </span>
          )}
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'font-medium line-clamp-2',
              isPinned ? 'text-gold-400' : 'text-white light:text-dark-100'
            )}>
              {post.title}
            </h3>
            <div className="flex items-center gap-3 mt-2 text-xs text-dark-400">
              <span>{formatDate(post.createdAt)}</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {post.views.toLocaleString()}
              </span>
              {hasAttachments && (
                <span className="flex items-center gap-1">
                  <Paperclip className="w-3 h-3" />
                  첨부
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const PostListItem = memo(PostListItemComponent);
