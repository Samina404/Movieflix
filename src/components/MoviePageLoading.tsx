import MovieGridSkeleton from "@/components/MovieGridSkeleton";
import Skeleton from "@/components/ui/Skeleton";

interface MoviePageLoadingProps {
  titleWidth?: string;
  count?: number;
}

export default function MoviePageLoading({ 
  titleWidth = "w-64", 
  count = 12 
}: MoviePageLoadingProps) {
  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-4">
          <Skeleton className={`h-12 md:h-16 ${titleWidth}`} />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <MovieGridSkeleton count={count} />
    </div>
  );
}
