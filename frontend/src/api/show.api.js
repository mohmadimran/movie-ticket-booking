
import api from "./apiClient";

export const getShows = () =>
  api.get("/api/shows");

export const getShow = (id) =>
  api.get(`/api/shows/${id}`);

export const createShow = (data) =>
  api.post("/api/shows", data);

export const updateShow = (id, data) =>
  api.put(`/api/shows/${id}`, data);

export const deleteShow = (id) =>
  api.delete(`/api/shows/${id}`);