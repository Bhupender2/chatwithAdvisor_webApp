import { API_GROUPS } from "@/lib/api-endpoints";
import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

export const fetchPreviousChats = async () => {
  const token = useAuthStore.getState().token;
  const response = await axios.get(API_GROUPS.getPreviousChat, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
