// src/pages/ProfileAdmin.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * ProfileAdmin
 * - affiche un formulaire vide si aucun profil en base
 * - permet la création/modification via PUT /api/profile (backend doit créer si absent)
 */
export default function ProfileAdmin() {
  const { token, role } = useAuth();
    console.log(role);
  const emptyProfile = {
    name: "",
    bio: "",
    skills: [], // en DB c'est un array, ici on gérera via input text csv
    avatarUrl: "",
    socialLinks: {
      github: "",
      website: "",
      linkedin: "",
    },
  };

  const [profile, setProfile] = useState(emptyProfile);
  const [skillsText, setSkillsText] = useState(""); // "js,react,node"
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Charger le profil au montage
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile");
        if (res.status === 404) {
          // Pas de profil -> on garde emptyProfile
          setProfile(emptyProfile);
          setSkillsText("");
        } else {
          const data = await res.json();
          if (data) {
            // normaliser
            setProfile({
              name: data.name || "",
              bio: data.bio || "",
              skills: Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []),
              avatarUrl: data.avatarUrl || "",
              socialLinks: {
                github: data.socialLinks?.github || "",
                website: data.socialLinks?.website || "",
                linkedin: data.socialLinks?.linkedin || "",
              },
            });
            setSkillsText((Array.isArray(data.skills) ? data.skills : []).join(", "));
          } else {
            setProfile(emptyProfile);
            setSkillsText("");
          }
        }
      } catch (err) {
        console.error("Erreur lors du chargement du profil :", err);
        setError("Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mettre à jour un champ simple
  const handleChange = (e) => {
    const { name, value } = e.target;
    // gestion socialLinks.* via name "socialLinks.github" etc.
    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];
      setProfile((p) => ({
        ...p,
        socialLinks: { ...p.socialLinks, [key]: value },
      }));
    } else {
      setProfile((p) => ({ ...p, [name]: value }));
    }
  };

  // Skill input change (string)
  const handleSkillsChange = (e) => {
    setSkillsText(e.target.value);
  };

  // Save (PUT) — backend doit créer si profile absent
  const handleSave = async () => {
    setMessage(null);
    setError(null);

    // Build payload: convert skillsText to array trimmed non-empty
    const skillsArr = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...profile,
      skills: skillsArr,
    };

    try {
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
        // normaliser la réponse si nécessaire
        setProfile({
          name: data.name || "",
          bio: data.bio || "",
          skills: Array.isArray(data.skills) ? data.skills : (data.skills ? [data.skills] : []),
          avatarUrl: data.avatarUrl || "",
          socialLinks: {
            github: data.socialLinks?.github || "",
            website: data.socialLinks?.website || "",
            linkedin: data.socialLinks?.linkedin || "",
          },
        });
        setSkillsText((Array.isArray(data.skills) ? data.skills : []).join(", "));
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
          Nom
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="Ton nom complet"
          />
        </label>

        <label>
          Bio
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="Une courte présentation"
            rows={5}
          />
        </label>

        <label>
          Compétences (séparées par des virgules)
          <input
            name="skills"
            value={skillsText}
            onChange={handleSkillsChange}
            disabled={role !== "admin"}
            placeholder="javascript, react, node"
          />
        </label>

        <label>
          Image (URL)
          <input
            name="avatarUrl"
            value={profile.avatarUrl}
            onChange={handleChange}
            disabled={role !== "admin"}
            placeholder="https://..."
          />
        </label>

        <fieldset style={{ border: "1px solid #eee", padding: 8 }}>
          <legend>Liens sociaux</legend>
          <label>
            GitHub
            <input
              name="socialLinks.github"
              value={profile.socialLinks.github}
              onChange={handleChange}
              disabled={role !== "admin"}
              placeholder="https://github.com/..."
            />
          </label>
          <label>
            Website
            <input
              name="socialLinks.website"
              value={profile.socialLinks.website}
              onChange={handleChange}
              disabled={role !== "admin"}
              placeholder="https://..."
            />
          </label>
          <label>
            LinkedIn
            <input
              name="socialLinks.linkedin"
              value={profile.socialLinks.linkedin}
              onChange={handleChange}
              disabled={role !== "admin"}
              placeholder="https://linkedin.com/..."
            />
          </label>
        </fieldset>

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

