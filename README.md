## Inspiration

As an Aspiring designer, I spend much of my time in Figma, constantly exploring design ideas and searching for the perfect fonts, color palettes and vectors. This process, though exciting, is time-consuming. So, I thought—why not simplify it? I decided to create DesignAir a Chrome extension that streamlines my workflow like the flow of Air, making it easier and faster to bring my design concepts to life.

## What it does  

### Color Palette  
Effortlessly create custom palettes with two options:  
- **Capture Colors**: Instantly extract colors from the active tab to generate a palette.  
- **Generate from Ideas**: Describe your vision or mood, and let the tool craft a matching palette.  

Refine your palette by removing unwanted colors, exploring accessibility insights, suggested use cases, and saving favorites for future projects.  

### Typography  
- **Font Suggestions**: Get six tailored font style suggestions with previews and download links for seamless integration into your design.  
- **Font Analysis**: Analyze fonts on your screen using Gemini Pro for image analysis and Gemini Nano’s **Summarizer API** to provide precise insights.  

### Vectors  
Easily generate custom icons or vector graphic assets by describing your needs to Gemini Nano. View, copy, or download SVG files for use in Figma or any other design tool.  

### Images  
Capture and analyze images with Gemini APIs:  
- Use Gemini Pro for detailed analysis and Gemini Nano’s **Writer API** to craft comprehensive case studies or research reports based on the output.  
- Ideal for interior and graphic design applications.  

Each feature is powered by advanced Gemini APIs, offering unparalleled precision and convenience to streamline your design workflow.

## How we built it

Html, CSS and JavaScript, Powered by Gemini Pro API and Chrome Built In AI - Gemini Nano

## Challenges we ran into

One major challenge was that Gemini Nano’s output most of the time inaccurately identified hex codes within the generated palette, leading to incorrect results. To address this, we integrated a color-identification API that accurately detects colors from hex codes and returns their names. This data is then passed to Gemini Nano, enabling it to provide more reliable insights and improve overall accuracy.

## Accomplishments That We're Proud Of  

- **Innovative API Integration**: Successfully harnessed the power of Gemini Nano's advanced APIs, including Chrome's Prompt, Summarizer and Writer, to deliver seamless and intelligent design solutions.  

- **Enhanced Design Workflow**: Created tools that empower designers and students to effortlessly generate color palettes, analyze typography, and craft custom icons, improving productivity and creativity.  

- **User-Centric Approach**: Designed with accessibility and usability in mind, ensuring that our features cater to diverse needs and skill levels.  

- **Creative Impact**: Enabled designers and creators to achieve professional results quickly, making high-quality design accessible to everyone.  

- **Collaborative Development**: Built a platform that thrives on cutting-edge technology and user feedback, constantly evolving to meet the demands of modern design.  

## What we learned

Throughout this project, we deepened our understanding of integrating APIs to enhance functionality, specifically with color accuracy and real-time data processing. We also learned the importance of user-centered design, refining features to make the tool intuitive and genuinely valuable for designers.

## What's next for DesignAir

Looking ahead, we aim to expand DesignAir with pattern and layout suggestions, enhanced font and icon customization, and smarter AI-driven design insights. By improving accessibility and adding more resources, we strive to make DesignAir an essential tool for every designer!
