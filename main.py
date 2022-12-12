import capitalization
import text_manipulation
import punctuation

ADVERBES: list[str] = ["Extrêmement", "extrêmement", "réellement", "vraiment", "à priori"]

print("Quel texte voulez-vous débobardiser ?")

input1 = input()

print("Suppression des bobards...")

text_without_bobards = input1

for i in ADVERBES:
    print("Handling: " + i)
    if text_without_bobards.find(i) != -1:
        while text_without_bobards.find(i) != -1:  # In case there are several occurrences.
            print("Found: " + i)
            text_without_bobards = text_manipulation.remove_element_from_text(text_without_bobards, i)

text_without_bobards = punctuation.fix_punctuation(text_without_bobards)
text_without_bobards = capitalization.fix_capitalization(text_without_bobards)

print(text_without_bobards)
