from app.modules.intent.enums import Intent


DOCTOR_KEYWORDS = [
    "دكتور",
    "الدكتور",
    "دكتورة",
    "طبيب",
    "الأطباء",
    "الاطباء",
    "الدكاترة",
    "الدكاتره",
    "doctor",
]

SPECIALTY_KEYWORDS = [
    "قلب",
    "باطنة",
    "جلدية",
    "عظام",
    "أسنان",
    "اسنان",
    "أطفال",
    "اطفال",
    "نساء",
    "ولادة",
    "عيون",
    "أنف",
    "اذن",
    "صدر",
    "مسالك",
    "كلى",
    "غدد",
]

BOOKING_KEYWORDS = [
    "احجز",
    "حجز",
    "موعد",
    "مواعيد",
    "احجزلي",
    "احجز لي",
]

SERVICE_KEYWORDS = [
    "خدمة",
    "خدمات",
    "تحليل",
    "تحاليل",
    "أشعة",
    "اشعة",
]

BRANCH_KEYWORDS = [
    "فرع",
    "عنوان",
    "مكان",
    "وين",
    "أين",
]

OFFER_KEYWORDS = [
    "عرض",
    "العروض",
    "خصم",
]


class IntentClassifier:

    def classify(
        self,
        message: str,
    ) -> Intent:

        text = message.lower().strip()

        # ==========================
        # BOOKING FIRST
        # ==========================

        if any(word in text for word in BOOKING_KEYWORDS):

            print("BOOK_APPOINTMENT")

            return Intent.BOOK_APPOINTMENT

        # ==========================
        # DOCTOR SEARCH
        # ==========================

        if any(word in text for word in DOCTOR_KEYWORDS):

            print("DOCTOR_SEARCH")

            return Intent.DOCTOR_SEARCH

        if any(word in text for word in SPECIALTY_KEYWORDS):

            print("DOCTOR_SEARCH")

            return Intent.DOCTOR_SEARCH

        if (
            "كشف" in text
            or "سعر" in text
            or "رسوم" in text
        ):

            print("DOCTOR_SEARCH")

            return Intent.DOCTOR_SEARCH

        # ==========================
        # BRANCH
        # ==========================

        if any(word in text for word in BRANCH_KEYWORDS):

            return Intent.BRANCH_INFO

        # ==========================
        # OFFERS
        # ==========================

        if any(word in text for word in OFFER_KEYWORDS):

            return Intent.OFFER_INFO

        # ==========================
        # SERVICES
        # ==========================

        if any(word in text for word in SERVICE_KEYWORDS):

            return Intent.SERVICE_INFO

        print("=" * 60)
        print("MESSAGE :", text)
        print("INTENT  : GENERAL_CHAT")
        print("=" * 60)

        return Intent.GENERAL_CHAT


intent_classifier = IntentClassifier()