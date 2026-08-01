from app.modules.database.client import supabase_client


class SettingsRepository:

    TABLE = "settings"

    @property
    def db(self):
        return supabase_client.client

    # =====================================================
    # Get Settings
    # =====================================================

    def get(self):

        result = (
            self.db
            .table(self.TABLE)
            .select("*")
            .limit(1)
            .execute()
        )

        if not result.data:
            return None

        return result.data[0]

    # =====================================================
    # Update Settings
    # =====================================================

    def update(
        self,
        data: dict,
    ):

        current = self.get()

        if current is None:
            return None

        result = (
            self.db
            .table(self.TABLE)
            .update(data)
            .eq("id", current["id"])
            .execute()
        )

        if not result.data:
            return None

        return result.data[0]


settings_repository = SettingsRepository()