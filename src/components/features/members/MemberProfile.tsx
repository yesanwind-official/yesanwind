'use client';

import { memo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { User, GraduationCap, Briefcase, Award, Mail } from 'lucide-react';

export interface CareerItem {
  year: string;
  description: string;
}

export interface MemberProfileProps {
  name: string;
  nameEn?: string;
  instrument: string;
  part: string;
  position?: string;
  profileImage?: string;
  introduction?: string;
  career?: CareerItem[];
  education?: CareerItem[];
  awards?: CareerItem[];
  email?: string;
  className?: string;
}

function MemberProfileComponent({
  name,
  nameEn,
  instrument,
  part,
  position,
  profileImage,
  introduction,
  career,
  education,
  awards,
  email,
  className,
}: MemberProfileProps) {
  return (
    <div className={cn('grid lg:grid-cols-5 gap-8 lg:gap-12', className)}>
      {/* Profile Image Section */}
      <div className="lg:col-span-2">
        <div className="sticky top-28">
          {/* Image Container */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-dark-800 border border-dark-600">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={`${name} 프로필 사진`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-dark-700 flex items-center justify-center">
                  <User className="w-16 h-16 text-dark-500" />
                </div>
              </div>
            )}
          </div>

          {/* Decorative Frame */}
          <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-gold-500/30 rounded-lg -z-10" />
        </div>
      </div>

      {/* Info Section */}
      <div className="lg:col-span-3 space-y-8">
        {/* Name & Title */}
        <div>
          {position && (
            <span className="inline-block px-3 py-1 bg-gold-500/10 text-gold-500 text-sm font-medium rounded-full mb-4">
              {position}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white light:text-dark-100 mb-2">{name}</h1>
          {nameEn && (
            <p className="text-xl text-dark-300 font-serif tracking-wide">{nameEn}</p>
          )}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-gold-500 font-medium">{instrument}</span>
            <span className="text-dark-500">|</span>
            <span className="text-dark-300">{part}</span>
          </div>
        </div>

        {/* Introduction */}
        {introduction && (
          <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6">
            <p className="text-dark-200 leading-relaxed whitespace-pre-line">{introduction}</p>
          </div>
        )}

        {/* Career */}
        {career && career.length > 0 && (
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white light:text-dark-100 mb-4">
              <Briefcase className="w-5 h-5 text-gold-500" />
              <span>경력</span>
            </h2>
            <ul className="space-y-3">
              {career.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-gold-500 font-medium w-16 flex-shrink-0">{item.year}</span>
                  <span className="text-dark-200">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white light:text-dark-100 mb-4">
              <GraduationCap className="w-5 h-5 text-gold-500" />
              <span>학력</span>
            </h2>
            <ul className="space-y-3">
              {education.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-gold-500 font-medium w-16 flex-shrink-0">{item.year}</span>
                  <span className="text-dark-200">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Awards */}
        {awards && awards.length > 0 && (
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-white light:text-dark-100 mb-4">
              <Award className="w-5 h-5 text-gold-500" />
              <span>수상 이력</span>
            </h2>
            <ul className="space-y-3">
              {awards.map((item, index) => (
                <li key={index} className="flex gap-4">
                  <span className="text-gold-500 font-medium w-16 flex-shrink-0">{item.year}</span>
                  <span className="text-dark-200">{item.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact */}
        {email && (
          <div className="pt-4 border-t border-dark-700">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-dark-300 hover:text-gold-500 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export const MemberProfile = memo(MemberProfileComponent);
