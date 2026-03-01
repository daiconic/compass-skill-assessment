import styles from "./Header.module.css";
import logo from "../assets/logo-white.svg";
import AccountIcon from "../assets/icon-account.svg";

export function Header({ userName }: { userName: string }) {
  return (
    <header className={styles.header}>
      <img className={styles.headerLogo} src={logo} alt="Compass" />
      <div className={styles.headerCenter}>アカウント管理</div>
      <div className={styles.account}>
        <img src={AccountIcon} />
        <span>{userName}</span>
      </div>
    </header>
  );
}
