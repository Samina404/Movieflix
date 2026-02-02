import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function GenreLoading() {
  return (
    <div className="space-y-8 pt-10">
      <div className="h-20 bg-white/5 rounded-2xl animate-pulse w-1/3" />
      <LoadingSkeleton />
    </div>
  );
}
