'use client';

import { memo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

export interface MemberCardProps {
  id: string;
  name: string;
  instrument: string;
  part: string;
  position?: string;
  profileImage?: string;
  className?: string;
  onClick?: () => void;
}

function MemberCardComponent({
  name,
  instrument,
  part,
  position,
  profileImage,
  className,
  onClick,
}: MemberCardProps) {
  return (
    <article
      className={cn(
        'group bg-dark-800 border border-dark-600 rounded-lg overflow-hidden',
        'transition-all duration-300',
        'hover:border-gold-500/50 hover:shadow-lg hover:shadow-gold-500/10',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Profile Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-dark-700">
        {profileImage ? (
          <Image
            src={profileImage}
            alt={`${name} 프로필 사진`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-dark-600 flex items-center justify-center">
              <User className="w-12 h-12 text-dark-400" />
            </div>
          </div>
        )}

        {/* Position Badge */}
        {position && (
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 bg-gold-500 text-dark-950 text-xs font-semibold rounded">
              {position}
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white light:text-dark-100 mb-1 group-hover:text-gold-400 transition-colors">
          {name}
        </h3>
        <p className="text-gold-500 text-sm font-medium mb-0.5">{instrument}</p>
        <p className="text-dark-400 text-xs">{part}</p>
      </div>
    </article>
  );
}

export const MemberCard = memo(MemberCardComponent);
