import { analyzeImageWithGemini } from "./imageToGemini.js";
import { summarizeText } from "./summarizeText.js";

// Function to capture the screen and analyze fonts
export async function captureAndAnalyzeFont() {
    const loadingMessage = document.getElementById("loading-message4");
    const outputContainer = document.getElementById("analysisOutput1");

    try {
        // Step 1: Show the loading message
        loadingMessage.style.display = "block";
        outputContainer.style.display = "none"; // Hide the output until analysis is complete

        // Step 2: Capture the visible tab
        const screenshotDataUrl = await chrome.tabs.captureVisibleTab(null, { format: "png" });

        if (!screenshotDataUrl) {
            console.error("Failed to capture tab image.");
            loadingMessage.style.display = "none";
            return;
        }

        // Step 3: Call the Gemini API to analyze the font
        const analysisResult = await analyzeImageWithGemini(screenshotDataUrl, "Analyze the font used on the page.");
        const summarizedResult = await summarizeText(analysisResult);

        // Step 4: Hide loading message and show result
        loadingMessage.style.display = "none";
        outputContainer.style.display = "block";

        // Step 5: Convert markdown to HTML manually
        if (analysisResult) {
            outputContainer.innerHTML = convertMarkdownToHtml(summarizedResult); // Convert markdown to HTML
        } else {
            outputContainer.innerText = "No font information found. Please try again.";
        }
    } catch (error) {
        console.error("Error analyzing font:", error);
        loadingMessage.style.display = "none";
    }
}

// Function to convert markdown to HTML (basic implementation)
function convertMarkdownToHtml(markdown) {
    // Convert simple markdown to HTML
    let html = markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')  // H3
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')   // H2
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')    // H1
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>') // Bold
        .replace(/\*(.*)\*/gim, '<em>$1</em>')     // Italics
        .replace(/\[([^\]]+)\]\((.*?)\)/gim, '<a href="$2">$1</a>'); // Links

    return html;
}
