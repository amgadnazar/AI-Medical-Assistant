class ProfileFormatter:

    def format(self, profile: dict | None) -> str:

        if not profile:
            return "No profile available."

        return f"""
Name: {profile.get("name") or "Unknown"}
Age: {profile.get("age") or "Unknown"}
Gender: {profile.get("gender") or "Unknown"}
Blood Type: {profile.get("blood_type") or "Unknown"}
Height: {profile.get("height") or "Unknown"}
Weight: {profile.get("weight") or "Unknown"}
Allergies: {profile.get("allergies") or "None"}
Chronic Diseases: {profile.get("chronic_diseases") or "None"}
Medications: {profile.get("medications") or "None"}
"""


profile_formatter = ProfileFormatter()