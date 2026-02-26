// 이 파일은 삭제해도 됩니다 - 관리자 계정이 이미 생성되었습니다.
import { NextResponse } from 'next/server';
export async function POST() {
  return NextResponse.json({ message: '관리자 계정이 이미 생성되었습니다.' });
}
