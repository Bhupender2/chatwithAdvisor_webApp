import { Card } from "@/components/ui/card";
import { Music } from "lucide-react";
import MessageActionMenu from "../message-action-menu";

export default function AudioMessage({
  senderName,
  content,
  text,
  timestamp,
  status,
  messageId,
  onDelete,
}: {
  senderName: string;
  content: string;
  text: string;
  timestamp: string;
  status?: "sending" | "sent" | "failed"; // ← add karo
  messageId: string;
  onDelete: (id: string) => void; // ← string parameter chahiye
}) {
  const audioUrl = `https://chat.neetadvisor.com/api/uploads/${text}`;

  return (
    <div className="flex gap-3 mb-4">
      {/* Avatar */}
      <div className="w-11 h-11 rounded-full bg-green-800 flex items-center justify-center shrink-0">
        <span className="text-white font-bold text-sm">
          {senderName
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()}
        </span>
      </div>

      {/* Message Content */}
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-gray-900 text-sm">
            {senderName}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        </div>
        <Card className="border-none rounded-lg   p-3 max-w-sm relative group">
          {/* dropdown icon */}
          <MessageActionMenu
            messageId={messageId}
            onDelete={() => onDelete(messageId)}
          />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center shrink-0">
              <Music className="w-5 h-5 text-white" />
            </div>
            <audio
              src={audioUrl}
              controls
              controlsList="nodownload"
              className="flex-1 h-8"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
