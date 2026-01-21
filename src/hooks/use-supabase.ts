'use client';

import { useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * Supabase 클라이언트를 반환하는 커스텀 훅
 * 클라이언트 컴포넌트에서만 사용
 */
export function useSupabase() {
  const supabase = useMemo(() => createClient(), []);
  return supabase;
}
