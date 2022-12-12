import capitalization


def test_fix_capitalization_at_start_of_text():
    input_text = ["oui", "non"]
    output_text = ["Oui", "non"]
    assert capitalization.fix_capitalization_at_start_of_text(input_text) == output_text, "Should have capital at " \
                                                                                          "start of text "


def test_all_capitalization():
    test_fix_capitalization_at_start_of_text()
    print("test_fix_capitalization_at_start_of_text → OK")
