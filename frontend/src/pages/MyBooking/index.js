import { useEffect, useState } from "react";
import {
  getMyBookings,
  cancelBooking,
  updateBooking,
} from "../../api/booking.api";
import styles from "./MyBookings.module.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editSeats, setEditSeats] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getMyBookings();
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirm) return;

    try {
      await cancelBooking(id);
      alert("Booking cancelled successfully.");
      fetchBookings();
    } catch (err) {
      alert(
        err.response?.data?.error ||
          "Unable to cancel booking."
      );
    }
  };

  const openUpdateModal = (booking) => {
    setSelectedBooking(booking);
    setEditSeats(booking.seats.toString());
    setShowModal(true);
  };

  const closeUpdateModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
    setEditSeats("");
  };

  const handleUpdate = async () => {
    const seatsToUpdate = parseInt(editSeats);
    
    if (!editSeats || seatsToUpdate <= 0) {
      alert("Please enter a valid number of seats (minimum 1).");
      return;
    }

    try {
      await updateBooking(selectedBooking._id, { seats: seatsToUpdate });
      alert("Booking updated successfully!");
      closeUpdateModal();
      fetchBookings();
    } catch (err) {
      alert(
        err.response?.data?.error ||
          "Unable to update booking. Please try again."
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return styles.statusConfirmed;
      case "PENDING":
        return styles.statusPending;
      case "CANCELLED":
        return styles.statusCancelled;
      case "FAILED":
        return styles.statusFailed;
      default:
        return "";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "CONFIRMED":
        return styles.confirmed;
      case "PENDING":
        return styles.pending;
      case "CANCELLED":
        return styles.cancelled;
      case "FAILED":
        return styles.failed;
      default:
        return "";
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "✅ Booking confirmed by admin";
      case "PENDING":
        return "⏳ Waiting for admin confirmation";
      case "CANCELLED":
        return "❌ Booking cancelled";
      case "FAILED":
        return "⚠️ Booking failed";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFullDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const canUpdateBooking = (status) => {
    return status !== "CANCELLED";
  };

  const canCancelBooking = (status) => {
    return status === "PENDING" || status === "CONFIRMED";
  };

  const filteredBookings = filter === "ALL" 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>
          <span className={styles.loadingSpinner} />
          Loading Your Bookings...
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.emptyContainer}>
          <span className={styles.emptyIcon}>🎫</span>
          <h2 className={styles.emptyTitle}>No Bookings Found</h2>
          <p className={styles.emptySub}>You haven't made any bookings yet.</p>
          <p className={styles.emptySub} style={{ fontSize: '0.9rem', marginTop: '8px' }}>
            🎬 Browse shows and book your movie experience!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.myBookingsContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerSection}>
          <h2 className={styles.pageTitle}>
            🎬 My Bookings
            <span>Your Cinema Journey</span>
          </h2>

          <div className={styles.filterSection}>
            <span className={styles.filterLabel}>🎯 Filter:</span>
            <select 
              className={styles.filterSelect} 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="ALL">📋 All</option>
              <option value="PENDING">⏳ Pending</option>
              <option value="CONFIRMED">✅ Confirmed</option>
              <option value="CANCELLED">❌ Cancelled</option>
              <option value="FAILED">⚠️ Failed</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.bookingsTable}>
            <thead>
              <tr>
                <th>🎬 Show</th>
                <th>📅 Date & Time</th>
                <th>💺 Seats</th>
                <th>📌 Status</th>
                <th>📋 Booking Date</th>
                <th>⚡ Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => {
                const canUpdate = canUpdateBooking(booking.status);
                const canCancel = canCancelBooking(booking.status);
                
                return (
                  <tr key={booking._id}>
                    <td>
                      <strong>{booking.showId?.name || booking.showName || "N/A"}</strong>
                    </td>

                    <td>
                      {formatDate(booking.showId?.startTime)}
                    </td>

                    <td>
                      <strong>{booking.seats}</strong>
                    </td>

                    <td className={getStatusColor(booking.status)}>
                      <span className={`${styles.statusBadge} ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                      <span className={styles.statusMessage}>
                        {getStatusMessage(booking.status)}
                      </span>
                    </td>

                    <td>
                      {formatDate(booking.createdAt)}
                    </td>

                    <td>
                      <div className={styles.actionButtons}>
                        {canUpdate && (
                          <button 
                            onClick={() => openUpdateModal(booking)}
                            className={styles.btnUpdate}
                          >
                            ✏️ Update Seats
                          </button>
                        )}

                        {canCancel && (
                          <button 
                            onClick={() => handleCancel(booking._id)}
                            className={styles.btnCancel}
                          >
                            🗑️ Cancel
                          </button>
                        )}

                        {!canUpdate && !canCancel && (
                          <span className={styles.noAction}>
                            🔒 Cancelled
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className={styles.bookingCount}>
          Showing <strong>{filteredBookings.length}</strong> of <strong>{bookings.length}</strong> bookings
        </p>
      </div>

      {/* Update Modal */}
      {showModal && selectedBooking && (
        <div className={styles.modalOverlay} onClick={closeUpdateModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>
              ✏️ Update Booking
              <span>Modify your seat selection</span>
            </h3>
            
            {selectedBooking.status === "PENDING" && (
              <div className={`${styles.modalInfo} ${styles.pending}`}>
                ⏳ This booking is pending admin confirmation. You can still update the seats.
              </div>
            )}

            {selectedBooking.status === "CONFIRMED" && (
              <div className={`${styles.modalInfo} ${styles.confirmed}`}>
                ✅ This booking is confirmed. You can update the seats.
              </div>
            )}

            {selectedBooking.status === "FAILED" && (
              <div className={`${styles.modalInfo} ${styles.failed}`}>
                ⚠️ This booking failed. You can update the seats and try again.
              </div>
            )}

            <div className={styles.bookingDetails}>
              <p><strong>🎬 Show:</strong> {selectedBooking.showId?.name || selectedBooking.showName}</p>
              <p><strong>📅 Time:</strong> {formatFullDate(selectedBooking.showId?.startTime)}</p>
              <p><strong>💺 Current Seats:</strong> {selectedBooking.seats}</p>
              <p>
                <strong>📌 Status:</strong> 
                <span className={getStatusColor(selectedBooking.status)}>
                  {" "}{selectedBooking.status}
                </span>
              </p>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="seats-input">
                🎟️ New Number of Seats:
              </label>
              <input
                id="seats-input"
                type="number"
                min="1"
                value={editSeats}
                onChange={(e) => setEditSeats(e.target.value)}
              />
              <small>
                💡 Seats will be updated immediately without admin confirmation
              </small>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={closeUpdateModal}
                className={styles.btnModalCancel}
              >
                ❌ Cancel
              </button>
              <button
                onClick={handleUpdate}
                className={styles.btnModalUpdate}
              >
                ✅ Update Seats
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;