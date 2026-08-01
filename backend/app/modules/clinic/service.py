from app.modules.clinic.repository import clinic_repository


class ClinicService:

    # =====================================================
    # Clinic
    # =====================================================

    def get_clinic(self):
        return clinic_repository.get_clinic()

    def update_clinic(
        self,
        data: dict,
    ):
        return clinic_repository.update_clinic(data)

    # =====================================================
    # Branches
    # =====================================================

    def get_branches(self):
        return clinic_repository.get_branches()

    # =====================================================
    # Departments
    # =====================================================

    def get_departments(self):
        return clinic_repository.get_departments()

    # =====================================================
    # Doctors
    # =====================================================

    def get_doctors(self):
        return clinic_repository.get_doctors()

    # =====================================================
    # Services
    # =====================================================

    def get_services(self):
        return clinic_repository.get_services()

    # =====================================================
    # Offers
    # =====================================================

    def get_offers(self):
        return clinic_repository.get_offers()


clinic_service = ClinicService()