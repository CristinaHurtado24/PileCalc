import React, { useState } from "react";
import styles from "./Dimensions.modules.css";

export default function Dimensions(props) {
  const [dimensions, setDimensions] = useState(props.list);
  const [units, setUnits] = useState(props.units);
  const [solicitation, setSolicitation] = useState(props.solicitation);
  const [checkedSoli, setCheckedSoli] = useState(props.solicitation[0]["Qsol"]);
  const [checkedStateLen, setCheckedStateLen] = useState(
    props.list[0]["lengthIter"]
  );
  const [checkedStateDiam, setCheckedStateDiam] = useState(
    props.list[0]["diamIter"]
  );

  const [checkedStateWoDim, setCheckedStateWoDim] = useState(
    props.list[0]["withoutDim"]
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

  const handleOnChangeQsol = (e) => {
    const list = [...solicitation];
    if (!checkedSoli) {
      list[0]["Qsol"] = !checkedSoli;
      setCheckedSoli(!checkedSoli);
    } else {
      list[0]["Qsol"] = !checkedSoli;
      setCheckedSoli(!checkedSoli);
    }
    setSolicitation(list);
  };

  const handleOnChangeQsolValue = (e) => {
    const { value } = e.target;
    const list = [...solicitation];
    list[0]["QsolValue"] = value;
    setSolicitation(list);
  };
  console.log(dimensions);

  const handleOnChangeWoDim = (e) => {
    const list = [...dimensions];
    if (!checkedStateWoDim) {
      list[0]["withoutDim"] = !checkedStateWoDim;
      setCheckedStateWoDim(!checkedStateWoDim);
    } else {
      list[0]["withoutDim"] = !checkedStateWoDim;
      setCheckedStateWoDim(!checkedStateWoDim);
    }
    setDimensions(list);
  };

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
          <li>
            <div className={styles.Qsol}>
              <div className={styles.inputDiv}>
                <input
                  type="checkbox"
                  name="QSol"
                  value="QSol"
                  checked={solicitation[0]["Qsol"]}
                  onChange={handleOnChangeQsol}
                />
                <label>Calcular en base a una solicitación de carga</label>
              </div>
              <div className={styles.QsolInput}>
                <label>
                  Ingrese el valor de la solicitación ({units[0]["unitForce"]})
                </label>
                <input
                  className={styles.inputs}
                  disabled={!checkedSoli}
                  value={solicitation[0]["QsolValue"]}
                  onChange={(e) => handleOnChangeQsolValue(e)}
                ></input>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.WoDim}>
              <input
                type="checkbox"
                name="withoutDim"
                value="withoutDim"
                checked={dimensions[0]["withoutDim"]}
                disabled={!solicitation[0]["Qsol"]}
                onChange={handleOnChangeWoDim}
              />
              <label>Hallar ambas dimensiones y minimizar el volumen</label>
            </div>
          </li>
          <hr className={styles.hr}></hr>
          <li>
            <div className={styles.divForm}>
              <label className={styles.diam}>
                Diámetro ({units[0]["unitLength"]})
              </label>
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
              <label className={styles.fust}>
                Longitud del fuste ({units[0]["unitLength"]})
              </label>
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
                  props.callback(dimensions, solicitation);
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
