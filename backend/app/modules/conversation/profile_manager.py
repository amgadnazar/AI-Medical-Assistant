from app.modules.profile.service import profile_service


class ProfileManager:

    def create_if_not_exists(
        self,
        phone_number: str,
    ):

        return profile_service.create_profile(
            phone_number,
        )

    def update(
        self,
        phone_number: str,
        updates: dict,
    ):

        if not updates:
            return

        print("=" * 60)
        print("PROFILE UPDATE REQUEST")
        print(updates)
        print("=" * 60)

        profile_service.update_profile(
            phone_number,
            **updates,
        )

        print("=" * 60)
        print("PROFILE AFTER UPDATE")
        print(
            profile_service.get_profile(
                phone_number,
            )
        )
        print("=" * 60)

    def get(
        self,
        phone_number: str,
    ):

        return profile_service.get_profile(
            phone_number,
        )


profile_manager = ProfileManager()