import { fetchPreviousChats } from "@/services/chat-service";
import { useChatStore } from "@/store/chat-store";
import { useQuery } from "@tanstack/react-query";

export const usePreviousChats = () => {
  const conversationId = useChatStore.getState().conversationId;
  return useQuery({
    queryKey: ["previous_chat", conversationId],
    queryFn: fetchPreviousChats,
    enabled: !!conversationId, // !! makes the value boolean
  });
};
