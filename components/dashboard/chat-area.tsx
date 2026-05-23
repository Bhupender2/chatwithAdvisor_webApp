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
import { ChatSkeletonLoader } from "./chat-skeleton-loader";
import { ChatEmptyState } from "./chat-empty-state";

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
  const { senderId, text, type, content, createdAt, _id } = message;
  const senderName = senderId.name;
  switch (type) {
    case "text":
      return (
        <TextMessage
          key={_id}
          senderName={senderName}
          content={content}
          text={text}
          timestamp={createdAt}
        />
      );
    case "image":
      return (
        <ImageMessage
          key={_id}
          senderName={senderName}
          content={content}
          text={text}
          timestamp={createdAt}
        />
      );
    case "video":
      return (
        <VideoMessage
          key={_id}
          senderName={senderName}
          content={content}
          text={text}
          timestamp={createdAt}
        />
      );
    case "pdf":
      return (
        <PDFMessage
          key={_id}
          senderName={senderName}
          content={content}
          text={text}
          timestamp={createdAt}
        />
      );
    case "audio":
      return (
        <AudioMessage
          key={_id}
          senderName={senderName}
          content={content}
          text={text}
          timestamp={createdAt}
        />
      );
    default:
      return null;
  }
}

export default function ChatArea() {
  const conversationId = useChatStore((state) => state.conversationId);

  const { data: previousChats = [], isLoading } = usePreviousChats();

  console.log("converationId", conversationId);
  console.log("prev chats based on conversationId", previousChats.messages);
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      {isLoading ? (
        <ChatSkeletonLoader />
      ) : previousChats?.message?.length > 0 ? (
        <div className="flex-1 overflow-y-auto space-y-4">
          {previousChats?.messages?.map((message: Message) =>
            renderMessage(message),
          )}
        </div>
      ) : (
        <ChatEmptyState />
      )}

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
