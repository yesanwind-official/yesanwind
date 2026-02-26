'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Info, MapPin, Phone, Globe, Facebook, Instagram, Youtube, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useSupabase } from '@/hooks/use-supabase';

// site_settings key → state 매핑
const settingsKeyMap = {
  site_name: 'orchestraName',
  site_name_en: 'orchestraNameEn',
  founded_year: 'foundedYear',
  slogan: 'slogan',
  contact_address: 'address',
  contact_address_detail: 'addressDetail',
  contact_phone: 'phone',
  contact_fax: 'fax',
  contact_email: 'email',
  rehearsal_location: 'rehearsalLocation',
  rehearsal_time: 'rehearsalTime',
  sns_website: 'website',
  sns_facebook: 'facebook',
  sns_instagram: 'instagram',
  sns_youtube: 'youtube',
} as const;

type SettingsState = Record<(typeof settingsKeyMap)[keyof typeof settingsKeyMap], string>;

const defaultSettings: SettingsState = {
  orchestraName: '예산윈드오케스트라',
  orchestraNameEn: 'Yesan Wind Orchestra',
  foundedYear: '1998',
  slogan: '음악으로 하나되는 예산',
  address: '',
  addressDetail: '',
  phone: '',
  fax: '',
  email: '',
  rehearsalLocation: '',
  rehearsalTime: '',
  website: '',
  facebook: '',
  instagram: '',
  youtube: '',
};

export default function SettingsAdminPage() {
  const supabase = useSupabase();
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error) {
      console.error('Error fetching settings:', error);
      setLoading(false);
      return;
    }

    if (data) {
      const newSettings = { ...defaultSettings };
      for (const row of data) {
        const stateKey = (settingsKeyMap as Record<string, string>)[row.key];
        if (stateKey) {
          (newSettings as Record<string, string>)[stateKey] = row.value || '';
        }
      }
      setSettings(newSettings);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (key: keyof SettingsState, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    // state → DB key 역매핑
    const reverseMap: Record<string, string> = {};
    for (const [dbKey, stateKey] of Object.entries(settingsKeyMap)) {
      reverseMap[stateKey] = dbKey;
    }

    const upsertData = Object.entries(settings).map(([stateKey, value]) => ({
      key: reverseMap[stateKey],
      value: value || '',
      updated_at: new Date().toISOString(),
    })).filter(item => item.key); // key가 있는 것만

    const { data, error } = await supabase
      .from('site_settings')
      .upsert(upsertData, { onConflict: 'key' })
      .select();

    setIsSaving(false);

    if (error) {
      console.error('Error saving settings:', error);
      alert('설정 저장에 실패했습니다: ' + error.message);
      return;
    }
    if (!data || data.length === 0) {
      alert('설정 저장에 실패했습니다. 권한을 확인해주세요.');
      return;
    }
    alert('설정이 저장되었습니다.');
  };

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
          <h1 className="text-2xl font-bold text-foreground">사이트 설정</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            웹사이트에 표시되는 오케스트라 정보를 관리합니다.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {isSaving ? '저장 중...' : '저장'}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="basic">
        <TabsList className="bg-muted">
          <TabsTrigger
            value="basic"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            <Info className="mr-2 h-4 w-4" />
            기본 정보
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            <Phone className="mr-2 h-4 w-4" />
            연락처
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="data-[state=active]:bg-gold-500 data-[state=active]:text-white"
          >
            <Globe className="mr-2 h-4 w-4" />
            소셜 미디어
          </TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="mt-6 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">오케스트라 기본 정보</CardTitle>
              <CardDescription>
                오케스트라의 기본 정보를 설정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="orchestraName">오케스트라명 (한글)</Label>
                  <Input
                    id="orchestraName"
                    value={settings.orchestraName}
                    onChange={(e) => handleChange('orchestraName', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="orchestraNameEn">오케스트라명 (영문)</Label>
                  <Input
                    id="orchestraNameEn"
                    value={settings.orchestraNameEn}
                    onChange={(e) => handleChange('orchestraNameEn', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="foundedYear">창단 연도</Label>
                  <Input
                    id="foundedYear"
                    value={settings.foundedYear}
                    onChange={(e) => handleChange('foundedYear', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slogan">슬로건</Label>
                  <Input
                    id="slogan"
                    value={settings.slogan}
                    onChange={(e) => handleChange('slogan', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="mt-6 space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold-500" />
                주소 정보
              </CardTitle>
              <CardDescription>
                공연장 및 연습실 주소 정보입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="address">주소</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressDetail">상세 주소</Label>
                <Input
                  id="addressDetail"
                  value={settings.addressDetail}
                  onChange={(e) => handleChange('addressDetail', e.target.value)}
                />
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label htmlFor="rehearsalLocation">연습실 위치</Label>
                <Input
                  id="rehearsalLocation"
                  value={settings.rehearsalLocation}
                  onChange={(e) => handleChange('rehearsalLocation', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rehearsalTime">연습 시간</Label>
                <Input
                  id="rehearsalTime"
                  value={settings.rehearsalTime}
                  onChange={(e) => handleChange('rehearsalTime', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="h-5 w-5 text-gold-500" />
                연락처
              </CardTitle>
              <CardDescription>
                문의를 위한 연락처 정보입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fax">팩스</Label>
                  <Input
                    id="fax"
                    value={settings.fax}
                    onChange={(e) => handleChange('fax', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">소셜 미디어 링크</CardTitle>
              <CardDescription>
                소셜 미디어 계정 URL을 입력합니다. 빈칸으로 두면 표시되지 않습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  웹사이트
                </Label>
                <Input
                  id="website"
                  value={settings.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://yesanwind.or.kr"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="facebook" className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  value={settings.facebook}
                  onChange={(e) => handleChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/yesanwind"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-600" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  value={settings.instagram}
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/yesanwind"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-600" />
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  value={settings.youtube}
                  onChange={(e) => handleChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/@yesanwind"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
