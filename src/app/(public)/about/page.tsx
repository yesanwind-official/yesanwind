import { Metadata } from 'next';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export const metadata: Metadata = {
  title: '인사말',
  description: '예산윈드오케스트라 단장 및 지휘자 인사말. 음악으로 하나되는 예산을 위해 노력하는 예산윈드오케스트라를 소개합니다.',
};

// Mock Data
const greetingData = {
  conductor: {
    name: '김태혁',
    title: '음악감독 겸 상임지휘자',
    image: '/images/conductor.jpg',
    greeting: `안녕하십니까, 예산윈드오케스트라 음악감독 겸 상임지휘자 김태혁입니다.

예산윈드오케스트라 홈페이지를 방문해 주신 여러분께 진심으로 감사의 말씀을 드립니다.

1998년 창단 이래 27년간 예산윈드오케스트라는 지역 문화 예술 발전을 위해 끊임없이 노력해 왔습니다. 클래식 음악의 아름다움을 지역 주민들과 함께 나누고, 음악을 통해 세대를 아우르는 소통의 장을 만들어 가고 있습니다.

우리 오케스트라는 정기연주회를 비롯하여 지역 축제, 학교 방문 연주, 복지시설 위문공연 등 다양한 활동을 통해 음악의 감동을 전하고 있습니다. 특히 젊은 세대들에게 관악기의 매력을 알리고, 지역의 음악 인재를 발굴하고 양성하는 데에도 힘쓰고 있습니다.

앞으로도 예산윈드오케스트라는 더욱 수준 높은 연주와 다양한 레퍼토리로 관객 여러분께 감동을 드리겠습니다. 음악으로 하나되는 예산, 그 꿈을 향해 단원 모두가 한마음으로 정진하겠습니다.

여러분의 따뜻한 관심과 성원을 부탁드립니다.
감사합니다.`,
    signature: '예산윈드오케스트라 음악감독 겸 상임지휘자',
  },
  president: {
    name: '박문화',
    title: '단장',
    image: '/images/president.jpg',
    greeting: `존경하는 시민 여러분, 안녕하십니까.
예산윈드오케스트라 단장 박문화입니다.

바쁘신 중에도 우리 오케스트라 홈페이지를 방문해 주셔서 깊이 감사드립니다.

예산윈드오케스트라는 음악을 사랑하는 지역민들이 모여 시작된 아마추어 관악 오케스트라입니다. 하지만 우리의 열정과 노력은 결코 아마추어가 아닙니다. 매주 모여 땀 흘리며 연습하고, 한 음 한 음에 최선을 다하는 단원들의 모습에서 진정한 음악에 대한 사랑을 느낄 수 있습니다.

우리 오케스트라가 이렇게 성장할 수 있었던 것은 오랜 시간 함께해주신 관객 여러분, 물심양면으로 후원해 주신 후원회원 여러분, 그리고 묵묵히 자리를 지켜온 단원들 덕분입니다. 이 자리를 빌려 깊은 감사의 말씀을 전합니다.

앞으로도 예산윈드오케스트라는 지역 문화 발전의 한 축으로서 역할을 다하겠습니다. 주민 여러분과 함께 호흡하며, 음악으로 행복한 예산을 만들어 가겠습니다.

많은 관심과 응원 부탁드립니다.
감사합니다.`,
    signature: '예산윈드오케스트라 단장',
  },
};

function ProfileCard({
  person,
  isReversed = false,
}: {
  person: typeof greetingData.conductor;
  isReversed?: boolean;
}) {
  return (
    <div
      className={`grid lg:grid-cols-5 gap-8 lg:gap-12 items-start ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Profile Image */}
      <div className={`lg:col-span-2 ${isReversed ? 'lg:order-2' : ''}`}>
        <div className="relative">
          {/* Decorative Frame */}
          <div className="absolute -inset-3 border border-gold-500/20 rounded-lg" />
          <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-gold-500/40" />

          {/* Image Container */}
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-dark-800">
            {/* Placeholder - 실제 이미지가 없을 때 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-dark-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-20 h-20"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            {/* 실제 이미지 사용 시
            <Image
              src={person.image}
              alt={`${person.name} ${person.title}`}
              fill
              className="object-cover"
            />
            */}
          </div>

          {/* Name Card */}
          <div className="absolute -bottom-6 left-4 right-4 bg-dark-800 border border-dark-600 rounded-lg p-4 text-center shadow-lg">
            <h3 className="text-xl font-bold text-white light:text-dark-100 mb-1">{person.name}</h3>
            <p className="text-gold-500 text-sm">{person.title}</p>
          </div>
        </div>
      </div>

      {/* Greeting Text */}
      <div className={`lg:col-span-3 pt-8 lg:pt-0 ${isReversed ? 'lg:order-1' : ''}`}>
        {/* Quote Icon */}
        <Quote className="w-12 h-12 text-gold-500/30 mb-6" />

        {/* Greeting Content */}
        <div className="space-y-4 text-dark-200 leading-relaxed whitespace-pre-line">
          {person.greeting}
        </div>

        {/* Signature */}
        <div className="mt-8 pt-6 border-t border-dark-700">
          <p className="text-gold-500 font-medium">{person.signature}</p>
          <p className="text-2xl font-serif font-bold text-white light:text-dark-100 mt-2 tracking-wide">
            {person.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="space-y-20 lg:space-y-32">
      {/* Conductor Greeting */}
      <section>
        <ProfileCard person={greetingData.conductor} />
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center">
        <div className="w-2 h-2 bg-gold-500 rounded-full" />
        <div className="w-24 h-px bg-dark-700 mx-4" />
        <div className="w-2 h-2 bg-gold-500 rounded-full" />
        <div className="w-24 h-px bg-dark-700 mx-4" />
        <div className="w-2 h-2 bg-gold-500 rounded-full" />
      </div>

      {/* President Greeting */}
      <section>
        <ProfileCard person={greetingData.president} isReversed />
      </section>
    </div>
  );
}
