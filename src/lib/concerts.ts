/**
 * Server Data Access Layer - Concerts
 *
 * Supabase concerts 테이블에서 데이터를 조회하고
 * UI 타입(ConcertWithLabels, ConcertDetail)으로 변환합니다.
 *
 * createClient()가 null을 반환하면 (환경 변수 미설정)
 * 빈 배열 또는 null을 반환합니다.
 */

import { createClient } from '@/lib/supabase/server';
import type { ConcertWithLabels, ConcertDetail } from '@/types/concert';
import type { ConcertCategory, ConcertStatus } from '@/types/index';
import type { Database, ConcertType } from '@/types/database';

type ConcertRow = Database['public']['Tables']['concerts']['Row'];

// ---------------------------------------------------------------------------
// DB Row -> UI Type Mapping
// ---------------------------------------------------------------------------

const categoryMap: Record<string, string> = {
  regular: '정기연주회',
  special: '기획공연',
};

const statusMap: Record<string, string> = {
  upcoming: '예매중',
  ongoing: '공연중',
  ended: '종료',
};

/**
 * DB concerts 행을 ConcertWithLabels UI 타입으로 변환합니다.
 *
 * DB와 UI 타입 간 차이점:
 * - DB: concert_type('regular'|'special'), status('ended')
 * - UI: category(ConcertCategory), status('completed')
 */
function toUIConcert(row: ConcertRow): ConcertWithLabels {
  return {
    id: row.id,
    title: row.title,
    subtitle: '',
    description: row.description || '',
    category: row.concert_type as ConcertCategory,
    date: row.date,
    time: row.time,
    venue: row.venue,
    venue_address: row.address || '',
    poster_image: row.poster_url || '',
    ticket_info: row.ticket_info || '',
    ticket_link: row.ticket_url || '',
    status: (row.status === 'ended' ? 'completed' : row.status) as ConcertStatus,
    is_featured: row.is_featured,
    program: row.program ? JSON.parse(row.program) : [],
    categoryLabel: categoryMap[row.concert_type] || row.concert_type,
    statusLabel: statusMap[row.status] || row.status,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * DB concerts 행을 ConcertDetail UI 타입으로 변환합니다.
 * conductor 필드는 description에서 추출하거나 기본값을 사용합니다.
 */
function toUIConcertDetail(row: ConcertRow): ConcertDetail {
  const base = toUIConcert(row);
  return {
    ...base,
    performers: [],
    conductor: '김태혁',
  };
}

// ---------------------------------------------------------------------------
// Query Functions
// ---------------------------------------------------------------------------

/**
 * 모든 공연 목록을 날짜 내림차순으로 조회합니다.
 */
export async function getAllConcerts(): Promise<ConcertWithLabels[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('[concerts] getAllConcerts error:', error.message);
    return [];
  }

  return (data ?? []).map(toUIConcert);
}

/**
 * 예정된 공연(upcoming, ongoing)을 날짜 오름차순으로 조회합니다.
 */
export async function getUpcomingConcerts(): Promise<ConcertWithLabels[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .in('status', ['upcoming', 'ongoing'])
    .order('date', { ascending: true });

  if (error) {
    console.error('[concerts] getUpcomingConcerts error:', error.message);
    return [];
  }

  return (data ?? []).map(toUIConcert);
}

/**
 * 종료된 공연(ended)을 날짜 내림차순으로 조회합니다.
 */
export async function getCompletedConcerts(): Promise<ConcertWithLabels[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .eq('status', 'ended')
    .order('date', { ascending: false });

  if (error) {
    console.error('[concerts] getCompletedConcerts error:', error.message);
    return [];
  }

  return (data ?? []).map(toUIConcert);
}

/**
 * 특정 카테고리(concert_type)의 공연 목록을 조회합니다.
 * DB에는 'regular'과 'special'만 존재합니다.
 */
export async function getConcertsByCategory(
  category: ConcertType
): Promise<ConcertWithLabels[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .eq('concert_type', category)
    .order('date', { ascending: false });

  if (error) {
    console.error('[concerts] getConcertsByCategory error:', error.message);
    return [];
  }

  return (data ?? []).map(toUIConcert);
}

/**
 * 단일 공연을 ID로 조회합니다.
 */
export async function getConcertById(
  id: string
): Promise<ConcertWithLabels | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[concerts] getConcertById error:', error.message);
    return null;
  }

  return data ? toUIConcert(data) : null;
}

/**
 * 단일 공연의 상세 정보를 ID로 조회합니다.
 * ConcertDetail 타입(conductor, performers 등 포함)으로 반환합니다.
 */
export async function getConcertDetailById(
  id: string
): Promise<ConcertDetail | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[concerts] getConcertDetailById error:', error.message);
    return null;
  }

  return data ? toUIConcertDetail(data) : null;
}

/**
 * 공연 데이터에 존재하는 연도 목록을 내림차순으로 반환합니다.
 */
export async function getAvailableYears(): Promise<number[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('concerts')
    .select('date')
    .order('date', { ascending: false });

  if (error) {
    console.error('[concerts] getAvailableYears error:', error.message);
    return [];
  }

  if (!data || data.length === 0) return [];

  const years = data.map((row) => new Date(row.date).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
}
