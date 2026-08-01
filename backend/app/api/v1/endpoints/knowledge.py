from fastapi import APIRouter, UploadFile, File

from app.modules.knowledge.service import (
    knowledge_service,
)
import shutil
from pathlib import Path
from app.modules.rag.service import rag_service

router = APIRouter()


@router.get("/files")
def get_files():

    return knowledge_service.get_files()

@router.post("/upload")
def upload_file(
    file: UploadFile = File(...),
):

    knowledge_dir = (
        Path(__file__)
        .resolve()
        .parents[4]
        / "knowledge"
    )

    destination = knowledge_dir / file.filename

    with open(destination, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer,
        )

    return {
        "success": True,
        "filename": file.filename,
    }

@router.post("/rebuild")
def rebuild_knowledge():

    return rag_service.rebuild()

@router.delete("/files/{filename}")
def delete_file(filename: str):

    return knowledge_service.delete_file(filename)