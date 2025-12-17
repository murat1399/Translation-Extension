const express = require("express");
const cors = require("cors");
const path = require("path");
const textToSpeech = require("@google-cloud/text-to-speech");

const app = express();

app.use(cors());
app.use(express.json());

/* 🔊 Google TTS client */
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: path.join(__dirname, "google-tts-key.json")
});

const ttsLangMap = {
  en: "en-US",
  tr: "tr-TR",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  ru: "ru-RU",
  ar: "ar-XA"
};

app.post("/tts", async (req, res) => {
  try {
    const { text, lang } = req.body;

    if (!text || !lang) {
      return res.status(400).json({
        error: "text or lang missing"
      });
    }

    const request = {
      input: { text },
      voice: {
        languageCode: ttsLangMap[lang] || lang,
        ssmlGender: "NEUTRAL"
      },
      audioConfig: {
        audioEncoding: "MP3"
      }
    };

    const [response] = await client.synthesizeSpeech(request);

    res.json({
      audio: response.audioContent.toString("base64")
    });

  } catch (err) {
    console.error("TTS ERROR:", err);
    res.status(500).json({
      error: err.message
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`TTS Server running on http://localhost:${PORT}`);
});
