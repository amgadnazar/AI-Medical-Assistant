BAD_SECTIONS = [
    "references",
    "bibliography",
    "acknowledgements",
    "acknowledgments",
    "appendix",
    "appendices",
    "index",
    "glossary",
    "annex",
    "list of participants",
]


def should_skip(text: str) -> bool:

    text = text.lower()

    for word in BAD_SECTIONS:
        if word in text:
            return True

    return False