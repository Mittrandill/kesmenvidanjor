import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Yönetim Girişi",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-snow px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 sm:p-8 ring-1 ring-black/5 shadow-sm">
        <h1 className="text-xl font-extrabold text-ink-900">
          {siteConfig.shortName}
        </h1>
        <p className="mt-1 text-sm text-ink-600">Yönetim Paneli Girişi</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
