import { Card } from "@/components/ui/card";

export default function TextMessage({
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
        <Card className="bg-[#d6f3cf] border-none rounded-lg p-3 max-w-md">
          <p className="text-sm text-gray-700">{content}</p>
        </Card>
      </div>
    </div>
  );
}
