// src/pages/ProfilePublic.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePublic() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;
const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {       
        const res = await fetch(`${API_URL}/api/profile`);
        if (!res.ok) {
           navigate("/login");
        }
        const data = await res.json();
        console.log(data);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p>Chargement du profil...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <p>Aucun profil disponible</p>;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 16 }}>
        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <button onClick={() => navigate("/login")}>Acces Admin</button>
        </div>
      <h2>
        {profile.firstName} {profile.lastName}
      </h2>
      {profile.picture && (
        <img
          src={`${API_URL}${profile.picture}`}
          alt={`${profile.firstName} ${profile.lastName}`}
          style={{ maxWidth: 200, height: "auto" }}
        />
      )}
      <p>{profile.profileDescription}</p>
      <p>
        <strong>Date de naissance:</strong>{" "}
        {profile.birthDate ? profile.birthDate.slice(0, 10) : ""}
      </p>
      <p>
        <strong>Téléphone:</strong> {profile.phoneNumber}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      {profile.cvLink && (
        <p>
          <a href={profile.cvLink} target="_blank" rel="noreferrer">
            Voir CV
          </a>
        </p>
      )}
      <h3>Compétences</h3>
      <ul>
        {profile.skills.map((s, i) => (
          <li key={i}>
            {s.name} ({s.level})
            {s.imageUrl && (
              <img
                src={`${API_URL}${s.imageUrl}`}
                alt={s.name}
                style={{ maxWidth: 80, height: "auto", marginLeft: 8 }}
              />
            )}
          </li>
        ))}
      </ul>
      <h3>Liens</h3>
      <ul>
        {profile.githubLink && (
          <li>
            <a href={profile.githubLink} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        )}
        {profile.linkedinLink && (
          <li>
            <a href={profile.linkedinLink} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
