import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

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

    if (!user) {
      redirect('/login');
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Admin sidebar and header will be added here */}
      <div className="flex">
        {/* Sidebar placeholder */}
        <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-[var(--color-secondary)]">
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex items-center h-16 flex-shrink-0 px-4">
              <span className="text-xl font-bold text-white">관리자</span>
            </div>
            {/* Navigation will be added */}
          </div>
        </aside>

        {/* Main content */}
        <main className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1" />
              <div className="ml-4 flex items-center md:ml-6">
                {/* User menu will be added */}
              </div>
            </div>
          </div>

          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
