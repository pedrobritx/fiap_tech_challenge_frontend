import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';

export function Header() {
  const { state, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`${styles.header} glass`}>
      <div className={`container ${styles.row}`}>
        <Link to="/" className={styles.brand} aria-label="Ir para página inicial">
          <span className={styles.logo} aria-hidden>🦉</span>
          <span className={styles.title}>EduPost</span>
        </Link>

        <nav aria-label="Navegação principal">
          <ul className={styles.navList}>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/admin" className={({ isActive }) => (isActive ? styles.active : '')}>
                Admin
              </NavLink>
            </li>
            {!state.token ? (
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
                  Login
                </NavLink>
              </li>
            ) : (
              <li>
                <button onClick={handleLogout} className={styles.logoutBtn} aria-label="Sair">
                  Sair
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

