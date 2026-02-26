import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostById, getAdjacentPosts, incrementViewCount } from '@/lib/posts';
import { toUIPostWithAttachments, toUIAdjacentPost } from '@/lib/post-helpers';
import { PostDetail } from '@/components/features/board';

interface PostDetailPageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);

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

  if (category !== 'notice') {
    notFound();
  }

  const post = await getPostById(id);

  if (!post || post.category !== category) {
    notFound();
  }

  // 조회수 증가 (비동기, 에러 무시)
  await incrementViewCount(id);

  const { prev, next } = await getAdjacentPosts(id, category);

  const uiPost = toUIPostWithAttachments(post);
  const uiPrev = toUIAdjacentPost(prev);
  const uiNext = toUIAdjacentPost(next);

  return <PostDetail post={uiPost} prevPost={uiPrev} nextPost={uiNext} />;
}
