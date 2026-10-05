export function CheckList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <>
      <h2 className="text-center text-2xl font-bold text-neutral-900">{title}</h2>
      <div className="mx-auto mt-6 flex max-w-xl flex-col gap-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-panel border border-neutral-100 bg-white px-4 py-3 shadow-subtle">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              ✓
            </span>
            <span className="text-sm text-neutral-700">{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}
