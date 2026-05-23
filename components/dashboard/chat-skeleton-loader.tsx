"use client";

export function ChatSkeletonLoader() {
  return (
    <div className="flex-1 space-y-4 py-2">
      {/* Message 1 */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-300 to-gray-400 animate-pulse hrink-0" />
        <div className="space-y-2 flex-1 max-w-xs">
          <div className="h-4 bg-gray-300 rounded animate-pulse w-28" />
          <div className="h-30 bg-gray-200 rounded-lg animate-pulse w-180" />
        </div>
      </div>

      {/* Message 2 */}
      <div className="flex items-start gap-3 justify-end mr-20">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-300 to-gray-400 animate-pulse hrink-0" />
        <div className="space-y-2 flex-1 max-w-xs">
          <div className="h-4 bg-gray-300 rounded animate-pulse w-28" />
          <div className="h-30 bg-gray-200 rounded-lg animate-pulse w-96" />
        </div>
      </div>

      {/* Message 3 */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-300 to-gray-400 animate-pulse shrink-0" />
        <div className="space-y-2 flex-1 max-w-sm">
          <div className="h-4 bg-gray-300 rounded animate-pulse w-28" />
          <div className="h-30 bg-gray-200 rounded-lg animate-pulse w-180" />
        </div>
      </div>

      {/* Message 4 */}
      <div className="flex items-start gap-3 justify-end mr-20">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-300 to-gray-400 animate-pulse hrink-0" />
        <div className="space-y-2 flex-1 max-w-xs">
          <div className="h-4 bg-gray-300 rounded animate-pulse w-28" />
          <div className="h-30 bg-gray-200 rounded-lg animate-pulse w-96" />
        </div>
      </div>
    </div>
  );
}
