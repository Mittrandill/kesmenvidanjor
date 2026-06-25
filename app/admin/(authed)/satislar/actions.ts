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
  invoice_required: z.boolean().optional(),
  invoice_number: z.string().optional().or(z.literal("")),
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
    invoice_required: formData.get("invoice_required") === "true",
    invoice_number: formData.get("invoice_number"),
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
    invoice_required: parsed.data.invoice_required ?? false,
    invoice_number: parsed.data.invoice_number || null,
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

const saleEditSchema = z
  .object({
    customer_id: z.coerce.number().int().positive("Müşteri seçin"),
    entry_type: z.enum(["borc", "tahsilat", "iade"]),
    amount: z.coerce.number().positive("Tutar 0'dan büyük olmalı"),
    description: z.string().optional().or(z.literal("")),
    payment_method: z.enum(["nakit", "pos", "havale"]).optional().or(z.literal("")),
    account_id: z.coerce.number().int().positive().optional().or(z.literal("")),
    invoice_required: z.boolean().optional(),
    invoice_number: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.entry_type === "tahsilat" || data.entry_type === "iade") {
      if (!data.payment_method) {
        ctx.addIssue({
          code: "custom",
          path: ["payment_method"],
          message: "Ödeme yöntemi seçin",
        });
      }
      if (!data.account_id) {
        ctx.addIssue({ code: "custom", path: ["account_id"], message: "Hesap seçin" });
      }
    }
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
    payment_method: formData.get("payment_method") || undefined,
    account_id: formData.get("account_id") || undefined,
    invoice_required: formData.get("invoice_required") === "true",
    invoice_number: formData.get("invoice_number"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const isPayment = parsed.data.entry_type === "tahsilat" || parsed.data.entry_type === "iade";

  const supabase = await createClient();
  const { error } = await supabase
    .from("ledger_entries")
    .update({
      customer_id: parsed.data.customer_id,
      entry_type: parsed.data.entry_type,
      amount: parsed.data.amount,
      description: parsed.data.description || null,
      payment_method: isPayment ? parsed.data.payment_method || null : null,
      account_id: isPayment ? Number(parsed.data.account_id) || null : null,
      invoice_required: !isPayment ? (parsed.data.invoice_required ?? false) : false,
      invoice_number: !isPayment ? parsed.data.invoice_number || null : null,
    })
    .eq("id", id);

  if (error) {
    return { error: "Kayıt güncellenemedi." };
  }

  revalidatePath("/admin/satislar");
  revalidatePath(`/admin/musteriler/${parsed.data.customer_id}`);
  revalidatePath("/admin/musteriler");
  revalidatePath("/admin/hesaplar");
  revalidatePath("/admin");
  return undefined;
}

export async function deleteSale(id: number) {
  const supabase = await createClient();
  await supabase.from("ledger_entries").delete().eq("id", id);
  revalidatePath("/admin/satislar");
  revalidatePath("/admin/musteriler");
  revalidatePath("/admin/hesaplar");
  revalidatePath("/admin");
  redirect("/admin/satislar");
}
