"use client";

import { createContext, useContext, useState } from "react";
import { BottomSheet } from "@/components/admin/BottomSheet";
import { Icon } from "@/components/ui/Icon";

const SheetCloseContext = createContext<(() => void) | null>(null);

export function useSheetClose() {
  return useContext(SheetCloseContext);
}

export function EditSheetTrigger({
  label = "Düzenle",
  sheetTitle,
  children,
}: {
  label?: string;
  sheetTitle: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-700 ring-1 ring-black/10 hover:ring-brand-200"
      >
        <Icon name="PencilSimple" size={16} />
        {label}
      </button>
      <BottomSheet open={open} onClose={close} title={sheetTitle}>
        <SheetCloseContext.Provider value={close}>{children}</SheetCloseContext.Provider>
      </BottomSheet>
    </>
  );
}
