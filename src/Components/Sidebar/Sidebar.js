import React from "react";
import styles from "./Sidebar.modules.css";

export default function Sidebar() {
    
  return (
    <div className={styles.container}>
      <ul>
        <li>
            //TODO Poner los métodos de cálculo como un dropdown
            
          <div className={styles.btn_div}>
            <button className={styles.profile}>Método de Cálculo</button>
          </div>
        </li>
        <hr />
        <li>
          <div className={styles.btn_div}>
            <button className={styles.profile}>Perfil del suelo</button>
          </div>
        </li>
        <hr />
        <li>
          <div className={styles.btn_div}>
            <button className={styles.profile}>Dimensiones del pilote</button>
          </div>
        </li>
        <hr />
        <li>
          <div className={styles.btn_div}>
            <button className={styles.profile}>Perfil</button>
          </div>
        </li>
        <hr />
      </ul>
    </div>
  );
}
