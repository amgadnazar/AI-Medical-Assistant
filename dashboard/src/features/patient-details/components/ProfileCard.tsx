type Props = {
  profile: any;
};

export default function ProfileCard({
  profile,
}: Props) {
  if (!profile) return null;

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        {profile.name}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <p>📞 {profile.phone_number}</p>
        <p>🎂 {profile.age ?? "-"}</p>

        <p>👤 {profile.gender ?? "-"}</p>
        <p>🩸 {profile.blood_type ?? "-"}</p>

        <p>📏 {profile.height ?? "-"}</p>
        <p>⚖ {profile.weight ?? "-"}</p>

        <p>
          Allergies: {profile.allergies ?? "-"}
        </p>

        <p>
          Diseases: {profile.chronic_diseases ?? "-"}
        </p>

        <p>
          Medications: {profile.medications ?? "-"}
        </p>
      </div>
    </div>
  );
}