import { analyzeImageWithGemini } from "./imageToGemini.js";

export async function captureAndAnalyzeTab() {
    const captureImageBtn = document.getElementById("captureImageBtn");
    const successIcon = document.getElementById("successIcon");
    const promptButtons = document.getElementById("promptButtons");
    const loadingMessage = document.getElementById("loadingMessage");
    const outputContainer = document.getElementById("analysisOutput");

    try {
        // Step 1: Show loading message
        loadingMessage.style.display = "block";
        outputContainer.style.display = "none";
        successIcon.style.display = "none";
        promptButtons.style.display = "none";

        // Step 2: Capture visible tab
        const screenshotDataUrl = await chrome.tabs.captureVisibleTab(null, { format: "png" });

        if (!screenshotDataUrl) {
            console.error("Failed to capture tab image.");
            loadingMessage.style.display = "none";
            return;
        }

        // Step 3: Update UI on capture success
        loadingMessage.style.display = "none";
        successIcon.style.display = "block";
        promptButtons.style.display = "flex";

        // Add event listeners to buttons with different prompts
        document.getElementById("identifyObjectsBtn").onclick = () => analyzeImage(screenshotDataUrl, "Identify objects in the image.");
        document.getElementById("caseStudyBtn").onclick = () => analyzeStudy(screenshotDataUrl, "Write a Design case study based on the shared Context."); // Invoke analyzedCaseStudy
        document.getElementById("designerInsightBtn").onclick = () => analyzeStudy(screenshotDataUrl, "Provide research on design trends, consumer behavior, or historical design styles, and presenting findings in a visually engaging manner");
    } catch (error) {
        console.error("Error capturing tab:", error);
    }
}

async function analyzeImage(imageDataUrl, prompt) {
    const loadingMessage = document.getElementById("loadingMessage");
    const outputContainer = document.getElementById("analysisOutput");

    try {
        // Step 1: Show loading message
        loadingMessage.style.display = "block";
        outputContainer.style.display = "none";

        // Step 2: Call the analyzeImageWithGemini function
        const analysisResult = await analyzeImageWithGemini(imageDataUrl, prompt);

        // Step 3: Display the Result
        loadingMessage.style.display = "none";
        outputContainer.style.display = "block";

        // Handle Markdown-like response formatting
        if (analysisResult) {
            const responseText = analysisResult;

            // Convert line breaks and Markdown-like headers to HTML
            const formattedResponse = responseText
                .replace(/##\s(.*)/g, "<h2>$1</h2>") // Convert ## headers to <h2>
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>
                .replace(/\n/g, "<br>"); // Convert line breaks to <br>

            outputContainer.innerHTML = formattedResponse; // Display as HTML
        } else {
            outputContainer.innerText = "No meaningful result found. Please try again.";
        }
    } catch (error) {
        console.error("Error analyzing image:", error);
        loadingMessage.style.display = "none";
    }
}

async function analyzeStudy(imageDataUrl, prompt) {
    const loadingMessage = document.getElementById("loadingMessage");
    const outputContainer = document.getElementById("analysisOutput");

    try {
        // Step 1: Show loading message
        loadingMessage.style.display = "block";
        outputContainer.style.display = "none";

        // Step 2: Call analyzeImage function for analysis
        const analysisResult = await analyzeImageWithGemini(imageDataUrl, "Describe the image");

        // Step 3: If successful, generate the case study
        if (analysisResult) {
            // Use your AI writer to generate the case study based on the analysis result
            const writer = await ai.writer.create({
                sharedContext: analysisResult
            });

            const result = await writer.write(
                prompt,
                { context: "For Design Studies and Assignments" }
            );

            // Step 4: Display the case study
            loadingMessage.style.display = "none";
            outputContainer.style.display = "block";

            const caseStudyText = result ? result : "No case study generated. Please try again.";
            outputContainer.innerText = caseStudyText;
        } else {
            outputContainer.innerText = "No meaningful result found. Please try again.";
            loadingMessage.style.display = "none";
        }
    } catch (error) {
        console.error("Error generating case study:", error);
        loadingMessage.style.display = "none";
    }
}
