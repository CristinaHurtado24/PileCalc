import React, { useState } from "react";
import styles from "./Materials.modules.css";

export default function Materials(props) {
  const [userMaterials, setUserMaterials] = useState(props.list);

  const handleFcChange = (e) => {
    const { value } = e.target;
    const list = [...userMaterials];
    list[0]["fc"] = value;
    setUserMaterials(list);
  };

  const handleFyChange = (e) => {
    const { value } = e.target;
    const list = [...userMaterials];
    list[0]["fy"] = value;
    setUserMaterials(list);
  };

  const showValue = (value) => {
    if (value === "") {
      return "";
    } else {
      return value;
    }
  };

  return (
    <div className={styles.container}>
      <h3>Materiales</h3>
      <div className={styles.form}>
        <ul>
          <li>
            <div className={styles.divForm}>
              <label className={styles.fc}>F'c</label>
              <input
                className={styles.input_fc}
                onChange={(e) => handleFcChange(e)}
                value={showValue(userMaterials[0]["fc"])}
              ></input>
            </div>
          </li>
          <li>
            <div className={styles.divForm}>
              <label className={styles.fy}>Fy</label>
              <input
                className={styles.input_fy}
                onChange={(e) => handleFyChange(e)}
                value={showValue(userMaterials[0]["fy"])}
              ></input>
            </div>
          </li>
          <li></li>
        </ul>
      </div>
      <div className={styles.btn}>
        <button
          onClick={() => {
            props.callback(userMaterials);
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
