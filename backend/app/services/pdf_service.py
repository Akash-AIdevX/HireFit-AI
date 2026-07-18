import fitz


def extract_text(path: str):

    document = fitz.open(path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    return text