import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostById, getAdjacentPosts } from '@/data/posts';
import { PostDetail } from '@/components/features/board';

interface PostDetailPageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
    };
  }

  return {
    title: post.title,
    description: post.content.replace(/<[^>]*>/g, '').slice(0, 160),
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { category, id } = await params;

  // 유효한 카테고리인지 확인
  if (category !== 'notice' && category !== 'press') {
    notFound();
  }

  const post = getPostById(id);

  if (!post || post.category !== category) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(id, category);

  return <PostDetail post={post} prevPost={prev} nextPost={next} />;
}
