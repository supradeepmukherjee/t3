export interface Model {
  id: string;
  canonical_slug: string;
  hugging_face_id: string | null;
  name: string;
  created: number;
  description: string;
  context_length: number;
  architecture: Architecture;
  pricing: Pricing;
  top_provider: TopProvider;
  per_request_limits: PerRequestLimits | null;
  supported_parameters: string[];
  default_parameters: DefaultParameters;
  expiration_date: string | null;
}

export interface Architecture {
  modality: string;
  input_modalities: string[];
  output_modalities: string[];
  tokenizer: string;
  instruct_type: string | null;
}

export interface Pricing {
  prompt: string;
  completion: string;

  // Optional pricing fields (only present on some models)
  image?: string;
  audio?: string;
  web_search?: string;
  internal_reasoning?: string;
  request?: string
  input_cache_read?: string;
  input_cache_write?: string;
}

export interface TopProvider {
  context_length: number;
  max_completion_tokens: number | null;
  is_moderated: boolean;
}

export type PerRequestLimits = Record<string, unknown>;

export interface DefaultParameters {
  temperature: number | null;
  top_p: number | null;
  frequency_penalty: number | null;
}