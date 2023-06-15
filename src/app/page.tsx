import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <h2 className={styles.floatText}>Real-time Departures</h2>
      <div className={styles.main}>
        <a className={styles.fullLinkLeft} href="/route">
          By Route
        </a>
        <a className={styles.fullLinkRight} href="/stop">
          By Stop #
        </a>
      </div>
    </>
  );
}
