import React, { useState } from "react";
import styles from "./Dimensions.modules.css";

export default function Dimensions({ callback }) {
  const [dimList, setDimList] = useState([{ radius: "", length: "" }]);
  const [checkedStateLen, setCheckedStateLen] = useState(false);
  const [checkedStateDiam, setCheckedStateDiam] = useState(false);

  const handleOnchangeLen = (e) => {
    if (!checkedStateDiam) {
      setCheckedStateLen(!checkedStateLen);
    } else {
      setCheckedStateDiam(!checkedStateDiam);
      setCheckedStateLen(!checkedStateLen);
    }
  };

  const handleOnchangeDiam = (e) => {
    if (!checkedStateLen) {
      setCheckedStateDiam(!checkedStateDiam);
    } else {
      setCheckedStateLen(!checkedStateLen);
      setCheckedStateDiam(!checkedStateDiam);
    }
  };

  const handleRadiusChange = (e) => {
    const { value } = e.target;
    const list = [...dimList];
    list[0]["radius"] = value;
    setDimList(list);
  };

  const handleLengthChange = (e) => {
    const { value } = e.target;
    const list = [...dimList];
    list[0]["length"] = value;
    setDimList(list);
  };

  console.log(dimList);
  const show = false;

  return (
    <div className={styles.container}>
      <h3>Dimensiones del pilote</h3>
      <div className={styles.form}>
        <ul>
          <li>
            <div className={styles.inputDiv}>
              <input
                type="checkbox"
                name="Longitud"
                value="Longitud"
                checked={checkedStateLen}
                onChange={handleOnchangeLen}
              />
              <label>Iterar sobre la longitud del fuste</label>
            </div>
          </li>
          <li>
            <div className={styles.inputDiv}>
              <input
                type="checkbox"
                name="Longitud"
                value="Longitud"
                checked={checkedStateDiam}
                onChange={handleOnchangeDiam}
              />
              <label>Iterar sobre el diámetro del pilote</label>
            </div>
          </li>
          <hr className={styles.hr}></hr>
          <li>
            <div className={styles.divForm}>
              <label className={styles.diam}>Diámetro</label>
              <input
                className={styles.input_diam}
                disabled={checkedStateDiam}
                onChange={(e) => handleRadiusChange(e)}
              ></input>
            </div>
          </li>
          <li>
            <div className={styles.divForm}>
              <label className={styles.fust}>Longitud del fuste</label>
              <input
                className={styles.input_fust}
                disabled={checkedStateLen}
                onChange={(e) => handleLengthChange(e)}
              ></input>
            </div>
          </li>
          <li>
            <div className={styles.btn}>
              <button>Aceptar</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
