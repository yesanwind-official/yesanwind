# 예산윈드오케스트라 레이아웃 패턴

## 1. 반응형 브레이크포인트

### 브레이크포인트 정의

| 이름 | 크기 | 설명 | 컨테이너 최대 너비 |
|------|------|------|-------------------|
| `sm` | 640px | 모바일 | 100% |
| `md` | 768px | 태블릿 | 100% |
| `lg` | 1024px | 소형 데스크탑 | 1024px |
| `xl` | 1280px | 데스크탑 | 1280px |
| `2xl` | 1536px | 대형 데스크탑 | 1400px |

### Tailwind 사용 예시
```html
<!-- 모바일 우선 접근 -->
<div class="px-4 md:px-6 lg:px-8">
  <h1 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">제목</h1>
</div>

<!-- 그리드 반응형 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- 카드들 -->
</div>
```

---

## 2. 전체 페이지 구조

### 기본 레이아웃 구조

```
┌─────────────────────────────────────────────────────────────────┐
│                        Header (Fixed)                            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Logo        Navigation                    [햄버거/유틸리티] │    │
│  └─────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                        Main Content                              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                     Hero Section                         │    │
│  │               (메인 페이지만 해당)                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Content Sections                      │    │
│  │                                                          │    │
│  │    [Container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8]  │    │
│  │                                                          │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                          Footer                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 로고/소개  |  메뉴링크  |  SNS  |  연락처               │    │
│  │─────────────────────────────────────────────────────────│    │
│  │            Copyright / 하단 법적 정보                    │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### HTML 기본 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>예산윈드오케스트라</title>
</head>
<body class="bg-dark-900 text-dark-100 font-sans antialiased">

  <!-- Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur-md border-b border-dark-700/50">
    <!-- Header Content -->
  </header>

  <!-- Main Content -->
  <main class="pt-20">
    <!-- Page Sections -->
  </main>

  <!-- Footer -->
  <footer class="bg-dark-950 border-t border-dark-700">
    <!-- Footer Content -->
  </footer>

</body>
</html>
```

---

## 3. 헤더 (Header)

### 데스크탑 헤더 (lg 이상)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [Logo]  YESAN WIND    오케스트라소개  공연안내  갤러리  게시판  오시는길  │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
Height: 80px (h-20)
Background: bg-dark-950/90 backdrop-blur-md
Border: border-b border-dark-700/50
```

### 모바일 헤더 (lg 미만)

```
┌──────────────────────────────────────────────────────────────┐
│  [Logo]  YESAN WIND                              [햄버거 ☰]  │
└──────────────────────────────────────────────────────────────┘
Height: 64px (h-16)
```

### 헤더 HTML 구조

```html
<header class="fixed top-0 left-0 right-0 z-50 bg-dark-950/90 backdrop-blur-md border-b border-dark-700/50">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-20">

      <!-- 로고 -->
      <a href="/" class="flex items-center gap-2 lg:gap-3">
        <img src="/images/logo.svg" alt="" class="h-8 lg:h-10 w-auto" />
        <span class="text-white font-serif text-lg lg:text-xl tracking-wide">
          YESAN WIND
        </span>
      </a>

      <!-- 데스크탑 네비게이션 -->
      <nav class="hidden lg:flex items-center gap-8">
        <a href="/about" class="nav-link">오케스트라 소개</a>
        <a href="/performance" class="nav-link">공연 안내</a>
        <a href="/gallery" class="nav-link">갤러리</a>
        <a href="/board" class="nav-link">게시판</a>
        <a href="/contact" class="nav-link">오시는 길</a>
      </nav>

      <!-- 모바일 메뉴 버튼 -->
      <button class="lg:hidden p-2 text-white hover:text-gold-500 transition-colors"
              aria-label="메뉴 열기">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>
</header>

<!-- 네비게이션 링크 스타일 -->
<style>
  .nav-link {
    @apply text-dark-100 hover:text-gold-500
           font-medium text-sm tracking-wide
           transition-colors duration-300
           relative
           after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
           after:bg-gold-500 after:transition-all after:duration-300
           hover:after:w-full;
  }
  .nav-link.active {
    @apply text-gold-500 after:w-full;
  }
