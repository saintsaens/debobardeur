from . import capitalization, text_manipulation, punctuation

ADVERBES: list[str] = ["Extrêmement", "extrêmement", "réellement", "vraiment", "à priori"]


def debobardeur(text_with_bobards):

    if text_with_bobards == "":
        return "🎉"

    text_being_debobardized = text_with_bobards

    for i in ADVERBES:
        if text_being_debobardized.find(i) != -1:
            text_being_debobardized = text_manipulation.remove_element_from_text(text_being_debobardized, i)

    text_being_debobardized = punctuation.fix_punctuation(text_being_debobardized)
    text_being_debobardized = capitalization.fix_capitalization(text_being_debobardized)

    text_without_bobards = text_being_debobardized

    return text_without_bobards
