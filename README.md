# Error Generator Extension for Datadog

A Brave/Chrome browser extension that generates errors in client side.

## Features

- Generates 100 errors per click
- Each error contains the message: "Probando, hola me escuchan."
- Simple one-button interface
- Works on all websites

## Installation

1. Clone this repository
2. Open Brave/Chrome and go to `brave://extensions/` or `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select this folder
5. The extension icon will appear in your toolbar

## Usage

1. Navigate to any website
2. Click the extension icon
3. Click "Generate 100 Errors" button
4. Errors will be thrown and caught by Datadog RUM

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.js` - Popup logic
- `content.js` - Content script that generates errors

## Error Details

Each error is thrown with a 10ms delay between them to ensure proper capture by monitoring tools.
