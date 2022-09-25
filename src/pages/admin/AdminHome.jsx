import { useNavigate } from "react-router-dom";
import styles from "./style/home.module.scss";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <main className={styles.adminHomeContainer}>
      <button className={`${styles.adminHomeBtn} ${styles.black}`}
        onClick={() => navigate("/admin-upload")}
      >upload</button>
      <button className={styles.adminHomeBtn}
        onClick={() => navigate("/admin-modify")}
      >modify</button>
    </main>
  )
}