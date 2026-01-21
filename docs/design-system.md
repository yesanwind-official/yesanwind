# 예산윈드오케스트라 디자인 시스템

## 1. 디자인 철학

### 컨셉
**"클래식의 품격, 현대의 감각"**

예산윈드오케스트라의 정체성을 반영하여 클래식 음악의 우아함과 품격을 현대적인 디지털 인터페이스로 표현합니다.

### 디자인 원칙
1. **품격 (Elegance)**: 고급스럽고 세련된 시각적 표현
2. **명료함 (Clarity)**: 정보의 명확한 전달과 가독성
3. **일관성 (Consistency)**: 통일된 디자인 언어 유지
4. **접근성 (Accessibility)**: 모든 사용자가 쉽게 이용 가능

---

## 2. 컬러 팔레트

### 기본 테마: 다크 모드

클래식 공연장의 분위기를 연상시키는 깊은 다크 톤을 기반으로 합니다.

### Primary Colors (브랜드 컬러)

```css
/* 골드 계열 - 메인 포인트 컬러 */
--color-gold-50: #fefce8;
--color-gold-100: #fef9c3;
--color-gold-200: #fef08a;
--color-gold-300: #fde047;
--color-gold-400: #facc15;
--color-gold-500: #d4af37;      /* Primary Gold */
--color-gold-600: #b8962e;
--color-gold-700: #a17c1a;
--color-gold-800: #854d0e;
--color-gold-900: #713f12;

/* Tailwind 확장 설정 */
gold: {
  50: '#fefce8',
  100: '#fef9c3',
  200: '#fef08a',
  300: '#fde047',
  400: '#facc15',
  500: '#d4af37',
  600: '#b8962e',
  700: '#a17c1a',
  800: '#854d0e',
  900: '#713f12',
}
```

### Background Colors (배경 컬러)

```css
/* 다크 배경 계열 */
--color-bg-primary: #0a0a0a;     /* 가장 어두운 배경 */
--color-bg-secondary: #121212;   /* 기본 배경 */
--color-bg-tertiary: #1a1a1a;    /* 카드, 섹션 배경 */
--color-bg-elevated: #242424;    /* 떠있는 요소 배경 */
--color-bg-hover: #2a2a2a;       /* 호버 상태 */

/* Tailwind 확장 */
dark: {
  950: '#0a0a0a',
  900: '#121212',
  800: '#1a1a1a',
  700: '#242424',
  600: '#2a2a2a',
  500: '#3a3a3a',
  400: '#525252',
  300: '#737373',
  200: '#a3a3a3',
  100: '#d4d4d4',
}
```

### Text Colors (텍스트 컬러)

```css
/* 텍스트 계층 */
--color-text-primary: #ffffff;      /* 주요 텍스트 */
--color-text-secondary: #a3a3a3;    /* 보조 텍스트 */
--color-text-tertiary: #737373;     /* 비활성/힌트 텍스트 */
--color-text-accent: #d4af37;       /* 강조 텍스트 (골드) */
--color-text-inverse: #0a0a0a;      /* 밝은 배경의 텍스트 */
```

### Semantic Colors (의미론적 컬러)

```css
/* 상태 컬러 */
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;

/* 보더 컬러 */
--color-border-default: #2a2a2a;
--color-border-hover: #3a3a3a;
--color-border-accent: #d4af37;
```

### 그라데이션

```css
/* 골드 그라데이션 - 버튼, 강조 요소 */
--gradient-gold: linear-gradient(135deg, #d4af37 0%, #f5d77a 50%, #d4af37 100%);

/* 다크 그라데이션 - 오버레이 */
--gradient-dark-overlay: linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 100%);

/* 히어로 섹션 그라데이션 */
--gradient-hero: linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.9) 100%);
```

---

## 3. 타이포그래피

### 폰트 패밀리

```css
/* 한글 - Pretendard (메인) */
--font-family-sans: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* 영문 제목 - Playfair Display (세리프, 클래식) */
--font-family-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;

/* 숫자/날짜 - DM Sans */
--font-family-mono: 'DM Sans', 'SF Mono', monospace;
```

