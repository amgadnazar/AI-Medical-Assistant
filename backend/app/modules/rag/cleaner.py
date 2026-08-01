import re


class DocumentCleaner:

    @staticmethod
    def clean(text: str) -> str:

        # normalize spaces
        text = re.sub(r"\s+", " ", text)

        # remove page numbers
        text = re.sub(r"\n?\s*\d+\s*\n?", "\n", text)

        # remove repeated empty lines
        text = re.sub(r"\n{2,}", "\n", text)

        return text.strip()


cleaner = DocumentCleaner()