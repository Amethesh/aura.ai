"use client";
import React from "react";
import { IconSparkles } from "@tabler/icons-react";
import ChatView from "@/src/components/chat/ChatView";
import InputBox from "@/src/components/inputBox/InputBox";
import { useConversationMessages } from "@/src/hooks/useConversationMessages";
import { Loader2 } from "lucide-react";

export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: conversationId } = React.use(params);
  const { messages, isLoading, isError } =
    useConversationMessages(conversationId);

  // Improved loading and error states
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-background text-white items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-accent" />
        <p className="mt-4 text-lg">Loading conversation...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-screen bg-background text-white items-center justify-center">
        <p className="mt-4 text-lg text-red-500">
          Failed to load conversation.
        </p>
      </div>
    );
  }

  return (
    <section className="relative flex flex-col h-screen bg-background text-white">
      <header className="absolute flex gap-2 items-center p-4 text-sm font-semibold backdrop-blur-sm ">
        <IconSparkles size={25} className="text-accent custom-box" />
        Generate
      </header>

      <ChatView messages={messages} />

      <footer className="absolute bottom-0 z-10 w-full px-2">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col text-center">
          <InputBox conversationId={conversationId} />
        </div>
      </footer>
    </section>
  );
}
