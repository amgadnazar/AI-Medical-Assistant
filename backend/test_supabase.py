from app.modules.rag.embeddings import embeddings

vector = embeddings.embed_query("مرحباً، أنا أعاني من السكري.")

print(len(vector))
print(vector[:10])