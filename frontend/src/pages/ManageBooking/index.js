import { useEffect, useState } from "react";
import {
  getAllBookings,
  confirmBooking,
  rejectBooking
} from "../../api/booking.api";
import Pagination from "../../components/admin/Pagination";
import styles from "./ManageBooking.module.css";

const ITEMS_PER_PAGE = 5;

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllBookings();
      console.log("manage booking", res);
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load bookings. Please try again.");
      alert("Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (id) => {
    if (!window.confirm("Are you sure you want to confirm this booking?")) {
      return;
    }

    try {
      setActionLoading(id);
      await confirmBooking(id);
      alert("✅ Booking confirmed successfully.");
      await fetchBookings();
    } catch (err) {
      console.error("Confirm error:", err);
      alert(
        err.response?.data?.error || err.response?.data?.message || 
        "Unable to confirm booking. Please try again."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this booking?")) {
      return;
    }

    try {
      setActionLoading(id);
      await rejectBooking(id);
      alert("❌ Booking rejected successfully.");
      await fetchBookings();
    } catch (err) {
      console.error("Reject error:", err);
      alert(
        err.response?.data?.error || err.response?.data?.message || 
        "Unable to reject booking. Please try again."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: styles.pending,
      CONFIRMED: styles.confirmed,
      CANCELLED: styles.cancelled,
      FAILED: styles.failed
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusMap[status] || ''}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFullDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination
  const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBookings = bookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Stats
  const pendingCount = bookings.filter(b => b.status === 'PENDING').length;
  const confirmedCount = bookings.filter(b => b.status === 'CONFIRMED').length;

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>
          <span className={styles.loadingSpinner} />
          Loading Bookings...
        </div>
        <p className={styles.loadingSub}>🎬 Fetching all booking data</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.errorContainer}>
          <span className={styles.errorIcon}>⚠️</span>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>{error}</p>
          <button className={styles.retryButton} onClick={fetchBookings}>
            🔄 Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.manageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerSection}>
          <h2 className={styles.pageTitle}>
            📋 Manage Bookings
            <span>Admin Control Panel</span>
          </h2>

          <div className={styles.headerStats}>
            <span className={styles.statBadge}>
              🎫 Total: <strong>{bookings.length}</strong>
            </span>
            {pendingCount > 0 && (
              <span className={`${styles.statBadge} ${styles.pending}`}>
                ⏳ Pending: <strong>{pendingCount}</strong>
              </span>
            )}
            {confirmedCount > 0 && (
              <span className={`${styles.statBadge} ${styles.confirmed}`}>
                ✅ Confirmed: <strong>{confirmedCount}</strong>
              </span>
            )}
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.bookingsTable}>
            <thead>
              <tr>
                <th>👤 User</th>
                <th>🎬 Show</th>
                <th>💺 Seats</th>
                <th>📌 Status</th>
                <th>📅 Created</th>
                <th>⚡ Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.noData}>
                    <span className={styles.noDataIcon}>🎫</span>
                    <p className={styles.noDataText}>No bookings found.</p>
                  </td>
                </tr>
              ) : (
                currentBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>
                          {booking.userId?.name || booking.userName || "N/A"}
                        </span>
                        <span className={styles.userEmail}>
                          {booking.userId?.email || ""}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className={styles.showInfo}>
                        <span className={styles.showName}>
                          {booking.showId?.name || "N/A"}
                        </span>
                        <span className={styles.showTime}>
                          {booking.showId?.startTime ? formatDate(booking.showId.startTime) : ""}
                        </span>
                      </div>
                    </td>

                    <td className={styles.seatsCount}>
                      {booking.seats || 0}
                    </td>

                    <td>{getStatusBadge(booking.status)}</td>

                    <td>
                      {booking.createdAt ? formatFullDate(booking.createdAt) : "N/A"}
                    </td>

                    <td className={styles.actionsCell}>
                      {booking.status === "PENDING" && (
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.btnConfirm}
                            onClick={() => handleConfirm(booking._id)}
                            disabled={actionLoading === booking._id}
                          >
                            {actionLoading === booking._id ? "⏳" : "✅ Confirm"}
                          </button>

                          <button
                            className={styles.btnReject}
                            onClick={() => handleReject(booking._id)}
                            disabled={actionLoading === booking._id}
                          >
                            {actionLoading === booking._id ? "⏳" : "❌ Reject"}
                          </button>
                        </div>
                      )}

                      {booking.status !== "PENDING" && (
                        <span className={styles.noActions}>
                          {booking.status === "CONFIRMED" ? "✅ Confirmed" :
                           booking.status === "CANCELLED" ? "❌ Cancelled" :
                           booking.status === "FAILED" ? "⚠️ Failed" : "🔒"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={bookings.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default ManageBookings;