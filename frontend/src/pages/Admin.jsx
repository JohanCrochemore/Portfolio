import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { token, logout } = useAuth();

  if (!token) return <p>Accès non autorisé</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Se déconnecter</button>
      <p>Bienvenue sur votre espace admin.</p>
    </div>
  );
}
