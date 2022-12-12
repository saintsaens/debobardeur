import punctuation


def test_fix_space_before_comma():
    input_text = ["oui", " , "]
    output_text = ["oui", ", "]
    assert punctuation.fix_commas(input_text) == output_text, "Should not have space before comma"


def test_fix_extra_spaces_after_comma():
    input_text = ["oui", ",  "]
    output_text = ["oui", ", "]
    assert punctuation.fix_commas(input_text) == output_text, "Should not have double space after comma"


def test_fix_double_spaces():
    input_text = ["oui", "  "]
    output_text = ["oui", " "]
    assert punctuation.fix_double_spaces(input_text) == output_text, "Should not have double spaces"


def test_all_punctuation():
    test_fix_space_before_comma()
    print("test_fix_space_before_comma → OK")
    test_fix_extra_spaces_after_comma()
    print("test_fix_extra_spaces_after_comma → OK")
    test_fix_double_spaces()
    print("test_fix_double_spaces → OK")


if __name__ == "__main__":
    test_fix_space_before_comma()
    test_fix_extra_spaces_after_comma()
    print("Everything passed")
