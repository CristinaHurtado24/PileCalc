import React from "react";
import styles from './Navbar.modules.css'

export default function Navbar() {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>
          <div className={styles.marg}>
            <button
              onClick={() => {
                console.log("funciona");
              }}
            >
              Open
            </button>
          </div>
        </li>
        <li>
          <div className={styles.marg}>
            <a>Save</a>
          </div>
        </li>
        <li>
          <div className={styles.marg}>
            <a>Save as</a>
          </div>
        </li>
        <li>
          <div className={styles.marg}>
            <a>Run</a>
          </div>
        </li>
      </ul>
    </div>
  );
}