</style>
```

### 모바일 메뉴 (슬라이드 오버)

```html
<!-- 모바일 메뉴 오버레이 -->
<div class="fixed inset-0 z-50 lg:hidden" x-show="mobileMenuOpen">

  <!-- 배경 오버레이 -->
  <div class="fixed inset-0 bg-dark-950/80 backdrop-blur-sm"
       @click="mobileMenuOpen = false"></div>

  <!-- 메뉴 패널 -->
  <div class="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-dark-900 shadow-xl">

    <!-- 닫기 버튼 -->
    <div class="flex justify-end p-4">
      <button @click="mobileMenuOpen = false" class="p-2 text-dark-300 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- 메뉴 링크 -->
    <nav class="px-6 py-4">
      <a href="/about" class="block py-3 text-lg text-dark-100 hover:text-gold-500
                              border-b border-dark-700/50 transition-colors">
        오케스트라 소개
      </a>
      <a href="/performance" class="block py-3 text-lg text-dark-100 hover:text-gold-500
                                    border-b border-dark-700/50 transition-colors">
        공연 안내
      </a>
      <a href="/gallery" class="block py-3 text-lg text-dark-100 hover:text-gold-500
                                border-b border-dark-700/50 transition-colors">
        갤러리
      </a>
      <a href="/board" class="block py-3 text-lg text-dark-100 hover:text-gold-500
                              border-b border-dark-700/50 transition-colors">
        게시판
      </a>
      <a href="/contact" class="block py-3 text-lg text-dark-100 hover:text-gold-500
                                transition-colors">
        오시는 길
      </a>
    </nav>

    <!-- 연락처 정보 -->
    <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-dark-700/50">
      <p class="text-dark-400 text-sm">연락처</p>
      <p class="text-white mt-1">041-123-4567</p>
    </div>
  </div>
