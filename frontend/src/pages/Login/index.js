import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            const from = location.state?.from?.pathname;
            
            const user = await login(formData);
            
            if (user.role === "ADMIN") {
                navigate("/admin", { replace: true });
            } else {
                navigate(from || "/my-bookings", {
                    replace: true,
                });
            }

        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid credentials"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.styledForm} onSubmit={handleSubmit}>
                <h2 className={styles.title}>
                    🎬 CINEMA
                    <span>Book Your Experience</span>
                </h2>

                <p className={styles.subtitle}>Sign in to continue your cinematic journey</p>

                {error && <p className={styles.errorMessage}>⭐ {error}</p>}

                <div className={styles.inputGroup} data-icon="✉️">
                    <input
                        className={styles.styledInput}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup} data-icon="🔑">
                    <input
                        className={styles.styledInput}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button 
                    className={styles.styledButton} 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className={styles.loadingSpinner} />
                            Booking...
                        </>
                    ) : (
                        "🎟️ Get Tickets"
                    )}
                </button>

                <div className={styles.footerLinks}>
                    <button type="button" className={styles.linkButton}>
                        🎭 Guest Access
                    </button>
                    <button type="button" className={styles.linkButton}>
                        🎫 Create Account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;