from enum import Enum


class Intent(str, Enum):

    GENERAL_CHAT = "general_chat"

    DOCTOR_SEARCH = "doctor_search"

    DEPARTMENT_INFO = "department_info"

    SERVICE_INFO = "service_info"

    BRANCH_INFO = "branch_info"

    OFFER_INFO = "offer_info"

    CLINIC_INFO = "clinic_info"

    BOOK_APPOINTMENT = "book_appointment"