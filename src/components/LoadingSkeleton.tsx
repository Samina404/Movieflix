export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="rounded-xl overflow-hidden bg-white/5 border border-white/10 animate-pulse">
          <div className="aspect-[2/3] bg-white/10" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="flex justify-between items-center">
              <div className="h-3 bg-white/10 rounded w-1/4" />
              <div className="h-3 bg-white/10 rounded w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-[400px] bg-white/5 rounded-3xl" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="aspect-[2/3] bg-white/10 rounded-2xl" />
        <div className="md:col-span-2 space-y-6">
          <div className="h-10 bg-white/10 rounded w-1/2" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-2/3" />
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="h-12 bg-white/10 rounded" />
            <div className="h-12 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
