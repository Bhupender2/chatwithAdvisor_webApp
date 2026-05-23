import { fetchPreviousChats } from "@/services/chat-service";
import { useQuery } from "@tanstack/react-query";

export const usePreviousChats = () => {
  return useQuery({
    queryKey: ["previous_chat"],
    queryFn: fetchPreviousChats,
  });
};
