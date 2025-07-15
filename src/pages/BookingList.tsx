import React from "react";

const dummyBookings = [
  {
    id: 1,
    turf: "Ahmedabad Sports Arena",
    date: "2024-07-10",
    time: "6:00 PM - 7:00 PM",
    city: "Ahmedabad",
    status: "Confirmed",
  },
  {
    id: 2,
    turf: "Royal Turf Club",
    date: "2024-07-12",
    time: "8:00 AM - 9:00 AM",
    city: "Surat",
    status: "Cancelled",
  },
  {
    id: 3,
    turf: "Urban Playzone",
    date: "2024-07-15",
    time: "5:00 PM - 6:00 PM",
    city: "Vadodara",
    status: "Confirmed",
  },
];

const statusColors: Record<string, string> = {
  Confirmed: "#27ae60",
  Cancelled: "#e74c3c",
  Pending: "#f1a501",
};

const BookingList = () => (
  <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 16px" }}>
    <div style={{
      background: "#fff",
      borderRadius: 20,
      boxShadow: "0 4px 24px #0001",
      padding: 32,
      minHeight: 400,
    }}>
      <h2 style={{ color: "#f1a501", fontWeight: 700, fontSize: 28, marginBottom: 32, textAlign: "center" }}>
        My Turf Bookings
      </h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fff7e0" }}>
              <th style={{ padding: 12, textAlign: "left", color: "#f1a501", fontWeight: 600 }}>Turf Name</th>
              <th style={{ padding: 12, textAlign: "left", color: "#f1a501", fontWeight: 600 }}>Date</th>
              <th style={{ padding: 12, textAlign: "left", color: "#f1a501", fontWeight: 600 }}>Time</th>
              <th style={{ padding: 12, textAlign: "left", color: "#f1a501", fontWeight: 600 }}>City</th>
              <th style={{ padding: 12, textAlign: "left", color: "#f1a501", fontWeight: 600 }}>Status</th>
              <th style={{ padding: 12, textAlign: "center", color: "#f1a501", fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyBookings.map((booking) => (
              <tr key={booking.id} style={{ borderBottom: "1px solid #f3f3f3" }}>
                <td style={{ padding: 12, fontWeight: 500 }}>{booking.turf}</td>
                <td style={{ padding: 12 }}>{booking.date}</td>
                <td style={{ padding: 12 }}>{booking.time}</td>
                <td style={{ padding: 12 }}>{booking.city}</td>
                <td style={{ padding: 12 }}>
                  <span style={{
                    background: statusColors[booking.status] + "22",
                    color: statusColors[booking.status],
                    padding: "4px 16px",
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 15,
                  }}>
                    {booking.status}
                  </span>
                </td>
                <td style={{ padding: 12, textAlign: "center" }}>
                  <button
                    style={{
                      padding: "6px 20px",
                      background: "#f1a501",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default BookingList; 