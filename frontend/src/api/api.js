// src/api/api.js
import { useAuth } from "../context/AuthContext";

export const useApi = () => {
  const { token } = useAuth();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Construire les headers
  const buildHeaders = () => ({
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  });

  // Gérer la réponse JSON et erreurs
  const handleResponse = async (res) => {
    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`Invalid JSON response: ${text}`);
    }
    if (!res.ok) throw data;
    return data;
  };

  const get = async (url) => {
    const res = await fetch(`${API_BASE_URL}${url}`, { headers: buildHeaders() });
    return handleResponse(res);
  };

  const post = async (url, body) => {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  };

  const put = async (url, body) => {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers: buildHeaders(),
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  };

  const remove = async (url) => {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: buildHeaders(),
    });
    return handleResponse(res);
  };

  return { get, post, put, remove };
};
