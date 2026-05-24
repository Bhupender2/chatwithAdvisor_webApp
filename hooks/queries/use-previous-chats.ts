import { fetchPreviousChats } from "@/services/chat-service";
import { useChatStore } from "@/store/chat-store";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePreviousChats = () => {
  const conversationId = useChatStore.getState().conversationId;
  return useInfiniteQuery({
    queryKey: ["previous_chat", conversationId],
    queryFn: fetchPreviousChats,
    enabled: !!conversationId, // !! makes the value boolean
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }
      return lastPage.nextCursor; // next page cursor (_id) to pass
    },
  });
};
