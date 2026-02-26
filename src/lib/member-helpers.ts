import type { MemberData } from '@/data/members';
import type { Tables } from '@/types/database';

type DbMember = Tables<'members'>;

/**
 * 악기명 -> instrumentType 매핑
 */
function getInstrumentType(instrument: string): string {
  const map: Record<string, string> = {
    '플루트': 'flute',
    '피콜로': 'flute',
    '오보에': 'oboe',
    '잉글리시 호른': 'oboe',
    '클라리넷': 'clarinet',
    '베이스 클라리넷': 'clarinet',
    '바순': 'bassoon',
    '콘트라바순': 'bassoon',
    '알토 색소폰': 'saxophone',
    '테너 색소폰': 'saxophone',
    '바리톤 색소폰': 'saxophone',
    '소프라노 색소폰': 'saxophone',
    '호른': 'horn',
    '트럼펫': 'trumpet',
    '코넷': 'trumpet',
    '플루겔호른': 'trumpet',
    '트롬본': 'trombone',
    '베이스 트롬본': 'trombone',
    '유포니움': 'euphonium',
    '바리톤': 'euphonium',
    '튜바': 'tuba',
    'BBb 튜바': 'tuba',
    'CC 튜바': 'tuba',
    '팀파니': 'timpani',
    '스네어 드럼': 'snare',
    '베이스 드럼': 'bass_drum',
    '심벌즈': 'cymbals',
    '마림바': 'mallet',
    '실로폰': 'mallet',
    '글로켄슈필': 'mallet',
    '비브라폰': 'mallet',
    '차임': 'mallet',
    '종합 타악기': 'auxiliary',
    '트라이앵글': 'auxiliary',
    '탬버린': 'auxiliary',
    '우드블록': 'auxiliary',
    '지휘': 'conductor',
  };

  return map[instrument] || 'etc';
}

/**
 * DB position enum -> 표시용 라벨 변환
 */
function getPositionLabel(position: string): string | undefined {
  if (position === 'conductor') return '상임지휘자';
  if (position === 'principal') return '수석';
  return undefined;
}

/**
 * DB 단원 데이터 -> UI MemberData 변환
 */
export function toUIMember(dbMember: DbMember): MemberData {
  const instrument = dbMember.instrument || '지휘';

  return {
    id: dbMember.id,
    name: dbMember.name,
    nameEn: dbMember.name_en || undefined,
    instrument,
    part: (dbMember.part || 'conductor') as MemberData['part'],
    instrumentType: getInstrumentType(instrument),
    position: getPositionLabel(dbMember.position),
    profileImage: dbMember.profile_image || undefined,
    introduction: dbMember.bio || undefined,
    order: dbMember.display_order,
  };
}
