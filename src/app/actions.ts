
'use server';

import { analyzeDeepfake, type AnalyzeDeepfakeInput } from "@/ai/flows/analyze-deepfake";

export async function runAnalysisAction(
  frameDataUri: string
) {
  if (!frameDataUri) {
    return { error: "Frame data URI is required." };
  }

  const input: AnalyzeDeepfakeInput = { frameDataUri };

  try {
    const result = await analyzeDeepfake(input);
    return result;
  } catch (error) {
    console.error("AI analysis failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during analysis.";
    return { error: `Failed to analyze the video frame. ${errorMessage}` };
  }
}
