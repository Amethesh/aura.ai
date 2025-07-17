
export interface MessageType {
  id: string;
  userPrompt: string;
  output_images: { imageUrl: string }[];
  jobId?: string | null;
  input_images?: { imageUrl: string }[];
  job_status: 'pending' | 'processing' | 'succeeded' | 'failed' | null;
  parameters?: any;
  credit_cost: number;
  error_message?: string | null;
}