"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

//QueryClient
// → React Query ka brain/cache manager.

// QueryClientProvider
// → pura app ko React Query access deta hai.

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60, // 1 min tak fresh data maan lo
          refetchOnWindowFocus: false, // tab switch karne pe ya window pe wapas aane pe phirse fetch mat karna data (dont call API)
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
