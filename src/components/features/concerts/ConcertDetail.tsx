'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Ticket,
  ExternalLink,
  Music,
  User,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ConcertDetail as ConcertDetailType } from '@/types/concert';
import type { ConcertStatus } from '@/types';
import { ProgramList } from './ProgramList';

interface ConcertDetailProps {
  concert: ConcertDetailType;
  className?: string;
}

// 상태별 배지 스타일
const statusBadgeStyles: Record<ConcertStatus, string> = {
  upcoming: 'bg-gold-500 text-dark-950',
  ongoing: 'bg-green-500 text-white',
  completed: 'bg-dark-500 text-dark-200',
  cancelled: 'bg-red-500/80 text-white',
};

// 날짜 포맷 함수
function formatFullDate(dateString: string): string {
  const date = new Date(dateString);
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[date.getDay()];
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${dayName})`;
}

function ConcertDetailComponent({ concert, className }: ConcertDetailProps) {
  const badgeStyle = statusBadgeStyles[concert.status];
  const statusLabel =
    concert.status === 'upcoming'
      ? '예매중'
      : concert.status === 'completed'
        ? '종료'
        : concert.status === 'ongoing'
          ? '공연중'
          : '취소';

  return (
    <div className={cn('', className)}>
      {/* 뒤로가기 링크 */}
      <Link
        href="/concerts"
        className="inline-flex items-center gap-2 text-dark-300 hover:text-gold-500 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>공연 목록으로</span>
      </Link>

      {/* 메인 컨텐츠 */}
      <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-12">
        {/* 포스터 이미지 */}
        <div className="relative">
          <div className="sticky top-24">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-dark-800 border border-dark-600">
              {concert.poster_image ? (
                <Image
                  src={concert.poster_image}
                  alt={concert.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-dark-500">
                  <Music className="w-24 h-24" />
                </div>
              )}

              {/* 상태 배지 */}
              <div
                className={cn(
                  'absolute top-4 right-4 px-3 py-1.5 rounded text-sm font-semibold',
                  badgeStyle
                )}
              >
                {statusLabel}
              </div>
            </div>
          </div>
        </div>

        {/* 공연 정보 */}
        <div>
          {/* 카테고리 */}
          <span className="inline-block text-gold-500 text-sm font-medium tracking-wide uppercase mb-3">
            {concert.category === 'regular'
              ? 'Regular Concert'
              : concert.category === 'special'
                ? 'Special Concert'
                : concert.category === 'festival'
                  ? 'Festival'
                  : 'Concert'}
          </span>

          {/* 제목 */}
          <h1 className="text-3xl md:text-4xl font-bold text-white light:text-dark-100 mb-3">{concert.title}</h1>

          {/* 부제목 */}
          {concert.subtitle && (
            <p className="text-xl text-dark-200 mb-6">{concert.subtitle}</p>
          )}

          {/* 정보 카드 */}
          <div className="bg-dark-800 border border-dark-600 rounded-lg p-6 mb-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* 날짜 */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gold-500 mt-0.5" />
                <div>
                  <p className="text-sm text-dark-400 mb-1">일시</p>
                  <p className="text-white light:text-dark-100 font-medium">{formatFullDate(concert.date)}</p>
                </div>
              </div>

              {/* 시간 */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-500 mt-0.5" />
                <div>
                  <p className="text-sm text-dark-400 mb-1">시간</p>
                  <p className="text-white light:text-dark-100 font-medium">
                    {concert.time}
                    {concert.end_time && ` ~ ${concert.end_time}`}
                  </p>
                </div>
              </div>

              {/* 장소 */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="w-5 h-5 text-gold-500 mt-0.5" />
                <div>
                  <p className="text-sm text-dark-400 mb-1">장소</p>
                  <p className="text-white light:text-dark-100 font-medium">{concert.venue}</p>
                  {concert.venue_address && (
                    <p className="text-dark-300 text-sm mt-1">{concert.venue_address}</p>
                  )}
                </div>
              </div>

              {/* 티켓 정보 */}
              {(concert.ticket_info || concert.ticket_price) && (
                <div className="flex items-start gap-3 sm:col-span-2">
                  <Ticket className="w-5 h-5 text-gold-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-dark-400 mb-1">티켓</p>
                    <p className="text-white light:text-dark-100 font-medium">
                      {concert.ticket_price || concert.ticket_info}
                    </p>
                    {concert.ticket_info && concert.ticket_price && (
                      <p className="text-dark-300 text-sm mt-1">{concert.ticket_info}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CTA 버튼 */}
            {concert.status === 'upcoming' && (
              <div className="mt-6 pt-6 border-t border-dark-600 flex flex-col sm:flex-row gap-3">
                {concert.ticket_link ? (
                  <a
                    href={concert.ticket_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    예매하기
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button disabled className="btn-primary opacity-50 cursor-not-allowed">
                    예매 준비중
                  </button>
                )}
                <a
                  href={`https://map.naver.com/v5/search/${encodeURIComponent(concert.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  위치 보기
                </a>
              </div>
            )}
          </div>

          {/* 설명 */}
          {concert.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-4">공연 소개</h2>
              <p className="text-dark-200 leading-relaxed">{concert.description}</p>
            </div>
          )}

          {/* 지휘자 정보 */}
          {(concert.conductor || concert.guest_conductor) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-gold-500" />
                지휘
              </h2>
              <div className="bg-dark-800/50 border border-dark-600 rounded-lg p-4">
                {concert.conductor && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-gold-500">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white light:text-dark-100 font-medium">{concert.conductor}</p>
                      <p className="text-dark-400 text-sm">상임지휘자</p>
                    </div>
                  </div>
                )}
                {concert.guest_conductor && (
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-gold-500">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white light:text-dark-100 font-medium">{concert.guest_conductor}</p>
                      <p className="text-dark-400 text-sm">객원지휘자</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 프로그램 */}
          {concert.program && concert.program.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-gold-500" />
                프로그램
              </h2>
              <ProgramList programs={concert.program} />
            </div>
          )}

          {/* 출연진 */}
          {concert.performers && concert.performers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-4">출연진</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {concert.performers.map((performer) => (
                  <div
                    key={performer.id}
                    className="bg-dark-800/50 border border-dark-600 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-dark-700 flex items-center justify-center text-gold-500 flex-shrink-0">
                        {performer.image ? (
                          <Image
                            src={performer.image}
                            alt={performer.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <p className="text-white light:text-dark-100 font-medium">{performer.name}</p>
                        <p className="text-gold-500 text-sm">{performer.role}</p>
                        {performer.instrument && (
                          <p className="text-dark-400 text-sm">{performer.instrument}</p>
                        )}
                      </div>
                    </div>
                    {performer.bio && (
                      <p className="text-dark-300 text-sm mt-3 pl-15">{performer.bio}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 협연 단체 */}
          {concert.collaborators && concert.collaborators.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-4">협연</h2>
              <div className="flex flex-wrap gap-2">
                {concert.collaborators.map((collaborator, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-full text-dark-200"
                  >
                    {collaborator}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 안내사항 */}
          {concert.notes && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-4">안내사항</h2>
              <div className="bg-dark-800/50 border border-dark-600 rounded-lg p-4">
                <p className="text-dark-200 leading-relaxed">{concert.notes}</p>
              </div>
            </div>
          )}

          {/* 후원 */}
          {concert.sponsors && concert.sponsors.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white light:text-dark-100 mb-4">후원</h2>
              <div className="flex flex-wrap gap-3">
                {concert.sponsors.map((sponsor, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-dark-700 rounded text-dark-300 text-sm"
                  >
                    {sponsor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const ConcertDetail = memo(ConcertDetailComponent);
