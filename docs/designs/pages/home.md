# 예산윈드오케스트라 홈페이지 디자인

## 1. 페이지 개요

### 목적
- 오케스트라의 첫인상을 전달하는 대표 페이지
- 주요 정보(공연, 소식)에 대한 빠른 접근 제공
- 클래식하고 고급스러운 브랜드 이미지 전달

### 타겟 사용자
- 공연 관람 희망 관객
- 지역 주민 및 음악 애호가
- 단원 지원 희망자
- 언론/문화 관계자

---

## 2. 페이지 구조

```
┌─────────────────────────────────────────────────────────────────┐
│ [Header - Fixed, Transparent → Solid on scroll]                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 1. HERO SECTION                                              │ │
│ │    Full viewport height, 메인 비주얼                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 2. UPCOMING CONCERT                                          │ │
│ │    다가오는 공연 섹션                                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 3. ABOUT ORCHESTRA                                           │ │
│ │    오케스트라 소개 섹션 (배경색 다름)                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 4. GALLERY PREVIEW                                           │ │
│ │    최근 갤러리 섹션                                           │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 5. NEWS & NOTICE                                             │ │
│ │    공지사항/소식 섹션 (배경색 다름)                          │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│ [Footer]                                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. 섹션별 상세 디자인

---

### 3.1 Hero Section

#### 레이아웃

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                     [배경: 오케스트라 연주 이미지]                        │
│                     [그라데이션 오버레이]                                 │
│                                                                          │
│                                                                          │
│                           YESAN WIND                                     │
│                          ORCHESTRA                                       │
│                                                                          │
│                    음악으로 하나되는 예산,                                │
│               예산윈드오케스트라가 함께합니다                             │
│                                                                          │
│                                                                          │
│              [공연 일정 보기]        [오케스트라 소개]                    │
│                 (Primary)             (Secondary)                        │
│                                                                          │
│                                                                          │
│                              [ v ]  스크롤                                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Height: 100vh (min-height: 600px)
```

#### 디자인 명세

| 요소 | 스타일 |
|------|--------|
| 배경 이미지 | 오케스트라 연주 장면, object-cover, 약간 어둡게 처리 |
| 오버레이 | linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 100%) |
| 영문 타이틀 | Playfair Display, 60-72px, Bold, 골드 그라데이션 텍스트, tracking-wide |
| 한글 서브타이틀 | Pretendard, 18-20px, Regular, #a3a3a3, mt-6 |
| 버튼 영역 | mt-10, flex gap-4, center aligned |
| 스크롤 인디케이터 | 하단 중앙, 애니메이션 bounce |

#### HTML/Tailwind 구현

```html
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">

  <!-- 배경 이미지 -->
  <div class="absolute inset-0">
    <img
      src="/images/hero-bg.jpg"
      alt=""
      class="w-full h-full object-cover"
    />
    <!-- 그라데이션 오버레이 -->
    <div class="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/60 to-dark-950/90"></div>
  </div>

  <!-- 콘텐츠 -->
  <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">

    <!-- 타이틀 -->
    <h1 class="mb-6">
      <span class="block font-serif text-5xl md:text-6xl lg:text-7xl font-bold
                   bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400
                   bg-clip-text text-transparent
                   tracking-wide leading-tight">
        YESAN WIND
      </span>
      <span class="block font-serif text-4xl md:text-5xl lg:text-6xl font-bold
                   text-white tracking-wider mt-2">
        ORCHESTRA
      </span>
    </h1>

    <!-- 서브타이틀 -->
    <p class="text-lg md:text-xl text-dark-200 mt-6 leading-relaxed">
      음악으로 하나되는 예산,<br class="md:hidden" />
      예산윈드오케스트라가 함께합니다
    </p>

    <!-- 버튼 그룹 -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
      <a href="/performance" class="btn-primary min-w-[160px]">
        공연 일정 보기
      </a>
      <a href="/about" class="btn-secondary min-w-[160px]">
        오케스트라 소개
      </a>
    </div>
  </div>

  <!-- 스크롤 인디케이터 -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <a href="#upcoming" class="block text-gold-500/70 hover:text-gold-500 transition-colors">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </a>
  </div>

</section>
```

#### 인터랙션

