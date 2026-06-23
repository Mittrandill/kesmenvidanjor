import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getService } from "@/lib/site-config";
import { buildIcs } from "@/lib/ics";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const appointmentId = Number(id);
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { data: appointment } = await supabase
    .from("appointments")
    .select("id,service_slug,scheduled_at,region,notes,customers(name,phone)")
    .eq("id", appointmentId)
    .single();

  if (!appointment) {
    return new NextResponse("Randevu bulunamadı", { status: 404 });
  }

  const service = getService(appointment.service_slug);
  const customerName = appointment.customers?.name ?? "Müşteri";
  const customerPhone = appointment.customers?.phone;

  const descriptionParts = [
    customerPhone ? `Telefon: ${customerPhone}` : null,
    appointment.notes,
  ].filter(Boolean);

  const ics = buildIcs({
    uid: `randevu-${appointment.id}@cesmekesmenvidanjor.com`,
    summary: `${customerName} — ${service?.name ?? appointment.service_slug}`,
    description: descriptionParts.join("\n") || undefined,
    location: appointment.region ?? undefined,
    start: new Date(appointment.scheduled_at),
  });

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="randevu-${appointment.id}.ics"`,
    },
  });
}
