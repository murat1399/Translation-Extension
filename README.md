# Translation Extension
A simple Chrome extension that translates selected text using the free Google Translate API and Google Cloud API.
Made by Murat, Meryem and Ömer.

Features
---
Instantly translates selected text via a popup.
Uses Google Cloud Text-to-Speech API and Google Translate API for fast and reliable translations.

Files
---
src/background.js: Handles background tasks and extension events.
src/popup.html: Popup UI for user interaction.
src/popup.js: Logic for the popup interface.
manifest.json: Extension configuration and permissions.
src/icons/: Extension icons.
backend/server.js : Backend to be used for Google Text to speech API and to have it secure

Usage
---
Create an API key from Google Cloud Text-to-Speech API 
Here's the link to create API: https://console.cloud.google.com/apis/api/texttospeech.googleapis.com 
Once you download the JSON key file for Google Cloud Text-to-Speech API, name your file as "google-tts-key.json" and move your key file inside the backend folder
Initialize your node.js package manager by typing "npm init" into the terminal while on the backend folder
Install the necessary packages by typing "npm i express cors @google-cloud/text-to-speech" into the terminal while on the backend folder
Type "node server.js" to run your server
Load the extension in Chrome (Developer mode).
Click the extension icon to open the popup.
Enter or select text to translate, it will automatically provide text-to-speech
Or select a text from your active tab, right click it and select "Translate selected text".