### 폰트 사이즈 스케일

```css
/* Type Scale (1.25 ratio) */
--font-size-xs: 0.75rem;      /* 12px - 캡션, 메타 정보 */
--font-size-sm: 0.875rem;     /* 14px - 작은 텍스트 */
--font-size-base: 1rem;       /* 16px - 본문 기본 */
--font-size-lg: 1.125rem;     /* 18px - 큰 본문 */
--font-size-xl: 1.25rem;      /* 20px - 소제목 */
--font-size-2xl: 1.5rem;      /* 24px - 섹션 제목 */
--font-size-3xl: 1.875rem;    /* 30px - 페이지 제목 */
--font-size-4xl: 2.25rem;     /* 36px - 대형 제목 */
--font-size-5xl: 3rem;        /* 48px - 히어로 제목 */
--font-size-6xl: 3.75rem;     /* 60px - 특대형 제목 */

/* Tailwind 클래스 매핑 */
text-xs     /* 12px */
text-sm     /* 14px */
text-base   /* 16px */
text-lg     /* 18px */
text-xl     /* 20px */
text-2xl    /* 24px */
text-3xl    /* 30px */
text-4xl    /* 36px */
text-5xl    /* 48px */
text-6xl    /* 60px */
```

### 폰트 웨이트

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Tailwind 클래스 */
font-light      /* 300 */
font-normal     /* 400 */
font-medium     /* 500 */
font-semibold   /* 600 */
font-bold       /* 700 */
```

### Line Height

```css
--line-height-tight: 1.25;    /* 제목 */
--line-height-snug: 1.375;    /* 소제목 */
--line-height-normal: 1.5;    /* 본문 기본 */
--line-height-relaxed: 1.625; /* 긴 본문 */
--line-height-loose: 2;       /* 여유있는 본문 */

/* Tailwind 클래스 */
leading-tight    /* 1.25 */
leading-snug     /* 1.375 */
leading-normal   /* 1.5 */
leading-relaxed  /* 1.625 */
leading-loose    /* 2 */
```

### Letter Spacing

```css
--letter-spacing-tighter: -0.05em;
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;

/* Tailwind 클래스 */
tracking-tighter  /* -0.05em */
tracking-tight    /* -0.025em */
tracking-normal   /* 0 */
tracking-wide     /* 0.025em */
tracking-wider    /* 0.05em */
tracking-widest   /* 0.1em */
```

### 타이포그래피 스타일 가이드

| 용도 | 폰트 | 사이즈 | 웨이트 | 클래스 조합 |
|------|------|--------|--------|-------------|
| 히어로 제목 | Playfair Display | 48-60px | Bold | `font-serif text-5xl md:text-6xl font-bold tracking-tight` |
| 섹션 제목 | Pretendard | 30-36px | Bold | `text-3xl md:text-4xl font-bold` |
| 카드 제목 | Pretendard | 20-24px | Semibold | `text-xl md:text-2xl font-semibold` |
| 본문 | Pretendard | 16px | Normal | `text-base font-normal leading-relaxed` |
| 캡션/메타 | Pretendard | 12-14px | Normal | `text-sm text-dark-200` |
| 버튼 텍스트 | Pretendard | 14-16px | Medium | `text-sm md:text-base font-medium` |
| 네비게이션 | Pretendard | 14-16px | Medium | `text-sm md:text-base font-medium tracking-wide` |

---

## 4. 스페이싱 시스템

### 기본 단위: 4px (0.25rem)

```css
/* Spacing Scale */
--space-0: 0;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### 컴포넌트별 스페이싱 가이드

| 컴포넌트 | 내부 패딩 | 외부 마진 |
|----------|-----------|-----------|
| 버튼 (sm) | px-4 py-2 | - |
| 버튼 (md) | px-6 py-3 | - |
| 버튼 (lg) | px-8 py-4 | - |
| 카드 | p-6 | mb-6 |
| 섹션 | py-16 md:py-24 | - |
| 컨테이너 | px-4 md:px-6 lg:px-8 | mx-auto |
| 입력필드 | px-4 py-3 | mb-4 |
| 네비게이션 항목 | px-4 py-2 | - |

