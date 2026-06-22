import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(30),
  region: z.string().max(60).optional().or(z.literal("")),
  service: z.string().max(60).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }
  const { name, phone, region, service, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  // E-posta sağlayıcı yapılandırılmamışsa: hata verme, logla (WhatsApp/telefon birincil kanal).
  if (!apiKey) {
    console.info("[contact] (mail yapılandırılmadı) yeni talep:", {
      name,
      phone,
      region,
      service,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const from = process.env.CONTACT_FROM ?? "Kesmen Vidanjör <onboarding@resend.dev>";

    await resend.emails.send({
      from,
      to: siteConfig.email,
      replyTo: `${name} <${siteConfig.email}>`,
      subject: `Yeni Talep: ${name} — ${service || "Vidanjör"}${region ? ` (${region})` : ""}`,
      text: [
        `Ad Soyad: ${name}`,
        `Telefon: ${phone}`,
        region ? `Bölge: ${region}` : null,
        service ? `Hizmet: ${service}` : null,
        message ? `\nMesaj:\n${message}` : null,
        `\n— ${siteConfig.url} iletişim formu`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] mail gönderim hatası:", err);
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }
}
