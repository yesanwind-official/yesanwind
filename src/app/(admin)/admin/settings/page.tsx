'use client';

import { useState } from 'react';
import { Save, Info, MapPin, Phone, Globe, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Mock site settings
const initialSettings = {
  // 기본 정보
  orchestraName: '예산윈드오케스트라',
  orchestraNameEn: 'Yesan Wind Orchestra',
  foundedYear: '1998',
  slogan: '클래식의 품격, 현대의 감각',
  introduction: `예산윈드오케스트라는 1998년 창단 이래 27년간 충남 예산 지역의 문화예술 발전을 위해 노력해 왔습니다.

매년 정기연주회와 다양한 기획공연을 통해 지역 주민들에게 수준 높은 관악 음악을 선사하고 있으며, 지역 음악 인재 발굴과 육성에도 힘쓰고 있습니다.

앞으로도 음악을 통해 지역 사회와 소통하고 문화 발전에 기여하는 예산윈드오케스트라가 되겠습니다.`,
  history: `1998년 - 예산윈드오케스트라 창단
1999년 - 제1회 정기연주회 개최
2005년 - 충남관악협회 가입
2010년 - 예산군 문화예술 공로상 수상
2015년 - 창단 15주년 기념 특별연주회
2020년 - 창단 20주년 기념 연주회
2024년 - 제46회 정기연주회`,

  // 연락처 정보
  address: '충남 예산군 예산읍 군청로 1',
  addressDetail: '예산문화예술회관',
  phone: '041-123-4567',
  fax: '041-123-4568',
  email: 'yesanwind@example.com',
  rehearsalLocation: '예산군 예산읍 문화로 123',
  rehearsalTime: '매주 토요일 오후 2시 ~ 5시',

  // 소셜 미디어
  website: 'https://yesanwind.or.kr',
  facebook: 'https://facebook.com/yesanwind',
  instagram: 'https://instagram.com/yesanwind',
  youtube: 'https://youtube.com/@yesanwind',
};

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: keyof typeof settings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Mock save - in real app, this would call an API
    console.log('Saving settings:', settings);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('설정이 저장되었습니다.');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">사이트 설정</h1>
          <p className="mt-1 text-sm text-neutral-500">
            웹사이트에 표시되는 오케스트라 정보를 관리합니다.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gold-500 hover:bg-gold-600 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? '저장 중...' : '저장'}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="basic">
        <TabsList className="bg-white border border-neutral-200">
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
          <Card className="bg-white border-neutral-200">
            <CardHeader>
              <CardTitle className="text-lg">오케스트라 기본 정보</CardTitle>
              <CardDescription>
                오케스트라의 기본 정보를 설정합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="orchestraName">오케스트라명 (한글)</Label>
                  <Input
                    id="orchestraName"
                    value={settings.orchestraName}
                    onChange={(e) => handleChange('orchestraName', e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="orchestraNameEn">오케스트라명 (영문)</Label>
                  <Input
                    id="orchestraNameEn"
                    value={settings.orchestraNameEn}
                    onChange={(e) => handleChange('orchestraNameEn', e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="foundedYear">창단 연도</Label>
                  <Input
                    id="foundedYear"
                    value={settings.foundedYear}
                    onChange={(e) => handleChange('foundedYear', e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="slogan">슬로건</Label>
                  <Input
                    id="slogan"
                    value={settings.slogan}
                    onChange={(e) => handleChange('slogan', e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200">
            <CardHeader>
              <CardTitle className="text-lg">인사말</CardTitle>
              <CardDescription>
                오케스트라 소개 페이지에 표시되는 인사말입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={settings.introduction}
                onChange={(e) => handleChange('introduction', e.target.value)}
                rows={8}
                className="bg-white"
              />
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200">
            <CardHeader>
              <CardTitle className="text-lg">연혁</CardTitle>
              <CardDescription>
                오케스트라의 주요 연혁을 입력합니다. 한 줄에 하나씩 입력하세요.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={settings.history}
                onChange={(e) => handleChange('history', e.target.value)}
                rows={10}
                className="bg-white font-mono text-sm"
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="mt-6 space-y-6">
          <Card className="bg-white border-neutral-200">
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
                  className="bg-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressDetail">상세 주소</Label>
                <Input
                  id="addressDetail"
                  value={settings.addressDetail}
                  onChange={(e) => handleChange('addressDetail', e.target.value)}
                  className="bg-white"
                />
              </div>
              <Separator />
              <div className="grid gap-2">
                <Label htmlFor="rehearsalLocation">연습실 위치</Label>
                <Input
                  id="rehearsalLocation"
                  value={settings.rehearsalLocation}
                  onChange={(e) => handleChange('rehearsalLocation', e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rehearsalTime">연습 시간</Label>
                <Input
                  id="rehearsalTime"
                  value={settings.rehearsalTime}
                  onChange={(e) => handleChange('rehearsalTime', e.target.value)}
                  className="bg-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-neutral-200">
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="bg-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fax">팩스</Label>
                  <Input
                    id="fax"
                    value={settings.fax}
                    onChange={(e) => handleChange('fax', e.target.value)}
                    className="bg-white"
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
                  className="bg-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="mt-6">
          <Card className="bg-white border-neutral-200">
            <CardHeader>
              <CardTitle className="text-lg">소셜 미디어 링크</CardTitle>
              <CardDescription>
                소셜 미디어 계정 URL을 입력합니다. 빈칸으로 두면 표시되지 않습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-neutral-500" />
                  웹사이트
                </Label>
                <Input
                  id="website"
                  value={settings.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://yesanwind.or.kr"
                  className="bg-white"
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
                  className="bg-white"
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
                  className="bg-white"
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
                  className="bg-white"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
