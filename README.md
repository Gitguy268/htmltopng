
# htmltopng

htmltopng is a simple tool that converts an `.html` file into a `.png` image.  
It’s useful for generating static previews of web pages, documentation, emails, or UI mockups without needing a browser screenshot.

<!-- live-links -->
**Live:** [gitguy268.github.io/htmltopng](https://gitguy268.github.io/htmltopng/) · [htmltopngconverter.vercel.app](https://htmltopngconverter.vercel.app)
<!-- /live-links -->

<!-- run-steps:start -->
## Run it locally, step by step

1. **Get the code:**

   ```sh
   git clone https://github.com/Gitguy268/htmltopng.git
   cd htmltopng
   ```

2. **Start a local web server** (Python 3 comes with macOS and most Linux systems):

   ```sh
   python3 -m http.server 8000
   ```

3. **Open <http://localhost:8000/>** in your browser. Press `Ctrl+C` in the terminal to stop.
<!-- run-steps:end -->

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
```

### Tests

`tests/capture.mjs` checks the capture in a real browser: the preview's scripts can't reach the tool page, outside fonts and images don't stop a capture, and a reply that isn't a PNG is refused. It needs internet and Playwright:

```bash
npm i playwright
node tests/capture.mjs
```
