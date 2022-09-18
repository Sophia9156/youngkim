import { useLocation, useNavigate } from 'react-router-dom';
import styles from './style/header.module.scss';

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <img src="/images/logo.svg" alt="logo" 
            onClick={() => navigate('/')}
          />
        </div>
        <nav className={styles.navContainer}>
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${pathname === '/paintings' && styles.active}`}
              onClick={() => navigate('/paintings')}
            >paintings</li>
            <li className={`${styles.navItem} ${pathname === '/photographs' && styles.active}`}
              onClick={() => navigate('/photographs')}
            >photographs</li>
            <li className={`${styles.navItem} ${pathname === '/drawings' && styles.active}`}
              onClick={() => navigate('/drawings')}
            >drawings</li>
            <li className={`${styles.navItem} ${pathname === '/contact' && styles.active}`}
              onClick={() => navigate('/contact')}
            >contact</li>
          </ul>
        </nav>
      </div>
    </header>
  )
}