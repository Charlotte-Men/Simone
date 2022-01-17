import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <div>
      <div className={styles.disclaimer1}></div>
      <div className={styles.disclaimer2}></div>
      <div className={styles.headerContainer}>SIMONE</div>
    </div>
  );
};

export default Header;
