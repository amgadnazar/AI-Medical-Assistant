from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.modules.database.client import supabase_client

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Initialize Database Connection
# ==========================================

_ = supabase_client

# ==========================================
# API Routes
# ==========================================

app.include_router(
    api_router,
    prefix="/api/v1",
)