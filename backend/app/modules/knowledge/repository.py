from pathlib import Path


class KnowledgeRepository:

    def __init__(self):

        self.knowledge_path = (
            Path(__file__)
            .resolve()
            .parents[3]
            / "knowledge"
        )

    def get_files(self):

        files = []

        for file in self.knowledge_path.glob("*.pdf"):

            stat = file.stat()

            files.append(
                {
                    "name": file.name,
                    "size": round(
                        stat.st_size / 1024 / 1024,
                        2,
                    ),
                    "modified": stat.st_mtime,
                }
            )

        return sorted(
            files,
            key=lambda x: x["name"],
        )

    def delete_file(
        self,
        filename: str,
    ):

        file = self.knowledge_path / filename

        if not file.exists():

            return {
                "success": False,
                "message": "File not found",
            }

        file.unlink()

        return {
            "success": True,
        }


knowledge_repository = KnowledgeRepository()