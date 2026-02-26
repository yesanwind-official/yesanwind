import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Calendar,
  ArrowRight,
  ChevronDown,
  Megaphone,
  Newspaper,
  ZoomIn,
} from 'lucide-react';
import { Header } from '@/components/layouts/header';
import { Footer } from '@/components/layouts/footer';
import type { Concert, Notice, Gallery } from '@/types';

export const metadata: Metadata = {
  title: '예산윈드오케스트라 - 음악으로 하나되는 예산',
  description:
    '예산윈드오케스트라 공식 웹사이트. 공연 일정, 갤러리, 오케스트라 소개 등 다양한 정보를 확인하세요.',
  keywords: [
    '예산윈드오케스트라',
    '관악 오케스트라',
    '예산군',
    '클래식 공연',
    '윈드 앙상블',
  ],
  openGraph: {
    title: '예산윈드오케스트라',
    description: '음악으로 하나되는 예산, 예산윈드오케스트라가 함께합니다.',
    type: 'website',
  },
};

// Mock Data - 추후 Supabase 연동 예정
const upcomingConcerts: (Concert & { categoryLabel: string; statusLabel: string })[] = [
  {
    id: '1',
    title: '제47회 정기연주회 - 봄의 선율',
    subtitle: '새로운 시작을 알리는 봄의 하모니',
    category: 'regular',
    categoryLabel: '정기연주회',
    date: '2025-03-15',
    time: '19:30',
    venue: '예산문화예술회관',
    venue_address: '충남 예산군 예산읍',
    poster_image: '/images/concert-poster-1.jpg',
    status: 'upcoming',
    statusLabel: '예매중',
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    title: '봄의 향연 - 특별 연주회',
    subtitle: '지역 예술가와 함께하는 특별한 무대',
    category: 'special',
    categoryLabel: '특별연주회',
    date: '2025-04-20',
    time: '15:00',
    venue: '예산문화예술회관',
    venue_address: '충남 예산군 예산읍',
    poster_image: '/images/concert-poster-2.jpg',
    status: 'upcoming',
    statusLabel: '예매예정',
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    title: '제48회 정기연주회 - 여름밤의 세레나데',
    subtitle: '한여름 밤의 클래식 선물',
    category: 'regular',
    categoryLabel: '정기연주회',
    date: '2025-06-21',
    time: '19:00',
    venue: '예산문화예술회관',
    venue_address: '충남 예산군 예산읍',
    poster_image: '/images/concert-poster-3.jpg',
    status: 'upcoming',
    statusLabel: '예매예정',
    created_at: '',
    updated_at: '',
  },
];

const recentNotices: (Notice & { categoryLabel: string })[] = [
  {
    id: '1',
    title: '제47회 정기연주회 안내',
    content: '',
    category: 'notice',
    categoryLabel: '공지사항',
    author_id: '',
    is_pinned: true,
    view_count: 125,
    created_at: '2025-01-15',
    updated_at: '',
  },
  {
    id: '2',
    title: '2025년 신규 단원 모집 안내',
    content: '',
    category: 'recruitment',
    categoryLabel: '모집',
    author_id: '',
    is_pinned: true,
    view_count: 89,
    created_at: '2025-01-10',
    updated_at: '',
  },
  {
    id: '3',
    title: '2025년 상반기 연습 일정 안내',
    content: '',
    category: 'notice',
    categoryLabel: '공지사항',
    author_id: '',
    is_pinned: false,
    view_count: 67,
    created_at: '2025-01-05',
    updated_at: '',
  },
  {
    id: '4',
    title: '후원회원 모집 및 후원 안내',
    content: '',
    category: 'notice',
    categoryLabel: '공지사항',
    author_id: '',
    is_pinned: false,
    view_count: 45,
    created_at: '2025-01-02',
    updated_at: '',
  },
  {
    id: '5',
    title: '연습실 이용 안내 및 주의사항',
    content: '',
    category: 'notice',
    categoryLabel: '공지사항',
    author_id: '',
    is_pinned: false,
    view_count: 32,
    created_at: '2024-12-28',
    updated_at: '',
  },
];

