"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string } | undefined;

const accountSchema = z.object({
  name: z.string().min(2, "Lütfen hesap adını girin"),
  type: z.enum(["kasa", "banka"]),
});

export async function createAccount(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = accountSchema.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("accounts")
    .insert(parsed.data)
    .select("id")
    .single();

  if (error || !data) {
    return { error: "Hesap oluşturulamadı." };
  }

  revalidatePath("/admin/hesaplar");
  redirect(`/admin/hesaplar/${data.id}`);
}

export async function updateAccount(
  id: number,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = accountSchema.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Geçersiz form." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("accounts").update(parsed.data).eq("id", id);

  if (error) {
    return { error: "Hesap güncellenemedi." };
  }

  revalidatePath(`/admin/hesaplar/${id}`);
  revalidatePath("/admin/hesaplar");
  return undefined;
}

export async function deleteAccount(id: number) {
  const supabase = await createClient();
  await supabase.from("accounts").delete().eq("id", id);
  revalidatePath("/admin/hesaplar");
  redirect("/admin/hesaplar");
}
