"use client";

import { PlusIcon, SendHorizonalIcon } from "lucide-react";
import { Card } from "../ui/card";
import { AddDropDownMenu } from "./add-dropdown-menu";
import { useChatStore } from "@/store/chat-store";
import { usePreviousChats } from "@/hooks/queries/use-previous-chats";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "How do I use the sidebar component?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "The sidebar component is a flexible navigation container. You can use SidebarProvider to wrap your app, then add Sidebar with SidebarContent, Header, and Footer sections. Use SidebarMenu for navigation items.",
  },
  {
    id: "3",
    role: "user",
    content: "Can I customize the colors?",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "Yes! You can customize colors using CSS variables and Tailwind classes. The sidebar uses theme tokens like bg-sidebar, text-sidebar-foreground, etc.",
  },
];

export default function ChatArea() {
  const conversationId = useChatStore((state) => state.conversationId);

  const { data: previousChats = [] } = usePreviousChats();

  console.log("converationId", conversationId);
  console.log("prev chats based on conversationId", previousChats);
  return (
    <div className="flex flex-col gap-4 p-4 h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {sampleMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <Card
              className={`max-w-md px-4 py-3 rounded-lg ${
                message.role === "user"
                  ? "bg-[#d6f3cf] text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p className="text-sm text-gray-600">{message.content}</p>
            </Card>
          </div>
        ))}
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
