import React from 'react';
import styles from './DashBoardCard.module.css';

const DashboardCards = ({ shows }) => {
  const totalShows = shows.length;
  const totalSeats = shows.reduce((sum, show) => sum + show.totalSeats, 0);
  const totalReserved = shows.reduce((sum, show) => sum + (show.reservedSeats || 0), 0);
  const totalConfirmed = shows.reduce((sum, show) => sum + (show.confirmedSeats || 0), 0);
  const totalAvailable = shows.reduce((sum, show) => sum + (show.availableSeats || 0), 0);

  const cards = [
    { icon: '🎬', title: 'Total Shows', value: totalShows, className: styles.gold },
    { icon: '💺', title: 'Total Seats', value: totalSeats, className: styles.blue },
    { icon: '📌', title: 'Reserved Seats', value: totalReserved, className: styles.green },
    { icon: '✅', title: 'Confirmed Seats', value: totalConfirmed, className: styles.red },
    { icon: '🎯', title: 'Available Seats', value: totalAvailable, className: styles.gold },
  ];

  return (
    <div className={styles.dashboardCards}>
      {cards.map((card, index) => (
        <div key={index} className={styles.card}>
          <span className={styles.cardIcon}>{card.icon}</span>
          <h3 className={styles.cardTitle}>{card.title}</h3>
          <p className={`${styles.cardValue} ${card.className}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;