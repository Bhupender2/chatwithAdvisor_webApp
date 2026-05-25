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
  addMessage: (message: Message) => void;
  updateMessageStatus: (
    tempId: string,
    realId: string,
    status: "sending" | "sent" | "failed",
  ) => void;
  clearMessages: () => void;
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
          liveMessages: [], //  naya conversationId open hote hi clear kardo
        }),

      addMessage: (message: Message) => {
        set((state) => {
          // duplicate check
          const exists = state.liveMessages.some(
            (msg) => msg._id === message._id,
          );
          if (exists) return state;
          return {
            liveMessages: [...state.liveMessages, message], // add that message here ..
          };
        });
      },
      updateMessageStatus: (tempId, realId, status) => {
        set((state) => ({
          liveMessages: state.liveMessages.map((msg) =>
            msg._id === tempId ? { ...msg, _id: realId, status } : msg,
          ),
        }));
      },
      clearMessages: () => set({ liveMessages: [] }),
      clearChat: () => {
        set({
          conversationId: null, // conversation id is being null
          liveMessages: [], // all the live Messages is also cleared
        });
      },
    }),
    {
      name: "chat-storage",
    },
  ),
);
