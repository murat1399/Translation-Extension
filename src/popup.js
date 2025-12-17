const input = document.getElementById("input");
const langSelect = document.getElementById("lang");
const output = document.getElementById("output");

chrome.storage.sync.get({ targetLang: "en" }, data => { //choose english as language if no language is chosen automatically 
  langSelect.value = data.targetLang;
});

langSelect.addEventListener("change", () => { // if any language is selected, this function will be working
  chrome.storage.sync.set({ targetLang: langSelect.value });
});

// Google TTS language mapping
const ttsLangMap = {
  en: "en-US",
  tr: "tr-TR",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  ru: "ru-RU",
  ar: "ar-XA"
};

document.getElementById("btn").addEventListener("click", async () => {
  const text = input.value.trim(); //the text from the user, trim is for deleting the spaces from the beginning and the end of the text
  const targetLang = langSelect.value;

  if (!text) return; // if no text is written, then it will get out of the func

  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" +
    targetLang +
    "&dt=t&q=" +
    encodeURIComponent(text); // FREE API, I LOVE THAT IT'S FREEEEE but not an official API 

  const response = await fetch(url); 
  const data = await response.json(); //sending the response that are getting from API
  const translated = data[0][0][0]; //That's because of the structure of the answer of API, the translated text is hidden in 3 nested lists. 

  output.innerText = translated; //writing the translated text into the box


  try {
    const ttsResponse = await fetch("http://localhost:3000/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: translated,
        lang: ttsLangMap[targetLang]
      })
    });

    const ttsData = await ttsResponse.json();

    const audio = new Audio(
      "data:audio/mp3;base64," + ttsData.audio
    );

    audio.play();
  } catch (err) {
    console.error("TTS error:", err);
  }
});


