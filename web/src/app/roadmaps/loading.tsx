import { Skeleton } from "@/components/ui/Skeleton";

export default function RoadmapsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-3 py-10 sm:px-6 sm:py-16">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="mt-4 h-8 w-64" />
      <Skeleton className="mt-3 h-16 w-full max-w-3xl" />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-72 w-full rounded-card" />
        ))}
      </div>
    </div>
  );
}
