import Button from 'components/items/Button';
import styles from './style/login.module.scss';

export default function Login() {
  return (
    <main className={styles.loginContainer}>
      <Button text="로그인" black big />
    </main>
  )
}