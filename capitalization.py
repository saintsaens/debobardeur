import re


def fix_capitalization_at_start_of_text(text):
    text[0] = text[0].capitalize()
    return text


def fix_capitalization_after_period(text):
    for i in text:
        if i.find(".") != -1:
            period_index = text.index(i)
            text[period_index + 1] = text[period_index + 1].capitalize()

    return text


def fix_capitalization(text):
    # Create a list of the text, including punctuation.
    split_text = re.split("(\W+)", text)
    split_text = fix_capitalization_at_start_of_text(split_text)
    split_text = fix_capitalization_after_period(split_text)

    # Stitch the list back together.
    reunited_text = ""
    for x in range(0, len(split_text)):
        reunited_text = reunited_text + split_text[x]

    return reunited_text
