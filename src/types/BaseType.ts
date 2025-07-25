
export interface MessageType {
  id: string;
  userPrompt: string;
  output_images: { imageUrl: string }[];
  jobId?: string | null;
  input_images?: { imageUrl: string }[];
  job_status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'starting' | null;
  parameters?: any;
  credit_cost: number;
  error_message?: string | null;
}

export interface ModelData {
  id: string;
  created_at: string;
  model_name: string;
  identifier: string;
  cost: number;
  version: string;
  description: string | null;
  model_type: string;
  base_model: string | null;
  usecase: string | null;
  cover_image: string;
  runs: string | null;
  link: string | null;
  model_uploaded: string;
  parameters: Record<string, InputBoxParameter>;
}

export interface HistoryItem {
  id: string;
  imageUrl: string;
  title: string;
  prompt: string;
}

export interface ImageCardType {
  id: number;
  image_url: string;
  prompt: string;
}

export interface InputBoxParameter {
  type: string;
  title: string;
  description?: string;
  default?: any;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  "x-order"?: number;
  format?: string
}
