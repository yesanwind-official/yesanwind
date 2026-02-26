import { Metadata } from 'next';
import Link from 'next/link';
import { MemberProfile } from '@/components/features/members';
import { getConductor } from '@/lib/members';
import { toUIMember } from '@/lib/member-helpers';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '지휘자 | 단원 소개 | 예산윈드오케스트라',
  description: '예산윈드오케스트라 상임지휘자를 소개합니다.',
};

export default async function ConductorPage() {
  const dbConductor = await getConductor();
  const conductor = dbConductor ? toUIMember(dbConductor) : null;

  return (
    <div className="container-custom">
      {/* Breadcrumb / Back Link */}
      <div className="mb-8">
        <Link
          href="/members"
          className="inline-flex items-center gap-2 text-dark-400 hover:text-gold-500 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>전체 단원 목록</span>
        </Link>
      </div>

      {/* Section Header */}
      <div className="mb-12">
        <span className="text-gold-500 text-sm font-medium tracking-widest uppercase mb-2 block">
          Conductor
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white light:text-dark-100">지휘자</h2>
      </div>

      {conductor ? (
        <>
          {/* Conductor Profile */}
          <MemberProfile
            name={conductor.name}
            nameEn={conductor.nameEn}
            instrument={conductor.instrument}
            part="지휘자"
            position={conductor.position}
            profileImage={conductor.profileImage}
            introduction={conductor.introduction}
            career={conductor.career}
            education={conductor.education}
            awards={conductor.awards}
            email={conductor.email}
          />

          {/* Message from Conductor */}
          <section className="mt-20 pt-12 border-t border-dark-700">
            <div className="max-w-3xl">
              <h3 className="text-2xl font-bold text-white mb-6">인사말</h3>
              <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-8">
                <blockquote className="text-dark-200 leading-relaxed text-lg italic">
                  <p className="mb-4">
                    &quot;음악은 언어를 초월하여 마음과 마음을 연결하는 가장 아름다운 방법입니다.
                  </p>
                  <p className="mb-4">
                    예산윈드오케스트라는 지난 27년간 지역 주민들과 함께 호흡하며,
                    클래식 음악의 감동을 전해왔습니다. 앞으로도 더 많은 분들과
                    음악의 기쁨을 나누고, 예산 지역의 문화 발전에 기여하고자 합니다.
                  </p>
                  <p>
                    우리 오케스트라의 연주를 통해 일상의 위로와 영감을 얻으시길 바랍니다.&quot;
                  </p>
                </blockquote>
                <footer className="mt-6 text-right">
                  <span className="text-gold-500 font-medium">
                    상임지휘자 {conductor.name}
                  </span>
                </footer>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-dark-400">지휘자 정보를 불러올 수 없습니다.</p>
        </div>
      )}
    </div>
  );
}
