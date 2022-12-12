import text_manipulation


def test_remove_element_from_text():
    input_text = "Lorem ipsum dolor"
    bobard = "ipsum"
    output_text = "Lorem  dolor"
    assert text_manipulation.remove_element_from_text(input_text, bobard) == output_text, "Should be Lorem  dolor"


def test_remove_element_with_two_words_from_text():
    input_text = "Lorem ipsum dolor sit amet"
    bobard = "ipsum dolor"
    output_text = "Lorem sit amet"
    assert text_manipulation.remove_element_from_text(input_text, bobard) == output_text, "Should be Lorem sit amet"


def test_all_text_manipulation():
    test_remove_element_from_text()
    print("test_remove_element_from_text → OK")


if __name__ == "__main__":
    test_remove_element_from_text()
    test_remove_element_with_two_words_from_text()
    print("Everything passed")
