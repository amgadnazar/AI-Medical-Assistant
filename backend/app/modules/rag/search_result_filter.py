BAD_WORDS = [
    "references",
    "bibliography",
    "isbn",
    "acknowledgements",
    "acknowledgments",
    "table of contents",
    "contents",
    "annex",
    "appendix",
    "contributors",
    "participants",
    "meeting report",
    "regional consultation",
    "who (",
    "telephone",
    "email",
    "address",
    "fax",
    "printed by",
    "copyright",
    "all rights reserved",
    "foreword",
    "preface",
    "keywords",
    "index",
]

MAX_DISTANCE = 0.40
MIN_WORDS = 80


class SearchResultFilter:

    def filter(
        self,
        results: list,
        max_results: int = 3,
    ) -> list:

        if not results:
            return []

        filtered = []

        for item in results:

            document = item["document"]
            distance = item["distance"]

            if distance > MAX_DISTANCE:
                continue

            if len(document.split()) < MIN_WORDS:
                continue

            text = document.lower()

            if any(word in text for word in BAD_WORDS):
                continue

            filtered.append(item)

        filtered.sort(
            key=lambda x: x["score"],
            reverse=True,
        )

        return filtered[:max_results]


search_result_filter = SearchResultFilter()