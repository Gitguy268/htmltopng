
# htmltopng

htmltopng is a simple tool that converts an `.html` file into a `.png` image.  
It’s useful for generating static previews of web pages, documentation, emails, or UI mockups without needing a browser screenshot.

## Features

- Convert local `.html` files to `.png` images
- Produce consistent, repeatable renders (no manual screenshots)
- Lightweight and easy to integrate in scripts or build pipelines

## Getting Started

### Prerequisites

- A modern web browser or a headless browser / rendering engine (e.g. Puppeteer, Playwright, wkhtmltoimage, etc.)  
- Node.js or another runtime, depending on how you wire up the conversion (see Implementation section)

> Note: The exact runtime and command may depend on how you implement the conversion logic in `index.html` or supporting scripts.

### Installation / Setup

Clone the repository:

```bash
git clone https://github.com/Gitguy268/htmltopng.git
cd htmltopng
