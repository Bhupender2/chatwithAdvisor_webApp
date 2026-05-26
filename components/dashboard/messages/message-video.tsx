import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export default function VideoMessage({
  senderName,
  content,
  text,
  timestamp,
  status,
}: {
  senderName: string;
  content: string;
  text: string;
  timestamp: string;
  status: "Sending" | "sent" | "failed";
}) {
  const videoUrl = `https://chat.neetadvisor.com/api/uploads/${text}`;

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
        <Card className="border-none rounded-lg overflow-hidden max-w-sm bg-[#d6f3cf] gap-0 py-0 p-1">
          <div className="relative w-full h-60 flex items-center justify-center group cursor-pointer">
            <video
              src={videoUrl}
              className="w-full h-full object-cover rounded-lg"
              controls
              controlsList="nodownload"
            />
            {/* <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div> */}
          </div>
          {content && (
            <div className="p-1">
              <p className="text-sm text-gray-800">{content}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
