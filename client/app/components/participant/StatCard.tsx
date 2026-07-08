export function StatCard({
  label,
  value,
  sub,
  subClassName = "text-muted",
}: {
  label: string;
  value: string;
  sub: string;
  subClassName?: string;
}) {
  return (
    <div className="rounded-2xl border border-stroke-soft bg-white p-5">
      <div className="mb-2 text-[13px] text-muted">{label}</div>
      <div className="mb-1 text-[26px] font-bold text-brand-navy">{value}</div>
      <div className={`text-[12.5px] ${subClassName}`}>{sub}</div>
    </div>
  );
}
