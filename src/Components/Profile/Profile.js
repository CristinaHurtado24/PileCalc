import React from "react";
import Select from "react-select";
import styles from "./Profile.modules.css";
import SoilLayer from "./SoilLayer";

export default function Profile({ callback }) {
  const show = false;
  return (
    <div className={styles.div_container}>
      <div className={styles.nav}>
        <ul>
          <li>
            <button
              className={styles.xBtn}
              onClick={() => {
                callback(show);
              }}
            >
              X
            </button>
          </li>
        </ul>
      </div>
      <SoilLayer />
      <SoilLayer />
      <SoilLayer />
      <SoilLayer />
      <SoilLayer />
      <div className={styles.add}>
        <button className={styles.addBtn}>Agregar otro estrato</button>
      </div>
    </div>
  );
}
