import styles from './style/login.module.scss';
import Button from 'components/items/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, logoutRequest } from 'redux/Login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggingIn, user } = useSelector(state => state.login);

  const handleLogin = () => dispatch(loginRequest());

  useEffect(() => {
    if(isLoggingIn) {
      if(user === 'suhyun9156@gmail.com' || user === 'coolzox@gmail.com') {
        navigate('/admin-home');
      } else {
        toast.dismiss();
        toast.error("인증되지 않은 사용자 입니다.");
        dispatch(logoutRequest());
      }
    }
  }, [isLoggingIn, user, navigate, dispatch]);

  return (
    <main className={styles.loginContainer}>
      <Button black big onClick={handleLogin}>로그인</Button>
    </main>
  )
}