"use client";

import { MessageCircle } from "lucide-react";

export function ChatEmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <MessageCircle className="w-8 h-8 text-gray-600" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-gray-900">No Messages Yet</h3>
        <p className="text-base text-gray-600 w-fit">
          This conversation is empty. Messages will appear here when sent.
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        <div
          className="w-5 h-5 rounded-full bg-green-400 animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="w-5 h-5 rounded-full bg-green-500 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-5 h-5 rounded-full bg-green-600 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
}
