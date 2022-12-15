from . import capitalization, text_manipulation, punctuation

ADVERBES: list[str] = ["Extrêmement", "extrêmement", "réellement", "vraiment", "à priori"]


def debobardeur(text_with_bobards):

    text_without_bobards = text_with_bobards

    for i in ADVERBES:
        print("Handling: " + i)
        if text_without_bobards.find(i) != -1:
            while text_without_bobards.find(i) != -1:  # In case there are several occurrences.
                print("Found: " + i)
                text_without_bobards = text_manipulation.remove_element_from_text(text_without_bobards, i)

    text_without_bobards = punctuation.fix_punctuation(text_without_bobards)
    text_without_bobards = capitalization.fix_capitalization(text_without_bobards)

    return text_without_bobards
