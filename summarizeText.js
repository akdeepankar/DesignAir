export async function summarizeText(text) {
    try {
        // Check if summarizer is available
        const canSummarize = await ai.summarizer.capabilities();

        if (canSummarize.available === 'readily') {
            // The summarizer can immediately be used
            const summarizer = await ai.summarizer.create();
            const result = await summarizer.summarize(text); // Summarize the text
            console.log("Summary:", result);
            return result;
        } else {
            console.log("Summarizer is not available.");
        }
    } catch (error) {
        console.error("Error during summarization:", error);
    }
}