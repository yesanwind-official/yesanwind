import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const ADMIN_ID = 'yesanwind';
const EMAIL_DOMAIN = '@yesanwind.admin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // Skip auth check if Supabase is not configured (development mode)
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || user.email !== `${ADMIN_ID}${EMAIL_DOMAIN}`) {
      redirect('/login');
    }
  }

  return <>{children}</>;
}
