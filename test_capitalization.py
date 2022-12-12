import capitalization


def test_fix_capitalization_at_start_of_text():
    input_text = ["oui", "non"]
    output_text = ["Oui", "non"]
    assert capitalization.fix_capitalization_at_start_of_text(input_text) == output_text, "Should have capital at " \
                                                                                          "start of text"


def test_fix_capitalization_after_period():
    input_text = [".", "non"]
    output_text = [".", "Non"]
    assert capitalization.fix_capitalization_after_period(input_text) == output_text, "Should have capital after period"


def test_all_capitalization():
    test_fix_capitalization_at_start_of_text()
    test_fix_capitalization_after_period()
    print("test_fix_capitalization_at_start_of_text → OK")
