// src/pages/ProfileAdmin.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfileAdmin() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  const emptyProfile = {
    lastName: "",
    firstName: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    picture: "", // URL de l'image profil
    profileDescription: "",
    cvLink: "", // URL du CV
    skills: [], // {name, level, imageUrl}
    githubLink: "",
    linkedinLink: "",
  };

    const handleLogout = () => {
        logout();
        navigate("/"); // redirige vers la landing page
    };

  const skillLevels = ["low", "medium", "experienced", "expert"];

  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Modal pour ajout compétence
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: "low", imageFile: null });

  // fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile");
        if (res.status === 404) setProfile(emptyProfile);
        else {
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

  // Upload fichier (photo ou CV ou compétence)
  const handleFileUpload = async (file, type) => {
    if (!file) return "";
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const data = await res.json();
    return data.url || "";
  };

  const handleAddSkill = async () => {
    if (!newSkill.name.trim()) return;

    // upload image si présente
    let imageUrl = "";
    if (newSkill.imageFile) imageUrl = await handleFileUpload(newSkill.imageFile, "picture");

    setProfile((p) => ({
      ...p,
      skills: [...p.skills, { ...newSkill, imageUrl }],
    }));

    setNewSkill({ name: "", level: "low", imageFile: null });
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
      // upload photo et CV si nécessaire
      let pictureUrl = profile.picture;
      if (profile.picture instanceof File) pictureUrl = await handleFileUpload(profile.picture, "picture");

      let cvUrl = profile.cvLink;
      if (profile.cvLink instanceof File) cvUrl = await handleFileUpload(profile.cvLink, "document");

      const payload = { ...profile, picture: pictureUrl, cvLink: cvUrl };

      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
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
        <div style={{ marginTop: 16 }}>
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
      <h2>Profil</h2>
        
      {message && <div style={{ color: "green", marginBottom: 8 }}>{message}</div>}
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <div style={{ display: "grid", gap: 8 }}>
        <label>
          Prénom
          <input name="firstName" value={profile.firstName} onChange={handleChange} disabled={role !== "admin"} />
        </label>

        <label>
          Nom
          <input name="lastName" value={profile.lastName} onChange={handleChange} disabled={role !== "admin"} />
        </label>

        <label>
          Image Profil
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfile((p) => ({ ...p, picture: e.target.files[0] }))}
            disabled={role !== "admin"}
          />
        </label>
        {profile.picture && typeof profile.picture === "string" && (
          <img src={`http://localhost:5000${profile.picture}`} alt="Profil" width={230} height={330} />
        )}

        <label> Date de naissance <input type="date" name="birthDate" value={profile.birthDate ? profile.birthDate.slice(0, 10) : ""} onChange={handleChange} disabled={role !== "admin"} /> </label> 
        <label> Téléphone <input name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} disabled={role !== "admin"} placeholder="Numéro de téléphone" /> </label>
         <label> Email <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={role !== "admin"} placeholder="Email" /> </label>

        <label>
          CV
          <input type="file" onChange={(e) => setProfile((p) => ({ ...p, cvLink: e.target.files[0] }))} disabled={role !== "admin"} />
        </label>
        {profile.cvLink && typeof profile.cvLink === "string" && (
          <a href={`http://localhost:5000${profile.cvLink}`} target="_blank" rel="noreferrer">
            Voir CV
          </a>
        )}

        <fieldset style={{ border: "1px solid #eee", padding: 8 }}>
          <legend>Compétences</legend>
          <ul>
            {profile.skills.map((s, i) => (
              <li key={i}>
                {s.name} ({s.level}){" "}
                {s.imageUrl && <img src={`http://localhost:5000${s.imageUrl}`} alt={s.name} width={80} />} 
                {role === "admin" && <button type="button" onClick={() => handleRemoveSkill(i)}>Supprimer</button>}
              </li>
            ))}
          </ul>
          {role === "admin" && <button type="button" onClick={() => setShowSkillModal(true)}>Ajouter une compétence</button>}
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
              <label>
                Image
                <input type="file" accept="image/*" onChange={(e) => setNewSkill((s) => ({ ...s, imageFile: e.target.files[0] }))} />
              </label>
              <div style={{ marginTop: 8 }}>
                <button onClick={handleAddSkill}>Ajouter</button>{" "}
                <button onClick={() => setShowSkillModal(false)}>Annuler</button>
              </div>
            </div>
          </div>
        )}
         <label>
          Description
            <textarea
            name="profileDescription"
            placeholder="Description"
            value={profile.profileDescription}
            onChange={handleChange}
            disabled={role !== "admin"}
            />
        </label>
        <label>
          GitHub
          <input name="githubLink" value={profile.githubLink} onChange={handleChange} disabled={role !== "admin"} />
        </label>

        <label>
          LinkedIn
          <input name="linkedinLink" value={profile.linkedinLink} onChange={handleChange} disabled={role !== "admin"} />
        </label>

        {role === "admin" && <button onClick={handleSave}>Enregistrer</button>}
      </div>
    </div>
  );
}
