from app.modules.clinic.repository import clinic_repository


class ClinicResponseBuilder:

    def doctors(
        self,
        department_id: int,
    ):

        doctors = clinic_repository.get_doctors_by_department(
            department_id,
        )

        if not doctors:

            return None

        reply = "👨‍⚕️ الأطباء المتوفرون:\n\n"

        for doctor in doctors:

            reply += (
                f"• {doctor['full_name']}\n"
                f"{doctor['title']}\n"
                f"💰 {doctor['consultation_price']} ريال\n"
                f"🕒 {doctor['start_time']} - {doctor['end_time']}\n\n"
            )

        return reply.strip()


clinic_response_builder = ClinicResponseBuilder()