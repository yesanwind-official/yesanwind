'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Calendar,
  Eye,
  User,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  Download,
  FileText,
  ExternalLink,
} from 'lucide-react';
import type { Post } from '@/data/posts';

interface PostDetailProps {
  post: Post;
  prevPost: Post | null;
  nextPost: Post | null;
  className?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function getFileIcon(type: string) {
  switch (type) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-400" />;
    case 'doc':
    case 'docx':
      return <FileText className="w-5 h-5 text-blue-400" />;
    case 'xls':
    case 'xlsx':
      return <FileText className="w-5 h-5 text-green-400" />;
    default:
      return <FileText className="w-5 h-5 text-dark-400" />;
  }
}

function PostDetailComponent({ post, prevPost, nextPost, className }: PostDetailProps) {
  const listUrl = `/board/${post.category}`;

  return (
    <article className={cn('max-w-4xl mx-auto', className)}>
      {/* 게시글 헤더 */}
      <header className="mb-8">
        {/* 카테고리 배지 */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-500/10 text-gold-500">
            {post.category === 'notice' ? '공지사항' : '언론보도'}
          </span>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl md:text-3xl font-bold text-white light:text-dark-100 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* 메타 정보 */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400 pb-6 border-b border-dark-700">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            조회 {post.views.toLocaleString()}
          </span>
          {post.source && (
            <span className="flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4" />
              {post.source}
            </span>
          )}
        </div>
      </header>

      {/* 게시글 본문 */}
      <div className="mb-8">
        {/* 썸네일 이미지 (언론보도) */}
        {post.thumbnail && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={post.thumbnail}
              alt=""
              className="w-full max-h-96 object-cover"
            />
          </div>
        )}

        {/* HTML 본문 */}
        <div
          className="prose prose-invert prose-gold max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            lineHeight: '1.8',
          }}
        />

        {/* 원문 링크 (언론보도) */}
        {post.sourceUrl && (
          <div className="mt-8 p-4 bg-dark-800 rounded-lg border border-dark-700">
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <span className="text-dark-300">원문 보기</span>
              <span className="flex items-center gap-2 text-gold-500 group-hover:text-gold-400 transition-colors">
                {post.source}에서 확인하기
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </div>
        )}
      </div>

      {/* 첨부파일 */}
      {post.attachments && post.attachments.length > 0 && (
        <div className="mb-8 p-5 bg-dark-800 rounded-lg border border-dark-700">
          <h3 className="text-sm font-medium text-dark-300 mb-4">
            첨부파일 ({post.attachments.length})
          </h3>
          <ul className="space-y-2">
            {post.attachments.map((file) => (
              <li key={file.id}>
                <a
                  href={file.url}
                  download
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-700 transition-colors group"
                >
                  {getFileIcon(file.type)}
                  <span className="flex-1 text-white light:text-dark-100 group-hover:text-gold-400 transition-colors">
                    {file.name}
                  </span>
                  <span className="text-sm text-dark-400">{file.size}</span>
                  <Download className="w-4 h-4 text-dark-400 group-hover:text-gold-500 transition-colors" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 이전글/다음글 네비게이션 */}
      <div className="border-t border-b border-dark-700 divide-y divide-dark-700">
        {/* 이전글 */}
        <div className="flex items-center py-4">
          <span className="flex items-center gap-2 w-24 flex-shrink-0 text-sm text-dark-400">
            <ChevronUp className="w-4 h-4" />
            이전글
          </span>
          {prevPost ? (
            <Link
              href={`/board/${prevPost.category}/${prevPost.id}`}
              className="text-white light:text-dark-100 hover:text-gold-400 transition-colors line-clamp-1"
            >
              {prevPost.title}
            </Link>
          ) : (
            <span className="text-dark-500">이전글이 없습니다.</span>
          )}
        </div>

        {/* 다음글 */}
        <div className="flex items-center py-4">
          <span className="flex items-center gap-2 w-24 flex-shrink-0 text-sm text-dark-400">
            <ChevronDown className="w-4 h-4" />
            다음글
          </span>
          {nextPost ? (
            <Link
              href={`/board/${nextPost.category}/${nextPost.id}`}
              className="text-white light:text-dark-100 hover:text-gold-400 transition-colors line-clamp-1"
            >
              {nextPost.title}
            </Link>
          ) : (
            <span className="text-dark-500">다음글이 없습니다.</span>
          )}
        </div>
      </div>

      {/* 목록으로 버튼 */}
      <div className="mt-8 flex justify-center">
        <Link
          href={listUrl}
          className="inline-flex items-center gap-2 px-6 py-3 border border-gold-500 text-gold-500 rounded-lg font-medium hover:bg-gold-500 hover:text-dark-950 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          목록으로
        </Link>
      </div>
    </article>
  );
}

export const PostDetail = memo(PostDetailComponent);
