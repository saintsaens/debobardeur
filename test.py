import test_punctuation
import test_text_manipulation
import test_capitalization

if __name__ == "__main__":
    # Test punctuation
    print("Testing punctuation...")
    test_punctuation.test_all_punctuation()

    # Test text manipulation
    print("Testing text manipulation...")
    test_text_manipulation.test_all_text_manipulation()

    # Test capitalization
    print("Testing capitalization...")
    test_capitalization.test_all_capitalization()

    print("Everything passed")
