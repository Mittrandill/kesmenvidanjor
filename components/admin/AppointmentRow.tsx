"use client";

import { useRouter } from "next/navigation";

export function AppointmentRow({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) {
  const router = useRouter();

  function navigate() {
    router.push(`/admin/randevular/${id}`);
  }

  return (
    <tr
      onClick={navigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate();
        }
      }}
      tabIndex={0}
      className="cursor-pointer border-b border-black/5 outline-none last:border-0 hover:bg-black/[0.015] focus-visible:bg-black/[0.03]"
    >
      {children}
    </tr>
  );
}
