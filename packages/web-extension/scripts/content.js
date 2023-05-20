// For textarea-based text boxes (Stackoverflow).
if (document.activeElement.type == "textarea") {
  document.activeElement.value = "bla";
}

// For Gmail.
if (document.activeElement.isContentEditable) {

  const gmailMessage = document.activeElement.innerText;

  // For some reason, the innerText adds new lines. Remove them
  const updatedMessage = gmailMessage.replace(/(\n+)/g, (match, p1) => {
    const count = p1.length;
    const elementsToRemove = Math.floor(count / 2);
    return p1.slice(elementsToRemove);
  });

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