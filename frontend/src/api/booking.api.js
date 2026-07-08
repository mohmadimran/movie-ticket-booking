import api from "./apiClient";

// to show the bookings
// export const getBooking = (id) =>
//   api.get(`/api/bookings/${id}`);
// ..................................

// ADMIN
export const getAllBookings = () =>
  api.get("/api/bookings/admin/all-bookings");

export const confirmBooking = (id) =>
  api.post(`/api/bookings/admin/confirm/${id}`);

export const rejectBooking = (id) =>
  api.post(`/api/bookings/admin/reject/${id}`);




// USER

// for create bookings
export const createBooking = (showId, seats) =>
  api.post(`/api/bookings/user/create/${showId}`, { seats });

// to watch the bookings
export const getMyBookings = () =>
  api.get("/api/bookings/user/my-bookings");

export const bookingDetails = (id) =>
  api.get(`/api/bookings/user/detail/${id}`)

export const updateBooking = (id, data) =>
  api.put(`/api/bookings/user/update/${id}`, data);

export const cancelBooking = (id) =>
  api.put(`/api/bookings/user/cancel/${id}`)

