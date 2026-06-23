"use client";

export function RowActions({ children }: { children: React.ReactNode }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-end gap-1"
    >
      {children}
    </div>
  );
}
