import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <Skeleton className="h-10 w-64 bg-slate-800 mb-8" /> {/* Title */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col space-y-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <Skeleton className="h-48 w-full rounded-xl bg-slate-800" /> {/* Image */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 bg-slate-800" /> {/* Title */}
              <Skeleton className="h-4 w-1/2 bg-slate-800" /> {/* Location */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}