// app/conversation/[id]/page.tsx
"use client"; // Make this a client component

import React, { useState, useEffect } from "react";
import { IconSparkles } from "@tabler/icons-react";

import { MessageType } from "@/src/types/MessageType";
import ChatView from "@/src/components/chat/ChatView";
import InputBox from "@/src/components/inputBox/InputBox";
import { createClient } from "@/src/lib/supabase/client";

export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: conversationId } = React.use(params);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // This function will be passed to the InputBox for optimistic updates
  const handleNewMessage = (optimisticMessage: MessageType) => {
    setMessages((currentMessages) => [...currentMessages, optimisticMessage]);
  };

  // This function will fetch/re-fetch data and update the state
  const fetchMessages = async () => {
    const { data, error } = await supabase.rpc("get_conversation_messages", {
      p_conversation_id: conversationId,
    });
    if (error) {
      console.error("Error fetching messages:", error);
    } else {
      setMessages(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Fetch initial data
    fetchMessages();

    // Set up the real-time subscription
    const channel = supabase
      .channel(`realtime:conversation:${conversationId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "jobs" },
        (payload) => {
          const isJobRelevant = messages.some(
            (msg) => msg.jobId === payload.new.id
          );
          if (isJobRelevant) {
            console.log("Relevant job updated, re-fetching conversation...");
            fetchMessages(); // Re-fetch all data to get the final state
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]); // Re-run if conversationId changes

  if (isLoading) {
    return <div>Loading conversation...</div>; // Or a nice skeleton loader
  }

  return (
    <section className="relative flex flex-col h-screen bg-background text-white">
      <header className="flex gap-2 items-center p-4 text-lg font-semibold border-b border-gray-800">
        <IconSparkles size={30} className="text-accent" />
        Generate
      </header>

      {/* ChatView now just displays the state from this parent */}
      <ChatView messages={messages} />

      <footer className="absolute bottom-0 z-10 w-full px-2">
        <div className="relative mx-auto flex w-full max-w-3xl flex-col text-center">
          {/* Pass the handler function to the InputBox */}
          <InputBox
            conversationId={conversationId}
            onNewMessage={handleNewMessage}
          />
        </div>
      </footer>
    </section>
  );
}
