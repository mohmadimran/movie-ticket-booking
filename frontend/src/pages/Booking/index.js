import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getShow } from "../../api/show.api";
import { createBooking } from "../../api/booking.api";
import styles from "./Booking.module.css";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [seats, setSeats] = useState(1);

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [error, setError] = useState("");

  // Define fetchShow inside useEffect to avoid dependency issues
  useEffect(() => {
    const fetchShow = async () => {
      try {
        const res = await getShow(id);
        setShow(res.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load show.");
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [id]); 

  const handleBooking = async (e) => {
    e.preventDefault();

    if (Number(seats) <= 0) {
      return alert("Seats must be greater than 0.");
    }

    if (Number(seats) > show.availableSeats) {
      return alert("Not enough seats available.");
    }

    try {
      setBookingLoading(true);

      const res = await createBooking(id, Number(seats));

      alert("🎫 Seats reserved successfully!");

      console.log(res.data);

      navigate("/my-bookings");
    } catch (err) {
      alert(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Booking failed"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>
          <span className={styles.loadingSpinner} />
          Loading Show Details...
        </div>
      </div>
    );
  }

  if (!show) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.errorContainer}>
          <span className={styles.errorIcon}>🎭</span>
          <h2 className={styles.errorTitle}>Show Not Found</h2>
          <p className={styles.errorSub}>The screening you're looking for doesn't exist.</p>
          <Link to="/shows">
            <button className={styles.backButton}>🎬 Browse Shows</button>
          </Link>
        </div>
      </div>
    );
  }

  const isAvailable = show.availableSeats > 0;
  const formattedTime = new Date(show.startTime).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Determine availability badge
  const getAvailabilityBadge = () => {
    if (show.availableSeats === 0) return styles.none;
    if (show.availableSeats <= 5) return styles.low;
    return styles.available;
  };

  const getAvailabilityText = () => {
    if (show.availableSeats === 0) return 'House Full';
    if (show.availableSeats <= 5) return '⚠️ Limited Seats';
    return '✅ Available';
  };

  return (
    <div className={styles.bookingContainer}>
      <div className={styles.bookingCard}>
        <h2 className={styles.title}>
          🎫 Book Tickets
          <span>Secure Your Seat</span>
        </h2>

        <div className={styles.showDetails}>
          <div className={styles.movieName}>
            🎬 <span>{show.name}</span>
          </div>

          <div className={styles.timeDisplay}>
            <span className={styles.detailLabel}>📅 Show Time</span>
            <span className={styles.detailValue}>{formattedTime}</span>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>💺 Total Seats</span>
              <span className={styles.detailValue}>{show.totalSeats}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>🎯 Available</span>
              <span className={`${styles.detailValue} ${styles.gold}`}>
                {show.availableSeats}
                <span className={`${styles.availabilityBadge} ${getAvailabilityBadge()}`}>
                  {getAvailabilityText()}
                </span>
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>📌 Reserved</span>
              <span className={`${styles.detailValue} ${styles.green}`}>
                {show.reservedSeats}
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>✅ Confirmed</span>
              <span className={`${styles.detailValue} ${styles.red}`}>
                {show.confirmedSeats}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleBooking} className={styles.bookingForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Number of Seats <span>🎟️</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                className={styles.styledInput}
                type="number"
                min="1"
                max={show.availableSeats}
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                disabled={!isAvailable}
                required
              />
            </div>
            {!isAvailable && (
              <p style={{ color: '#f87171', fontSize: '0.9rem', marginTop: '8px' }}>
                🚫 Sorry, this show is completely sold out!
              </p>
            )}
            {isAvailable && show.availableSeats <= 5 && (
              <p style={{ color: '#fbbf24', fontSize: '0.9rem', marginTop: '8px' }}>
                ⚠️ Hurry! Only {show.availableSeats} seats left!
              </p>
            )}
          </div>

          <button
            className={styles.bookButton}
            type="submit"
            disabled={bookingLoading || !isAvailable}
          >
            {bookingLoading ? (
              <>
                <span className={styles.buttonSpinner} />
                Booking...
              </>
            ) : (
              isAvailable ? '🎫 Reserve Seats' : '🚫 Sold Out'
            )}
          </button>
        </form>

        <div className={styles.navButtons}>
          <Link to="/shows" className={styles.navButton}>
            🎬 Browse Shows
          </Link>
          <Link to="/my-bookings" className={styles.navButton}>
            📋 My Bookings
          </Link>
        </div>

        {error && (
          <p style={{ color: '#f87171', marginTop: '15px', textAlign: 'center' }}>
            ⭐ {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Booking;