1. **헤더 투명도**: 히어로 영역에서는 헤더 배경 투명, 스크롤 시 불투명
2. **패럴랙스**: 배경 이미지 약간의 패럴랙스 효과 (선택적)
3. **페이드인**: 콘텐츠 요소들 순차적 페이드인 애니메이션
4. **스크롤 인디케이터**: 무한 바운스 애니메이션

---

### 3.2 Upcoming Concert Section (다가오는 공연)

#### 레이아웃

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                          UPCOMING CONCERT                                │
│                           다가오는 공연                                   │
│                            ─────────                                     │
│                                                                          │
│   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐        │
│   │                 │  │                 │  │                 │        │
│   │   [포스터]       │  │   [포스터]       │  │   [포스터]       │        │
│   │                 │  │                 │  │                 │        │
│   │                 │  │                 │  │                 │        │
│   ├─────────────────┤  ├─────────────────┤  ├─────────────────┤        │
│   │ 2024.03.15      │  │ 2024.04.20      │  │ 2024.05.18      │        │
│   │ 정기연주회       │  │ 특별연주회       │  │ 정기연주회       │        │
│   │ 제47회 정기...   │  │ 봄의 향연       │  │ 제48회 정기...   │        │
│   │ 예산문화예술회관  │  │ 예산문화예술회관  │  │ 예산문화예술회관  │        │
│   └─────────────────┘  └─────────────────┘  └─────────────────┘        │
│                                                                          │
│                          [전체 공연 보기 →]                               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Background: bg-dark-900
Padding: py-16 md:py-24
```

#### 디자인 명세

| 요소 | 스타일 |
|------|--------|
| 섹션 타이틀 (영문) | text-gold-500, text-sm, tracking-widest, uppercase |
| 섹션 타이틀 (한글) | text-3xl md:text-4xl, font-bold, text-white |
| 구분선 | w-16, h-0.5, bg-gold-500, mx-auto, mt-4 |
| 카드 그리드 | grid, grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6 lg:gap-8 |
| 공연 카드 | 아래 상세 참조 |
| 더보기 버튼 | text-center, mt-12, btn-ghost with arrow |

#### 공연 카드 디자인

```html
<article class="group bg-dark-800 border border-dark-600 rounded-lg overflow-hidden
                transition-all duration-300 hover:border-gold-500/30
                hover:shadow-lg hover:shadow-gold-500/5">

  <!-- 포스터 이미지 -->
  <div class="relative aspect-[3/4] overflow-hidden">
    <img
      src="/images/concert-poster-1.jpg"
      alt="제47회 정기연주회 포스터"
      class="w-full h-full object-cover transition-transform duration-500
             group-hover:scale-105"
    />

    <!-- 날짜 배지 -->
    <div class="absolute top-4 left-4 bg-gold-500 text-dark-950 px-3 py-1.5
                rounded text-sm font-semibold">
      2024.03.15
    </div>

    <!-- 예매 상태 배지 -->
    <div class="absolute top-4 right-4 bg-green-500/90 text-white px-2.5 py-1
                rounded text-xs font-medium">
      예매중
    </div>

    <!-- 호버 오버레이 -->
    <div class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100
                transition-opacity duration-300 flex items-center justify-center">
      <span class="text-white font-medium flex items-center gap-2">
        자세히 보기
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  </div>

  <!-- 정보 영역 -->
  <div class="p-5">
    <!-- 카테고리 -->
    <span class="inline-block text-gold-500 text-sm font-medium mb-2">
      정기연주회
    </span>

    <!-- 제목 -->
    <h3 class="text-lg font-semibold text-white mb-2 line-clamp-2
               group-hover:text-gold-400 transition-colors">
      제47회 정기연주회 - 봄의 선율
    </h3>

    <!-- 장소 -->
    <p class="text-dark-300 text-sm flex items-center gap-1.5">
      <svg class="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      예산문화예술회관 대공연장
    </p>
  </div>

</article>
```

#### 전체 섹션 HTML

```html
<section id="upcoming" class="py-16 md:py-24 bg-dark-900">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

    <!-- 섹션 헤더 -->
    <div class="text-center mb-12">
      <span class="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
        Upcoming Concert
      </span>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        다가오는 공연
      </h2>
      <div class="w-16 h-0.5 bg-gold-500 mx-auto"></div>
    </div>

    <!-- 공연 카드 그리드 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <!-- 공연 카드 1 -->
      <article class="group bg-dark-800 ...">
        <!-- 카드 내용 -->
      </article>

      <!-- 공연 카드 2 -->
      <article class="group bg-dark-800 ...">
        <!-- 카드 내용 -->
      </article>

      <!-- 공연 카드 3 -->
      <article class="group bg-dark-800 ...">
        <!-- 카드 내용 -->
      </article>
    </div>

    <!-- 더보기 링크 -->
    <div class="text-center mt-12">
      <a href="/performance" class="inline-flex items-center gap-2 text-dark-200
                                    hover:text-gold-500 font-medium transition-colors">
        전체 공연 보기
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>

  </div>
