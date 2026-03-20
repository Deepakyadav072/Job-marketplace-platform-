// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";

const Profile = () => {
  // load demo profile from localStorage (or from API later)
  const stored = JSON.parse(localStorage.getItem("profile") || "{}");
  const [profile, setProfile] = useState({
    name: stored.name || "",
    email: stored.email || "",
    bio: stored.bio || "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(profile));
    setSaved(true);
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">My Profile</h1>
        <form onSubmit={handleSave} className="space-y-4">
          <input name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" className="w-full border rounded px-4 py-2"/>
          <input name="email" value={profile.email} onChange={handleChange} placeholder="Email" className="w-full border rounded px-4 py-2"/>
          <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Short bio" rows={4} className="w-full border rounded px-4 py-2"></textarea>
          <div className="flex items-center gap-4">
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded">Save</button>
            {saved && <span className="text-green-600 font-semibold">Saved!</span>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
