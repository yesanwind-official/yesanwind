import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ConcertDetail } from '@/components/features/concerts';
import { getConcertDetailById, mockConcerts } from '@/data/mock-concerts';

interface ConcertDetailPageProps {
  params: Promise<{ id: string }>;
}

// 정적 생성을 위한 경로 생성
export async function generateStaticParams() {
  return mockConcerts.map((concert) => ({
    id: concert.id,
  }));
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: ConcertDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const concert = getConcertDetailById(resolvedParams.id);

  if (!concert) {
    return {
      title: '공연을 찾을 수 없습니다',
    };
  }

  return {
    title: concert.title,
    description: concert.subtitle || concert.description || `${concert.title} - 예산윈드오케스트라`,
    openGraph: {
      title: concert.title,
      description: concert.subtitle || concert.description,
      images: concert.poster_image ? [concert.poster_image] : undefined,
    },
  };
}

export default async function ConcertDetailPage({ params }: ConcertDetailPageProps) {
  const resolvedParams = await params;
  const concert = getConcertDetailById(resolvedParams.id);

  if (!concert) {
    notFound();
  }

  return <ConcertDetail concert={concert} />;
}
