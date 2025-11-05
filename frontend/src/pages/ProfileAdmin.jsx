// src/pages/ProfileAdmin.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfileAdmin() {
  const { token, role } = useAuth();

  const emptyProfile = {
    lastName: "",
    firstName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    picture: "",
    profileDescription: "",
    cvLink: "",
    skills: [], // {name, level}
    githubLink: "",
    linkedinLink: "",
  };

  const skillLevels = ["low", "medium", "experienced", "expert"];

  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Gestion modal ajout compétence
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: "low" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile");
        if (res.status === 404) {
          setProfile(emptyProfile);
        } else {
          const data = await res.json();
          if (data) setProfile({ ...emptyProfile, ...data });
        }
      } catch (err) {
        console.error("Erreur lors du chargement du profil :", err);
        setError("Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    setProfile((p) => ({ ...p, skills: [...p.skills, newSkill] }));
    setNewSkill({ name: "", level: "low" });
    setShowSkillModal(false);
  };

  const handleRemoveSkill = (index) => {
    setProfile((p) => ({
      ...p,
      skills: p.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile({ ...emptyProfile, ...data });
        setMessage("✅ Profil mis à jour avec succès !");
      } else {
        setError(data.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau / serveur");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
      <h2>Profil</h2>

      {message && <div style={{ color: "green", marginBottom: 8 }}>{message}</div>}
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <div style={{ display: "grid", gap: 8 }}>
        <label>
          Prénom
          <input
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="Prénom"
          />
        </label>

        <label>
          Nom
          <input
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="Nom"
          />
        </label>

        <label>
          Date de naissance
          <input
            type="date"
            name="birthDate"
            value={profile.birthDate ? profile.birthDate.slice(0, 10) : ""}
            onChange={handleChange}
            disabled={role !== "admin"}
          />
        </label>

        <label>
          Téléphone
          <input
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="Numéro de téléphone"
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="Email"
          />
        </label>

        <label>
          CV (URL)
          <input
            name="cvLink"
            value={profile.cvLink}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="Lien vers le CV"
          />
        </label>

        <label>
          Description
          <textarea
            name="profileDescription"
            value={profile.profileDescription}
            onChange={handleChange}
            disabled={role !== "admin"}
            rows={5}
            placeholder="Description du profil"
          />
        </label>

        <label>
          Image (URL)
          <input
            name="picture"
            value={profile.picture}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="https://..."
          />
        </label>

        <fieldset style={{ border: "1px solid #eee", padding: 8 }}>
          <legend>Compétences</legend>
          <ul>
            {profile.skills.map((s, i) => (
              <li key={i}>
                {s.name} ({s.level}){" "}
                {role === "admin" && (
                  <button type="button" onClick={() => handleRemoveSkill(i)}>
                    Supprimer
                  </button>
                )}
              </li>
            ))}
          </ul>
          {role === "admin" && (
            <button type="button" onClick={() => setShowSkillModal(true)}>
              Ajouter une compétence
            </button>
          )}
        </fieldset>

        {showSkillModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ backgroundColor: "#fff", padding: 16, borderRadius: 4 }}>
              <h4>Nouvelle compétence</h4>
              <label>
                Nom
                <input
                  value={newSkill.name}
                  onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Nom compétence"
                />
              </label>
              <label>
                Niveau
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill((s) => ({ ...s, level: e.target.value }))}
                >
                  {skillLevels.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </label>
              <div style={{ marginTop: 8 }}>
                <button onClick={handleAddSkill}>Ajouter</button>{" "}
                <button onClick={() => setShowSkillModal(false)}>Annuler</button>
              </div>
            </div>
          </div>
        )}

        <label>
          GitHub
          <input
            name="githubLink"
            value={profile.githubLink}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="https://github.com/..."
          />
        </label>

        <label>
          LinkedIn
          <input
            name="linkedinLink"
            value={profile.linkedinLink}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="https://linkedin.com/..."
          />
        </label>

        <div style={{ marginTop: 12 }}>
          {role === "admin" ? (
            <button onClick={handleSave}>Enregistrer</button>
          ) : (
            <p style={{ color: "#666" }}>Vous n'avez pas les droits pour modifier ce profil.</p>
          )}
        </div>
      </div>
    </div>
  );
}
