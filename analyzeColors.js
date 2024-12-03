// Function to handle AI request


import { fetchColorNames } from './fetchColorNames.js';



async function fetchAiResponse(prompt) {
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


async function handleAiRequest(prompt) {
    const resultCard = document.getElementById('resultCard');
    const aiResponseText = document.getElementById('aiResponseText');
    const loadingMessage = document.getElementById('loading-message2');

    try {
        loadingMessage.style.display = 'block';
        resultCard.style.display = 'none';
        // Fetch the AI response
        const result = await fetchAiResponse(prompt);
        aiResponseText.textContent = result;
    } catch (error) {
        console.error('Error running AI session:', error);
        alert(error.message);
    } finally {
        loadingMessage.style.display = 'none';
        resultCard.style.display = 'block';
    }
}

// Common function to analyze colors based on the button clicked
export async function analyzeColors(buttonId, promptSuffix) {
    const colorBoxes = document.querySelectorAll('.color-box');
    let hexCodes = Array.from(colorBoxes).map(box => {
        const hexCode = box.getAttribute('data-hex');
        return hexCode.startsWith('#') ? hexCode.slice(1) : hexCode;
    });

    if (hexCodes.length === 0) {
        alert("No colors in the palette to analyze.");
        return;
    }

    console.log('Hex codes:', hexCodes.join(', '));

    try {
        const colorNames = await fetchColorNames(hexCodes);
        const colorsForAnalysis = colorNames.join(', ');
        const prompt = `${promptSuffix}: ${colorsForAnalysis}.`;
        await handleAiRequest(prompt);
    } catch (error) {
        alert(error.message);
    }
}