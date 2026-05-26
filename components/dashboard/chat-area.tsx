"use client";

import { Loader2, SendHorizonalIcon } from "lucide-react";
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
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { getSocket } from "@/services/socket-service";

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

  // senderId object hai ya string?
  const senderName =
    typeof senderId === "object"
      ? senderId.name // TanStack message → real name . // or sender ka naam
      : "NeetAdvisor"; // Socket message → fallback
  // 3 cases:
  // 1. TanStack API → real sender name
  // 2. Tera apna message → authStore.name
  // 3. (future) agar socket object bheje → real name
  // Socket string aaya → fallback

  switch (type) {
    case "text":
      return (
        <TextMessage
          key={_id}
          senderName={senderName}
          content={content}
          text={text}
          timestamp={createdAt}
          status={(message as any).status}
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
          status={(message as any).status}
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
          status={(message as any).status}
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
          status={(message as any).status}
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
  const [inputText, setInputText] = useState("");

  const addMessage = useChatStore((state) => state.addMessage);
  const updateMessageStatus = useChatStore(
    (state) => state.updateMessageStatus,
  );
  const liveMessage = useChatStore((state) => state.liveMessages);
  const token = useAuthStore((state) => state.token);
  const senderId = useAuthStore((state) => state.senderId);
  const name = useAuthStore((state) => state.name);
  const role = useAuthStore((state) => state.role);

  // useeffect is addded here

  useEffect(() => {
    if (!token || !conversationId) return;

    const socket = getSocket(token);

    //room join karo
    socket.emit("conversation:join", {
      conversationId,
    });

    // new messages

    socket.on("conversation:new", (data) => {
      // apna message

      if (data.senderId === senderId) {
        if (data.type === "text") {
          const tempMessage = useChatStore
            .getState()
            .liveMessages.find(
              (msg) => msg.content === data.content && msg.status === "sending",
            );

          if (tempMessage) {
            updateMessageStatus(tempMessage._id, data._id, "sent");
          }
        }
        return;
      }

      // doosre ka message
      addMessage({
        _id: data._id,
        type: data.type,
        content: data.content,
        conversationId: data.conversationId,
        createdAt: data.createdAt,
        status: "sent",
        senderId: data.senderId, // string aayega → renderMessage handle karega
        text: data.text,
      });
    });

    return () => {
      socket.emit("conversation:leave", {
        conversationId,
      });
      socket.off("conversation:new");
    };
  }, [conversationId]);

  const {
    data: previousChats,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePreviousChats();

  console.log("converationId", conversationId);
  console.log("prev chats based on conversationId", previousChats);

  const allMessages =
    previousChats?.pages
      ?.slice()
      ?.reverse()
      .flatMap((page) => page.messages) || [];

  const handleSendText = () => {
    if (!inputText.trim()) return;
    if (!token) return;

    const tempId = `temp_${Date.now()}`;

    // Step 1 — turant UI mein add karo
    addMessage({
      _id: tempId,
      type: "text",
      content: inputText,
      conversationId: conversationId!,
      createdAt: new Date().toISOString(),
      status: "sending",
      senderId: {
        _id: senderId!,
        name: name!,
        profile: role!,
      },
    });

    setInputText(""); // input clear karo

    // step 2 get socket
    const socket = getSocket(token);
    socket.emit("conversation:send", {
      type: "text",
      content: inputText,
      conversationId: conversationId,
    });
  };
  return (
    <div className="flex flex-col gap-4 p-4 h-full bg-gray-100/80 rounded-lg">
      {isLoading ? (
        <ChatSkeletonLoader />
      ) : allMessages?.length > 0 || liveMessage?.length > 0 ? (
        <div className="flex-1 overflow-y-auto space-y-4 ">
          {hasNextPage && !isFetchingNextPage && (
            <div
              className="w-fit drop-shadow-2xl px-6 py-2 rounded-md text-xs mx-auto bg-white cursor-pointer text-gray-700 hover:scale-110 transition-all duration-300 ease-in-out"
              onClick={() => fetchNextPage()}
            >
              click to get more messages
            </div>
          )}
          {!hasNextPage && (
            <div className="w-fit drop-shadow-2xl px-6 py-2 rounded-md text-xs mx-auto bg-white cursor-pointer text-gray-700 hover:scale-110 transition-all duration-300 ease-in-out">
              no more messages
            </div>
          )}
          {isFetchingNextPage && (
            <div className="p-2 bg-white w-fit rounded-full mx-auto drop-shadow-2xl">
              <Loader2
                className="animate-spin text-green-600 w-7 h-7"
                strokeWidth={2.3}
              />
            </div>
          )}

          {[...allMessages, ...liveMessage]?.map((message: Message) =>
            renderMessage(message),
          )}
        </div>
      ) : (
        <ChatEmptyState />
      )}

      {/* Input */}
      <div className="flex gap-2 items-center">
        <AddDropDownMenu />
        {/* Fix */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendText();
            }
          }}
          rows={1}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
        />
        <button className="px-3 py-3 bg-green-700 text-primary-foreground rounded-full hover:bg-green-800 transition-colors font-medium">
          <SendHorizonalIcon onClick={handleSendText} />
        </button>
      </div>
    </div>
  );
}

//the parent component:does NOT render its own DOM element passes/injects its behavior + styling into child
