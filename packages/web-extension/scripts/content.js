console.log(document.activeElement);

// For textarea-based text boxes (Stackoverflow).
if (document.activeElement.type == "textarea") {
  document.activeElement.value = "bla";
}