const recentNews: (Notice & { categoryLabel: string })[] = [
  {
    id: '1',
    title: '2025 봄 시즌 신규 단원 모집',
    content: '',
    category: 'news',
    categoryLabel: '소식',
    author_id: '',
    is_pinned: false,
    view_count: 78,
    created_at: '2025-01-12',
    updated_at: '',
  },
  {
    id: '2',
    title: '2025 연간 공연 일정 발표',
    content: '',
    category: 'news',
    categoryLabel: '소식',
    author_id: '',
    is_pinned: false,
    view_count: 112,
    created_at: '2025-01-08',
    updated_at: '',
  },
  {
    id: '3',
    title: '상임지휘자 인터뷰 영상 공개',
    content: '',
    category: 'news',
    categoryLabel: '소식',
    author_id: '',
    is_pinned: false,
    view_count: 156,
    created_at: '2025-01-03',
    updated_at: '',
  },
  {
    id: '4',
    title: '단원 인터뷰 시리즈: 플루트 파트',
    content: '',
    category: 'news',
    categoryLabel: '소식',
    author_id: '',
    is_pinned: false,
    view_count: 89,
    created_at: '2024-12-25',
    updated_at: '',
  },
  {
    id: '5',
    title: '새해 첫 합주 연습 현장 스케치',
    content: '',
    category: 'news',
    categoryLabel: '소식',
    author_id: '',
    is_pinned: false,
    view_count: 67,
    created_at: '2024-12-20',
    updated_at: '',
  },
];

