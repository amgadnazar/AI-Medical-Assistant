type Props = {
  appointments: any[];
};

export default function AppointmentsCard({
  appointments,
}: Props) {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        Appointments
      </h2>

      <table className="w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.appointment_date}</td>

              <td>
                {a.appointment_time.slice(0, 5)}
              </td>

              <td>
                {a.doctors?.full_name}
              </td>

              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}