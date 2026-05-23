"use client";

import { PlusIcon, SendHorizonalIcon } from "lucide-react";
import { Card } from "../ui/card";
import { AddDropDownMenu } from "./add-dropdown-menu";
import { useChatStore } from "@/store/chat-store";
import { usePreviousChats } from "@/hooks/queries/use-previous-chats";
import TextMessage from "./messages/message-text";
import ImageMessage from "./messages/message-image";
import VideoMessage from "./messages/message-video";
import PDFMessage from "./messages/message-pdf";
import AudioMessage from "./messages/message-audio";

interface Message {
  _id: string;
  senderId: {
    _id: string;
    name: string;
    profile: string;
  };
  text: string;
  type: "text" | "audio" | "video" | "pdf" | "image";
  content: string;
  createdAt: string;
}

function renderMessage(message: Message) {
  const { senderId, text, type, content, createdAt } = message;
  const senderName = senderId.name;
  switch (type) {
    case "text":
      return <TextMessage />;
    case "image":
      return <ImageMessage />;
    case "video":
      return <VideoMessage />;
    case "pdf":
      return <PDFMessage />;
    case "audio":
      return <AudioMessage />;
    default:
      return null;
  }
}

export default function ChatArea() {
  const conversationId = useChatStore((state) => state.conversationId);

  const { data: previousChats = [] } = usePreviousChats();

  console.log("converationId", conversationId);
  console.log("prev chats based on conversationId", previousChats.messages);
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {previousChats?.messages?.map((message: Message) =>
          renderMessage(message),
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 items-center">
        <AddDropDownMenu />
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button className="px-3 py-3 bg-green-700 text-primary-foreground rounded-full hover:bg-green-800 transition-colors font-medium">
          <SendHorizonalIcon />
        </button>
      </div>
    </div>
  );
}

//the parent component:does NOT render its own DOM element passes/injects its behavior + styling into child
