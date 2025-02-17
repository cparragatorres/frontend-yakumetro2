import React from "react";
import styles from "./Header.module.css";
import logoYakumetro from "../../assets/yakumetro.png";
import logoConsumo from "../../assets/consumo.png";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <img src={logoYakumetro} alt="Yakumetro Logo" className={styles.image} />
      <img src={logoConsumo} alt="Consumo de agua" className={styles.image} />
    </header>
  );
};

export default Header;
