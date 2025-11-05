// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useApi } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { token, user } = useAuth(); // user.role contient le rôle
  const { get, post } = useApi();
  const [profile, setProfile] = useState({
    lastName: "",
    firstName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    picture: "",
    profileDescription: "",
    cvLink: "",
    skills: [],
    githubLink: "",
    linkedinLink: ""
  });
  const [message, setMessage] = useState("");

  // Charger le profil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await get("/api/profile");
        if (data) {
          setProfile({
            ...profile,
            ...data
          });
        }
      } catch (err) {
        console.error("Erreur récupération profil:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await post("/api/profile", profile);
      setMessage("Profil mis à jour !");
      setProfile(updated);
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la mise à jour.");
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <div>
      <h2>Mon Profil</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={profile.firstName}
          onChange={handleChange}
          disabled={!isAdmin}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={profile.lastName}
          onChange={handleChange}
          disabled={!isAdmin}
        />
        <input
          type="date"
          name="birthDate"
          placeholder="Date de naissance"
          value={profile.birthDate?.substring(0, 10) || ""}
          onChange={handleChange}
          disabled={!isAdmin}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Téléphone"
          value={profile.phoneNumber}
          onChange={handleChange}
          disabled={!isAdmin}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          disabled={!isAdmin}
        />
        <input
          type="text"
          name="picture"
          placeholder="URL Photo"
          value={profile.picture}
          onChange={handleChange}
          disabled={!isAdmin}
        />
        <textarea
          name="profileDescription"
          placeholder="Description"
          value={profile.profileDescription}
          onChange={handleChange}
          disabled={!isAdmin}
        />
        <input
          type="text"
          name="cvLink"
          placeholder="Lien CV"
          value={profile.cvLink}
          onChange={handleChange}
          disabled={!isAdmin}
        />
        <input
          type="text"
          name="githubLink"
          placeholder="GitHub"
          value={profile.githubLink}
          onChange={handleChange}
          disabled={!isAdmin}
        />
        <input
          type="text"
          name="linkedinLink"
          placeholder="LinkedIn"
          value={profile.linkedinLink}
          onChange={handleChange}
          disabled={!isAdmin}
        />

        {isAdmin && <button type="submit">Enregistrer</button>}
      </form>
    </div>
  );
}
