"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getService } from "@/lib/site-config";

export type FormState = { error?: string } | undefined;

const saleSchema = z.object({
  customer_id: z.coerce.number().int().positive("Müşteri seçin"),
  service_slug: z.string().min(1, "Hizmet seçin"),
  amount: z.coerce.number().positive("Tutar 0'dan büyük olmalı"),
  note: z.string().optional().or(z.literal("")),
});

export async function createSale(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = saleSchema.safeParse({
    customer_id: formData.get("customer_id"),
    service_slug: formData.get("service_slug"),
    amount: formData.get("amount"),
    note: formData.get("note"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const service = getService(parsed.data.service_slug);
  if (!service) {
    return { error: "Geçersiz hizmet." };
  }

  const description = parsed.data.note
    ? `${service.name} — ${parsed.data.note}`
    : service.name;

  const supabase = await createClient();
  const { error } = await supabase.from("ledger_entries").insert({
    customer_id: parsed.data.customer_id,
    entry_type: "borc",
    amount: parsed.data.amount,
    description,
    related_appointment_id: null,
  });

  if (error) {
    return { error: "Satış kaydedilemedi." };
  }

  revalidatePath(`/admin/musteriler/${parsed.data.customer_id}`);
  revalidatePath("/admin/musteriler");
  revalidatePath("/admin/satislar");
  revalidatePath("/admin");
  redirect(`/admin/musteriler/${parsed.data.customer_id}`);
}

const saleEditSchema = z.object({
  customer_id: z.coerce.number().int().positive("Müşteri seçin"),
  entry_type: z.enum(["borc", "tahsilat", "iade"]),
  amount: z.coerce.number().positive("Tutar 0'dan büyük olmalı"),
  description: z.string().optional().or(z.literal("")),
});

export async function updateSale(
  id: number,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = saleEditSchema.safeParse({
    customer_id: formData.get("customer_id"),
    entry_type: formData.get("entry_type"),
    amount: formData.get("amount"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("ledger_entries")
    .update({
      customer_id: parsed.data.customer_id,
      entry_type: parsed.data.entry_type,
      amount: parsed.data.amount,
      description: parsed.data.description || null,
    })
    .eq("id", id);

  if (error) {
    return { error: "Kayıt güncellenemedi." };
  }

  revalidatePath("/admin/satislar");
  revalidatePath(`/admin/musteriler/${parsed.data.customer_id}`);
  revalidatePath("/admin/musteriler");
  revalidatePath("/admin");
  redirect("/admin/satislar");
}

export async function deleteSale(id: number) {
  const supabase = await createClient();
  await supabase.from("ledger_entries").delete().eq("id", id);
  revalidatePath("/admin/satislar");
  revalidatePath("/admin/musteriler");
  revalidatePath("/admin");
}
