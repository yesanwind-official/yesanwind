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
import { createClient } from '@/lib/supabase/server';
import type { PostCategory } from '@/types/database';

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

// --- Types ---

interface HeroContent {
  title: string;
  titleEn: string;
  subtitle: string;
  backgroundImage: string;
}

interface StatItem {
  value: string;
  unit: string;
  label: string;
  sublabel: string;
}

interface AboutContent {
  description1: string;
  description2: string;
  stats: StatItem[];
  groupImage: string;
}

interface ConcertItem {
  id: string;
  title: string;
  concert_type: string;
  date: string;
  time: string;
  venue: string;
  poster_url: string | null;
  status: string;
}

interface GalleryItem {
  id: string;
  title: string;
  cover_image: string | null;
  first_photo_url: string | null;
}

interface PostItem {
  id: string;
  title: string;
  category: string;
  published_at: string;
  is_pinned: boolean;
}

// --- Fallback Data ---

const fallbackHero: HeroContent = {
  title: 'YESAN WIND',
  titleEn: 'ORCHESTRA',
  subtitle: '음악으로 하나되는 예산, 예산윈드오케스트라가 함께합니다',
  backgroundImage: '/images/orchestra-group.jpg',
};

const fallbackAbout: AboutContent = {
  description1: '예산윈드오케스트라는 1998년 창단하여 27년간 지역 문화 예술 발전에 기여해 온 관악 오케스트라입니다.',
  description2: '클래식부터 영화음악, 팝, 재즈에 이르기까지 다양한 장르의 음악을 선보이며 지역 주민들에게 수준 높은 문화 향유 기회를 제공하고 있습니다. 매년 정기연주회와 다양한 특별공연을 통해 관객과 소통하고 있습니다.',
  stats: [
    { value: '27', unit: '', label: 'Years', sublabel: '역사' },
    { value: '50', unit: '+', label: 'Members', sublabel: '단원' },
    { value: '100', unit: '+', label: 'Concerts', sublabel: '공연' },
    { value: '10K', unit: '+', label: 'Audience', sublabel: '누적 관객' },
  ],
  groupImage: '/images/orchestra-group.jpg',
};

// --- Data Fetchers ---

async function getHeroContent(supabase: Awaited<ReturnType<typeof createClient>>): Promise<HeroContent> {
  if (!supabase) return fallbackHero;
  try {
    const { data } = await supabase
      .from('orchestra_info')
      .select('metadata')
      .eq('key', 'landing_hero')
      .single();
    if (data?.metadata) {
      const meta = data.metadata as unknown as HeroContent;
      return {
        title: meta.title || fallbackHero.title,
        titleEn: meta.titleEn || fallbackHero.titleEn,
        subtitle: meta.subtitle || fallbackHero.subtitle,
        backgroundImage: meta.backgroundImage || fallbackHero.backgroundImage,
      };
    }
  } catch { /* fallback */ }
  return fallbackHero;
}

async function getAboutContent(supabase: Awaited<ReturnType<typeof createClient>>): Promise<AboutContent> {
  if (!supabase) return fallbackAbout;
  try {
    const { data } = await supabase
      .from('orchestra_info')
      .select('metadata')
      .eq('key', 'landing_about')
      .single();
    if (data?.metadata) {
      const meta = data.metadata as unknown as AboutContent;
      return {
        description1: meta.description1 || fallbackAbout.description1,
        description2: meta.description2 || fallbackAbout.description2,
        stats: meta.stats?.length ? meta.stats : fallbackAbout.stats,
        groupImage: meta.groupImage || fallbackAbout.groupImage,
      };
    }
  } catch { /* fallback */ }
  return fallbackAbout;
}

async function getUpcomingConcerts(supabase: Awaited<ReturnType<typeof createClient>>): Promise<ConcertItem[]> {
  if (!supabase) return [];
  try {
    const { data } = await supabase
      .from('concerts')
      .select('id, title, concert_type, date, time, venue, poster_url, status')
      .eq('status', 'upcoming')
      .order('date', { ascending: true })
      .limit(3);
    return (data as ConcertItem[]) || [];
  } catch { return []; }
}

async function getRecentGallery(supabase: Awaited<ReturnType<typeof createClient>>): Promise<GalleryItem[]> {
  if (!supabase) return [];
  try {
    const { data: albums } = await supabase
      .from('photo_albums')
      .select('id, title, cover_image')
      .order('created_at', { ascending: false })
      .limit(5);
    if (!albums?.length) return [];

    // 각 앨범의 첫 사진 가져오기
    const items: GalleryItem[] = [];
    for (const album of albums) {
      let firstPhotoUrl: string | null = null;
      if (!album.cover_image) {
        const { data: photos } = await supabase
          .from('gallery_photos')
          .select('image_url')
          .eq('album_id', album.id)
          .order('display_order', { ascending: true })
          .limit(1);
        firstPhotoUrl = photos?.[0]?.image_url || null;
      }
      items.push({
        id: album.id,
        title: album.title,
        cover_image: album.cover_image,
        first_photo_url: firstPhotoUrl,
      });
    }
    return items;
  } catch { return []; }
}

