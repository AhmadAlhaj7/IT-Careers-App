type PageCardProps = {
  children: React.ReactNode;
  maxWidth?: "2xl" | "4xl" | "5xl";
};

const MAX_WIDTH_CLASS: Record<NonNullable<PageCardProps["maxWidth"]>, string> = {
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
};

// Shared "floating white card over the soft background blur" container used by every
// public-facing page — centralizes the one visual pattern instead of repeating the same
// class list per page.
export function PageCard({ children, maxWidth = "2xl" }: PageCardProps) {
  return (
    <div className={`mx-auto ${MAX_WIDTH_CLASS[maxWidth]} px-3 py-6 sm:px-6 sm:py-10`}>
      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-lg shadow-neutral-900/5 sm:rounded-3xl sm:p-8">
        {children}
      </div>
    </div>
  );
}