</div>
```

### 스크롤 시 헤더 변화

```javascript
// 스크롤 시 헤더 배경 진하게
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('bg-dark-950', 'shadow-lg');
    header.classList.remove('bg-dark-950/90');
  } else {
    header.classList.remove('bg-dark-950', 'shadow-lg');
    header.classList.add('bg-dark-950/90');
  }
});
```

---

## 4. 푸터 (Footer)

### 푸터 구조

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  ┌────────────────┬────────────────┬────────────────┬────────────────┐    │
│  │ 로고 & 소개    │ 메뉴           │ 연락처         │ SNS            │    │
│  │                │                │                │                │    │
│  │ [Logo]         │ 오케스트라 소개 │ 충남 예산군... │ [F] [I] [Y]   │    │
│  │ YESAN WIND     │ 공연 안내      │ TEL: 041-...  │                │    │
│  │                │ 갤러리         │ FAX: 041-...  │                │    │
│  │ 음악으로       │ 게시판         │               │                │    │
│  │ 하나되는...    │ 오시는 길      │               │                │    │
│  └────────────────┴────────────────┴────────────────┴────────────────┘    │
│                                                                            │
│  ──────────────────────────────────────────────────────────────────────   │
│                                                                            │
│   (C) 2024 예산윈드오케스트라. All rights reserved.    개인정보처리방침    │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### 푸터 HTML

```html
<footer class="bg-dark-950 border-t border-dark-700">

  <!-- 상단 콘텐츠 -->
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 lg:py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

      <!-- 로고 & 소개 -->
      <div class="lg:col-span-1">
        <a href="/" class="flex items-center gap-2 mb-4">
          <img src="/images/logo.svg" alt="" class="h-10 w-auto" />
          <span class="text-white font-serif text-xl tracking-wide">YESAN WIND</span>
        </a>
        <p class="text-dark-300 text-sm leading-relaxed">
          음악으로 하나되는 예산,<br>
          예산윈드오케스트라가 함께합니다.
        </p>
      </div>

      <!-- 메뉴 -->
      <div>
        <h3 class="text-white font-semibold mb-4">바로가기</h3>
        <ul class="space-y-2">
          <li>
            <a href="/about" class="text-dark-300 hover:text-gold-500 text-sm transition-colors">
              오케스트라 소개
            </a>
          </li>
          <li>
            <a href="/performance" class="text-dark-300 hover:text-gold-500 text-sm transition-colors">
              공연 안내
            </a>
          </li>
          <li>
            <a href="/gallery" class="text-dark-300 hover:text-gold-500 text-sm transition-colors">
              갤러리
            </a>
          </li>
          <li>
            <a href="/board" class="text-dark-300 hover:text-gold-500 text-sm transition-colors">
              게시판
            </a>
          </li>
          <li>
            <a href="/contact" class="text-dark-300 hover:text-gold-500 text-sm transition-colors">
              오시는 길
            </a>
          </li>
        </ul>
      </div>

      <!-- 연락처 -->
      <div>
        <h3 class="text-white font-semibold mb-4">연락처</h3>
        <ul class="space-y-2 text-sm text-dark-300">
          <li class="flex items-start gap-2">
            <svg class="w-4 h-4 mt-0.5 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>충남 예산군 예산읍 예산로 123</span>
          </li>
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>041-123-4567</span>
          </li>
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4 text-gold-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>info@yesanwind.or.kr</span>
          </li>
        </ul>
      </div>

      <!-- SNS -->
      <div>
        <h3 class="text-white font-semibold mb-4">Follow Us</h3>
        <div class="flex gap-3">
          <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full
                            bg-dark-800 text-dark-300 hover:bg-gold-500 hover:text-dark-950
                            transition-all duration-300" aria-label="Facebook">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full
                            bg-dark-800 text-dark-300 hover:bg-gold-500 hover:text-dark-950
                            transition-all duration-300" aria-label="Instagram">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full
                            bg-dark-800 text-dark-300 hover:bg-gold-500 hover:text-dark-950
                            transition-all duration-300" aria-label="YouTube">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- 하단 저작권 -->
  <div class="border-t border-dark-800">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-dark-400 text-sm">
          &copy; 2024 예산윈드오케스트라. All rights reserved.
        </p>
        <div class="flex gap-6">
          <a href="/privacy" class="text-dark-400 hover:text-gold-500 text-sm transition-colors">
            개인정보처리방침
          </a>
          <a href="/terms" class="text-dark-400 hover:text-gold-500 text-sm transition-colors">
            이용약관
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
```

---

## 5. 메인 페이지 레이아웃

### 섹션 구조

```
┌─────────────────────────────────────────────────────────────┐
│ [Header - Fixed]                                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                    HERO SECTION                          │ │
│ │              (Full Width, min-height: 100vh)             │ │
│ │                                                          │ │
│ │                   메인 비주얼 이미지                      │ │
│ │                   + 타이틀 + CTA                         │ │
│ │                                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                UPCOMING CONCERT SECTION                  │ │
│ │                     py-16 md:py-24                       │ │
│ │                                                          │ │
│ │   [섹션 타이틀]                                          │ │
│ │   [공연 카드 1] [공연 카드 2] [공연 카드 3]              │ │
│ │                                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                  ABOUT SECTION                           │ │
│ │                  py-16 md:py-24                          │ │
│ │                  bg-dark-800                             │ │
│ │                                                          │ │
│ │   [이미지]              [텍스트 콘텐츠]                   │ │
│ │   (좌측 또는 우측)       소개 + CTA                       │ │
│ │                                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                  GALLERY SECTION                         │ │
│ │                   py-16 md:py-24                         │ │
│ │                                                          │ │
│ │   [섹션 타이틀]                                          │ │
│ │   [갤러리 그리드 - 마소닉 또는 그리드]                    │ │
│ │                                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                   NEWS SECTION                           │ │
│ │                  py-16 md:py-24                          │ │
│ │                  bg-dark-800                             │ │
│ │                                                          │ │
│ │   [공지사항 리스트]      [뉴스/소식 리스트]               │ │
│ │                                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ [Footer]                                                     │
└─────────────────────────────────────────────────────────────┘
```

### 섹션 기본 템플릿

```html
<!-- 기본 섹션 -->
<section class="py-16 md:py-24">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    <!-- 섹션 타이틀 -->
    <div class="text-center mb-12">
      <span class="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
        Section Label
      </span>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        섹션 제목
      </h2>
      <div class="w-16 h-0.5 bg-gold-500 mx-auto"></div>
    </div>

    <!-- 섹션 콘텐츠 -->
    <div>
      <!-- 콘텐츠 -->
    </div>
  </div>
</section>

<!-- 배경색 있는 섹션 -->
<section class="py-16 md:py-24 bg-dark-800">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    <!-- 콘텐츠 -->
  </div>
