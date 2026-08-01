from app.modules.rag.service import rag_service

results = rag_service.search(
    "ما هو مرض COPD؟"
)

print()

for result in results:

    print("=" * 80)

    print(f"Distance : {result['distance']:.4f}")

    print(
        f"Source   : {result['metadata'].get('source')}"
    )

    print(
        f"Page     : {result['metadata'].get('page')}"
    )

    print()

    print(result["document"])

    print()