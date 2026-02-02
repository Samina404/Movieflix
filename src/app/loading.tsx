import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="space-y-12">
      <div className="h-[60vh] bg-white/5 rounded-3xl animate-pulse" />
      <LoadingSkeleton />
    </div>
  );
}
