import { createClient } from '@/lib/supabase/server';
import type { PostCategory } from '@/types/database';

interface GetNoticesOptions {
  page?: number;
  limit?: number;
  pinnedFirst?: boolean;
}

/**
 * 공지사항 목록 조회 (서버 전용)
 */
export async function getNotices(options?: GetNoticesOptions) {
  const { page = 1, limit = 10, pinnedFirst = true } = options || {};
  const supabase = await createClient();
  if (!supabase) return { posts: [], total: 0 };

  // 전체 개수 조회
  const { count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'notice');

  const total = count || 0;

  // 게시글 목록 조회
  let query = supabase
    .from('posts')
    .select('*, post_attachments(id)')
    .eq('category', 'notice');

  if (pinnedFirst) {
    query = query
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false });
  } else {
    query = query.order('published_at', { ascending: false });
  }

  const offset = (page - 1) * limit;
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching notices:', error);
    return { posts: [], total: 0 };
  }

  return { posts: data || [], total };
}

/**
 * 게시글 단일 조회 (첨부파일 포함)
 */
export async function getPostById(id: string) {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('posts')
    .select('*, post_attachments(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data;
}

/**
 * 이전/다음 게시글 조회
 */
export async function getAdjacentPosts(id: string, category: PostCategory) {
  const supabase = await createClient();
  if (!supabase) return { prev: null, next: null };

  // 현재 글의 published_at 조회
  const { data: current } = await supabase
    .from('posts')
    .select('published_at')
    .eq('id', id)
    .single();

  if (!current) return { prev: null, next: null };

  // 이전글 (더 최신)
  const { data: prev } = await supabase
    .from('posts')
    .select('id, title, category')
    .eq('category', category)
    .gt('published_at', current.published_at)
    .order('published_at', { ascending: true })
    .limit(1)
    .single();

  // 다음글 (더 오래된)
  const { data: next } = await supabase
    .from('posts')
    .select('id, title, category')
    .eq('category', category)
    .lt('published_at', current.published_at)
    .order('published_at', { ascending: false })
    .limit(1)
    .single();

  return { prev: prev || null, next: next || null };
}

/**
 * 최근 게시글 조회
 */
export async function getRecentPosts(category: PostCategory, limit: number = 5) {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', category)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching recent posts:', error);
    return [];
  }

  return data || [];
}

/**
 * 전체 페이지 수 계산
 */
export async function getTotalPages(category: PostCategory, limit: number = 10) {
  const supabase = await createClient();
  if (!supabase) return 1;

  const { count } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('category', category);

  return Math.ceil((count || 0) / limit);
}

/**
 * 조회수 증가 (RPC 함수 호출)
 */
export async function incrementViewCount(postId: string) {
  const supabase = await createClient();
  if (!supabase) return;

  await supabase.rpc('increment_post_view_count', { post_id: postId });
}
