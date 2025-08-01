import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/src/lib/supabase/client";
import { MessageType } from "@/src/types/BaseType";
import { useEffect } from "react";

export function useConversationMessages(conversationId: string) {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const queryKey = ["messages", conversationId];

  const { data: messages = [], isLoading, isError } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_conversation_messages", {
        p_conversation_id: conversationId,
      });
      if (error) {
        throw new Error(error.message);
      }
      return data || [];
    },
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    let mounted = true;
    const channel = supabase
      .channel(`conversation_updates:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "jobs",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          if (mounted) {
            console.log("Real-time update received, invalidating query:", queryKey);
            queryClient.invalidateQueries({ queryKey });
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase, queryClient, queryKey]);

  return { messages, isLoading, isError };
}