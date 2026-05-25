import { uploadFile } from "@/services/upload-service";
import { useMutation } from "@tanstack/react-query";

export const useUploadMutation = () => {
  return useMutation({
    mutationFn: uploadFile,
  });
};
