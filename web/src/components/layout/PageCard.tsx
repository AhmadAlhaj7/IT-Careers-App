import { Card } from "@/components/ui/Card";

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
// class list per page. `w-full` matters here: body is `flex flex-col`, and mx-auto's auto
// margins disable flex's default cross-axis stretch, so without it this shrink-wraps to its
// content instead of actually reaching max-width (see the identical fix on /tech-majors and
// /roadmaps).
export function PageCard({ children, maxWidth = "2xl" }: PageCardProps) {
  return (
    <div className={`mx-auto w-full ${MAX_WIDTH_CLASS[maxWidth]} px-3 py-6 sm:px-6 sm:py-10`}>
      <Card padding="lg" shadow="panel" radius="card">
        {children}
      </Card>
    </div>
  );
}
