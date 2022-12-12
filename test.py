import test_punctuation_fix
import test_punctuation
import test_text_manipulation

if __name__ == "__main__":
    # Test punctuation
    print("Testing punctuation...")
    test_punctuation.test_all_punctuation()

    # Test text manipulation
    print("Testing text manipulation...")
    test_text_manipulation.test_all_text_manipulation()

    print("Everything passed")
