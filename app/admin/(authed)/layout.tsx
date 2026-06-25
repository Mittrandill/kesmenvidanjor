import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/lib/supabase/actions";
import { Icon } from "@/components/ui/Icon";
import { SideNav } from "@/components/admin/SideNav";
import { BottomTabBar } from "@/components/admin/BottomTabBar";
import { InstallButton } from "@/components/admin/InstallButton";
import { siteConfig } from "@/lib/site-config";

export default async function AuthedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-black/5 bg-white px-4 py-3 lg:px-6">
          <h1 className="min-w-0 truncate text-base font-bold text-ink-900">
            {siteConfig.shortName} — Yönetim
          </h1>
          <div className="flex shrink-0 items-center gap-1">
            <InstallButton />
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-600 hover:bg-black/5"
                aria-label="Çıkış yap"
              >
                <Icon name="SignOut" size={18} />
                <span className="hidden sm:inline">Çıkış</span>
              </button>
            </form>
          </div>
        </header>
        <main className="px-4 py-5 pb-32 lg:px-6 lg:pb-6">{children}</main>
      </div>
      <BottomTabBar />
    </div>
  );
}