</section>
```

---

### 3.3 About Orchestra Section (오케스트라 소개)

#### 레이아웃

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   ┌───────────────────────────┐    ┌───────────────────────────────┐   │
│   │                           │    │                               │   │
│   │                           │    │   ABOUT US                    │   │
│   │       [오케스트라         │    │   예산윈드오케스트라           │   │
│   │        단체 사진]         │    │                               │   │
│   │                           │    │   예산윈드오케스트라는         │   │
│   │                           │    │   1998년 창단하여...          │   │
│   │                           │    │                               │   │
│   │                           │    │   [오케스트라 소개 →]          │   │
│   │                           │    │                               │   │
│   └───────────────────────────┘    └───────────────────────────────┘   │
│                                                                          │
│   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│   │   27년      │ │   50+명      │ │   100+회     │ │   10,000+명  │      │
│   │   역사      │ │   단원      │ │   공연      │ │   관객      │      │
│   └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Background: bg-dark-800
Padding: py-16 md:py-24
```

#### 디자인 명세

| 요소 | 스타일 |
|------|--------|
| 배경 | bg-dark-800 (섹션 구분) |
| 레이아웃 | grid lg:grid-cols-2, gap-8 lg:gap-16, items-center |
| 이미지 | aspect-[4/3], rounded-lg, 골드 보더 액센트 |
| 텍스트 영역 | 섹션 라벨 + 제목 + 본문 + CTA |
| 통계 카드 | grid grid-cols-2 md:grid-cols-4, 하단 배치 |

#### HTML 구현

```html
<section class="py-16 md:py-24 bg-dark-800">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

    <!-- 상단 2단 레이아웃 -->
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">

      <!-- 이미지 영역 -->
      <div class="relative">
        <!-- 장식 프레임 -->
        <div class="absolute -inset-4 border border-gold-500/20 rounded-lg -z-10"></div>

        <div class="aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src="/images/orchestra-group.jpg"
            alt="예산윈드오케스트라 단체 사진"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- 코너 장식 -->
        <div class="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2
                    border-gold-500/40"></div>
      </div>

      <!-- 텍스트 영역 -->
      <div>
        <span class="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
          About Us
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
          예산윈드오케스트라
        </h2>
        <p class="text-dark-200 leading-relaxed mb-4">
          예산윈드오케스트라는 1998년 창단하여 27년간 지역 문화 예술 발전에
          기여해 온 관악 오케스트라입니다.
        </p>
        <p class="text-dark-300 leading-relaxed mb-8">
          클래식부터 영화음악, 팝, 재즈에 이르기까지 다양한 장르의 음악을
          선보이며 지역 주민들에게 수준 높은 문화 향유 기회를 제공하고 있습니다.
          매년 정기연주회와 다양한 특별공연을 통해 관객과 소통하고 있습니다.
        </p>
        <a href="/about" class="btn-secondary">
          오케스트라 소개 보기
        </a>
      </div>

    </div>

    <!-- 통계 영역 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">

      <!-- 역사 -->
      <div class="text-center p-6 rounded-lg bg-dark-900/50 border border-dark-700">
        <span class="block text-4xl md:text-5xl font-bold text-gold-500 mb-2">27</span>
        <span class="block text-sm text-dark-300 uppercase tracking-wide">Years</span>
        <span class="block text-dark-200 mt-1">역사</span>
      </div>

      <!-- 단원 -->
      <div class="text-center p-6 rounded-lg bg-dark-900/50 border border-dark-700">
        <span class="block text-4xl md:text-5xl font-bold text-gold-500 mb-2">50+</span>
        <span class="block text-sm text-dark-300 uppercase tracking-wide">Members</span>
        <span class="block text-dark-200 mt-1">단원</span>
      </div>

      <!-- 공연 -->
      <div class="text-center p-6 rounded-lg bg-dark-900/50 border border-dark-700">
        <span class="block text-4xl md:text-5xl font-bold text-gold-500 mb-2">100+</span>
        <span class="block text-sm text-dark-300 uppercase tracking-wide">Concerts</span>
        <span class="block text-dark-200 mt-1">공연</span>
      </div>

      <!-- 관객 -->
      <div class="text-center p-6 rounded-lg bg-dark-900/50 border border-dark-700">
        <span class="block text-4xl md:text-5xl font-bold text-gold-500 mb-2">10K+</span>
        <span class="block text-sm text-dark-300 uppercase tracking-wide">Audience</span>
        <span class="block text-dark-200 mt-1">누적 관객</span>
      </div>

    </div>

  </div>
</section>
```

