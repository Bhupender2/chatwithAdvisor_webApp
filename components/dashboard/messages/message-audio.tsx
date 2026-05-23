import { Card } from "@/components/ui/card";
import { Music } from "lucide-react";

export default function AudioMessage({
  senderName,
  content,
  text,
  timestamp,
}: {
  senderName: string;
  content: string;
  text: string;
  timestamp: string;
}) {
  const audioUrl = `https://chat.neetadvisor.com/api/uploads/${text}`;

  return (
    <div className="flex gap-3 mb-4">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center shrink-0">
        <span className="text-white font-bold text-sm">
          {senderName.charAt(0)}
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
        <Card className="border-none rounded-lg   p-3 max-w-sm">
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
