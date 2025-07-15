import React, { useState ,useEffect } from "react";

// const getAvatarUrl = (name: string) =>
//   `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f1a501&color=fff`;

// const initialUser = {
//   name: "Rahul Sharma",
//   email: "rahul.sharma@email.com",
//   phone: "+91 9876543210",
//   city: "Ahmedabad",
//   joined: "Jan 2023",
// };
const API_URL = import.meta.env.VITE_API_URL; // For Vite

export const fetchProfile = async () => {
  const token = localStorage.getItem('customerToken'); // Or get from context
  const response = await fetch(`${API_URL}/api/auth/profile`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  return response.json();
};

const Profile = () => {
  // const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState([]);
  const [profile, setProfile] = useState<any>(null);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  useEffect(() => {
    const getProfile = async () => {
      try {
        console.log("API_URL:", API_URL); // Debug
        const data = await fetchProfile();
        console.log("Profile data:", data); // Debug
        setProfile(data.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    getProfile();
  }, []);


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
            src={profile?.image}
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
            {profile?.username}
          </h2>
          <p style={{ margin: "8px 0 0 0", fontSize: 18, opacity: 0.85, color: "#fff" }}>{profile?.email}</p>
          <div style={{ marginTop: 32, fontSize: 16, opacity: 0.9, color: "#fff" }}>
            <span style={{ fontWeight: 500 }}>Member Since:</span> {profile?.createdAt ? new Date(profile.createdAt).toISOString().slice(0, 10) : ''}
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
                <div style={{ fontSize: 20, marginTop: 6 }}>{profile?.username}</div>
            </div>
            {/* Email */}
            <div>
              <label style={{ fontWeight: 600, color: "#f1a501", fontSize: 16 }}>Email</label>
                <div style={{ fontSize: 20, marginTop: 6 }}>{profile?.email}</div>
            </div>
            {/* Phone */}
            <div>
              <label style={{ fontWeight: 600, color: "#f1a501", fontSize: 16 }}>Phone</label>

                <div style={{ fontSize: 20, marginTop: 6 }}>{profile?.phone_number}</div>
            </div>
            {/* City */}
            <div>
              <label style={{ fontWeight: 600, color: "#f1a501", fontSize: 16 }}>City</label>
                <div style={{ fontSize: 20, marginTop: 6 }}>{profile?.city}</div>
            </div>
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default Profile;