---

### 3.4 Gallery Preview Section (최근 갤러리)

#### 레이아웃

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                             GALLERY                                      │
│                           공연 갤러리                                     │
│                            ─────────                                     │
│                                                                          │
│   ┌───────────────────────────────────┐  ┌─────────────┐ ┌─────────────┐│
│   │                                   │  │             │ │             ││
│   │                                   │  │             │ │             ││
│   │          [큰 이미지]              │  │  [이미지]   │ │  [이미지]   ││
│   │                                   │  │             │ │             ││
│   │                                   │  ├─────────────┤ ├─────────────┤│
│   │                                   │  │             │ │             ││
│   │                                   │  │  [이미지]   │ │  [이미지]   ││
│   │                                   │  │             │ │             ││
│   └───────────────────────────────────┘  └─────────────┘ └─────────────┘│
│                                                                          │
│                           [갤러리 더보기 →]                               │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Background: bg-dark-900
Padding: py-16 md:py-24
```

#### 디자인 명세

| 요소 | 스타일 |
|------|--------|
| 갤러리 그리드 | Masonry 스타일, 비대칭 그리드 |
| 이미지 호버 | scale, 오버레이 + 아이콘 표시 |
| 이미지 비율 | 큰 이미지 aspect-[4/3], 작은 이미지 aspect-square |

#### HTML 구현

```html
<section class="py-16 md:py-24 bg-dark-900">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

    <!-- 섹션 헤더 -->
    <div class="text-center mb-12">
      <span class="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
        Gallery
      </span>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        공연 갤러리
      </h2>
      <div class="w-16 h-0.5 bg-gold-500 mx-auto"></div>
    </div>

    <!-- 갤러리 그리드 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

      <!-- 큰 이미지 (2x2) -->
      <div class="col-span-2 row-span-2">
        <a href="/gallery/1" class="group block relative aspect-[4/3] md:aspect-auto md:h-full
                                    rounded-lg overflow-hidden">
          <img
            src="/images/gallery/concert-1.jpg"
            alt="제46회 정기연주회"
            class="w-full h-full object-cover transition-transform duration-500
                   group-hover:scale-110"
          />
          <!-- 호버 오버레이 -->
          <div class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-10 h-10 text-gold-500 mx-auto mb-2" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              <span class="text-white text-sm">제46회 정기연주회</span>
            </div>
          </div>
        </a>
      </div>

      <!-- 작은 이미지 1 -->
      <div>
        <a href="/gallery/2" class="group block relative aspect-square rounded-lg overflow-hidden">
          <img
            src="/images/gallery/concert-2.jpg"
            alt="송년음악회"
            class="w-full h-full object-cover transition-transform duration-500
                   group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 flex items-center justify-center">
            <svg class="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </a>
      </div>

      <!-- 작은 이미지 2 -->
      <div>
        <a href="/gallery/3" class="group block relative aspect-square rounded-lg overflow-hidden">
          <img
            src="/images/gallery/concert-3.jpg"
            alt="신년음악회"
            class="w-full h-full object-cover transition-transform duration-500
                   group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 flex items-center justify-center">
            <svg class="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </a>
      </div>

      <!-- 작은 이미지 3 -->
      <div>
        <a href="/gallery/4" class="group block relative aspect-square rounded-lg overflow-hidden">
          <img
            src="/images/gallery/concert-4.jpg"
            alt="봄맞이 음악회"
            class="w-full h-full object-cover transition-transform duration-500
                   group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 flex items-center justify-center">
            <svg class="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </a>
      </div>

      <!-- 작은 이미지 4 -->
      <div>
        <a href="/gallery/5" class="group block relative aspect-square rounded-lg overflow-hidden">
          <img
            src="/images/gallery/concert-5.jpg"
            alt="여름 특별공연"
            class="w-full h-full object-cover transition-transform duration-500
                   group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 flex items-center justify-center">
            <svg class="w-8 h-8 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>
        </a>
      </div>

    </div>

    <!-- 더보기 링크 -->
    <div class="text-center mt-12">
      <a href="/gallery" class="inline-flex items-center gap-2 text-dark-200
                                hover:text-gold-500 font-medium transition-colors">
        갤러리 더보기
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>

  </div>
