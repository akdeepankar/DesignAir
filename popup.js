
import { analyzeColors } from './analyzeColors.js';
import { captureAndAnalyzeFont } from './captureAndAnalyseFont.js';
import { captureAndAnalyzeTab } from './captureAndAnalyzeTab.js';
import { captureTabColors } from './captureTabColors.js';
import { generateVector } from './generateVector.js';
import { renderColorPalette } from './renderColorPalette.js';
import { renderFontCards } from './renderFontCards.js';
import { updatePalette } from './updateColorPalette.js';
import { fetchAiResponse } from './fetchAiResponse.js';



document.addEventListener('DOMContentLoaded', function () {
    const captureBtn = document.getElementById('captureBtn');
    const aiBtn = document.getElementById('aiBtn');
    const paletteContainer = document.getElementById('palette-container');
    const paletteCard = document.getElementById('palette-card');
    const screenInfoCard = document.getElementById('screen-info-card');
    const submitPalette = document.getElementById("submitPalette");
    const loadingMessage3 = document.getElementById("loading-message3");
    const loadingMessage4 = document.getElementById("loading-message4");
    const loadingMessage = document.getElementById("loading-message");
    const generatePaletteForm = document.getElementById("generate-palette-form");
    const savedPalettesContainer = document.getElementById('saved-palettes-container');
    const editPaletteBtn = document.getElementById('editPaletteBtn');
    const morePaletteBtn = document.getElementById('morePaletteBtn');
    const fontBtn = document.getElementById('fontBtn');
    const generateFontForm = document.getElementById('generate-font-form');
    const submitFontBtn = document.getElementById('submitFont');
    const fontCardsContainer = document.createElement('div');
    const streamedTextContainer = document.getElementById('streamed-text');
    const vectorBtn = document.getElementById('VectorBtn');
    const generateIconForm = document.getElementById('generate-icon-form');
    const submitIcon = document.getElementById('submitIcon');

    editPaletteBtn.addEventListener('click', toggleEditMode);
    paletteCard.appendChild(editPaletteBtn);

    let isEditMode = false;


    // Function to switch between main tabs
    function switchTab(tabNumber) {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.style.display = 'none'); // Hide all tabs

        document.getElementById(`tab${tabNumber}Btn`).classList.add('active');
        document.getElementById(`tab${tabNumber}`).style.display = 'block'; // Show selected tab content
    }

    // Event listeners for each main tab button
    document.getElementById('tab1Btn').addEventListener('click', () => {switchTab(1) 
        fontCardsContainer.style.display = 'none'; // Hide font cards container
    });
    document.getElementById('tab2Btn').addEventListener('click', () => {switchTab(2)
        fontCardsContainer.style.display = 'none'; // Hide font cards container
});
    document.getElementById('tab3Btn').addEventListener('click', () => switchTab(3));
    document.getElementById('tab4Btn').addEventListener('click', () => {switchTab(4)
        fontCardsContainer.style.display = 'none';
});
document.getElementById('tab5Btn').addEventListener('click', () => {switchTab(5)
    fontCardsContainer.style.display = 'none';
});

    // Set Tab 1 as the default view on page load
    window.onload = function() {
        switchTab(1); // Default active tab
    };

    // Function to switch between nested tabs within a main tab
    function showNestedTab(tabId) {
        const nestedTabs = document.querySelectorAll("#nested-tab-content > div");
        nestedTabs.forEach(tab => tab.style.display = "none"); // Hide all nested tabs

        document.getElementById(tabId).style.display = "block"; // Show selected nested tab

        const buttons = document.querySelectorAll(".tab-button");
        buttons.forEach(button => button.classList.remove("active"));
        document.getElementById(`${tabId}Btn`).classList.add("active"); // Highlight selected nested tab button
    }

    // Event listeners for nested tabs
    document.getElementById("nestedTab1Btn").onclick = () => showNestedTab("nestedTab1");
    document.getElementById("nestedTab2Btn").onclick = () => showNestedTab("nestedTab2");
    document.getElementById("nestedTab3Btn").onclick = () => showNestedTab("nestedTab3");

    // Show the first nested tab by default
    showNestedTab("nestedTab1");


    // Event listener for the capture image button
    document.getElementById("captureImageBtn").addEventListener("click", async function() {
        await captureAndAnalyzeTab();
    });

    document.getElementById("fontAnalyseBtn").addEventListener("click", async function() {
        await captureAndAnalyzeFont();
    });

    // Show the icon generation form when the Icon button is clicked
    vectorBtn.addEventListener('click', () => {
        generateIconForm.style.display = 'block';
    });
    
    // Handle icon submission
    submitIcon.addEventListener('click', async () => {
        const fontInput2 = document.getElementById('fontInput2').value;
    
        if (!fontInput2) {
            alert('Please enter a design description.');
            return;
        }
    
        loadingMessage3.style.display = 'block'; // Show loading message
    
        try {
            // Define the prompt to send to AI
            const promptText = `Generate an SVG icon code based on the following description: "${fontInput2}"`;
            const result = await fetchAiResponse(promptText);
            // Hide the loading message once response is received
            loadingMessage3.style.display = 'none';
            // Extract the SVG code from the AI result
            const svgCode = extractSvgCode(result);
            
            if (svgCode) {
                console.log('Extracted SVG Code:', svgCode);
                
                // Display the SVG and enable interaction buttons
                generateVector(svgCode);
            } else {
                alert('No SVG code found in the generated text.');
            }
        } catch (error) {
            console.error('Error generating SVG:', error);
            alert('An error occurred while generating the SVG.');
        } finally {
            loadingMessage3.style.display = 'none'; // Hide loading message after process ends
        }
    });


    
 function extractSvgCode(result) {
    const svgMatch = result.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    if (svgMatch && svgMatch[0]) {
        return svgMatch[0]; // Return the extracted SVG code
    }
    return null; // Return null if no SVG code is found
}

    
// Set up font cards container
fontCardsContainer.style.display = 'none';
fontCardsContainer.style.marginTop = '20px';
fontCardsContainer.style.display = 'flex';
fontCardsContainer.style.flexWrap = 'wrap';
fontCardsContainer.style.gap = '10px';

// Append font cards container to the document
document.body.appendChild(fontCardsContainer); // Assuming you want to append it to the body or a specific container

// Event listener for displaying the font suggestion form
fontBtn.addEventListener('click', () => {
    generateFontForm.style.display = 'block';
    fontCardsContainer.style.display = 'none'; // Hide previous font cards
    fontInput.value = ''; // Clear input field
});

// Event listener for submitting font suggestion query
submitFontBtn.addEventListener('click', async () => {
    const fontQuery = fontInput.value.trim();

    if (!fontQuery) {
        alert('Please enter a design description.');
        return;
    }

    loadingMessage4.style.display = 'block';
    fontCardsContainer.innerHTML = ''; // Clear previous cards
    fontCardsContainer.style.display = 'none'; // Hide previous cards

    try {
        const promptText = `Provide a list of 6 Google Fonts with full font.googleapis URLs in this format 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' for "${fontQuery}". Ensure each font has only one URL, even if it includes multiple styles. Format the response in a clear, parseable manner.`;

        const result = await fetchAiResponse(promptText);

        // Extract font URLs
        const fontLinks = [];
        const lines = result.split('\n');
        lines.forEach(line => {
            const urlMatch = line.match(/https:\/\/fonts\.googleapis\.com\/css(?:2)?\?family=[^ \n)]+/);
            if (urlMatch) fontLinks.push(urlMatch[0]);
        });

        const uniqueFontLinks = [...new Set(fontLinks)];
        if (uniqueFontLinks.length === 0) {
            alert("No Google Font links found.");
            return;
        }

        renderFontCards(uniqueFontLinks, fontCardsContainer);
        loadingMessage4.style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating font suggestions. Please try again.');
        loadingMessage4.style.display = 'none';
    }
});

        

    // Hide elements and show the text box and submit button for palette generation
    aiBtn.addEventListener("click", () => {
    // Hide other containers
    paletteCard.style.display = "none";
    savedPalettesContainer.style.display = "none";
    screenInfoCard.style.display = "none";

    // Show the generate palette form
    generatePaletteForm.style.display = "block";
    });


    submitPalette.addEventListener("click", async () => {
        const paletteInput = document.getElementById("paletteInput").value;
    
        // Display loading message and clear previous text
        loadingMessage.style.display = "block";
        streamedTextContainer.innerText = ""; // Clear text container
        paletteContainer.innerHTML = ""; // Clear previous color palette
        document.getElementById("palette-container").style.display = "none"; // Hide the palette initially
    
        try {
            const promptText = `Generate a color palette with hexcode based on the phrase, not more than 100 words: "${paletteInput}".`;
    
            // Fetch the AI response
            const result = await fetchAiResponse(promptText);
    
            // Hide the loading message and show the palette container
            loadingMessage.style.display = "none";
            document.getElementById("palette-container").style.display = "block";
    
            console.log("AI Response:", result);
    
            // Extract hex color codes from the result
            const hexColorRegex = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;
            const hexCodes = result.match(hexColorRegex) || [];
            console.log("Extracted hex codes:", hexCodes);
    
            // Render the color palette
            renderColorPalette(hexCodes);
        } catch (error) {
            console.error("Error generating color palette:", error);
            loadingMessage.style.display = "none";
            streamedTextContainer.textContent = "An error occurred. Please try again.";
        }
    });


    morePaletteBtn.addEventListener('click', function () {
        screenInfoCard.style.display = 'block';
    })


    captureBtn.addEventListener('click', captureTabColors);


    function toggleEditMode() {
        isEditMode = !isEditMode;
        editPaletteBtn.textContent = isEditMode ? 'Exit Edit Mode' : 'Edit Palette';
        updatePalette(isEditMode);
    }


});


