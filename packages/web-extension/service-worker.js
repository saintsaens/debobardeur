// Only use this function during the initial install phase. After
// installation the user may have intentionally unassigned commands.
function checkCommandShortcuts() {
  chrome.commands.getAll((commands) => {
    let missingShortcuts = [];
    
    for (let {name, shortcut} of commands) {
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

chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
    if (command === 'run-debobardize') {
      chrome.scripting.executeScript({
        target : {tabId : tab.id},
        files : ["./scripts/content.js"]
      });
    }
});