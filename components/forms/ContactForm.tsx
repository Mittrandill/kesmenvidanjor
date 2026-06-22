"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services, regions } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Lütfen adınızı girin"),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası girin")
    .regex(/^[0-9 ()+]+$/, "Geçerli bir telefon numarası girin"),
  region: z.string().optional(),
  service: z.string().optional(),
  message: z.string().max(1000).optional(),
});

type FormValues = z.infer<typeof schema>;

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-green-50 ring-1 ring-green-200 p-8 text-center">
        <Icon name="CheckCircle" size={48} className="mx-auto text-green-600" />
        <h3 className="mt-3 text-xl font-bold text-ink-900">Talebiniz Alındı!</h3>
        <p className="mt-2 text-ink-600">
          En kısa sürede sizi arayacağız. Acil durumlar için doğrudan telefonla
          ulaşabilirsiniz.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-brand-600 hover:underline"
        >
          Yeni talep gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">
            Ad Soyad *
          </label>
          <input className={inputCls} placeholder="Adınız" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-xs text-brand-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">
            Telefon *
          </label>
          <input
            className={inputCls}
            placeholder="05XX XXX XX XX"
            inputMode="tel"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-brand-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">Bölge</label>
          <select className={inputCls} defaultValue="" {...register("region")}>
            <option value="">Seçiniz</option>
            {regions.map((r) => (
              <option key={r.slug} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-800 mb-1.5">Hizmet</label>
          <select className={inputCls} defaultValue="" {...register("service")}>
            <option value="">Seçiniz</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-800 mb-1.5">Mesajınız</label>
        <textarea
          className={cn(inputCls, "min-h-28 resize-y")}
          placeholder="Talebinizi kısaca yazabilirsiniz"
          {...register("message")}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-brand-600">
          Gönderilemedi. Lütfen telefonla ulaşın veya tekrar deneyin.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? "Gönderiliyor..." : "Talep Gönder"}
        {status !== "sending" && <Icon name="CaretRight" size={18} weight="bold" />}
      </button>
    </form>
  );
}
