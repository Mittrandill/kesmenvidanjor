const formatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export function BalanceDisplay({
  balance,
  size = "md",
}: {
  balance: number;
  size?: "sm" | "md";
}) {
  const isDebt = balance > 0;
  const label = isDebt ? "Borçlu" : balance < 0 ? "Alacaklı" : "Bakiye sıfır";

  return (
    <div>
      <p
        className={
          size === "md"
            ? `text-3xl font-extrabold ${isDebt ? "text-brand-600" : "text-green-600"}`
            : `text-lg font-bold ${isDebt ? "text-brand-600" : "text-green-600"}`
        }
      >
        {formatter.format(Math.abs(balance))}
      </p>
      <p className="text-sm text-ink-500">{label}</p>
    </div>
  );
}
