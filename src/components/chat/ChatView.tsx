// src/components/conversation/ChatView.tsx
"use client";

// No more useState, useEffect, or supabase client here!
import MessageBox from "./MessageBox";
import { MessageType } from "@/src/types/MessageType";

interface ChatViewProps {
  messages: MessageType[];
}

// This is now a simple "dumb" component that just renders what it's given.
export default function ChatView({ messages }: ChatViewProps) {
  return (
    <div className="w-full flex flex-col-reverse items-center h-full overflow-y-auto gap-12 pb-48 pt-8 px-4">
      {messages.map((message) => (
        <MessageBox key={message.id} message={message} />
      ))}
    </div>
  );
}
