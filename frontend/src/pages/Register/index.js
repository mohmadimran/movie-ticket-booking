import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
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

      await register(formData);

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.styledForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>
          🎭 JOIN CINEMA
          <span>Create Your Account</span>
        </h2>

        <p className={styles.subtitle}>Become part of our cinematic community</p>

        {error && <p className={styles.errorMessage}>⭐ {error}</p>}

        <div className={styles.inputGroup} data-icon="👤">
          <input
            className={styles.styledInput}
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className={styles.selectWrapper}>
          <select
            className={styles.styledSelect}
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="USER">🎟️ Movie Lover (User)</option>
            <option value="ADMIN">🎬 Cinema Manager (Admin)</option>
          </select>
        </div>

        <button 
          className={styles.styledButton} 
          type="submit" 
          disabled={loading}
        >
          {loading ? (
            <>
              <span className={styles.loadingSpinner} />
              Creating Account...
            </>
          ) : (
            "🎫 Join Now"
          )}
        </button>

        <div className={styles.footerLinks}>
          <button 
            type="button" 
            className={styles.linkButton}
            onClick={() => navigate("/login")}
          >
            Already have an account? Sign In 🎬
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;