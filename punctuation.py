import re


def fix_commas(text):
    # Replace all variations of comma punctuation with comma+space.
    for i in text:
        if i.find(",") != -1:
            comma_index = text.index(i)
            text[comma_index] = ", "
    return text


def fix_double_spaces(text):
    # Replace double spaces with single space.
    for i in text:
        if i.find("  ") != -1:
            double_space_index = text.index(i)
            text[double_space_index] = " "
    return text


def fix_leading_punctuation(text):
    # Remove leading punctuation, if there is one.
    while True:
        # Check the first character of the first element is alphabet.
        if text[0] and text[0][0].isalpha():
            break
        else:
            text.pop(0)
    return text


def fix_space_before_final_period(text):
    for i in text:
        if i.find(" .") != -1:
            space_before_final_period_index = text.index(i)
            text[space_before_final_period_index] = "."
    return text


def fix_space_before_period(text):
    for i in text:
        if i.find(" . ") != -1:
            space_before_final_period_index = text.index(i)
            text[space_before_final_period_index] = ". "
    return text


def fix_punctuation(text):
    # Create a list of the text, including punctuation.
    split_text = re.split("(\W+)", text)
    split_text = fix_commas(split_text)
    split_text = fix_double_spaces(split_text)
    split_text = fix_leading_punctuation(split_text)
    split_text = fix_space_before_period(split_text)
    split_text = fix_space_before_final_period(split_text)

    # Stitch the list back together.
    reunited_text = ""
    for x in split_text:
        reunited_text += x

    return reunited_text
