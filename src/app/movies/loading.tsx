import MovieGridSkeleton from "@/components/MovieGridSkeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-card-border pb-8">
        <div className="space-y-4">
          <Skeleton className="h-12 w-64 md:h-16" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
      <MovieGridSkeleton count={18} />
    </div>
  );
}
