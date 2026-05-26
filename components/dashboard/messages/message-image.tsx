import { Card } from "@/components/ui/card";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";

export default function ImageMessage({
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
  status?: "sending" | "sent" | "failed";
}) {
  const imageUrl = text.startsWith("blob:")
    ? text
    : `https://chat.neetadvisor.com/api/uploads/${text}`;

  return (
    <div className="flex gap-3 mb-4">
      {/* Avatar */}
      <div className="w-11 h-11 rounded-full bg-green-800 flex items-center justify-center hrink-0">
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
        <Card className="border-none rounded-lg overflow-hidden max-w-sm bg-[#d6f3cf] p-1 gap-0">
          <div className="relative w-full min-h-120 rounded-lg">
            <Image
              src={imageUrl}
              alt="Message image"
              fill
              className="object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            {status === "sending" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                <Loader2 className="w-8 h-8 animate-spin text-green-700" />
              </div>
            )}
          </div>
          {content && (
            <div className="p-1">
              <p className="text-sm text-gray-800">{content}</p>
            </div>
          )}

          <div className="flex justify-end p-1">
            {status === "sent" && <Check className="w-3 h-3 text-gray-500" />}
            {status === "failed" && <X className="w-3 h-3 text-red-500" />}
          </div>
        </Card>
      </div>
    </div>
  );
}
