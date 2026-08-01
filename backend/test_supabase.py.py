from app.modules.database.service import database_service

database_service.save_message(
    phone_number="201131002834",
    role="user",
    message="Hello from Python"
)

print("Saved Successfully")