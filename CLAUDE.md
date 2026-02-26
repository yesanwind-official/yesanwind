# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

예산윈드오케스트라(Yesan Wind Orchestra) 공식 웹사이트 - Next.js 16 기반 관악 오케스트라 웹사이트.

## Commands

```bash
npm run dev          # 개발 서버 실행 (Turbopack)
npm run build        # 프로덕션 빌드
npm run lint         # ESLint 검사
npm run lint:fix     # ESLint 자동 수정
npm run type-check   # TypeScript 타입 검사
```

## Architecture

### Route Groups
- `(public)` - 일반 사용자 페이지 (Header/Footer 포함)
- `(admin)` - 관리자 대시보드 (AdminSidebar/AdminHeader 포함)

### Key Directories
- `src/components/ui/` - Radix UI 기반 재사용 UI 컴포넌트 (shadcn/ui 스타일)
- `src/components/features/` - 도메인별 컴포넌트 (concerts, gallery, board, members)
- `src/components/admin/` - 관리자 전용 컴포넌트
- `src/components/theme/` - 다크/라이트 테마 시스템
- `src/data/` - Mock 데이터 (Supabase 연동 전까지 사용)
- `src/stores/` - Zustand 상태 관리
- `src/types/index.ts` - 공통 타입 정의

### State Management
- **React Query** - 서버 상태 관리 (staleTime: 1분)
- **Zustand** - 클라이언트 상태 (UI, 테마)

### Styling
- **Tailwind CSS v4** with custom design tokens
- 다크 테마 기본, `light` 클래스로 라이트 테마 전환
- 커스텀 컬러: `gold-*` (포인트 컬러), `dark-*` (배경/텍스트)
- 공통 컴포넌트 클래스: `btn-primary`, `btn-secondary`, `card`, `input`, `container-custom`

### Data Flow
현재 `src/data/` 폴더의 Mock 데이터 사용. 추후 Supabase 연동 예정:
- `@supabase/ssr` - SSR 지원 Supabase 클라이언트
- `src/hooks/use-supabase.ts` - Supabase 훅

### Font System
- 한글: Pretendard (CDN)
- 영문 제목: Playfair Display (next/font)

## Domain Types

주요 도메인 타입 (`src/types/index.ts`):
- `Concert` - 공연 정보 (정기연주회, 특별연주회 등)
- `Member` - 단원 정보 (악기 파트별)
- `Notice` - 공지사항/뉴스
- `Gallery` - 갤러리/사진첩
