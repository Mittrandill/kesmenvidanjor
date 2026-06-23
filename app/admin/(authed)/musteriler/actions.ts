"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string } | undefined;

const customerSchema = z.object({
  name: z.string().min(2, "Lütfen müşteri adını girin"),
  phone: z.string().optional().or(z.literal("")),
  region: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

function parseCustomer(formData: FormData) {
  return customerSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    region: formData.get("region"),
    address: formData.get("address"),
    notes: formData.get("notes"),
  });
}

export async function createCustomer(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = parseCustomer(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("customers")
    .insert({
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      region: parsed.data.region || null,
      address: parsed.data.address || null,
      notes: parsed.data.notes || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "Müşteri oluşturulamadı." };
  }

  revalidatePath("/admin/musteriler");
  redirect(`/admin/musteriler/${data.id}`);
}

export async function updateCustomer(
  id: number,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = parseCustomer(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("customers")
    .update({
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      region: parsed.data.region || null,
      address: parsed.data.address || null,
      notes: parsed.data.notes || null,
    })
    .eq("id", id);

  if (error) {
    return { error: "Müşteri güncellenemedi." };
  }

  revalidatePath(`/admin/musteriler/${id}`);
  revalidatePath("/admin/musteriler");
  redirect(`/admin/musteriler/${id}`);
}

const ledgerEntrySchema = z.object({
  entry_type: z.enum(["borc", "tahsilat", "iade"]),
  amount: z.coerce.number().positive("Tutar 0'dan büyük olmalı"),
  description: z.string().optional().or(z.literal("")),
});

export async function createLedgerEntry(
  customerId: number,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = ledgerEntrySchema.safeParse({
    entry_type: formData.get("entry_type"),
    amount: formData.get("amount"),
    description: formData.get("description"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("ledger_entries").insert({
    customer_id: customerId,
    entry_type: parsed.data.entry_type,
    amount: parsed.data.amount,
    description: parsed.data.description || null,
  });

  if (error) {
    return { error: "Hareket eklenemedi." };
  }

  revalidatePath(`/admin/musteriler/${customerId}`);
  revalidatePath("/admin/musteriler");
  revalidatePath("/admin/satislar");
  return undefined;
}

export async function deleteCustomer(id: number) {
  const supabase = await createClient();
  await supabase.from("customers").delete().eq("id", id);
  revalidatePath("/admin/musteriler");
  revalidatePath("/admin/randevular");
  revalidatePath("/admin/satislar");
  revalidatePath("/admin");
}
