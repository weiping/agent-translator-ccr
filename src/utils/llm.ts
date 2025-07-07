import { createOpenAI } from "@ai-sdk/openai";
import { LanguageModel } from "ai";
import 'dotenv/config'

export const openai = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
});

export const getLanguageModel = (modelName?: string): LanguageModel => {
  const finalModelName = modelName ?? process.env.MODEL_NAME ?? "doubao-seed-1-6-250615";
  return openai(finalModelName);
}