---

## 5. 컴포넌트 스타일

### 5.1 버튼

#### Primary Button (골드)
```html
<button class="
  bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600
  hover:from-gold-500 hover:via-gold-400 hover:to-gold-500
  text-dark-950 font-medium
  px-6 py-3 rounded
  transition-all duration-300
  shadow-lg shadow-gold-500/20
  hover:shadow-xl hover:shadow-gold-500/30
  focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900
">
  예매하기
</button>
```

#### Secondary Button (아웃라인)
```html
<button class="
  border border-gold-500 text-gold-500
  hover:bg-gold-500 hover:text-dark-950
  font-medium px-6 py-3 rounded
  transition-all duration-300
  focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900
">
  자세히 보기
</button>
```

#### Ghost Button (투명)
```html
<button class="
  text-dark-100 hover:text-gold-500
  font-medium px-4 py-2
  transition-colors duration-300
  focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900
">
  더보기
</button>
```

#### 버튼 사이즈
```css
/* Small */
.btn-sm: "text-sm px-4 py-2"

/* Medium (기본) */
.btn-md: "text-base px-6 py-3"

/* Large */
.btn-lg: "text-lg px-8 py-4"
```

### 5.2 카드

#### 기본 카드
```html
<div class="
  bg-dark-800
  border border-dark-600
  rounded-lg
  overflow-hidden
  transition-all duration-300
  hover:border-gold-500/30
  hover:shadow-lg hover:shadow-gold-500/5
">
  <!-- 이미지 영역 -->
  <div class="aspect-[16/10] overflow-hidden">
    <img class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
  </div>
  <!-- 콘텐츠 영역 -->
  <div class="p-6">
    <h3 class="text-xl font-semibold text-white mb-2">카드 제목</h3>
    <p class="text-dark-200 text-sm">카드 설명 텍스트</p>
  </div>
</div>
```

#### 공연 카드
```html
<div class="
  group
  bg-dark-800
  border border-dark-600
  rounded-lg
  overflow-hidden
  transition-all duration-300
  hover:border-gold-500/30
">
  <!-- 포스터 이미지 -->
  <div class="relative aspect-[3/4] overflow-hidden">
    <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <!-- 날짜 배지 -->
    <div class="absolute top-4 left-4 bg-gold-500 text-dark-950 px-3 py-1 rounded text-sm font-medium">
      2024.03.15
    </div>
  </div>
  <!-- 정보 -->
  <div class="p-5">
    <span class="text-gold-500 text-sm font-medium">정기연주회</span>
    <h3 class="text-lg font-semibold text-white mt-1 mb-2 line-clamp-2">
      제47회 정기연주회 - 봄의 선율
    </h3>
    <p class="text-dark-300 text-sm">예산문화예술회관 대공연장</p>
  </div>
</div>
```

#### 뉴스/공지 카드
```html
<div class="
  flex gap-4 p-4
  bg-dark-800/50
  border border-dark-600
  rounded-lg
  transition-all duration-300
  hover:bg-dark-700/50
  hover:border-gold-500/20
">
  <!-- 날짜 -->
  <div class="flex-shrink-0 text-center">
    <span class="block text-2xl font-bold text-gold-500">15</span>
    <span class="block text-sm text-dark-300">MAR</span>
  </div>
  <!-- 내용 -->
  <div>
    <span class="inline-block text-xs text-gold-500 font-medium mb-1">공지사항</span>
    <h4 class="text-white font-medium mb-1 line-clamp-1">제47회 정기연주회 안내</h4>
    <p class="text-dark-300 text-sm line-clamp-2">2024년 봄 정기연주회가 3월 15일에 개최됩니다...</p>
  </div>
</div>
```

### 5.3 네비게이션