</section>
```

---

## 6. 서브 페이지 레이아웃

### 구조

```
┌─────────────────────────────────────────────────────────────┐
│ [Header - Fixed]                                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                   PAGE HEADER                            │ │
│ │              py-20 md:py-32 bg-dark-800                  │ │
│ │                                                          │ │
│ │               브레드크럼                                  │ │
│ │               페이지 타이틀                               │ │
│ │               서브타이틀 (옵션)                           │ │
│ │                                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │                   PAGE CONTENT                           │ │
│ │                  py-16 md:py-24                          │ │
│ │                                                          │ │
│ │   [페이지별 콘텐츠]                                       │ │
│ │                                                          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ [Footer]                                                     │
└─────────────────────────────────────────────────────────────┘
```

### 페이지 헤더

```html
<!-- 서브 페이지 헤더 -->
<section class="pt-32 pb-16 md:pt-40 md:pb-20 bg-dark-800 relative overflow-hidden">

  <!-- 배경 장식 -->
  <div class="absolute inset-0 opacity-5">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-[800px] h-[800px] rounded-full border border-gold-500"></div>
  </div>

  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">

    <!-- 브레드크럼 -->
    <nav class="mb-6" aria-label="Breadcrumb">
      <ol class="flex items-center gap-2 text-sm">
        <li>
          <a href="/" class="text-dark-400 hover:text-gold-500 transition-colors">홈</a>
        </li>
        <li class="text-dark-500">/</li>
        <li class="text-gold-500">공연 안내</li>
      </ol>
    </nav>

    <!-- 페이지 타이틀 -->
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
      공연 안내
    </h1>

    <!-- 서브타이틀 (옵션) -->
    <p class="text-dark-300 text-lg max-w-2xl">
      예산윈드오케스트라의 정기연주회와 특별공연 일정을 확인하세요.
    </p>
  </div>
</section>
```

---

## 7. 그리드 시스템

### 카드 그리드

```html
<!-- 2열 그리드 (태블릿에서 1열) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <!-- 카드들 -->
</div>

<!-- 3열 그리드 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 카드들 -->
</div>

<!-- 4열 그리드 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- 카드들 -->
</div>

<!-- 갤러리 그리드 (비대칭) -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div class="col-span-2 row-span-2"><!-- 큰 이미지 --></div>
  <div><!-- 작은 이미지 --></div>
  <div><!-- 작은 이미지 --></div>
  <div><!-- 작은 이미지 --></div>
  <div><!-- 작은 이미지 --></div>
</div>
```

### 2단 레이아웃 (콘텐츠 + 사이드바)

```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

  <!-- 메인 콘텐츠 (2/3) -->
  <div class="lg:col-span-2">
    <!-- 콘텐츠 -->
  </div>

  <!-- 사이드바 (1/3) -->
  <aside class="lg:col-span-1">
    <div class="sticky top-24">
      <!-- 사이드바 콘텐츠 -->
    </div>
  </aside>

</div>
```

### 50:50 레이아웃 (이미지 + 텍스트)

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

  <!-- 이미지 -->
  <div class="order-2 lg:order-1">
    <div class="aspect-[4/3] rounded-lg overflow-hidden">
      <img src="..." alt="..." class="w-full h-full object-cover" />
    </div>
  </div>

  <!-- 텍스트 -->
  <div class="order-1 lg:order-2">
    <span class="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
      About Us
    </span>
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
      예산윈드오케스트라
    </h2>
    <p class="text-dark-300 leading-relaxed mb-6">
      텍스트 내용...
    </p>
    <a href="/about" class="btn-secondary">
      자세히 보기
    </a>
  </div>

</div>
```

---

## 8. 컨테이너 사이즈

### 기본 컨테이너

```html
<!-- 표준 컨테이너 (max-width: 1280px) -->
<div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
  <!-- 콘텐츠 -->
</div>

<!-- 좁은 컨테이너 (max-width: 896px) - 글 읽기용 -->
<div class="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
  <!-- 콘텐츠 -->
</div>

<!-- 넓은 컨테이너 (max-width: 1536px) -->
<div class="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8">
  <!-- 콘텐츠 -->
</div>

<!-- 전체 너비 (히어로, 배경 이미지) -->
<div class="w-full">
  <!-- 콘텐츠 -->
</div>
```

---

## 9. Z-Index 체계

| 레이어 | z-index | 용도 |
|--------|---------|------|
| Base | 0 | 기본 콘텐츠 |
| Dropdown | 10 | 드롭다운 메뉴 |
| Sticky | 20 | 스티키 요소 |
| Fixed | 30 | 고정 요소 |
| Header | 50 | 헤더 |
| Modal Backdrop | 60 | 모달 배경 |
| Modal | 70 | 모달 |
| Toast | 80 | 토스트 알림 |
| Tooltip | 90 | 툴팁 |

---

*Last Updated: 2024-01-21*
*Version: 1.0*
