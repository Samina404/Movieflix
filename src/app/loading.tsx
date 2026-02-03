import Skeleton from "@/components/ui/Skeleton";
import MovieGridSkeleton from "@/components/MovieGridSkeleton";

export default function Loading() {
  return (
    <div className="space-y-12 pb-20">
      <div className="-space-y-4">
        {/* Hero Skeleton */}
        <Skeleton className="relative w-full aspect-[21/9] min-h-[450px] rounded-3xl" />
        
        {/* Genre Bar Skeleton */}
        <div className="relative z-10 flex gap-3 px-6 py-4 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-28 shrink-0 rounded-2xl" />
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-48" />
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <MovieGridSkeleton count={12} />
      </div>
    </div>
  );
}