#### 헤더 네비게이션
```html
<nav class="
  fixed top-0 left-0 right-0 z-50
  bg-dark-950/90 backdrop-blur-md
  border-b border-dark-700/50
">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <!-- 로고 -->
      <a href="/" class="flex items-center gap-3">
        <img src="/logo.svg" alt="예산윈드오케스트라" class="h-10" />
        <span class="text-white font-serif text-xl tracking-wide">YESAN WIND</span>
      </a>

      <!-- 메뉴 -->
      <ul class="hidden md:flex items-center gap-8">
        <li>
          <a href="#" class="
            text-dark-100 hover:text-gold-500
            font-medium text-sm tracking-wide
            transition-colors duration-300
            relative
            after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
            after:bg-gold-500 after:transition-all after:duration-300
            hover:after:w-full
          ">
            오케스트라 소개
          </a>
        </li>
        <!-- 반복... -->
      </ul>

      <!-- 모바일 메뉴 버튼 -->
      <button class="md:hidden text-white p-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>
</nav>
```

### 5.4 폼 요소

#### 입력 필드
```html
<div class="space-y-2">
  <label class="block text-sm font-medium text-dark-100">이름</label>
  <input type="text" class="
    w-full px-4 py-3
    bg-dark-800
    border border-dark-600
    rounded-lg
    text-white placeholder-dark-400
    transition-all duration-300
    focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500
  " placeholder="이름을 입력하세요" />
</div>
```

#### 텍스트 영역
```html
<textarea class="
  w-full px-4 py-3
  bg-dark-800
  border border-dark-600
  rounded-lg
  text-white placeholder-dark-400
  resize-none
  transition-all duration-300
  focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500
" rows="4" placeholder="내용을 입력하세요"></textarea>
```

#### 셀렉트 박스
```html
<select class="
  w-full px-4 py-3
  bg-dark-800
  border border-dark-600
  rounded-lg
  text-white
  transition-all duration-300
  focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500
  appearance-none
  bg-[url('data:image/svg+xml,...')] bg-no-repeat bg-right-4
">
  <option>선택하세요</option>
</select>
```

### 5.5 배지 및 태그

```html
<!-- 카테고리 배지 -->
<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gold-500/10 text-gold-500">
  정기연주회
</span>

<!-- 상태 배지 -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500">
  예매중
</span>

<!-- 날짜 태그 -->
<span class="inline-flex items-center px-3 py-1 bg-dark-700 text-dark-100 text-sm rounded">
  2024.03.15
</span>
```

### 5.6 섹션 타이틀

```html
<!-- 메인 섹션 타이틀 -->
<div class="text-center mb-12">
  <span class="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
    Upcoming Concert
  </span>
  <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
    다가오는 공연
  </h2>
  <div class="w-16 h-0.5 bg-gold-500 mx-auto"></div>
</div>

<!-- 좌측 정렬 섹션 타이틀 -->
<div class="mb-8">
  <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">
    최근 소식
  </h2>
  <p class="text-dark-300">예산윈드오케스트라의 새로운 소식을 전합니다</p>
</div>
```

---

## 6. 효과 및 애니메이션

### 그림자

```css
/* 기본 그림자 */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.6);

/* 골드 글로우 */
--shadow-gold-sm: 0 2px 8px rgba(212, 175, 55, 0.15);
--shadow-gold-md: 0 4px 16px rgba(212, 175, 55, 0.2);
--shadow-gold-lg: 0 8px 32px rgba(212, 175, 55, 0.25);

/* Tailwind 사용 예 */
shadow-lg shadow-gold-500/20
```

### 트랜지션

```css
/* 기본 트랜지션 */
--transition-fast: 150ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;

/* Tailwind 클래스 */
transition-all duration-150    /* 빠른 */
transition-all duration-300    /* 보통 */
transition-all duration-500    /* 느린 */
```

### 애니메이션

```css
/* 페이드 인 업 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 페이드 인 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 골드 쉬머 (버튼 호버) */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* Tailwind 설정 */
animation: {
  'fade-in': 'fadeIn 0.5s ease forwards',
  'fade-in-up': 'fadeInUp 0.5s ease forwards',
  'shimmer': 'shimmer 2s infinite linear',
}
```

---

