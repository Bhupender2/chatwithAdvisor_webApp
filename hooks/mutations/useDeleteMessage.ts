import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import axios from "axios";
import { API_GROUPS } from "@/lib/api-endpoints";

export const useDeleteMessage = () => {
  const token = useAuthStore.getState().token;
  console.log("check token", token);

  const handleDeleteMessage = async (messageId: string) => {
    const response = await axios.delete(
      `${API_GROUPS.deleteForEveryone}/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.message || response.data;
  };

  return useMutation({
    mutationFn: handleDeleteMessage,
  });
};
