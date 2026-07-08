import React from 'react';
import styles from './SearchBar.module.css';

const SearchAndSort = ({ search, setSearch, sortBy, setSortBy }) => {
  return (
    <div className={styles.searchSortContainer}>
      <div className={styles.searchWrapper}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by movie name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.sortWrapper}>
        <select
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">📊 Sort by...</option>
          <option value="name">🔤 Name (A-Z)</option>
          <option value="time">🕐 Time (Earliest)</option>
          <option value="available">🎯 Available (High-Low)</option>
          <option value="total">💺 Total Seats (High-Low)</option>
        </select>
      </div>

      {search && (
        <button 
          className={styles.clearButton}
          onClick={() => setSearch('')}
        >
          ❌ Clear Search
        </button>
      )}
    </div>
  );
};

export default SearchAndSort;