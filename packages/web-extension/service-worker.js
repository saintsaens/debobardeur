const BACKEND_URL = "https://api-debobardeur.troal.me/";

// Only use this function during the initial install phase. After
// installation the user may have intentionally unassigned commands.
function checkCommandShortcuts() {
  chrome.commands.getAll((commands) => {
    let missingShortcuts = [];

    for (let { name, shortcut } of commands) {
      if (shortcut === '') {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      // Update the extension UI to inform the user that one or more
      // commands are currently unassigned.
    }
  });
}

// Call the backend to debobardize.
async function fetchDebobardizeApi(inputMessage) {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputMessage }),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
});

// Listen to the input message sent by the content script, and send the debobardized version.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async function () {
    const debobardizedText = await fetchDebobardizeApi(request.message);
    sendResponse({ debobard: debobardizedText.text });
  })();

  // return true to indicate you want to send a response asynchronously
  return true;
});

// Run the content script if the keyboard shortcut is triggered.
chrome.commands.onCommand.addListener(
  async (command, tab) => {
    if (command === 'run-debobardize') {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["./scripts/content.js"]
      });
    }
  }
);