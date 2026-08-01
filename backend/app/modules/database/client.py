from supabase import Client, create_client

from app.core.config import settings


class SupabaseClient:

    def __init__(self):
        self.client: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_ANON_KEY,
        )

        print("Supabase connected")


supabase_client = SupabaseClient()
print("SUPABASE URL =", settings.SUPABASE_URL)

# ==========================
# Export Client
# ==========================

supabase = supabase_client.client