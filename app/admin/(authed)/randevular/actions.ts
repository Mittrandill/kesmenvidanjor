"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { fromIstanbulInputValue } from "@/lib/utils";

export type FormState = { error?: string } | undefined;

const appointmentSchema = z.object({
  customer_id: z.coerce.number().int().positive("Müşteri seçin"),
  service_slug: z.string().min(1, "Hizmet seçin"),
  scheduled_at: z.string().min(1, "Tarih/saat girin"),
  region: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

function parseAppointment(formData: FormData) {
  return appointmentSchema.safeParse({
    customer_id: formData.get("customer_id"),
    service_slug: formData.get("service_slug"),
    scheduled_at: formData.get("scheduled_at"),
    region: formData.get("region"),
    notes: formData.get("notes"),
  });
}

export async function createAppointment(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = parseAppointment(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .insert({
      customer_id: parsed.data.customer_id,
      service_slug: parsed.data.service_slug,
      scheduled_at: fromIstanbulInputValue(parsed.data.scheduled_at),
      region: parsed.data.region || null,
      notes: parsed.data.notes || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "Randevu oluşturulamadı." };
  }

  revalidatePath("/admin/randevular");
  revalidatePath("/admin");
  redirect(`/admin/randevular/${data.id}`);
}

export async function updateAppointment(
  id: number,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = parseAppointment(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("appointments")
    .update({
      customer_id: parsed.data.customer_id,
      service_slug: parsed.data.service_slug,
      scheduled_at: fromIstanbulInputValue(parsed.data.scheduled_at),
      region: parsed.data.region || null,
      notes: parsed.data.notes || null,
    })
    .eq("id", id);

  if (error) {
    return { error: "Randevu güncellenemedi." };
  }

  revalidatePath(`/admin/randevular/${id}`);
  revalidatePath("/admin/randevular");
  revalidatePath("/admin");
  redirect(`/admin/randevular/${id}`);
}

export async function cancelAppointment(id: number) {
  const supabase = await createClient();
  await supabase.from("appointments").update({ status: "iptal" }).eq("id", id);
  revalidatePath(`/admin/randevular/${id}`);
  revalidatePath("/admin/randevular");
  revalidatePath("/admin");
}

export async function deleteAppointment(id: number) {
  const supabase = await createClient();
  await supabase.from("appointments").delete().eq("id", id);
  revalidatePath("/admin/randevular");
  revalidatePath("/admin/musteriler");
  revalidatePath("/admin");
}

const completeSchema = z.object({
  amount: z.coerce.number().positive("Tutar 0'dan büyük olmalı"),
  description: z.string().optional().or(z.literal("")),
});

export async function completeAppointment(
  id: number,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = completeSchema.safeParse({
    amount: formData.get("amount"),
    description: formData.get("description"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz tutar." };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("complete_appointment", {
    p_appointment_id: id,
    p_amount: parsed.data.amount,
    p_description: parsed.data.description || undefined,
  });

  if (error) {
    return { error: "Randevu tamamlanamadı." };
  }

  revalidatePath(`/admin/randevular/${id}`);
  revalidatePath("/admin/randevular");
  revalidatePath("/admin");
  revalidatePath("/admin/musteriler");
  revalidatePath("/admin/satislar");
  return undefined;
}
