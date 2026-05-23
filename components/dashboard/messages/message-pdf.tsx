import { Card } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

export default function PDFMessage({
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
  const pdfUrl = `https://chat.neetadvisor.com/api/uploads/${text}`;

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
        <Card className="rounded-lg   p-3 max-w-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            {/* PDF Icon */}
            <div className="w-12 h-12 rounded bg-green-100 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-green-900" />
            </div>

            {/* PDF Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{content}</p>
              <p className="text-xs text-gray-500">PDF Document</p>
            </div>

            {/* Download Button */}
            <a
              href={pdfUrl}
              target="_blank"
              download
              className="shrink-0 w-8 h-8 rounded bg-green-800 hover:bg-green-900 flex items-center justify-center transition-colors"
            >
              <Download className="w-4 h-4 text-white" />
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
