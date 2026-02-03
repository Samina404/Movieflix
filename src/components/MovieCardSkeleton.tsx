import Skeleton from "./ui/Skeleton";

export default function MovieCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-[2/3] w-full rounded-2xl" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-8" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
    </div>
  );
}
