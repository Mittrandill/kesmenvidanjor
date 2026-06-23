import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { CustomerForm } from "@/components/admin/CustomerForm";
import { createCustomer } from "@/app/admin/(authed)/musteriler/actions";

export const metadata: Metadata = { title: "Yeni Müşteri", robots: { index: false } };

export default function YeniMusteriPage() {
  return (
    <div className="space-y-4 max-w-lg">
      <Link
        href="/admin/musteriler"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-brand-600"
      >
        <Icon name="ArrowLeft" size={16} />
        Müşteriler
      </Link>
      <h1 className="text-xl font-extrabold text-ink-900">Yeni Müşteri</h1>
      <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <CustomerForm action={createCustomer} submitLabel="Müşteri Ekle" />
      </div>
    </div>
  );
}
