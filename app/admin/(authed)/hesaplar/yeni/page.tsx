import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { AccountForm } from "@/components/admin/AccountForm";
import { createAccount } from "@/app/admin/(authed)/hesaplar/actions";

export const metadata: Metadata = { title: "Yeni Hesap", robots: { index: false } };

export default function YeniHesapPage() {
  return (
    <div className="space-y-4 max-w-lg pb-20 lg:pb-0">
      <Link
        href="/admin/hesaplar"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-600"
      >
        <Icon name="ArrowLeft" size={16} />
        Hesaplar
      </Link>
      <h1 className="text-xl font-extrabold text-ink-900">Yeni Hesap</h1>
      <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <AccountForm action={createAccount} submitLabel="Hesap Ekle" sticky />
      </div>
    </div>
  );
}
