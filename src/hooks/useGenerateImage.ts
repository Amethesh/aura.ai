import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MessageType } from "@/src/types/MessageType";

type GenerationParams = {
  prompt: string;
  batchCount: number;
  ratio: string;
  quality: string;
  enhancePrompt: boolean;
  conversationId?: string;
};

const generateImage = async (formData: GenerationParams) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await response.json();
  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error("network");
    }
    throw new Error(result.error || "An unknown error occurred.");
  }
  return result;
};

export function useGenerateImage(conversationId?: string) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const queryKey = ["messages", conversationId];

  return useMutation({
    mutationFn: (params: GenerationParams) => generateImage(params),
    onMutate: async (newGeneration) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData<MessageType[]>(queryKey);

      const optimisticMessage: MessageType = {
        id: crypto.randomUUID(),
        userPrompt: newGeneration.prompt,
        job_status: "pending",
        output_images: [],
        parameters: {
          num_of_output: newGeneration.batchCount,
          aspect_ratio: newGeneration.ratio,
        },
        credit_cost: newGeneration.batchCount,
        error_message: null,
        jobId: null,
      };

      queryClient.setQueryData<MessageType[]>(queryKey, (old = []) => [
        optimisticMessage,
        ...old,
      ]);

      return { previousMessages };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(queryKey, context.previousMessages);
      }
    },
    onSettled: (data) => {
      if (!conversationId && data?.conversationId) {
        router.push(`/image/generate/${data.conversationId}`);
      } else {
        queryClient.invalidateQueries({ queryKey });
      }
    },
    // Add retry logic for network errors
    retry: (failureCount, error) => {
      return error.message === 'network' && failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}