</section>
```

---

### 3.5 News & Notice Section (공지사항/소식)

#### 레이아웃

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   ┌───────────────────────────────┐    ┌───────────────────────────────┐│
│   │ 공지사항                 [+]  │    │ 오케스트라 소식          [+]  ││
│   │─────────────────────────────  │    │─────────────────────────────  ││
│   │                               │    │                               ││
│   │ 03.15 | 제47회 정기연주회 안내 │    │ 03.10 | 봄 시즌 단원 모집     ││
│   │ 03.10 | 신규 단원 모집 안내    │    │ 02.28 | 2024 연간 공연 일정   ││
│   │ 03.05 | 2024년 상반기 일정    │    │ 02.15 | 지휘자 인터뷰 영상    ││
│   │ 02.28 | 후원 안내             │    │ 02.01 | 단원 인터뷰: 플루트   ││
│   │ 02.20 | 연습실 이용 안내      │    │ 01.20 | 연습 현장 스케치      ││
│   │                               │    │                               ││
│   └───────────────────────────────┘    └───────────────────────────────┘│
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

Background: bg-dark-800
Padding: py-16 md:py-24
```

#### 디자인 명세

| 요소 | 스타일 |
|------|--------|
| 레이아웃 | grid lg:grid-cols-2, gap-8 |
| 리스트 카드 | bg-dark-900/50, border, rounded-lg |
| 리스트 아이템 | 날짜 + 제목, 호버 시 골드 컬러 |
| 더보기 버튼 | 카드 헤더 우측 |

#### HTML 구현

```html
<section class="py-16 md:py-24 bg-dark-800">
  <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

    <div class="grid lg:grid-cols-2 gap-8">

      <!-- 공지사항 -->
      <div class="bg-dark-900/50 border border-dark-700 rounded-lg p-6">

        <!-- 헤더 -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            공지사항
          </h2>
          <a href="/board/notice" class="text-sm text-dark-400 hover:text-gold-500 transition-colors">
            더보기 +
          </a>
        </div>

        <!-- 리스트 -->
        <ul class="space-y-1">
          <li>
            <a href="/board/notice/1" class="flex items-center gap-4 py-3 px-2 -mx-2
                                             rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">03.15</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                제47회 정기연주회 안내
              </span>
              <span class="ml-auto flex-shrink-0">
                <span class="inline-block px-2 py-0.5 bg-gold-500/10 text-gold-500 text-xs rounded">NEW</span>
              </span>
            </a>
          </li>
          <li>
            <a href="/board/notice/2" class="flex items-center gap-4 py-3 px-2 -mx-2
                                             rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">03.10</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                2024년 신규 단원 모집 안내
              </span>
            </a>
          </li>
          <li>
            <a href="/board/notice/3" class="flex items-center gap-4 py-3 px-2 -mx-2
                                             rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">03.05</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                2024년 상반기 연습 일정 안내
              </span>
            </a>
          </li>
          <li>
            <a href="/board/notice/4" class="flex items-center gap-4 py-3 px-2 -mx-2
                                             rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">02.28</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                후원회원 모집 및 후원 안내
              </span>
            </a>
          </li>
          <li>
            <a href="/board/notice/5" class="flex items-center gap-4 py-3 px-2 -mx-2
                                             rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">02.20</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                연습실 이용 안내 및 주의사항
              </span>
            </a>
          </li>
        </ul>

      </div>

      <!-- 오케스트라 소식 -->
      <div class="bg-dark-900/50 border border-dark-700 rounded-lg p-6">

        <!-- 헤더 -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            오케스트라 소식
          </h2>
          <a href="/board/news" class="text-sm text-dark-400 hover:text-gold-500 transition-colors">
            더보기 +
          </a>
        </div>

        <!-- 리스트 -->
        <ul class="space-y-1">
          <li>
            <a href="/board/news/1" class="flex items-center gap-4 py-3 px-2 -mx-2
                                           rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">03.10</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                2024 봄 시즌 신규 단원 모집
              </span>
              <span class="ml-auto flex-shrink-0">
                <span class="inline-block px-2 py-0.5 bg-gold-500/10 text-gold-500 text-xs rounded">NEW</span>
              </span>
            </a>
          </li>
          <li>
            <a href="/board/news/2" class="flex items-center gap-4 py-3 px-2 -mx-2
                                           rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">02.28</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                2024 연간 공연 일정 발표
              </span>
            </a>
          </li>
          <li>
            <a href="/board/news/3" class="flex items-center gap-4 py-3 px-2 -mx-2
                                           rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">02.15</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                상임지휘자 인터뷰 영상 공개
              </span>
            </a>
          </li>
          <li>
            <a href="/board/news/4" class="flex items-center gap-4 py-3 px-2 -mx-2
                                           rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">02.01</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                단원 인터뷰 시리즈: 플루트 파트
              </span>
            </a>
          </li>
          <li>
            <a href="/board/news/5" class="flex items-center gap-4 py-3 px-2 -mx-2
                                           rounded hover:bg-dark-800/50 transition-colors group">
              <span class="text-dark-400 text-sm font-medium w-16 flex-shrink-0">01.20</span>
              <span class="text-dark-100 group-hover:text-gold-500 transition-colors truncate">
                새해 첫 합주 연습 현장 스케치
              </span>
            </a>
          </li>
        </ul>

      </div>

    </div>

  </div>
</section>
```

