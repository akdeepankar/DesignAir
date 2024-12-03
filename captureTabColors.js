// Function to capture the visible tab and extract prominent colors
import { renderColorPalette } from './renderColorPalette.js';

const savedPalettesContainer = document.getElementById('savedPalettesContainer');
const generatePaletteForm = document.getElementById('generatePaletteForm');

export function captureTabColors() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataUrl) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }

            const img = new Image();
            img.src = dataUrl;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Count the occurrence of each color (ignoring white colors)
                const colorCounts = {};
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];

                    if (r > 230 && g > 230 && b > 230) continue; // Ignore white colors

                    const rgbString = `rgb(${r},${g},${b})`;
                    colorCounts[rgbString] = (colorCounts[rgbString] || 0) + 1;
                }

                // Sort colors by frequency and get the top 9 prominent colors
                const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
                const prominentColors = sortedColors.slice(0, 9).map(color => rgbToHex(color[0]));

                // Render the color palette using the reusable renderColorPalette function
                renderColorPalette(prominentColors);

                // Hide unnecessary elements and show palette form
                savedPalettesContainer.style.display = "none";
                generatePaletteForm.style.display = "none";
            };
        });
    });
}

// Function to convert RGB to Hex format
function rgbToHex(rgb) {
    const rgbValues = rgb.match(/\d+/g);
    const r = parseInt(rgbValues[0], 10);
    const g = parseInt(rgbValues[1], 10);
    const b = parseInt(rgbValues[2], 10);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}