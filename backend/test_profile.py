from app.modules.profile.service import profile_service

phone = "201131002834"

print("Creating profile...")
profile = profile_service.create_profile(phone)
print(profile)

print()

print("Updating name...")
profile_service.update_name(phone, "Amjad")

print()

print("Reading profile...")
profile = profile_service.get_profile(phone)

print(profile)