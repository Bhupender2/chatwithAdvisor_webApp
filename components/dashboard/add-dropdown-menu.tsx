import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUploadMutation } from "@/hooks/mutations/use-upload-mutation";
import { useAuthStore } from "@/store/auth-store";
import { useChatStore } from "@/store/chat-store";
import { PlusIcon } from "lucide-react";
import { useRef } from "react";

export function AddDropDownMenu() {
  const imageRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadMutation();

  const addMessage = useChatStore((state) => state.addMessage);
  const updateMessageStatus = useChatStore(
    (state) => state.updateMessageStatus,
  );

  const conversationId = useChatStore((state) => state.conversationId);
  const senderId = useAuthStore((state) => state.senderId);
  const name = useAuthStore((state) => state.name);
  const role = useAuthStore((state) => state.role);

  const handleUpload = (file: File, type: "image" | "video" | "pdf") => {
    const tempId = `temp_${Date.now()}`;

    // step 1  turant ui mein add karde
    addMessage({
      _id: tempId,
      type: type,
      content: type === "pdf" ? file.name : "",
      conversationId: conversationId!,
      createdAt: new Date().toISOString(),
      status: "sending",
      senderId: {
        _id: senderId!,
        name: name!,
        profile: role!,
      },
      text: URL.createObjectURL(file), // ← local preview ke liye
    });

    uploadMutation.mutate(
      {
        file,
        content: type == "pdf" ? file.name : "",
      },

      {
        onSuccess: (data) => {
          updateMessageStatus(tempId, data.data._id, "sent");
        },
        onError: () => {
          updateMessageStatus(tempId, tempId, "failed");
        },
      },
    );
  };

  return (
    <>
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file, "image");
        }}
      />
      <input
        ref={videoRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file, "video");
        }}
      />
      <input
        ref={pdfRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file, "pdf");
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full">
            <PlusIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => imageRef.current?.click()}>
              Photos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => videoRef.current?.click()}>
              Videos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => pdfRef.current?.click()}>
              Files
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
