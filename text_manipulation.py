import re


def remove_element_from_text(text, element):

    # Create a list of the text, including punctuation.
    split_text = re.split("(\W+)", text)

    # Remove element from text.
    element_index = split_text.index(element)
    split_text.pop(element_index)

    # Adapt punctuation and capitalization.
    adapt_capitalization(split_text, element_index)

    # Stitch the list back together.
    reunited_text = ""
    for x in range(0, len(split_text)):
        reunited_text = reunited_text + split_text[x]

    return reunited_text


def adapt_punctuation(text, index):
    # If the removed element was at the start of the text, remove the now leading punctuation.
    if index == 0:
        text.pop(index)

    # If there is a comma+space before, remove the space but keep the comma.
    elif text[index - 1] == ", ":
        text[index - 1] = ","

    # If there is a space before, remove it.
    else:
        text.pop(index - 1)


def adapt_capitalization(text, index):
    # If it’s at the start of the text, capitalize.
    if index == 0:
        text[index] = text[index].capitalize()
