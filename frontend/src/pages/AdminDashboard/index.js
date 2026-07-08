import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getShows,
  createShow,
  updateShow,
  deleteShow,
} from "../../api/show.api";
import DashboardCards from "../../components/admin/DashBoardCard";
import SearchAndSort from "../../components/admin/SearchBar";
import styles from "./AdminDashboard.module.css";

const initialState = {
  name: "",
  startTime: "",
  totalSeats: "",
};

const AdminDashboard = () => {
  const location = useLocation();
  const [shows, setShows] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  const showsPerPage = 5;

  const filteredShows = [...shows]
    .filter((show) =>
      show.name
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "time":
          return new Date(a.startTime) - new Date(b.startTime);
        case "available":
          return b.availableSeats - a.availableSeats;
        case "total":
          return b.totalSeats - a.totalSeats;
        default:
          return 0;
      }
    });

  const lastIndex = currentPage * showsPerPage;
  const firstIndex = lastIndex - showsPerPage;
  const currentShows = filteredShows.slice(firstIndex, lastIndex);

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy]);

  const fetchShows = async () => {
    try {
      const res = await getShows();
      setShows(res.data);
    } catch (err) {
      console.error("Error fetching shows:", err);
      alert("Failed to fetch shows. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      startTime: formData.startTime,
      totalSeats: Number(formData.totalSeats),
    };

    try {
      if (editingId) {
        await updateShow(editingId, payload);
        alert("✅ Show updated successfully.");
      } else {
        await createShow(payload);
        alert("🎬 Show created successfully.");
      }

      setEditingId(null);
      setFormData(initialState);
      fetchShows();
    } catch (err) {
      alert(
        err.response?.data?.error ||
        "Something went wrong."
      );
    }
  };

  const handleEdit = (show) => {
    setEditingId(show._id);
    setFormData({
      name: show.name,
      startTime: show.startTime.slice(0, 16),
      totalSeats: show.totalSeats,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "🗑️ Delete this show?"
    );

    if (!confirmDelete) return;

    try {
      await deleteShow(id);
      alert("Show deleted.");
      fetchShows();
    } catch (err) {
      alert("Unable to delete show.");
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>
          <span className={styles.loadingSpinner} />
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.contentWrapper}>
        {/* Header */}
        <div className={styles.headerSection}>
          <h2 className={styles.pageTitle}>
            🎯 Admin Dashboard
            <span>Manage Your Cinema</span>
          </h2>

          <div className={styles.adminNav}>
            <Link
              to="/admin"
              className={`${styles.adminNavLink} ${location.pathname === '/admin' ? styles.active : ''}`}
            >
              🎬 Manage Shows
            </Link>
            <Link
              to="/admin/bookings"
              className={`${styles.adminNavLink} ${location.pathname === '/admin/bookings' ? styles.active : ''}`}
            >
              📋 Manage Bookings
            </Link>
          </div>
        </div>



        {/* Dashboard Cards */}
        <DashboardCards shows={shows} />



        {/* Form Section */}
        <div className={styles.formSection}>
          <h3 className={styles.formTitle}>
            {editingId ? '✏️' : '🎬'}
            {editingId ? 'Update Show' : 'Create New Show'}
            <span>{editingId ? `(Editing: ${formData.name})` : ''}</span>
          </h3>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>🎬 Movie Name</label>
                <input
                  className={styles.formInput}
                  type="text"
                  name="name"
                  placeholder="Enter movie name..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>📅 Start Time</label>
                <input
                  className={styles.formInput}
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>💺 Total Seats</label>
                <input
                  className={styles.formInput}
                  type="number"
                  name="totalSeats"
                  placeholder="Enter total seats..."
                  value={formData.totalSeats}
                  onChange={handleChange}
                  required
                  min="1"
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: 'span 1' }}>
                <button className={styles.submitButton} type="submit">
                  {editingId ? '✏️ Update Show' : '🎬 Create Show'}
                </button>
              </div>
            </div>
          </form>
        </div>


        {/* Search and Sort */}
        <SearchAndSort
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        
        {/* Shows Table */}
        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h3 className={styles.tableTitle}>
              📋 All Shows
              <span>({filteredShows.length})</span>
            </h3>
            <span className={styles.showCount}>
              Showing <strong>{currentShows.length}</strong> of <strong>{filteredShows.length}</strong>
            </span>
          </div>

          {currentShows.length === 0 ? (
            <div className={styles.emptyState}>
              <span>🎫</span>
              <p>No shows found</p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)' }}>
                {search ? 'Try adjusting your search' : 'Create your first show above'}
              </p>
            </div>
          ) : (
            <>
              <table className={styles.adminTable}>
                <thead>
                  <tr>
                    <th>🎬 Name</th>
                    <th>📅 Start Time</th>
                    <th>💺 Total</th>
                    <th>📌 Reserved</th>
                    <th>✅ Confirmed</th>
                    <th>🎯 Available</th>
                    <th>⚡ Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentShows.map((show) => (
                    <tr key={show._id}>
                      <td><strong>{show.name}</strong></td>
                      <td>{formatTime(show.startTime)}</td>
                      <td className={styles.seatNumber}>{show.totalSeats}</td>
                      <td className={`${styles.seatNumber} ${styles.reserved}`}>{show.reservedSeats}</td>
                      <td className={`${styles.seatNumber} ${styles.confirmed}`}>{show.confirmedSeats}</td>
                      <td className={`${styles.seatNumber} ${styles.available}`}>{show.availableSeats}</td>
                      <td>
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.btnEdit}
                            onClick={() => handleEdit(show)}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className={styles.btnDelete}
                            onClick={() => handleDelete(show._id)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {Math.ceil(filteredShows.length / showsPerPage) > 1 && (
                <div className={styles.pagination}>
                  {Array.from({
                    length: Math.ceil(filteredShows.length / showsPerPage),
                  }).map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.pageButton} ${currentPage === index + 1 ? styles.active : ''}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;