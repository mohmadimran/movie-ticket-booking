import api from "./apiClient";

export const login = (data) =>
  api.post("api/auth/login", data);

export const register = (data) =>
  api.post("api/auth/register", data);
