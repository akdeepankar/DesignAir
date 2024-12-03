export async function analyzeImageWithGemini(imageDataUrl, prompt) {
    const geminiApiKey = "AIzaSyAato4UGVAG5UinCXyNY-dg56cnztGgCuA";
    const geminiApiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

    // Prepare Payload for Gemini API
    const base64Data = imageDataUrl.split(",")[1];
    const payload = {
        contents: [
            {
                parts: [
                    { text: prompt },
                    {
                        inline_data: {
                            mime_type: "image/png",
                            data: base64Data
                        }
                    }
                ]
            }
        ]
    };

    try {
        // Step 3: Send Request to Gemini API
        const response = await fetch(`${geminiApiUrl}?key=${geminiApiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("Gemini API request failed:", response.statusText);
            throw new Error("Gemini API request failed");
        }

        const analysisResult = await response.json();
        const result = analysisResult.candidates[0].content.parts[0].text;
        console.log("Gemini Analysis Result:", result);

        // Return the analysis result
        return result;

    } catch (error) {
        console.error("Error analyzing image with Gemini:", error);
        throw new Error("Error analyzing image with Gemini");
    }
}
