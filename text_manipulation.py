import re


def remove_element_from_text(text, element):
    text_with_removed_element = text.replace(element, "")

    return text_with_removed_element
