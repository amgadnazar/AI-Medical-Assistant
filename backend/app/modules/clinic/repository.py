from app.modules.database.client import supabase_client


class ClinicRepository:

    @property
    def db(self):
        return supabase_client.client

    # =====================================================
    # Clinic
    # =====================================================

    def get_clinic(self):

        result = (
            self.db
            .table("clinics")
            .select("*")
            .limit(1)
            .execute()
        )

        return result.data[0] if result.data else None

    def update_clinic(
        self,
        data: dict,
    ):

        result = (
            self.db
            .table("clinics")
            .update(data)
            .eq("id", 1)
            .execute()
        )

        return result.data[0] if result.data else None

    # =====================================================
    # Branches
    # =====================================================

    def get_branches(self):

        result = (
            self.db
            .table("branches")
            .select("*")
            .execute()
        )

        return result.data or []

    # =====================================================
    # Departments
    # =====================================================

    def get_departments(self):

        result = (
            self.db
            .table("departments")
            .select("*")
            .execute()
        )

        return result.data or []

    def find_department(
        self,
        keyword: str,
    ):

        result = (
            self.db
            .table("departments")
            .select("*")
            .ilike(
                "name",
                f"%{keyword}%"
            )
            .limit(1)
            .execute()
        )

        return result.data[0] if result.data else None

    # =====================================================
    # Doctors
    # =====================================================

    def get_doctors(self):

        result = (
            self.db
            .table("doctors")
            .select("*")
            .execute()
        )

        return result.data or []

    def get_doctors_by_department(
        self,
        department_id: int,
    ):

        result = (
            self.db
            .table("doctors")
            .select("*")
            .eq(
                "department_id",
                department_id,
            )
            .execute()
        )

        return result.data or []

    def find_doctor(
        self,
        keyword: str,
    ):

        result = (
            self.db
            .table("doctors")
            .select("*")
            .ilike(
                "full_name",
                f"%{keyword}%"
            )
            .limit(1)
            .execute()
        )

        return result.data[0] if result.data else None

    def get_doctor_by_id(
        self,
        doctor_id: int,
    ):

        result = (
            self.db
            .table("doctors")
            .select("*")
            .eq(
                "id",
                doctor_id,
            )
            .limit(1)
            .execute()
        )

        return result.data[0] if result.data else None

    # =====================================================
    # Services
    # =====================================================

    def get_services(self):

        result = (
            self.db
            .table("services")
            .select("*")
            .execute()
        )

        return result.data or []

    def get_service_by_department(
        self,
        department_id: int,
    ):

        result = (
            self.db
            .table("services")
            .select("*")
            .eq(
                "department_id",
                department_id,
            )
            .limit(1)
            .execute()
        )

        return result.data[0] if result.data else None

    def find_service(
        self,
        keyword: str,
    ):

        result = (
            self.db
            .table("services")
            .select("*")
            .ilike(
                "name",
                f"%{keyword}%"
            )
            .limit(1)
            .execute()
        )

        return result.data[0] if result.data else None

    # =====================================================
    # Offers
    # =====================================================

    def get_offers(self):

        result = (
            self.db
            .table("offers")
            .select("*")
            .execute()
        )

        return result.data or []

    # =====================================================
    # Search Doctors
    # =====================================================

    def search_doctors(
        self,
        keyword: str,
    ):

        result = (
            self.db
            .table("doctors")
            .select("*")
            .or_(
                f"full_name.ilike.%{keyword}%,title.ilike.%{keyword}%"
            )
            .execute()
        )

        return result.data or []

    # =====================================================
    # Booked Times
    # =====================================================

    def get_booked_times(
        self,
        doctor_id: int,
        appointment_date: str,
    ):

        result = (
            self.db
            .table("appointments")
            .select("appointment_time")
            .eq("doctor_id", doctor_id)
            .eq("appointment_date", appointment_date)
            .neq("status", "cancelled")
            .execute()
        )

        return result.data or []

    # =====================================================
    # Dashboard Counts
    # =====================================================

    def get_doctors_count(self):

        return len(
            self.db
            .table("doctors")
            .select("id")
            .execute()
            .data
        )


clinic_repository = ClinicRepository()