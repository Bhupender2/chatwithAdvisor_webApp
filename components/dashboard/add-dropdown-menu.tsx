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

  const handleUpload = async (file: File, type: "image" | "video" | "pdf") => {
    const tempId = `temp_${Date.now()}_${Math.random()}`; // every id will be different now

    console.log("TEMP ID CREATED:", tempId); // ← add karo

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

    // uploadMutation.mutate(
    //   {
    //     file,
    //     content: type == "pdf" ? file.name : "",
    //   },

    //   {
    //     onSuccess: (data) => {
    //       console.log("UPDATING:", tempId, "→", data.data._id); // ← add karo
    //       updateMessageStatus(tempId, data.data._id, "sent");
    //     },
    //     onError: () => {
    //       updateMessageStatus(tempId, tempId, "failed");
    //     },
    //   },
    // );
    try {
      const data = await uploadMutation.mutateAsync({
        file,
        content: type == "pdf" ? file.name : "",
      });
      updateMessageStatus(tempId, data.data._id, "sent");
    } catch {
      updateMessageStatus(tempId, tempId, "failed");
    }
  };

  return (
    <>
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        className="hidden"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files || []); // ← sab files
          files.forEach((file) => handleUpload(file, "image")); // ← har ek ke liye
        }}
      />
      <input
        ref={videoRef}
        type="file"
        accept="video/*"
        className="hidden"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files || []); // all files
          files.forEach((file) => handleUpload(file, "video")); // for each files
        }}
      />
      <input
        ref={pdfRef}
        type="file"
        accept=".pdf"
        className="hidden"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files || []); // all files aajaegi
          files.forEach((file) => handleUpload(file, "pdf")); // for each files
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

//// mutateAsync use kiya kyunki multiple files ek saath upload ho rahi hain.
// mutate ek single instance hota hai — nayi call aane pe purani cancel ho jaati hai
// isliye sirf last file ka onSuccess fire hota tha, baaki sab stuck "sending" mein rehte the.
// mutateAsync har file ko apna alag promise deta hai — sab parallel chalte hain, koi cancel nahi hota ✅
// const data = await uploadMutation.mutateAsync({
//   file,
//   content: type === "pdf" ? file.name : "",
// });
