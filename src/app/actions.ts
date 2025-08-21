'use server';

import { analyzeDeepfake, type AnalyzeDeepfakeInput } from "@/ai/flows/analyze-deepfake";
import { getAnalysisHistory as getHistory } from "@/lib/firestore";

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

export async function getAnalysisHistoryAction(userId: string) {
    if (!userId) {
        return { error: 'User ID is required.' };
    }
    try {
        const history = await getHistory(userId);
        // We need to serialize the data because it will be sent from the server to the client.
        // The `Date` objects inside are not serializable by default.
        return JSON.parse(JSON.stringify(history));
    } catch (error) {
        console.error("Failed to get analysis history:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        return { error: `Failed to retrieve analysis history. ${errorMessage}` };
    }
}
