import { useAuth } from "../context/AuthContext";

export const useApi = () => {
  const { token } = useAuth();

  const get = async (url) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return res.json();
  };

  const post = async (url, body) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });
    return res.json();
  };

  return { get, post };
};
