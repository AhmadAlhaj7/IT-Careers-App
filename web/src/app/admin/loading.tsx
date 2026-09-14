import { Skeleton } from "@/components/ui/Skeleton";

// Covers every /admin/* route that doesn't define a more specific loading.tsx of its own —
// none of these routes had any loading state before (just a blank gap while the server
// component fetched), so this fills that in with a shape close enough to most admin pages
// (a heading followed by a stack of card rows) to avoid a jarring layout jump once real
// content lands.
export default function AdminLoading() {
  return (
    <div>
      <Skeleton className="h-8 w-48" />
      <div className="mt-6 flex flex-col gap-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}
