import { useState } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './style/header.module.scss';
import Button from 'components/items/Button';
import { useDispatch } from 'react-redux';
import { logoutRequest } from 'redux/Login';

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isBurgerActive, setBurgerActive] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logoutRequest());

  return (
    <header>
      <div className={`${styles.headerContainer} ${pathname.includes('/admin') ? styles.lined : ''}`}>
        <div className={styles.topContainer}>
          <div className={styles.logoContainer}>
            <img src="/images/logo.svg" alt="logo" 
              onClick={() => navigate('/')}
            />
          </div>
          <div className={`${styles.burgerContainer} ${isBurgerActive ? styles.active : ''}`}
            onClick={() => setBurgerActive(!isBurgerActive)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {pathname.includes('/admin') ? (
          <>
          {pathname === '/admin-login' ? (
            <></>
          ) : (
            <nav className={styles.adminNavContainer}>
              <ul className={styles.adminNavList}>
                <li className={styles.adminNavItem}>
                  <Button 
                    black={pathname.includes("/admin-upload") ? true : false} 
                    onClick={() => navigate({
                      pathname: "/admin-upload",
                      search: createSearchParams({
                        category: "painting"
                      }).toString()
                    })}
                  >upload</Button>
                </li>
                <li className={styles.adminNavItem}>
                  <Button 
                    black={pathname.includes("/admin-modify") ? true : false}
                    onClick={() => navigate({
                      pathname: "/admin-modify",
                      search: createSearchParams({
                        category: "painting"
                      }).toString()
                    })}
                  >modify</Button>
                </li>
              </ul>
              <div className={styles.adminLogout}>
                <Button grey onClick={handleLogout}>log out</Button>
              </div>
            </nav>
            )}
          </>) : (
          <nav className={`${styles.navContainer} ${isBurgerActive ? styles.active : ''}`}>
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
        )}
      </div>
    </header>
  )
}