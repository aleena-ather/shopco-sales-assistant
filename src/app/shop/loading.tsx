import React from "react";

export default function ShopLoading() {
  return (
    <main className="min-h-screen bg-[#F3F5F9] pb-24 pt-6">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <div className="h-4 w-40 bg-slate-200 animate-pulse rounded mb-6" />

        <div className="flex md:space-x-6 items-start mt-4">
          {/* Sidebar Skeleton */}
          <div className="hidden md:block min-w-[280px] max-w-[280px] border border-slate-200 bg-white rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="h-6 w-24 bg-slate-200 animate-pulse rounded" />
            <div className="space-y-3 pt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-5 bg-slate-100 animate-pulse rounded w-full" />
              ))}
            </div>
            <div className="h-10 bg-slate-200 animate-pulse rounded-full w-full mt-6" />
          </div>

          {/* Grid Skeleton */}
          <div className="flex flex-col w-full space-y-5">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div className="space-y-2">
                <div className="h-8 w-60 bg-slate-200 animate-pulse rounded" />
                <div className="h-4 w-72 bg-slate-100 animate-pulse rounded" />
              </div>
              <div className="h-9 w-32 bg-slate-200 animate-pulse rounded-lg" />
            </div>

            <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4"
                >
                  <div className="w-full aspect-square bg-slate-100 animate-pulse rounded-xl" />
                  <div className="h-4 w-20 bg-blue-100 animate-pulse rounded" />
                  <div className="h-5 w-4/5 bg-slate-200 animate-pulse rounded" />
                  <div className="h-6 w-24 bg-slate-200 animate-pulse rounded" />
                  <div className="h-10 w-full bg-slate-100 animate-pulse rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