const galleryImages: Gallery[] = [
  {
    id: '1',
    title: '제46회 정기연주회',
    date: '2024-11-15',
    images: [{ id: '1', url: '/images/gallery/concert-1.jpg', order: 1 }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    title: '송년음악회',
    date: '2024-12-20',
    images: [{ id: '2', url: '/images/gallery/concert-2.jpg', order: 1 }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    title: '신년음악회',
    date: '2025-01-05',
    images: [{ id: '3', url: '/images/gallery/concert-3.jpg', order: 1 }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    title: '봄맞이 음악회',
    date: '2024-04-10',
    images: [{ id: '4', url: '/images/gallery/concert-4.jpg', order: 1 }],
    created_at: '',
    updated_at: '',
  },
  {
    id: '5',
    title: '여름 특별공연',
    date: '2024-07-20',
    images: [{ id: '5', url: '/images/gallery/concert-5.jpg', order: 1 }],
    created_at: '',
    updated_at: '',
  },
];

// 날짜 포맷 함수
function formatDate(dateString: string): { month: string; day: string; full: string } {
  const date = new Date(dateString);
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return {
    month: months[date.getMonth()],
    day: String(date.getDate()).padStart(2, '0'),
    full: `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`,
  };
}

function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/60 to-[#0a0a0a]/90 z-10" />
            {/* Video Background */}
            <div className="w-full h-full bg-[#1a1a1a]">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="/images/orchestra-group.jpg"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              >
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
                <source src="/videos/hero-bg.webm" type="video/webm" />
                {/* 비디오 로드 실패 시 이미지 폴백 */}
              </video>
              {/* 비디오 미지원 브라우저용 이미지 폴백 */}
              <div className="absolute inset-0 bg-[url('/images/orchestra-group.jpg')] bg-cover bg-center bg-no-repeat opacity-60 -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="mb-6 animate-fade-in-up">
              <span className="block font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide leading-tight text-gradient-gold">
                YESAN WIND
              </span>
              <span className="block font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider mt-2 opacity-0 animate-fade-in-up delay-100">
                ORCHESTRA
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 mt-6 leading-relaxed opacity-0 animate-fade-in-up delay-200">
              음악으로 하나되는 예산,
              <br className="md:hidden" />
              예산윈드오케스트라가 함께합니다
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0 animate-fade-in-up delay-300">
              <Link href="/concerts" className="btn-primary min-w-[160px]">
                공연 일정 보기
              </Link>
              <Link href="/about" className="btn-secondary min-w-[160px]">
                오케스트라 소개
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <a
            href="#upcoming"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold-500/70 hover:text-gold-500 transition-colors animate-bounce"
            aria-label="아래로 스크롤"
          >
            <ChevronDown className="w-8 h-8" />
          </a>
        </section>

        {/* Upcoming Concerts Section */}
        <section id="upcoming" className="py-16 md:py-24 bg-dark-900">
          <div className="container-custom">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
                Upcoming Concert
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white light:text-dark-100 mb-4">
                다가오는 공연
              </h2>
              <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
            </div>

            {/* Concert Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {upcomingConcerts.map((concert) => {
                const date = formatDate(concert.date);
                return (
                  <article
                    key={concert.id}
                    className="group bg-dark-800 border border-dark-600 rounded-lg overflow-hidden transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5"
                  >
                    {/* Poster Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-dark-700 light:bg-gray-100">
                      {concert.poster_image ? (
                        <Image
                          src={concert.poster_image}
                          alt={`${concert.title} 포스터`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-dark-500 light:text-dark-400">
                          <Calendar className="w-16 h-16" />
                        </div>
                      )}

                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 bg-gold-500 text-dark-950 px-3 py-1.5 rounded text-sm font-semibold">
                        {date.full}
                      </div>

                      {/* Status Badge */}
                      <div
                        className={`absolute top-4 right-4 px-2.5 py-1 rounded text-xs font-medium ${
                          concert.statusLabel === '예매중'
                            ? 'bg-green-500/90 text-white light:text-dark-100'
                            : 'bg-dark-600 text-dark-200'
                        }`}
                      >
                        {concert.statusLabel}
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white light:text-dark-100 font-medium flex items-center gap-2">
                          자세히 보기
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <span className="inline-block text-gold-500 text-sm font-medium mb-2">
                        {concert.categoryLabel}
                      </span>
                      <h3 className="text-lg font-semibold text-white light:text-dark-100 mb-2 line-clamp-2 group-hover:text-gold-400 transition-colors">
                        {concert.title}
                      </h3>
                      <p className="text-dark-300 text-sm flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-dark-400" />
                        {concert.venue}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                href="/concerts"
                className="inline-flex items-center gap-2 text-dark-200 hover:text-gold-500 font-medium transition-colors"
              >
                전체 공연 보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-dark-800">
          <div className="container-custom">
            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
              {/* Image */}
              <div className="relative order-2 lg:order-1">
                {/* Decorative Frame */}
                <div className="absolute -inset-4 border border-gold-500/20 rounded-lg -z-10" />

                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-dark-700">
                  <Image
                    src="/images/orchestra-group.jpg"
                    alt="예산윈드오케스트라 단체 사진"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Corner Decoration */}
                <div className="absolute -bottom-3 -right-3 w-24 h-24 border-r-2 border-b-2 border-gold-500/40" />
              </div>

              {/* Text */}
              <div className="order-1 lg:order-2">
                <span className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
                  About Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white light:text-dark-100 mb-6">
                  예산윈드오케스트라
                </h2>
                <p className="text-dark-200 leading-relaxed mb-4">
                  예산윈드오케스트라는 1998년 창단하여 27년간 지역 문화 예술 발전에
                  기여해 온 관악 오케스트라입니다.
                </p>
                <p className="text-dark-300 leading-relaxed mb-8">
                  클래식부터 영화음악, 팝, 재즈에 이르기까지 다양한 장르의 음악을
                  선보이며 지역 주민들에게 수준 높은 문화 향유 기회를 제공하고 있습니다.
                  매년 정기연주회와 다양한 특별공연을 통해 관객과 소통하고 있습니다.
                </p>
                <Link href="/about" className="btn-secondary">
                  오케스트라 소개 보기
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '27', unit: '', label: 'Years', sublabel: '역사' },
                { value: '50', unit: '+', label: 'Members', sublabel: '단원' },
                { value: '100', unit: '+', label: 'Concerts', sublabel: '공연' },
                { value: '10K', unit: '+', label: 'Audience', sublabel: '누적 관객' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-lg bg-dark-900/50 border border-dark-700"
                >
                  <span className="block text-4xl md:text-5xl font-bold text-gold-500 mb-2">
                    {stat.value}
                    {stat.unit}
                  </span>
                  <span className="block text-sm text-dark-300 uppercase tracking-wide">
                    {stat.label}
                  </span>
                  <span className="block text-dark-200 mt-1">{stat.sublabel}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24 bg-dark-900">
          <div className="container-custom">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
                Gallery
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white light:text-dark-100 mb-4">
                공연 갤러리
              </h2>
              <div className="w-16 h-0.5 bg-gold-500 mx-auto" />
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {/* Large Image (2x2) */}
              <div className="col-span-2 row-span-2">
                <Link
                  href={`/gallery/${galleryImages[0].id}`}
                  className="group block relative aspect-[4/3] md:aspect-auto md:h-full rounded-lg overflow-hidden bg-dark-800 light:bg-gray-100"
                >
                  {galleryImages[0].images[0]?.url ? (
                    <Image
                      src={galleryImages[0].images[0].url}
                      alt={galleryImages[0].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-dark-500 light:text-dark-400">
                      <Calendar className="w-16 h-16" />
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <ZoomIn className="w-10 h-10 text-gold-500 mx-auto mb-2" />
                      <span className="text-white light:text-dark-100 text-sm">{galleryImages[0].title}</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Small Images */}
              {galleryImages.slice(1).map((gallery) => (
                <div key={gallery.id}>
                  <Link
                    href={`/gallery/${gallery.id}`}
                    className="group block relative aspect-square rounded-lg overflow-hidden bg-dark-800 light:bg-gray-100"
                  >
                    {gallery.images[0]?.url ? (
                      <Image
                        src={gallery.images[0].url}
                        alt={gallery.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-dark-600 light:text-dark-400">
                        <Calendar className="w-8 h-8" />
                      </div>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-gold-500" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-dark-200 hover:text-gold-500 font-medium transition-colors"
              >
                갤러리 더보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* News & Notice Section */}
        <section className="py-16 md:py-24 bg-dark-800">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Notices */}
              <div className="bg-dark-900/50 border border-dark-700 rounded-lg p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white light:text-dark-100 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-gold-500" />
                    공지사항
                  </h2>
                  <Link
                    href="/board/notice"
                    className="text-sm text-dark-400 hover:text-gold-500 transition-colors"
                  >
                    더보기 +
                  </Link>
                </div>

                {/* List */}
                <ul className="space-y-1">
                  {recentNotices.map((notice, index) => (
                    <li key={notice.id}>
                      <Link
                        href={`/board/notice/${notice.id}`}
                        className="flex items-center gap-4 py-3 px-2 -mx-2 rounded hover:bg-dark-800/50 transition-colors group"
                      >
                        <span className="text-dark-400 text-sm font-medium w-14 flex-shrink-0">
                          {formatShortDate(notice.created_at)}
                        </span>
                        <span className="text-dark-100 group-hover:text-gold-500 transition-colors truncate flex-1">
                          {notice.title}
                        </span>
                        {index < 2 && (
                          <span className="ml-auto flex-shrink-0">
                            <span className="inline-block px-2 py-0.5 bg-gold-500/10 text-gold-500 text-xs rounded">
                              NEW
                            </span>
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* News */}
              <div className="bg-dark-900/50 border border-dark-700 rounded-lg p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white light:text-dark-100 flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-gold-500" />
                    오케스트라 소식
                  </h2>
                  <Link
                    href="/board/news"
                    className="text-sm text-dark-400 hover:text-gold-500 transition-colors"
                  >
                    더보기 +
                  </Link>
                </div>

                {/* List */}
                <ul className="space-y-1">
                  {recentNews.map((news, index) => (
                    <li key={news.id}>
                      <Link
                        href={`/board/news/${news.id}`}
                        className="flex items-center gap-4 py-3 px-2 -mx-2 rounded hover:bg-dark-800/50 transition-colors group"
                      >
                        <span className="text-dark-400 text-sm font-medium w-14 flex-shrink-0">
                          {formatShortDate(news.created_at)}
                        </span>
                        <span className="text-dark-100 group-hover:text-gold-500 transition-colors truncate flex-1">
                          {news.title}
                        </span>
                        {index < 1 && (
                          <span className="ml-auto flex-shrink-0">
                            <span className="inline-block px-2 py-0.5 bg-gold-500/10 text-gold-500 text-xs rounded">
                              NEW
                            </span>
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