async function getRecentPosts(supabase: Awaited<ReturnType<typeof createClient>>, category: PostCategory): Promise<PostItem[]> {
  if (!supabase) return [];
  try {
    const { data } = await supabase
      .from('posts')
      .select('id, title, category, published_at, is_pinned')
      .eq('category', category)
      .order('is_pinned', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(5);
    return (data as PostItem[]) || [];
  } catch { return []; }
}

// --- Helpers ---

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

function getConcertTypeLabel(type: string): string {
  return type === 'regular' ? '정기연주회' : '특별연주회';
}

// --- Page ---

export default async function HomePage() {
  const supabase = await createClient();

  const [hero, about, concerts, gallery, notices, news] = await Promise.all([
    getHeroContent(supabase),
    getAboutContent(supabase),
    getUpcomingConcerts(supabase),
    getRecentGallery(supabase),
    getRecentPosts(supabase, 'notice'),
    getRecentPosts(supabase, 'press'),
  ]);

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
                preload="auto"
                poster={hero.backgroundImage}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              >
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
              </video>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 -z-10"
                style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            {/* Title */}
            <h1 className="mb-6 animate-fade-in-up">
              <span className="block font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide leading-tight text-gradient-gold">
                {hero.title}
              </span>
              <span className="block font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider mt-2 opacity-0 animate-fade-in-up delay-100">
                {hero.titleEn}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/80 mt-6 leading-relaxed opacity-0 animate-fade-in-up delay-200">
              {hero.subtitle}
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

            {concerts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {concerts.map((concert) => {
                  const date = formatDate(concert.date);
                  return (
                    <article
                      key={concert.id}
                      className="group bg-dark-800 border border-dark-600 rounded-lg overflow-hidden transition-all duration-300 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5"
                    >
                      {/* Poster Image */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-dark-700 light:bg-gray-100">
                        {concert.poster_url ? (
                          <Image
                            src={concert.poster_url}
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
                          {getConcertTypeLabel(concert.concert_type)}
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
            ) : (
              <div className="text-center py-12 text-dark-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>현재 예정된 공연이 없습니다.</p>
              </div>
            )}

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
                    src={about.groupImage}
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
                  {about.description1}
                </p>
                <p className="text-dark-300 leading-relaxed mb-8">
                  {about.description2}
                </p>
                <Link href="/about" className="btn-secondary">
                  오케스트라 소개 보기
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {about.stats.map((stat) => (
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

            {gallery.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {/* Large Image (2x2) */}
                <div className="col-span-2 row-span-2">
                  <Link
                    href={`/gallery/${gallery[0].id}`}
                    className="group block relative aspect-[4/3] md:aspect-auto md:h-full rounded-lg overflow-hidden bg-dark-800 light:bg-gray-100"
                  >
                    {(gallery[0].cover_image || gallery[0].first_photo_url) ? (
                      <Image
                        src={gallery[0].cover_image || gallery[0].first_photo_url!}
                        alt={gallery[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-dark-500 light:text-dark-400">
                        <Calendar className="w-16 h-16" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <ZoomIn className="w-10 h-10 text-gold-500 mx-auto mb-2" />
                        <span className="text-white light:text-dark-100 text-sm">{gallery[0].title}</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Small Images */}
                {gallery.slice(1).map((item) => (
                  <div key={item.id}>
                    <Link
                      href={`/gallery/${item.id}`}
                      className="group block relative aspect-square rounded-lg overflow-hidden bg-dark-800 light:bg-gray-100"
                    >
                      {(item.cover_image || item.first_photo_url) ? (
                        <Image
                          src={item.cover_image || item.first_photo_url!}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-dark-600 light:text-dark-400">
                          <Calendar className="w-8 h-8" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-gold-500" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-dark-400">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>갤러리 사진이 없습니다.</p>
              </div>
            )}

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

                {notices.length > 0 ? (
                  <ul className="space-y-1">
                    {notices.map((notice, index) => (
                      <li key={notice.id}>
                        <Link
                          href={`/board/notice/${notice.id}`}
                          className="flex items-center gap-4 py-3 px-2 -mx-2 rounded hover:bg-dark-800/50 transition-colors group"
                        >
                          <span className="text-dark-400 text-sm font-medium w-14 flex-shrink-0">
                            {formatShortDate(notice.published_at)}
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
                ) : (
                  <p className="text-dark-400 text-sm text-center py-8">등록된 공지사항이 없습니다.</p>
                )}
              </div>

              {/* News */}
              <div className="bg-dark-900/50 border border-dark-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white light:text-dark-100 flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-gold-500" />
                    언론보도
                  </h2>
                  <Link
                    href="/board/news"
                    className="text-sm text-dark-400 hover:text-gold-500 transition-colors"
                  >
                    더보기 +
                  </Link>
                </div>

                {news.length > 0 ? (
                  <ul className="space-y-1">
                    {news.map((item, index) => (
                      <li key={item.id}>
                        <Link
                          href={`/board/news/${item.id}`}
                          className="flex items-center gap-4 py-3 px-2 -mx-2 rounded hover:bg-dark-800/50 transition-colors group"
                        >
                          <span className="text-dark-400 text-sm font-medium w-14 flex-shrink-0">
                            {formatShortDate(item.published_at)}
                          </span>
                          <span className="text-dark-100 group-hover:text-gold-500 transition-colors truncate flex-1">
                            {item.title}
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
                ) : (
                  <p className="text-dark-400 text-sm text-center py-8">등록된 소식이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
