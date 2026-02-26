import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Pin, Calendar } from 'lucide-react';
import { getRecentPosts } from '@/lib/posts';
import { toUIPost } from '@/lib/post-helpers';
import type { Post } from '@/data/posts';

export const metadata: Metadata = {
  title: '게시판',
  description: '예산윈드오케스트라 공지사항',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

function NoticeItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/board/notice/${post.id}`}
      className="flex items-start gap-4 p-4 rounded-lg transition-all duration-200 hover:bg-dark-800/50 group"
    >
      {post.isPinned && (
        <span className="flex-shrink-0 mt-0.5">
          <Pin className="w-4 h-4 text-gold-500" />
        </span>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-white light:text-dark-100 font-medium group-hover:text-gold-400 transition-colors line-clamp-1">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 mt-1.5 text-sm text-dark-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-gold-500 transition-colors flex-shrink-0 mt-1" />
    </Link>
  );
}

export default async function BoardPage() {
  const dbPosts = await getRecentPosts('notice', 10);
  const recentNotices = dbPosts.map(toUIPost);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 공지사항 섹션 */}
      <section className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-dark-700">
          <h2 className="text-xl font-bold text-white light:text-dark-100">공지사항</h2>
          <Link
            href="/board/notice"
            className="flex items-center gap-1 text-sm text-gold-500 hover:text-gold-400 transition-colors"
          >
            전체보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-dark-700/50">
          {recentNotices.map((post) => (
            <NoticeItem key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
