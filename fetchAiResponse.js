export async function fetchAiResponse(prompt) {
    try {
        // Fetch AI capabilities
        const { available, defaultTemperature, defaultTopK, maxTopK } = await ai.languageModel.capabilities();

        console.log('AI model capabilities:', {
            available,
            defaultTemperature,
            defaultTopK,
            maxTopK
        });

        // Check if the AI model is available
        if (available === "no") {
            throw new Error("AI model is currently unavailable.");
        }

        // Create a session with a system prompt
        const session = await ai.languageModel.create({
            systemPrompt: "You are a Color Theory Specialist. Answer concisely."
        });

        // Prompt the session and return the result
        const result = await session.prompt(prompt);
        return result;
    } catch (error) {
        console.error('Error fetching AI response:', error);
        throw new Error("Failed to fetch AI response.");
    }
}