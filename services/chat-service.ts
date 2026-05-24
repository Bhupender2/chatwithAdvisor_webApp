import { API_GROUPS } from "@/lib/api-endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useChatStore } from "@/store/chat-store";
import axios from "axios";

export const fetchPreviousChats = async ({ pageParam }) => {
  const token = useAuthStore.getState().token;
  const conversationId = useChatStore.getState().conversationId;
  const response = await axios.get(API_GROUPS.getPreviousChat, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      conversationId: conversationId,
      ...(pageParam ? { cursor: pageParam } : {}), // for next message .
    },
  });
  return response.data;
};
