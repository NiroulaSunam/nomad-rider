// app/find-spots/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="h-10 w-48 bg-slate-800 animate-pulse rounded-lg mb-8" /> {/* Title Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl h-80 animate-pulse">
            <div className="h-48 bg-slate-800 rounded-t-2xl" /> {/* Image area */}
            <div className="p-5 space-y-3">
              <div className="h-6 bg-slate-800 rounded w-3/4" /> {/* Title line */}
              <div className="h-4 bg-slate-800 rounded w-1/2" /> {/* Location line */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}