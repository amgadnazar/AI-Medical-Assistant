from sentence_transformers import SentenceTransformer


class EmbeddingModel:

    def __init__(self):

        self.model = SentenceTransformer(
            "intfloat/multilingual-e5-base",
        )

    def embed_query(
        self,
        text: str,
    ) -> list[float]:

        return self.model.encode(
            text,
            normalize_embeddings=True,
        ).tolist()

    def embed_documents(
        self,
        texts: list[str],
    ) -> list[list[float]]:

        return self.model.encode(
            texts,
            normalize_embeddings=True,
        ).tolist()


embeddings = EmbeddingModel()