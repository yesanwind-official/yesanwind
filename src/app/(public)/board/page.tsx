import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Pin, Calendar, Building2 } from 'lucide-react';
import { getRecentPosts, type Post } from '@/data/posts';

export const metadata: Metadata = {
  title: '게시판',
  description: '예산윈드오케스트라 공지사항 및 언론보도',
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

function PressItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/board/press/${post.id}`}
      className="flex items-start gap-4 p-4 rounded-lg transition-all duration-200 hover:bg-dark-800/50 group"
    >
      {/* 썸네일 */}
      <div className="flex-shrink-0 w-20 h-14 rounded-md overflow-hidden bg-dark-700">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 className="w-6 h-6 text-dark-500" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-white light:text-dark-100 font-medium group-hover:text-gold-400 transition-colors line-clamp-1">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 mt-1.5 text-sm text-dark-400">
          <span>{post.source}</span>
          <span className="w-1 h-1 rounded-full bg-dark-500" />
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 text-dark-500 group-hover:text-gold-500 transition-colors flex-shrink-0 mt-3" />
    </Link>
  );
}

export default function BoardPage() {
  const recentNotices = getRecentPosts('notice', 5);
  const recentPress = getRecentPosts('press', 5);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* 공지사항 섹션 */}
      <section className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-dark-700">
          <h2 className="text-xl font-bold text-white light:text-dark-100">공지사항</h2>
          <Link
            href="/board/notice"
            className="flex items-center gap-1 text-sm text-gold-500 hover:text-gold-400 transition-colors"
          >
            더보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-dark-700/50">
          {recentNotices.map((post) => (
            <NoticeItem key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* 언론보도 섹션 */}
      <section className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-dark-700">
          <h2 className="text-xl font-bold text-white light:text-dark-100">언론보도</h2>
          <Link
            href="/board/press"
            className="flex items-center gap-1 text-sm text-gold-500 hover:text-gold-400 transition-colors"
          >
            더보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-dark-700/50">
          {recentPress.map((post) => (
            <PressItem key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
