import asyncio

from app.modules.ai.service import ai_service


async def main():
    response = await ai_service.generate_response(
        "Hello, introduce yourself in one sentence."
    )

    print(response)


asyncio.run(main())