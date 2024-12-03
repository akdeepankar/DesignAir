
// Function to render font cards
export function renderFontCards(fontLinks, container) {
    container.innerHTML = ''; // Clear existing cards

    fontLinks.forEach(link => {
        // Extract font name from the URL
        const match = link.match(/family=([^:&]+)/);
        let fontName = '';

        if (match) {
            fontName = decodeURIComponent(match[1].replace(/\+/g, ' '));
            fontName = fontName.replace(/:[^,]+/g, '').trim();
        }

        if (fontName) {
            const fontCard = document.createElement('div');
            fontCard.className = 'font-card';
            fontCard.style.cssText = `
                padding: 10px;
                border: 1.5px solid #ccc;
                border-radius: 1rem;
                width: 162px;
                text-align: center;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                background-color: #f5f5f5;
                font-family: '${fontName}', sans-serif;
            `;

            fontCard.addEventListener('mouseover', () => {
                fontCard.style.boxShadow = '0 0 1px 1px rgba(138, 43, 226, 0.8)';
                fontCard.style.border = '1.5px solid rgba(138, 43, 226, 0.8)';
            });

            fontCard.addEventListener('mouseout', () => {
                fontCard.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                fontCard.style.border = '1.5px solid #ccc';
            });

            const fontNameElement = document.createElement('h3');
            fontNameElement.textContent = fontName;
            fontNameElement.style.cssText = `
                font-size: 20px;
                font-weight: normal;
            `;

            const fontLinkElement = document.createElement('a');
            fontLinkElement.href = link;
            fontLinkElement.textContent = 'View Font';
            fontLinkElement.target = '_blank';
            fontLinkElement.style.cssText = `
                color: rgba(138, 43, 226, 0.7);
                text-decoration: none;
                display: block;
                margin-top: 5px;
                font-family: Arial, sans-serif;
                font-size: 14px;
            `;

            fontCard.appendChild(fontNameElement);
            fontCard.appendChild(fontLinkElement);
            container.appendChild(fontCard);
        }
    });

    container.style.display = 'flex';
}
