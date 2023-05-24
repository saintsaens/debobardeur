// // For textarea-based text boxes (Stackoverflow).
// if (document.activeElement.type == "textarea") {
//   document.activeElement.value = "bla";
// }

function removeNewLinesInGmailInnerText(inputText) {
  const updatedText = inputText.replace(/(\n+)/g, (match, p1) => {
    const count = p1.length;
    const elementsToRemove = Math.floor(count / 2);
    return p1.slice(elementsToRemove);
  })

  return updatedText;
}

function debobardizeGmail() {

  if (location.href.startsWith("https://mail.google.com/") && document.activeElement.isContentEditable) {

    const gmailMessage = document.activeElement.innerText;

    // For some reason, the innerText adds new lines. Remove them.
    const updatedMessage = removeNewLinesInGmailInnerText(gmailMessage);

    (async () => {
      const response = await chrome.runtime.sendMessage({ message: updatedMessage });
      const newText = response.debobard;

      // Split the string into an array based on newline character.
      const textArray = newText.split('\n');

      // Create div elements for each text element in the array.
      const divArray = textArray.map(text => {
        if (text === '') {
          return '<div><br></div>';
        } else {
          return `<div>${text}</div>`;
        }
      });

      // Join the div elements to form the updated string.
      const updatedString = divArray.join('');

      // Replace the text.
      document.activeElement.innerHTML = updatedString;

      // Move cursor to the end of the text.
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(document.activeElement);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    })();
  }
}

function createArrayFromTrelloInnerHTML(innerHtmlInput) {
  const tempDivElement = document.createElement('div');
  tempDivElement.innerHTML = innerHtmlInput;

  const paragraphs = Array.from(tempDivElement.getElementsByTagName('p'));

  const paragraphArray = paragraphs.map((p) => p.textContent.trim());

  return paragraphArray;
}

function createTrelloInnerHTMLFromArray(inputArray) {
  const tempDivElement = document.createElement('div');
  const paragraphs = inputArray.map((text) => `<p>${text}</p>`);
  tempDivElement.innerHTML = paragraphs.join('');

  const text = tempDivElement.innerHTML;

  return text;
}

async function editTrelloText(text) {
  const response = await chrome.runtime.sendMessage({ message: text });
  const newText = response.debobard;
  return newText;
}

function debobardizeTrello() {
  if (location.href.startsWith("https://trello.com/") && document.activeElement.isContentEditable) {

    const activeElement = document.activeElement;

    traverseDOMStructure(activeElement, editTrelloText);

    async function traverseDOMStructure(element, editFunction) {
      if (element.nodeType === Node.TEXT_NODE) {
        element.textContent = await editFunction(element.textContent);
      } else {
        const childNodes = element.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
          traverseDOMStructure(childNodes[i], editFunction);
        }
      }
    }

    // Move cursor to the end of the text.
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(document.activeElement);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

debobardizeGmail();
debobardizeTrello();