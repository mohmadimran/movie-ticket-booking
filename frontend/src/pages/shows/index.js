import { useEffect, useState } from "react";
import ShowCard from "../../components/ShowCard";
import { getShows } from "../../api/show.api";
import styles from "./Shows.module.css";

const Shows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const res = await getShows();   
      console.log("data",res)
      setShows(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>
          <span className={styles.loadingSpinner} />
          Loading Shows...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.showsContainer}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>
          🎬 Now Showing
          <span>Book Your Movie Experience</span>
        </h1>
      </div>

      <div className={styles.showsGrid}>
        {shows.length > 0 ? (
          shows.map((show) => (
            <ShowCard key={show._id} show={show} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <span>🎫</span>
            No shows available right now
            <p style={{ fontSize: '0.9rem', marginTop: '10px', color: 'rgba(255,255,255,0.3)' }}>
              Check back later for upcoming screenings
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shows;