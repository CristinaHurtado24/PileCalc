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

  console.log(solicitation[0]["errorMsg"]);
  const [checkedStateWoDim, setCheckedStateWoDim] = useState(
    props.list[0]["withoutDim"]
  );

  //funcion regex para validar que solo se ingresen numeros positivos y con punto como separador decimal
  const regex = /^[0-9]*[.]?[0-9]*$/;

  const inputValidation = (badInput) => {
    if (badInput) {
      return "Debe ingresar caracteres numéricos, positivos y utilizar punto (.) como separador decimal";
    } else {
      return "";
    }
  };

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

  const handleRequired = (dimensions, solicitation) => {
    let count = 0;
    let countE = 0;

    if (
      dimensions[0]["e1"] ||
      dimensions[0]["e2"] ||
      solicitation[0]["errorMsg"]
    ) {
      countE += 1;
    }

    if (countE > 0) {
      electronApi.notificationApi.sendNotification(
        "Por favor ingrese los datos correctamente"
      );
      return "";
    } else {
      return "";
    }
  };

  const handleDiamChange = (e) => {
    const { value } = e.target;
    const list = [...dimensions];
    list[0]["diamValue"] = value;
    const onlyNumbers = regex.test(value);

    if (list[0]["e1"] == false && !onlyNumbers) {
      list[0]["e1"] = true;
    }
    if (list[0]["e1"] == true && onlyNumbers) {
      list[0]["e1"] = false;
    }
    setDimensions(list);
  };

  const handleLengthChange = (e) => {
    const { value } = e.target;
    const list = [...dimensions];
    list[0]["lengthValue"] = value;
    const onlyNumbers = regex.test(value);

    if (list[0]["e2"] == false && !onlyNumbers) {
      list[0]["e2"] = true;
    }
    if (list[0]["e2"] == true && onlyNumbers) {
      list[0]["e2"] = false;
    }
    setDimensions(list);
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
    const onlyNumbers = regex.test(value);
    list[0]["errorMsg"] = !onlyNumbers;
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
                disabled={checkedStateWoDim}
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
                disabled={checkedStateWoDim}
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
                disabled={
                  !solicitation[0]["Qsol"] ||
                  checkedStateLen ||
                  checkedStateDiam
                }
                onChange={handleOnChangeWoDim}
              />
              <label>Hallar ambas dimensiones y minimizar el volumen</label>
            </div>
          </li>
          <li>
            <div className={styles.errorDiv}>
              <label className={styles.error}>
                {inputValidation(solicitation[0]["errorMsg"])}
              </label>
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
                disabled={checkedStateDiam || checkedStateWoDim}
                onChange={(e) => handleDiamChange(e)}
                value={dimensions[0]["diamValue"]}
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
                disabled={checkedStateLen || checkedStateWoDim}
                onChange={(e) => handleLengthChange(e)}
                value={dimensions[0]["lengthValue"]}
              ></input>
            </div>
          </li>
          <li>
            <div className={styles.errorDiv}>
              <label className={styles.error}>
                {inputValidation(dimensions[0]["e1"] || dimensions[0]["e2"])}
              </label>
            </div>
          </li>
          <li>
            <div className={styles.btn}>
              <button
                onClick={() => {
                  handleRequired(dimensions);
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
