import React, { useState } from "react";

const getAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f1a501&color=fff`;

const initialUser = {
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 9876543210",
  city: "Ahmedabad",
  joined: "Jan 2023",
};

const Profile = () => {
  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setForm(user);
    setEditMode(false);
  };
  const handleSave = () => {
    setUser(form);
    setEditMode(false);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        width: "100%",
        background: "#fff7e0", // Brand light yellow or #fff for pure white
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        position: "relative",
        overflowX: "hidden", // Prevent horizontal scroll
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100vw",
          background: "rgba(255,255,255,0.85)",
          borderRadius: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          overflow: "hidden",
          minHeight: "100vh",
          flexWrap: "wrap",
        }}
      >
        {/* Left: Avatar & Basic */}
        <div
          style={{
            flex: 1.2,
            minWidth: 320,
            background: "linear-gradient(135deg, #f1a501 0%, #f7c873 100%)", // Updated gradient
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            color: "#fff",
          }}
        >
          <img
            src={getAvatarUrl(user.name)}
            alt="User Avatar"
            style={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: "6px solid #fff6",
              marginBottom: 24,
              boxShadow: "0 4px 24px #0002",
              background: "#fff",
            }}
          />
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 700, letterSpacing: 1, color: "#fff" }}>
            {user.name}
          </h2>
          <p style={{ margin: "8px 0 0 0", fontSize: 18, opacity: 0.85, color: "#fff" }}>{user.email}</p>
          <div style={{ marginTop: 32, fontSize: 16, opacity: 0.9, color: "#fff" }}>
            <span style={{ fontWeight: 500 }}>Member Since:</span> {user.joined}
          </div>
        </div>

        {/* Right: Details & Edit */}
        <div
          style={{
            flex: 2,
            minWidth: 320,
            padding: "48px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "rgba(255,255,255,0.95)",
          }}
        >
          <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, color: "#f1a501" }}>
            Profile Details
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Name */}
            <div>
              <label style={{ fontWeight: 600, color: "#f1a501", fontSize: 16 }}>Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 18,
                    borderRadius: 8,
                    border: "1.5px solid #f1a501",
                    marginTop: 6,
                  }}
                />
              ) : (
                <div style={{ fontSize: 20, marginTop: 6 }}>{user.name}</div>
              )}
            </div>
            {/* Email */}
            <div>
              <label style={{ fontWeight: 600, color: "#f1a501", fontSize: 16 }}>Email</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 18,
                    borderRadius: 8,
                    border: "1.5px solid #f1a501",
                    marginTop: 6,
                  }}
                />
              ) : (
                <div style={{ fontSize: 20, marginTop: 6 }}>{user.email}</div>
              )}
            </div>
            {/* Phone */}
            <div>
              <label style={{ fontWeight: 600, color: "#f1a501", fontSize: 16 }}>Phone</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 18,
                    borderRadius: 8,
                    border: "1.5px solid #f1a501",
                    marginTop: 6,
                  }}
                />
              ) : (
                <div style={{ fontSize: 20, marginTop: 6 }}>{user.phone}</div>
              )}
            </div>
            {/* City */}
            <div>
              <label style={{ fontWeight: 600, color: "#f1a501", fontSize: 16 }}>City</label>
              {editMode ? (
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: 18,
                    borderRadius: 8,
                    border: "1.5px solid #f1a501",
                    marginTop: 6,
                  }}
                />
              ) : (
                <div style={{ fontSize: 20, marginTop: 6 }}>{user.city}</div>
              )}
            </div>
          </div>
          {/* Buttons */}
          <div style={{ marginTop: 40, display: "flex", gap: 18 }}>
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  style={{
                    padding: "12px 36px",
                    background: "linear-gradient(90deg, #f1a501 0%, #f7c873 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: "pointer",
                    boxShadow: "0 2px 8px #f1a50133",
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: "12px 36px",
                    background: "#fff7e0",
                    color: "#f1a501",
                    border: "1.5px solid #f1a501",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 18,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                style={{
                  padding: "12px 36px",
                  background: "linear-gradient(90deg, #f1a501 0%, #f7c873 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 18,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px #f1a50133",
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;