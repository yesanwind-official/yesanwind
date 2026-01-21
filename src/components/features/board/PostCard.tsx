'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ExternalLink, Building2, Calendar } from 'lucide-react';
import type { Post } from '@/data/posts';

interface PostCardProps {
  post: Post;
  className?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function PostCardComponent({ post, className }: PostCardProps) {
  const isExternalLink = post.sourceUrl && post.category === 'press';

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isExternalLink) {
      return (
        <a
          href={post.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group block bg-dark-800 border border-dark-600 rounded-lg overflow-hidden',
            'transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5',
            className
          )}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={`/board/${post.category}/${post.id}`}
        className={cn(
          'group block bg-dark-800 border border-dark-600 rounded-lg overflow-hidden',
          'transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5',
          className
        )}
      >
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      {/* 썸네일 이미지 */}
      <div className="relative aspect-[16/10] overflow-hidden bg-dark-700">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="w-12 h-12 text-dark-500" />
          </div>
        )}

        {/* 외부 링크 표시 */}
        {isExternalLink && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-dark-900/80 flex items-center justify-center">
            <ExternalLink className="w-4 h-4 text-white" />
          </div>
        )}

        {/* 호버 오버레이 */}
        <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white light:text-dark-100 font-medium flex items-center gap-2">
            {isExternalLink ? '기사 보기' : '자세히 보기'}
            <ExternalLink className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="p-5">
        {/* 언론사 */}
        {post.source && (
          <span className="inline-block text-gold-500 text-sm font-medium mb-2">
            {post.source}
          </span>
        )}

        {/* 제목 */}
        <h3 className="text-base font-semibold text-white light:text-dark-100 mb-3 line-clamp-2 group-hover:text-gold-400 transition-colors min-h-[3rem]">
          {post.title}
        </h3>

        {/* 날짜 */}
        <div className="flex items-center gap-1.5 text-sm text-dark-400">
          <Calendar className="w-4 h-4" />
          {formatDate(post.createdAt)}
        </div>
      </div>
    </CardWrapper>
  );
}

export const PostCard = memo(PostCardComponent);