// Event listeners for each button
document.getElementById('runAiBtn1').addEventListener('click', () => {
    analyzeColors('runAiBtn1', 'Mood of the Color Palette');
});

document.getElementById('runAiBtn2').addEventListener('click', () => {
    analyzeColors('runAiBtn2', 'Palette Insight based on Industry, be specific');
});

document.getElementById('runAiBtn3').addEventListener('click', () => {
    analyzeColors('runAiBtn3', 'Advise on optimal color combinations for text and backgrounds to enhance readability. For example, dark text on a light background typically works well, but specific combinations (like light gray text on a white background) may lack contrast.');
});

document.getElementById('runAiBtn4').addEventListener('click', () => {
    analyzeColors('runAiBtn4', 'Provide Cultural significance of the color palette');
});

document.getElementById('runAiBtn5').addEventListener('click', () => {
    analyzeColors('runAiBtn5', 'Suggest how the colors can be integrated into a logo, emphasizing the emotions or messages that the colors convey. For example, if one of the hex codes is a vibrant blue, recommend using it for trustworthiness, while a warmer hue could highlight creativity or energy.');
});

document.getElementById('runAiBtn6').addEventListener('click', () => {
    analyzeColors('runAiBtn6', 'Provide options for adapting color use in responsive web designs.');
});

document.getElementById('runAiBtn7').addEventListener('click', () => {
    analyzeColors('runAiBtn7', ' Suggest how to effectively apply the color scheme in printed materials.');
});

document.getElementById('runAiBtn8').addEventListener('click', () => {
    analyzeColors('runAiBtn8', 'Provide feedback on color uses in interior design.');
});

document.getElementById('runAiBtn9').addEventListener('click', () => {
    analyzeColors('runAiBtn9', 'Analyze and verify the contrast ratios of color combinations to ensure text and background colors meet accessibility standards (e.g., WCAG compliance).');
});

document.getElementById('runAiBtn10').addEventListener('click', () => {
    analyzeColors('runAiBtn10', 'Simulate how the color palette appears to users with different types of color blindness (e.g., deuteranopia, protanopia, tritanopia) and suggest accessible color adjustments.');
});

document.getElementById('runAiBtn11').addEventListener('click', () => {
    analyzeColors('runAiBtn11', 'Offer alternative colors that retain the design aesthetic while improving accessibility for visually impaired users.');
});



