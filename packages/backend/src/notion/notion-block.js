export function getInputTextBlocks(blocks) {
  const array = []
  for (let i = 0; i < blocks.results.length; i++) {
    if (blocks.results[i].type == "divider") {
      return array;
    }

    else if (blocks.results[i].type == "paragraph") {
      array.push(blocks.results[i]);
    }
  }
  return array;
}

export function getTextFromParagraphBlocks(paragraphBlocks) {
  const array = []
  for (let i = 0; i < paragraphBlocks.length; i++) {
    array.push(paragraphBlocks[i].paragraph.rich_text[0].plain_text);
  }
  return array;
}

export function getOutputTextBlocks(blocks) {
  const array = [];
  let afterDivider = false;
  for (let i = 0; i < blocks.results.length; i++) {
    if (blocks.results[i].type == "divider") {
      afterDivider = true;
    }
    else if (afterDivider == true) {
      if (blocks.results[i].type == "paragraph") {
        array.push(blocks.results[i]);
      }
    }
  }
  return array;
}

export function getInputText(pageBlocks) {
  const inputTextBlocks = getInputTextBlocks(pageBlocks);
  const inputText = getTextFromParagraphBlocks(inputTextBlocks);
  return inputText;
}