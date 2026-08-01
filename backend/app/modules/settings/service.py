from app.modules.settings.repository import settings_repository


class SettingsService:

    # =====================================================
    # Get Settings
    # =====================================================

    def get_settings(self):
        return settings_repository.get()

    # =====================================================
    # Update Settings
    # =====================================================

    def update_settings(
        self,
        data: dict,
    ):
        return settings_repository.update(data)


settings_service = SettingsService()