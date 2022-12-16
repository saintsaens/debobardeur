import re


def remove_element_from_text(text, element):

    # Create a list of the text, including punctuation.
    split_text = re.split("(\W+)", text)

    # Remove element from text.
    element_index = split_text.index(element)
    split_text.pop(element_index)

    # Stitch the list back together.
    reunited_text = ""
    for x in range(0, len(split_text)):
        reunited_text = reunited_text + split_text[x]

    return reunited_text
