import { createSearchParams, useNavigate } from "react-router-dom";
import styles from "./style/home.module.scss";

export default function AdminHome() {
  const navigate = useNavigate();

  return (
    <main className={styles.adminHomeContainer}>
      <button className={`${styles.adminHomeBtn} ${styles.black}`}
        onClick={() => navigate({
          pathname: "/admin-upload",
          search: createSearchParams({
            category: "painting"
          }).toString()
        })}
      >upload</button>
      <button className={styles.adminHomeBtn}
        onClick={() => navigate({
          pathname: "/admin-modify",
          search: createSearchParams({
            category: "painting"
          }).toString()
        })}
      >modify</button>
    </main>
  )
}