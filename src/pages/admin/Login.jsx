import styles from './style/login.module.scss';
import Button from 'components/items/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from 'redux/Login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector(state => state.login);

  const handleLogin = () => dispatch(loginRequest());

  useEffect(() => {
    if(isLoggingIn) {
      navigate('/admin-home');
    }
  }, [isLoggingIn, navigate]);

  return (
    <main className={styles.loginContainer}>
      <Button black big onClick={handleLogin}>로그인</Button>
    </main>
  )
}