---

## 4. 반응형 대응

### 브레이크포인트별 변화

| 섹션 | 모바일 (< 768px) | 태블릿 (768px+) | 데스크탑 (1024px+) |
|------|------------------|-----------------|-------------------|
| Hero | 텍스트 작게, 세로 버튼 배치 | 텍스트 중간, 가로 버튼 | 큰 텍스트, 넓은 여백 |
| 공연 카드 | 1열 | 2열 | 3열 |
| About | 세로 배치 (이미지 위) | 세로 배치 | 가로 2단 |
| 갤러리 | 2x3 그리드 | 4열 그리드 | 4열 비대칭 |
| 뉴스 | 세로 배치 | 세로 배치 | 가로 2단 |

### 모바일 특화 고려사항

1. **터치 타겟**: 최소 44x44px 클릭 영역
2. **스크롤**: 수평 스크롤 카드 (선택적)
3. **이미지**: 더 작은 aspect ratio 적용
4. **텍스트**: line-clamp로 줄 제한

---

## 5. 인터랙션 및 애니메이션

### 스크롤 애니메이션

```javascript
// Intersection Observer를 사용한 스크롤 애니메이션
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

### CSS 애니메이션

```css
/* 페이드 인 업 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease forwards;
}

/* 순차적 딜레이 */
.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
```

---

## 6. 이미지 에셋 목록

| 용도 | 파일명 | 권장 크기 | 비고 |
|------|--------|-----------|------|
| 히어로 배경 | hero-bg.jpg | 1920x1080 | 어두운 톤, 오케스트라 연주 장면 |
| 단체 사진 | orchestra-group.jpg | 1200x900 | About 섹션용 |
| 공연 포스터 | concert-poster-{n}.jpg | 600x800 | 3:4 비율 |
| 갤러리 이미지 | gallery/concert-{n}.jpg | 800x800 | 정사각형 또는 4:3 |
| 로고 | logo.svg | - | SVG 벡터 |

---

## 7. 메타 정보

### SEO
```html
<title>예산윈드오케스트라 - 음악으로 하나되는 예산</title>
<meta name="description" content="예산윈드오케스트라 공식 웹사이트. 공연 일정, 갤러리, 오케스트라 소개 등 다양한 정보를 확인하세요.">
<meta name="keywords" content="예산윈드오케스트라, 관악 오케스트라, 예산군, 클래식 공연, 윈드 앙상블">
```

### Open Graph
```html
<meta property="og:title" content="예산윈드오케스트라">
<meta property="og:description" content="음악으로 하나되는 예산, 예산윈드오케스트라가 함께합니다.">
<meta property="og:image" content="/images/og-image.jpg">
<meta property="og:url" content="https://yesanwind.or.kr">
<meta property="og:type" content="website">
```

---

*Last Updated: 2024-01-21*
*Version: 1.0*
