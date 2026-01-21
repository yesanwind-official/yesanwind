import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Car, Bus, Train, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: '오시는 길',
  description: '예산윈드오케스트라 연습실 및 공연장 위치 안내. 주소, 연락처, 대중교통 및 자가용 이용 방법을 안내합니다.',
};

// 위치 정보 데이터
const locationData = {
  rehearsal: {
    name: '연습실',
    address: '충청남도 예산군 예산읍 예산로 123',
    addressDetail: '예산문화예술회관 지하 1층',
    phone: '041-123-4567',
    email: 'info@yesanwind.or.kr',
    schedule: '매주 토요일 14:00 - 18:00',
    mapUrl: 'https://map.naver.com/p/search/%EC%98%88%EC%82%B0%EB%AC%B8%ED%99%94%EC%98%88%EC%88%A0%ED%9A%8C%EA%B4%80',
  },
  venue: {
    name: '주 공연장',
    address: '충청남도 예산군 예산읍 예산로 123',
    addressDetail: '예산문화예술회관 대공연장',
    capacity: '800석',
  },
};

const transportInfo = [
  {
    icon: Car,
    title: '자가용 이용시',
    items: [
      '서울 방면: 경부고속도로 → 천안논산고속도로 → 예산IC → 예산읍 방면 10분',
      '대전 방면: 호남고속도로 → 천안논산고속도로 → 예산IC → 예산읍 방면 10분',
      '무료 주차: 예산문화예술회관 주차장 (200대)',
    ],
  },
  {
    icon: Train,
    title: '기차 이용시',
    items: [
      '장항선 예산역 하차',
      '예산역에서 도보 15분 또는 택시 5분',
      'KTX 천안아산역 하차 → 예산행 버스 환승 (약 40분)',
    ],
  },
  {
    icon: Bus,
    title: '버스 이용시',
    items: [
      '서울 남부터미널 → 예산 (약 2시간)',
      '대전복합터미널 → 예산 (약 1시간 30분)',
      '예산시외버스터미널에서 도보 10분',
    ],
  },
];

const nearbyLandmarks = [
  { name: '예산군청', distance: '도보 5분' },
  { name: '예산시외버스터미널', distance: '도보 10분' },
  { name: '예산역', distance: '도보 15분' },
  { name: '예산전통시장', distance: '도보 8분' },
];

export default function LocationPage() {
  return (
    <div className="space-y-12">
      {/* Map Section */}
      <section className="relative">
        <div className="aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden bg-dark-800 border border-dark-700">
          {/* 네이버 지도 iframe - 실제 좌표로 교체 필요 */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3185.5!2d126.8!3d36.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDQyJzAwLjAiTiAxMjbCsDQ4JzAwLjAiRQ!5e0!3m2!1sko!2skr!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="예산윈드오케스트라 위치"
            className="grayscale-[30%] contrast-[1.1]"
          />

          {/* Map Overlay Gradient */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark-900/50 via-transparent to-transparent" />
        </div>

        {/* Floating Info Card */}
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-80">
          <div className="bg-dark-900/95 backdrop-blur-md border border-dark-700 rounded-lg p-5 shadow-xl">
            <h3 className="text-lg font-bold text-white light:text-dark-100 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-500" />
              {locationData.rehearsal.name}
            </h3>
            <p className="text-dark-200 text-sm mb-1">{locationData.rehearsal.address}</p>
            <p className="text-dark-400 text-sm mb-4">{locationData.rehearsal.addressDetail}</p>
            <a
              href={locationData.rehearsal.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-400 text-dark-950 text-sm font-medium rounded transition-colors"
            >
              네이버 지도에서 보기
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* Rehearsal Room */}
        <div className="p-6 bg-dark-800 border border-dark-700 rounded-lg hover:border-gold-500/30 transition-colors">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white light:text-dark-100">연습실</h3>
              <p className="text-dark-400 text-sm">정기 연습 장소</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white light:text-dark-100">{locationData.rehearsal.address}</p>
                <p className="text-dark-400 text-sm">{locationData.rehearsal.addressDetail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <a href={`tel:${locationData.rehearsal.phone}`} className="text-white light:text-dark-100 hover:text-gold-400 transition-colors">
                {locationData.rehearsal.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <a href={`mailto:${locationData.rehearsal.email}`} className="text-white light:text-dark-100 hover:text-gold-400 transition-colors">
                {locationData.rehearsal.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-white light:text-dark-100">{locationData.rehearsal.schedule}</span>
            </div>
          </div>
        </div>

        {/* Performance Venue */}
        <div className="p-6 bg-dark-800 border border-dark-700 rounded-lg hover:border-gold-500/30 transition-colors">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-gold-500" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white light:text-dark-100">주 공연장</h3>
              <p className="text-dark-400 text-sm">정기연주회 개최 장소</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white light:text-dark-100">{locationData.venue.address}</p>
                <p className="text-dark-400 text-sm">{locationData.venue.addressDetail}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-gold-500 flex-shrink-0" />
              <span className="text-white light:text-dark-100">좌석 수: {locationData.venue.capacity}</span>
            </div>
          </div>

          {/* Venue Features */}
          <div className="mt-5 pt-5 border-t border-dark-700">
            <p className="text-dark-400 text-sm mb-3">공연장 시설</p>
            <div className="flex flex-wrap gap-2">
              {['최신 음향 시설', '주차장 200대', '장애인 편의시설', '휴게 공간'].map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 bg-dark-700 text-dark-200 text-sm rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section>
        <h2 className="text-2xl font-bold text-white light:text-dark-100 mb-6 text-center md:text-left">
          교통 안내
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {transportInfo.map((transport) => {
            const IconComponent = transport.icon;
            return (
              <div
                key={transport.title}
                className="p-6 bg-dark-800 border border-dark-700 rounded-lg hover:border-dark-600 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-gold-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white light:text-dark-100">{transport.title}</h3>
                </div>
                <ul className="space-y-3">
                  {transport.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-dark-300 text-sm">
                      <span className="text-gold-500 mt-1">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Nearby Landmarks */}
      <section className="p-6 bg-dark-800 border border-dark-700 rounded-lg">
        <h3 className="text-lg font-bold text-white light:text-dark-100 mb-4">주변 주요 시설</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nearbyLandmarks.map((landmark) => (
            <div key={landmark.name} className="text-center p-4 bg-dark-900/50 rounded-lg">
              <p className="text-white light:text-dark-100 font-medium">{landmark.name}</p>
              <p className="text-gold-500 text-sm mt-1">{landmark.distance}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notice */}
      <section className="p-5 bg-gold-500/10 border border-gold-500/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-gold-500 text-sm font-bold">!</span>
          </div>
          <div>
            <h4 className="text-gold-400 font-medium mb-1">방문 안내</h4>
            <p className="text-dark-300 text-sm leading-relaxed">
              연습실 방문을 원하시는 분은 사전에 연락 부탁드립니다.
              정기 연습은 매주 토요일 오후 2시부터 6시까지 진행됩니다.
              공연 관람 및 단원 가입 상담은 언제든지 환영합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
