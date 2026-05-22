import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConversationState {
  conversationId: string | null;
  setConversationId: (conversationId: string) => void;
}

export const useChatStore = create<ConversationState>()(
  persist(
    (set) => ({
      conversationId: null,
      setConversationId: (conversationId) =>
        set({
          conversationId: conversationId,
        }),
    }),
    {
      name: "chat-storage",
    },
  ),
);
