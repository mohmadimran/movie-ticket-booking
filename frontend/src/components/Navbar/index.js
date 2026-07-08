import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user || !user.name) return '?';
        return user.name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Check if link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    const NavLinks = () => (
        <>
            <Link
                to="/"
                className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
                onClick={closeMobileMenu}
            >
                🏠 Home
            </Link>

            {!user && (
                <>
                    <Link
                        to="/register"
                        className={`${styles.navLink} ${isActive('/register') ? styles.active : ''}`}
                        onClick={closeMobileMenu}
                    >
                        🎭 Register
                    </Link>

                    <Link
                        to="/login"
                        className={`${styles.navLink} ${isActive('/login') ? styles.active : ''}`}
                        onClick={closeMobileMenu}
                    >
                        🎬 Login
                    </Link>
                </>
            )}

            {user?.role === "ADMIN" && (
                <Link
                    to="/admin"
                    className={`${styles.navLink} ${isActive('/admin') ? styles.active : ''}`}
                    onClick={closeMobileMenu}
                >
                    🎯 Admin Dashboard
                </Link>
            )}

            {user?.role === "USER" && (
                <Link
                    to="/my-bookings"
                    className={`${styles.navLink} ${isActive('/my-bookings') ? styles.active : ''}`}
                    onClick={closeMobileMenu}
                >
                    📋 My Bookings
                </Link>
            )}

            {user && (
                <>
                    <span className={styles.navDivider} />
                    <div className={styles.userSection}>
                        <div className={styles.userAvatar}>
                            {getUserInitials()}
                        </div>
                        <span className={styles.userName}>
                            Welcome, <span>{user.name}</span>
                            <span className={`${styles.userRole} ${user.role === 'ADMIN' ? styles.admin : styles.user}`}>
                                {user.role}
                            </span>
                        </span>
                        <button
                            onClick={handleLogout}
                            className={styles.logoutButton}
                        >
                            🚪 Logout
                        </button>
                    </div>
                </>
            )}
        </>
    );

    return (
        <>
            <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
                {/* Logo */}
                <Link to="/" className={styles.logoSection}>
                    <span className={styles.logoIcon}>🎬</span>
                    <span className={styles.logoText}>
                        CINEMA<span>HUB</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.navLinks}>
                    <NavLinks />
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className={`${styles.menuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <NavLinks />
            </div>
        </>
    );
};

export default Navbar;