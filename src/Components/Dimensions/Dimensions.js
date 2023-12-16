import React, { useState } from "react";
import styles from "./Dimensions.modules.css";

export default function Dimensions(props) {
  const [dimensions, setDimensions] = useState(props.list);
  const [checkedStateLen, setCheckedStateLen] = useState(
    props.list[0]["lengthIter"]
  );
  const [checkedStateDiam, setCheckedStateDiam] = useState(
    props.list[0]["diamIter"]
  );

  const handleOnchangeLen = (e) => {
    const list = [...dimensions];
    if (!checkedStateDiam) {
      list[0]["lengthIter"] = !checkedStateLen;
      setCheckedStateLen(!checkedStateLen);
    } else {
      list[0]["diamIter"] = !checkedStateDiam;
      list[0]["lengthIter"] = !checkedStateLen;
      setCheckedStateDiam(!checkedStateDiam);
      setCheckedStateLen(!checkedStateLen);
    }
    setDimensions(list);
  };

  const handleOnchangeDiam = (e) => {
    const list = [...dimensions];
    if (!checkedStateLen) {
      list[0]["diamIter"] = !checkedStateDiam;
      setCheckedStateDiam(!checkedStateDiam);
    } else {
      list[0]["lengthIter"] = !checkedStateLen;
      list[0]["diamIter"] = !checkedStateDiam;
      setCheckedStateLen(!checkedStateLen);
      setCheckedStateDiam(!checkedStateDiam);
    }
    setDimensions(list);
  };

  const handleDiamChange = (e) => {
    const { value } = e.target;
    const list = [...dimensions];
    list[0]["diamValue"] = value;
    setDimensions(list);
  };

  const handleLengthChange = (e) => {
    const { value } = e.target;
    const list = [...dimensions];
    list[0]["lengthValue"] = value;
    setDimensions(list);
  };

  const showValueDiam = (value) => {
    if (value === "") {
      return "";
    } else {
      return value;
    }
  };

  const showValueLen = (value) => {
    if (value === "") {
      return "";
    } else {
      return value;
    }
  };

  console.log(dimensions);

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
                checked={dimensions[0]["lengthIter"]}
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
                checked={dimensions[0]["diamIter"]}
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
                onChange={(e) => handleDiamChange(e)}
                placeholder={showValueDiam(dimensions[0]["diamValue"])}
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
                placeholder={showValueLen(dimensions[0]["lengthValue"])}
              ></input>
            </div>
          </li>
          <li>
            <div className={styles.btn}>
              <button
                onClick={() => {
                  props.callback(dimensions);
                }}
              >
                Aceptar
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
