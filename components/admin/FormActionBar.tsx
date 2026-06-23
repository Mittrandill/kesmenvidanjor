export function FormActionBar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-x-0 z-30 border-t border-black/5 bg-white px-4 pt-3 lg:static lg:border-0 lg:bg-transparent lg:px-0 lg:pt-0"
      style={{
        bottom: "56px",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)",
      }}
    >
      {children}
    </div>
  );
}
