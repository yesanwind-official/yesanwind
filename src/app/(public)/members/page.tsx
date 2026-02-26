import { Metadata } from 'next';
import { MembersList } from '@/components/features/members';
import { getAllMembers } from '@/lib/members';
import { toUIMember } from '@/lib/member-helpers';

export const metadata: Metadata = {
  title: '단원 소개 | 예산윈드오케스트라',
  description: '예산윈드오케스트라 단원들을 소개합니다.',
};

export default async function MembersPage() {
  const dbMembers = await getAllMembers();
  const allMembers = dbMembers.map(toUIMember);

  return (
    <div className="container-custom">
      <MembersList members={allMembers} />
    </div>
  );
}
