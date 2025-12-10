chrome.runtime.onInstalled.addListener(() => { //that will work in case of the extension being installed or updated
  chrome.contextMenus.create({
    id: "translateSelection",
    title: "Translate selection",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => { //that's the function for right-clicking
  if (info.menuItemId === "translateSelection") {

    const text = info.selectionText;

    const { targetLang } = await chrome.storage.sync.get({
      targetLang: "tr"
    }); //getting the language that is chosen before, if no lang is selected then it's automatically TR

    const url =
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" +
      targetLang +
      "&dt=t&q=" +
      encodeURIComponent(text);

    const res = await fetch(url); //calling API
    const data = await res.json(); //getting answer
    const translated = data[0][0][0]; //THIS PART IS SAME AS THE EXPLANATION I DID IN POPUP.JS, using the FREE API

    chrome.scripting.executeScript({
      target: { tabId: tab.id }, //getting the current tab
      args: [translated],
      func: (result) => {
        alert("Translation:\n\n" + result); // this function is used for puop-up that will show up when selected area is translated
      }
    });
  }
});
