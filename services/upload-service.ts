import { API_GROUPS } from "@/lib/api-endpoints";
import { useAuthStore } from "@/store/auth-store";
import { useChatStore } from "@/store/chat-store";
import axios from "axios";

type UploadPayload = {
  file: File;
  content: string;
};

export const uploadFile = async (payload: UploadPayload) => {
  const token = useAuthStore.getState().token;
  const conversationId = useChatStore.getState().conversationId;

  const formData = new FormData();
  formData.append("files", payload.file);
  formData.append("content", payload.content);
  formData.append("conversationId", conversationId!);

  const response = await axios.post(API_GROUPS.upload, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
