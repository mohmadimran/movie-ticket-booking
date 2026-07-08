import { Link } from "react-router-dom";
import styles from "./ShowCard.module.css";

const ShowCard = ({ show }) => {
  console.log("show all details of movie", show);
  
  const isAvailable = show.availableSeats > 0;
  const formattedTime = new Date(show.startTime).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Link to={`/booking/${show._id}`} className={styles.cardLink}>
      <div className={styles.showCard}>
        <span className={styles.movieIcon}>🎥</span>
        
        <span className={`${styles.statusBadge} ${!isAvailable ? styles.houseFull : ''}`}>
          {isAvailable ? '🎟️ Available' : '🏠 House Full'}
        </span>

        <h2 className={styles.showTitle}>{show.name}</h2>

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

        <button
          className={`${styles.bookButton} ${isAvailable ? styles.available : styles.houseFull}`}
          disabled={!isAvailable}
        >
          {isAvailable ? '🎫 Book Now' : '🚫 House Full'}
        </button>
      </div>
    </Link>
  );
};

export default ShowCard;