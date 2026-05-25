import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Message {
  _id: string;
  senderId?: {
    _id: string;
    name: string;
    profile: string;
  };
  conversationId: string;
  content: string;
  type: "text" | "image" | "video" | "audio" | "pdf";
  text?: string; // like when i am getting text it doesnt have the text key others have
  createdAt: string;
  status: "sending" | "sent" | "failed";
}

interface ConversationState {
  conversationId: string | null;
  liveMessages: Message[];
  setConversationId: (conversationId: string) => void;
  clearChat: () => void;
}

export const useChatStore = create<ConversationState>()(
  persist(
    (set) => ({
      conversationId: null,
      liveMessages: [], // socket + optimistic messages yahan
      setConversationId: (conversationId) =>
        set({
          conversationId: conversationId,
          // liveMessages;[] //  naya conversationId open hote hi clear kardo
        }),
      clearChat: () => {
        set({
          conversationId: null, // conversation id is being null
        });
      },
    }),
    {
      name: "chat-storage",
    },
  ),
);
