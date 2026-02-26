'use client';

import { Music, Users, FileText, Image, Calendar, Eye } from 'lucide-react';
import { StatCard } from '@/components/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock statistics data
const stats = [
  {
    title: '예정된 공연',
    value: 4,
    description: '2025년 상반기',
    icon: Music,
    trend: { value: 12, isPositive: true },
  },
  {
    title: '등록 단원',
    value: 45,
    description: '활동 중인 단원',
    icon: Users,
    trend: { value: 5, isPositive: true },
  },
  {
    title: '게시글',
    value: 20,
    description: '공지사항 + 언론보도',
    icon: FileText,
  },
  {
    title: '갤러리',
    value: 8,
    description: '앨범 수',
    icon: Image,
  },
];

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    type: 'concert',
    title: '제47회 정기연주회 등록',
    date: '2025-01-15',
    user: '관리자',
  },
  {
    id: 2,
    type: 'post',
    title: '신입단원 모집 공지 등록',
    date: '2025-01-10',
    user: '관리자',
  },
  {
    id: 3,
    type: 'gallery',
    title: '2024 송년음악회 앨범 추가',
    date: '2024-12-25',
    user: '관리자',
  },
  {
    id: 4,
    type: 'member',
    title: '신규 단원 3명 등록',
    date: '2024-12-20',
    user: '관리자',
  },
  {
    id: 5,
    type: 'post',
    title: '송년음악회 종료 공지 등록',
    date: '2024-12-21',
    user: '관리자',
  },
];

// Mock upcoming concerts
const upcomingConcerts = [
  {
    id: '1',
    title: '제47회 정기연주회',
    date: '2025-03-15',
    status: 'upcoming',
  },
  {
    id: '2',
    title: '봄의 향연 특별공연',
    date: '2025-04-20',
    status: 'upcoming',
  },
  {
    id: '3',
    title: '제48회 정기연주회',
    date: '2025-06-21',
    status: 'upcoming',
  },
];

const activityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  concert: Music,
  post: FileText,
  gallery: Image,
  member: Users,
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">대시보드</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          예산윈드오케스트라 관리 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-foreground">
            빠른 작업
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-gold-500 hover:bg-gold-600 text-white">
              <Link href="/admin/concerts">
                <Music className="mr-2 h-4 w-4" />
                공연 추가
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/posts">
                <FileText className="mr-2 h-4 w-4" />
                공지사항 작성
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/gallery">
                <Image className="mr-2 h-4 w-4" />
                갤러리 추가
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/members">
                <Users className="mr-2 h-4 w-4" />
                단원 관리
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              최근 활동
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activityIcons[activity.type] || FileText;
                return (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/10">
                      <Icon className="h-4 w-4 text-gold-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{activity.user}</span>
                        <span>-</span>
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Concerts */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              예정된 공연
            </CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/concerts">전체 보기</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingConcerts.map((concert) => (
                <div
                  key={concert.id}
                  className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/10">
                      <Calendar className="h-5 w-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{concert.title}</p>
                      <p className="text-sm text-muted-foreground">{concert.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    예정
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Site Stats */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Eye className="h-5 w-5" />
            사이트 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">1,250</p>
              <p className="text-sm text-muted-foreground">이번 달 방문자</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">3,456</p>
              <p className="text-sm text-muted-foreground">이번 달 페이지뷰</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-2xl font-bold text-foreground">2분 30초</p>
              <p className="text-sm text-muted-foreground">평균 체류시간</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
