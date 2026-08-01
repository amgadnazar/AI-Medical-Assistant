from .repository import message_tracker_repository


class MessageTrackerService:

    def is_processed(
        self,
        message_id: str,
    ) -> bool:

        return message_tracker_repository.exists(
            message_id
        )

    def mark_processed(
        self,
        message_id: str,
        phone_number: str,
    ):

        return message_tracker_repository.save(
            message_id=message_id,
            phone_number=phone_number,
        )


message_tracker_service = MessageTrackerService()