## 7. Tailwind CSS 설정

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#d4af37',
          600: '#b8962e',
          700: '#a17c1a',
          800: '#854d0e',
          900: '#713f12',
        },
        dark: {
          950: '#0a0a0a',
          900: '#121212',
          800: '#1a1a1a',
          700: '#242424',
          600: '#2a2a2a',
          500: '#3a3a3a',
          400: '#525252',
          300: '#737373',
          200: '#a3a3a3',
          100: '#d4d4d4',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['DM Sans', 'SF Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #f5d77a 50%, #d4af37 100%)',
        'gradient-dark': 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### globals.css

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-dark-900 text-dark-100 font-sans antialiased;
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-dark-900;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-dark-600 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-dark-500;
  }
}

@layer components {
  /* 버튼 컴포넌트 */
  .btn-primary {
    @apply bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600
           hover:from-gold-500 hover:via-gold-400 hover:to-gold-500
           text-dark-950 font-medium
           px-6 py-3 rounded
           transition-all duration-300
           shadow-lg shadow-gold-500/20
           hover:shadow-xl hover:shadow-gold-500/30
           focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900;
  }

  .btn-secondary {
    @apply border border-gold-500 text-gold-500
           hover:bg-gold-500 hover:text-dark-950
           font-medium px-6 py-3 rounded
           transition-all duration-300
           focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900;
  }

  .btn-ghost {
    @apply text-dark-100 hover:text-gold-500
           font-medium px-4 py-2
           transition-colors duration-300
           focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900;
  }

  /* 카드 컴포넌트 */
  .card {
    @apply bg-dark-800 border border-dark-600 rounded-lg overflow-hidden
           transition-all duration-300
           hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5;
  }

  /* 입력 필드 */
  .input {
    @apply w-full px-4 py-3
           bg-dark-800 border border-dark-600 rounded-lg
           text-white placeholder-dark-400
           transition-all duration-300
           focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500;
  }

  /* 섹션 컨테이너 */
  .section {
    @apply py-16 md:py-24;
  }

  .container-custom {
    @apply max-w-7xl mx-auto px-4 md:px-6 lg:px-8;
  }

  /* 섹션 타이틀 */
  .section-title {
    @apply text-3xl md:text-4xl font-bold text-white mb-4;
  }

  .section-subtitle {
    @apply text-gold-500 text-sm font-medium tracking-widest uppercase mb-2;
  }
}

@layer utilities {
  /* 텍스트 그라데이션 */
  .text-gradient-gold {
    @apply bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 bg-clip-text text-transparent;
  }

  /* 글래스모피즘 */
  .glass {
    @apply bg-dark-900/80 backdrop-blur-md;
  }
}
```

---

## 8. 접근성 가이드라인

### 색상 대비
- 일반 텍스트: 최소 4.5:1 대비율
- 대형 텍스트 (18px+): 최소 3:1 대비율
- 흰색(#ffffff)과 다크 배경(#121212) 대비율: 16.1:1 (통과)
- 골드(#d4af37)와 다크 배경(#121212) 대비율: 7.8:1 (통과)

### 포커스 표시
- 모든 인터랙티브 요소에 명확한 포커스 링 표시
- `focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-dark-900`

### 터치 타겟
- 최소 44x44px 터치 영역 확보
- 버튼, 링크 등 클릭 가능한 요소에 충분한 패딩

### 이미지
- 모든 이미지에 의미있는 alt 텍스트 제공
- 장식적 이미지는 `alt=""` 또는 `role="presentation"`

### 키보드 접근성
- 모든 기능 키보드로 접근 가능
- 논리적인 탭 순서 유지
- Escape 키로 모달/드롭다운 닫기

---

## 9. 컴포넌트 체크리스트

| 컴포넌트 | 상태 | 다크모드 | 반응형 | 접근성 |
|----------|------|----------|--------|--------|
| Button (Primary) | Default, Hover, Focus, Disabled | O | O | O |
| Button (Secondary) | Default, Hover, Focus, Disabled | O | O | O |
| Card (Basic) | Default, Hover | O | O | O |
| Card (Performance) | Default, Hover | O | O | O |
| Navigation | Default, Active, Mobile | O | O | O |
| Input | Default, Focus, Error, Disabled | O | O | O |
| Badge | Default | O | O | O |
| Section Title | Default | O | O | O |

---

*Last Updated: 2024-01-21*
*Version: 1.0*
