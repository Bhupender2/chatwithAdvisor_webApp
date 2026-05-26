import { Card } from "@/components/ui/card";
import { Check, Clock, X } from "lucide-react";
import Linkify from "linkify-react";

// format function

// Linkify hatao — seedha dangerouslySetInnerHTML use karo
// Linkify bhi HTML mein handle karo format function mein:

const formatWhatsAppWithLinks = (text: string) => {
  return text
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>") // *bold*
    .replace(/_(.*?)_/g, "<em>$1</em>") // _italic_
    .replace(/~(.*?)~/g, "<del>$1</del>") // ~strikethrough~
    .replace(
      /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline cursor-pointer break-all">$1</a>',
    );
};

export default function TextMessage({
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
  status?: "sending" | "sent" | "failed"; // ← add karo
}) {
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
        <Card className="bg-[#d6f3cf] border-none rounded-lg p-3 max-w-md flex flex-row space-x-2">
          <Linkify
            options={{
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-blue-600 underline cursor-pointer break-all",
            }}
          >
            <p
              className="text-sm text-gray-700 flex-1 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: formatWhatsAppWithLinks(content),
              }}
            />
          </Linkify>
          {/* Status icons */}
          <div className="flex justify-end mt-1">
            {status === "sending" && (
              <Clock className="w-3 h-3 text-gray-400" />
            )}
            {status === "sent" && <Check className="w-3 h-3 text-gray-500" />}
            {status === "failed" && <X className="w-3 h-3 text-red-500" />}
          </div>
        </Card>
      </div>
    </div>
  );
}
