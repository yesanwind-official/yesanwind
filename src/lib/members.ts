import { createClient } from '@/lib/supabase/server';
import type { MemberPart } from '@/types/database';

/**
 * 전체 활성 단원 조회 (서버 전용)
 * display_order 기준 정렬
 */
export async function getAllMembers() {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching members:', error);
    return [];
  }

  return data || [];
}

/**
 * 파트별 단원 조회 (서버 전용)
 */
export async function getMembersByPart(part: MemberPart) {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('is_active', true)
    .eq('part', part)
    .order('display_order', { ascending: true });

  if (error) {
    console.error(`Error fetching ${part} members:`, error);
    return [];
  }

  return data || [];
}

/**
 * 지휘자 조회 (서버 전용)
 */
export async function getConductor() {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('is_active', true)
    .eq('position', 'conductor')
    .order('display_order', { ascending: true })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching conductor:', error);
    return null;
  }

  return data;
}
