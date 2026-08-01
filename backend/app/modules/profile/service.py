from datetime import datetime, timedelta

from app.modules.database.client import supabase_client


class ProfileService:

    # =====================================================
    # Create Patient
    # =====================================================

    def create_patient(
        self,
        phone_number: str,
        name: str,
        age=None,
        gender=None,
        blood_type=None,
        allergies=None,
        chronic_diseases=None,
        medications=None,
        height=None,
        weight=None,
    ):

        existing = self.get_profile(phone_number)

        if existing:
            raise ValueError("Patient already exists.")

        response = (
            supabase_client.client
            .table("user_profiles")
            .insert(
                {
                    "phone_number": phone_number,
                    "name": name,
                    "age": age,
                    "gender": gender,
                    "blood_type": blood_type,
                    "allergies": allergies,
                    "chronic_diseases": chronic_diseases,
                    "medications": medications,
                    "height": height,
                    "weight": weight,
                }
            )
            .execute()
        )

        return response.data[0]

    # =====================================================
    # Get Profile
    # =====================================================

    def get_profile(
        self,
        phone_number: str,
    ):

        response = (
            supabase_client.client
            .table("user_profiles")
            .select("*")
            .eq("phone_number", phone_number)
            .limit(1)
            .execute()
        )

        if response.data:
            return response.data[0]

        return None

    # =====================================================
    # Create Empty Profile
    # =====================================================

    def create_profile(
        self,
        phone_number: str,
    ):

        profile = self.get_profile(phone_number)

        if profile:
            return profile

        response = (
            supabase_client.client
            .table("user_profiles")
            .insert(
                {
                    "phone_number": phone_number,
                }
            )
            .execute()
        )

        return response.data[0]

    # =====================================================
    # Update Profile
    # =====================================================

    def update_profile(
        self,
        phone_number: str,
        **fields,
    ):

        current = self.get_profile(phone_number)

        if current is None:
            current = self.create_profile(phone_number)

        # لا ترسل أي قيمة None حتى لا تمسح البيانات القديمة
        update_data = {}

        for key, value in fields.items():
            if value is not None:
                update_data[key] = value

        if not update_data:
            return current

        print("=" * 60)
        print("UPDATING PROFILE")
        print(update_data)

        response = (
            supabase_client.client
            .table("user_profiles")
            .update(update_data)
            .eq("phone_number", phone_number)
            .execute()
        )

        print(response.data)

        if response.data:
            return response.data[0]

        return self.get_profile(phone_number)

    # =====================================================
    # Clear One Field
    # =====================================================

    def clear_field(
        self,
        phone_number: str,
        field: str,
    ):

        response = (
            supabase_client.client
            .table("user_profiles")
            .update(
                {
                    field: None,
                }
            )
            .eq("phone_number", phone_number)
            .execute()
        )

        return response.data

    # =====================================================
    # Update Name
    # =====================================================

    def update_name(
        self,
        phone_number: str,
        name: str,
    ):

        return self.update_profile(
            phone_number,
            name=name,
        )

    # =====================================================
    # Total Patients
    # =====================================================

    def get_total_patients(self):

        return len(
            supabase_client.client
            .table("user_profiles")
            .select("phone_number")
            .execute()
            .data
        )

    # =====================================================
    # Patients Growth
    # =====================================================

    def get_patients_growth(
        self,
        days: int = 30,
    ):

        response = (
            supabase_client.client
            .table("user_profiles")
            .select("created_at")
            .order(
                "created_at",
                desc=False,
            )
            .execute()
        )

        start_date = (
            datetime.now() - timedelta(days=days - 1)
        ).date()

        stats = {}

        for i in range(days):
            day = start_date + timedelta(days=i)
            stats[str(day)] = 0

        for row in response.data:

            created = (
                datetime.fromisoformat(
                    row["created_at"].replace(
                        "Z",
                        "+00:00",
                    )
                )
                .date()
            )

            key = str(created)

            if key in stats:
                stats[key] += 1

        return [
            {
                "date": k,
                "patients": v,
            }
            for k, v in stats.items()
        ]

    # =====================================================
    # All Profiles
    # =====================================================

    def get_all_profiles(self):

        response = (
            supabase_client.client
            .table("user_profiles")
            .select("*")
            .order(
                "updated_at",
                desc=True,
            )
            .execute()
        )

        return response.data or []

    # =====================================================
    # Delete Patient
    # =====================================================

    def delete_patient(
        self,
        phone_number: str,
    ):

        db = supabase_client.client

        # Delete conversations
        db.table("conversations") \
            .delete() \
            .eq("phone_number", phone_number) \
            .execute()

        # Delete appointments
        db.table("appointments") \
            .delete() \
            .eq("patient_phone", phone_number) \
            .execute()

        # Delete processed whatsapp messages
        db.table("processed_messages") \
            .delete() \
            .eq("phone_number", phone_number) \
            .execute()

        # Delete profile
        db.table("user_profiles") \
            .delete() \
            .eq("phone_number", phone_number) \
            .execute()

        return {
            "success": True
        }
profile_service = ProfileService()