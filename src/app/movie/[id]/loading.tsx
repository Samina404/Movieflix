import Skeleton from "@/components/ui/Skeleton";
import MovieGridSkeleton from "@/components/MovieGridSkeleton";

export default function Loading() {
  return (
    <div className="space-y-12 pb-20 min-h-screen">
      {/* Hero Header Skeleton */}
      <section className="relative w-full min-h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-[2.5rem] shadow-2xl mx-auto max-w-[98%] mt-4 bg-foreground/5">
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row gap-10 items-center">
          {/* Poster Skeleton */}
          <Skeleton className="shrink-0 w-[240px] md:w-[320px] aspect-[2/3] rounded-[2rem] shadow-2xl" />

          {/* Info Area Skeleton */}
          <div className="flex-1 space-y-6 w-full">
            <Skeleton className="h-12 md:h-20 w-3/4 mx-auto md:mx-0" />
            
            <div className="flex justify-center md:justify-start gap-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3 mx-auto md:mx-0" />
            </div>

            <div className="flex justify-center md:justify-start gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>

            <div className="pt-4 flex justify-center md:justify-start gap-4">
              <Skeleton className="h-14 w-40 rounded-xl" />
              <Skeleton className="h-14 w-48 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections Skeleton */}
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Cast Skeleton */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-32" />
            <div className="h-px flex-1 bg-card-border" />
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-full w-full" />
                <Skeleton className="h-3 w-3/4 mx-auto" />
                <Skeleton className="h-2 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Skeleton */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-48" />
            <div className="h-px flex-1 bg-card-border" />
          </div>
          <MovieGridSkeleton count={6} />
        </section>
      </div>
    </div>
  );
}
