'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogIn, ArrowLeft, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getClient } from '@/lib/supabase/client';

// 아이디를 내부 이메일 형태로 변환 (Supabase Auth는 이메일 기반)
const EMAIL_DOMAIN = '@yesanwind.admin';

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const supabase = getClient();
      const email = userId.includes('@') ? userId : `${userId}${EMAIL_DOMAIN}`;

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="예산윈드오케스트라"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl font-bold tracking-wide text-white light:text-dark-100 group-hover:text-gold-400 transition-colors">
                YESAN WIND
              </span>
              <span className="text-[10px] text-dark-300 tracking-widest uppercase">
                Orchestra
              </span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="bg-dark-800 border-dark-600">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white light:text-dark-100">
              관리자 로그인
            </CardTitle>
            <CardDescription className="text-dark-300">
              관리자 계정으로 로그인하세요
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* User ID */}
              <div className="space-y-2">
                <Label
                  htmlFor="userId"
                  className="text-dark-200 light:text-dark-600"
                >
                  아이디
                </Label>
                <div className="relative">
                  <Input
                    id="userId"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    autoComplete="username"
                    className="bg-dark-900 border-dark-600 text-white light:text-dark-100 placeholder:text-dark-500 focus-visible:border-gold-500 focus-visible:ring-gold-500/20 pl-10"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-dark-200 light:text-dark-600"
                >
                  비밀번호
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="bg-dark-900 border-dark-600 text-white light:text-dark-100 placeholder:text-dark-500 focus-visible:border-gold-500 focus-visible:ring-gold-500/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-dark-200 transition-colors"
                    aria-label={
                      showPassword ? '비밀번호 숨기기' : '비밀번호 보기'
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold-500 text-dark-950 hover:bg-gold-400 font-semibold h-10"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                    로그인 중...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    로그인
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-dark-400 hover:text-gold-500 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
