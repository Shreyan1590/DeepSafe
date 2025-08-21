'use server';

import { analyzeDeepfake, type AnalyzeDeepfakeInput } from "@/ai/flows/analyze-deepfake";

export async function runAnalysisAction(
  videoDataUri: string
) {
  if (!videoDataUri) {
    return { error: "Video data URI is required." };
  }

  const input: AnalyzeDeepfakeInput = { videoDataUri };

  try {
    const result = await analyzeDeepfake(input);
    return result;
  } catch (error) {
    console.error("AI analysis failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during analysis.";
    return { error: `Failed to analyze the video. ${errorMessage}` };
  }
}
