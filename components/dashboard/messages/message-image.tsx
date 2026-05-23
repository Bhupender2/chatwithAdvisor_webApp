import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function ImageMessage({
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
  const imageUrl = `https://chat.neetadvisor.com/api/uploads/${text}`;

  return (
    <div className="flex gap-3 mb-4">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hrink-0">
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
        <Card className="border-none rounded-lg overflow-hidden max-w-sm bg-[#d6f3cf] p-1">
          <div className="relative w-full h-60 rounded-lg">
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
