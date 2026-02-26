'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Loader2, Plus, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSupabase } from '@/hooks/use-supabase';
import type { Json } from '@/types/database';

// --- Types ---

interface HeroData {
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

interface AboutData {
  description1: string;
  description2: string;
  stats: StatItem[];
  groupImage: string;
}

const defaultHero: HeroData = {
  title: 'YESAN WIND',
  titleEn: 'ORCHESTRA',
  subtitle: '음악으로 하나되는 예산, 예산윈드오케스트라가 함께합니다',
  backgroundImage: '/images/orchestra-group.jpg',
};

const defaultAbout: AboutData = {
  description1: '예산윈드오케스트라는 1998년 창단하여 27년간 지역 문화 예술 발전에 기여해 온 관악 오케스트라입니다.',
  description2: '클래식부터 영화음악, 팝, 재즈에 이르기까지 다양한 장르의 음악을 선보이며 지역 주민들에게 수준 높은 문화 향유 기회를 제공하고 있습니다.',
  stats: [
    { value: '27', unit: '', label: 'Years', sublabel: '역사' },
    { value: '50', unit: '+', label: 'Members', sublabel: '단원' },
    { value: '100', unit: '+', label: 'Concerts', sublabel: '공연' },
    { value: '10K', unit: '+', label: 'Audience', sublabel: '누적 관객' },
  ],
  groupImage: '/images/orchestra-group.jpg',
};

// --- Component ---

export default function LandingAdminPage() {
  const supabase = useSupabase();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Hero state
  const [heroTitle, setHeroTitle] = useState(defaultHero.title);
  const [heroTitleEn, setHeroTitleEn] = useState(defaultHero.titleEn);
  const [heroSubtitle, setHeroSubtitle] = useState(defaultHero.subtitle);
  const [heroBackground, setHeroBackground] = useState(defaultHero.backgroundImage);

  // About state
  const [aboutDesc1, setAboutDesc1] = useState(defaultAbout.description1);
  const [aboutDesc2, setAboutDesc2] = useState(defaultAbout.description2);
  const [aboutStats, setAboutStats] = useState<StatItem[]>(defaultAbout.stats);
  const [aboutGroupImage, setAboutGroupImage] = useState(defaultAbout.groupImage);

  // --- Fetch ---

  const fetchHero = useCallback(async () => {
    const { data, error } = await supabase
      .from('orchestra_info')
      .select('*')
      .eq('key', 'landing_hero')
      .single();

    if (error || !data?.metadata) return;

    const meta = data.metadata as unknown as HeroData;
    setHeroTitle(meta.title || defaultHero.title);
    setHeroTitleEn(meta.titleEn || defaultHero.titleEn);
    setHeroSubtitle(meta.subtitle || defaultHero.subtitle);
    setHeroBackground(meta.backgroundImage || defaultHero.backgroundImage);
  }, [supabase]);

  const fetchAbout = useCallback(async () => {
    const { data, error } = await supabase
      .from('orchestra_info')
      .select('*')
      .eq('key', 'landing_about')
      .single();

    if (error || !data?.metadata) return;

    const meta = data.metadata as unknown as AboutData;
    setAboutDesc1(meta.description1 || defaultAbout.description1);
    setAboutDesc2(meta.description2 || defaultAbout.description2);
    setAboutStats(meta.stats?.length ? meta.stats : defaultAbout.stats);
    setAboutGroupImage(meta.groupImage || defaultAbout.groupImage);
  }, [supabase]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchHero(), fetchAbout()]);
      setLoading(false);
    };
    load();
  }, [fetchHero, fetchAbout]);

  // --- Save Handlers ---

  const handleSaveHero = async () => {
    setSaving(true);
    const metadata: HeroData = {
      title: heroTitle.trim(),
      titleEn: heroTitleEn.trim(),
      subtitle: heroSubtitle.trim(),
      backgroundImage: heroBackground.trim(),
    };

    const { data, error } = await supabase
      .from('orchestra_info')
      .update({ metadata: metadata as unknown as Json, updated_at: new Date().toISOString() })
      .eq('key', 'landing_hero')
      .select();

    setSaving(false);
    if (error) {
      console.error('Error saving hero:', error);
      alert('상단 영역 저장에 실패했습니다: ' + error.message);
      return;
    }
    if (!data || data.length === 0) {
      alert('상단 영역 저장에 실패했습니다. 권한을 확인해주세요.');
      return;
    }
    alert('상단 영역이 저장되었습니다.');
  };

  const handleSaveAbout = async () => {
    setSaving(true);
    const metadata: AboutData = {
      description1: aboutDesc1.trim(),
      description2: aboutDesc2.trim(),
      stats: aboutStats,
      groupImage: aboutGroupImage.trim(),
    };

    const { data, error } = await supabase
      .from('orchestra_info')
      .update({ metadata: metadata as unknown as Json, updated_at: new Date().toISOString() })
      .eq('key', 'landing_about')
      .select();

    setSaving(false);
    if (error) {
      console.error('Error saving about:', error);
      alert('소개 영역 저장에 실패했습니다: ' + error.message);
      return;
    }
    if (!data || data.length === 0) {
      alert('소개 영역 저장에 실패했습니다. 권한을 확인해주세요.');
      return;
    }
    alert('소개 영역이 저장되었습니다.');
  };

  // --- Stats helpers ---

  const updateStat = (index: number, field: keyof StatItem, value: string) => {
    setAboutStats((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addStat = () => {
    setAboutStats((prev) => [...prev, { value: '', unit: '', label: '', sublabel: '' }]);
  };

  const removeStat = (index: number) => {
    setAboutStats((prev) => prev.filter((_, i) => i !== index));
  };

  // --- Render ---

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">메인페이지 관리</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            홈페이지 첫 화면의 상단 영역과 소개 영역을 관리합니다.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Eye className="h-4 w-4" />
          사이트에서 보기
        </a>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="bg-muted">
          <TabsTrigger
            value="hero"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            상단 영역
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            소개 영역
          </TabsTrigger>
        </TabsList>

        {/* Hero Tab */}
        <TabsContent value="hero" className="mt-6 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">상단 영역</CardTitle>
              <CardDescription>
                홈페이지 첫 화면에 보이는 제목과 배경 이미지를 설정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="hero-title">메인 타이틀</Label>
                  <Input
                    id="hero-title"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    placeholder="YESAN WIND"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hero-title-en">서브 타이틀</Label>
                  <Input
                    id="hero-title-en"
                    value={heroTitleEn}
                    onChange={(e) => setHeroTitleEn(e.target.value)}
                    placeholder="ORCHESTRA"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hero-subtitle">설명 문구</Label>
                <Textarea
                  id="hero-subtitle"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="음악으로 하나되는 예산..."
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hero-bg">배경 이미지 URL</Label>
                <Input
                  id="hero-bg"
                  value={heroBackground}
                  onChange={(e) => setHeroBackground(e.target.value)}
                  placeholder="/images/orchestra-group.jpg"
                />
                <p className="text-xs text-muted-foreground">
                  비디오 폴백 이미지(poster)로도 사용됩니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveHero}
              disabled={saving}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              상단 영역 저장
            </Button>
          </div>
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="mt-6 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">소개 영역</CardTitle>
              <CardDescription>
                홈페이지의 오케스트라 소개 영역을 설정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="about-desc1">소개 문구 1</Label>
                <Textarea
                  id="about-desc1"
                  value={aboutDesc1}
                  onChange={(e) => setAboutDesc1(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="about-desc2">소개 문구 2</Label>
                <Textarea
                  id="about-desc2"
                  value={aboutDesc2}
                  onChange={(e) => setAboutDesc2(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="about-image">단체 사진 URL</Label>
                <Input
                  id="about-image"
                  value={aboutGroupImage}
                  onChange={(e) => setAboutGroupImage(e.target.value)}
                  placeholder="/images/orchestra-group.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">통계 항목</CardTitle>
                  <CardDescription>숫자로 보여주는 오케스트라 성과입니다.</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={addStat}>
                  <Plus className="mr-1 h-4 w-4" /> 추가
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {aboutStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">값</Label>
                      <Input
                        value={stat.value}
                        onChange={(e) => updateStat(idx, 'value', e.target.value)}
                        placeholder="27"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">단위</Label>
                      <Input
                        value={stat.unit}
                        onChange={(e) => updateStat(idx, 'unit', e.target.value)}
                        placeholder="+"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">영문 라벨</Label>
                      <Input
                        value={stat.label}
                        onChange={(e) => updateStat(idx, 'label', e.target.value)}
                        placeholder="Years"
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label className="text-xs text-muted-foreground">한글 라벨</Label>
                      <Input
                        value={stat.sublabel}
                        onChange={(e) => updateStat(idx, 'sublabel', e.target.value)}
                        placeholder="역사"
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeStat(idx)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-5 shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {aboutStats.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  통계 항목이 없습니다. &quot;추가&quot; 버튼을 눌러 추가하세요.
                </p>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveAbout}
              disabled={saving}
              className="bg-gold-500 hover:bg-gold-600 text-white"
            >
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              소개 영역 저장
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
