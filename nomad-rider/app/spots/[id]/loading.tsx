// app/spots/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-8 animate-pulse">
      {/* Back button skeleton */}
      <div className="h-6 w-32 bg-slate-800 rounded mb-8" />
      
      {/* Big Hero Image skeleton */}
      <div className="w-full h-72 md:h-96 bg-slate-800 rounded-3xl mb-8" />
      
      {/* Title & Info skeletons */}
      <div className="space-y-4">
        <div className="h-10 w-2/3 bg-slate-800 rounded" />
        <div className="h-6 w-1/3 bg-slate-800 rounded" />
        
        {/* Wi-Fi Box skeleton */}
        <div className="h-32 w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl" />
      </div>
    </div>
  );
}