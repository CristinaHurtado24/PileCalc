import React, { useState, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./Dimensions.modules.css";

export default function Dimensions() {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const [selectedDimensions, setSelectedDimensions] = useState(
    projectValues.dimensions
  );
  const [units, setUnits] = useState(projectValues.units);
  const [solicitation, setSolicitation] = useState(projectValues.solicitation);
  const [checkedSoli, setCheckedSoli] = useState(solicitation["Qsol"]);
  const [checkedStateLen, setCheckedStateLen] = useState(
    selectedDimensions["lengthIter"]
  );
  const [checkedStateDiam, setCheckedStateDiam] = useState(
    selectedDimensions["diamIter"]
  );

  console.log(solicitation["errorMsg"]);
  const [checkedStateWoDim, setCheckedStateWoDim] = useState(
    selectedDimensions["withoutDim"]
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
    if (!checkedStateDiam) {
      const updatedDim = {
        ...selectedDimensions,
        lengthIter: !checkedStateLen,
      };

      setCheckedStateLen(!checkedStateLen);
      setSelectedDimensions(updatedDim);
    } else {
      const updatedDim = {
        ...selectedDimensions,
        lengthIter: !checkedStateLen,
        diamIter: !checkedStateDiam,
      };

      setCheckedStateDiam(!checkedStateDiam);
      setCheckedStateLen(!checkedStateLen);
      setSelectedDimensions(updatedDim);
    }
  };

  const handleOnchangeDiam = (e) => {
    if (!checkedStateLen) {
      const updatedDim = { ...selectedDimensions, diamIter: !checkedStateDiam };

      setCheckedStateDiam(!checkedStateDiam);
      setSelectedDimensions(updatedDim);
    } else {
      const updatedDim = {
        ...selectedDimensions,
        diamIter: !checkedStateDiam,
        lengthIter: !checkedStateLen,
      };
      setCheckedStateLen(!checkedStateLen);
      setCheckedStateDiam(!checkedStateDiam);
      setSelectedDimensions(updatedDim);
    }
  };

  const handleRequired = (dimensions, solicitation) => {
    let count = 0;
    let countE = 0;

    if (
      selectedDimensions["e1"] ||
      selectedDimensions["e2"] ||
      solicitation["errorMsg"]
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

    const onlyNumbers = regex.test(value);
    const updatedDim = { ...selectedDimensions, diamValue: value };

    if (selectedDimensions["e1"] == false && !onlyNumbers) {
      updatedDim["e1"] = true;
    }
    if (selectedDimensions["e1"] == true && onlyNumbers) {
      updatedDim["e1"] = false;
    }
    setSelectedDimensions(updatedDim);
  };

  const handleLengthChange = (e) => {
    const { value } = e.target;
    const updatedDim = { ...selectedDimensions, lengthValue: value };

    const onlyNumbers = regex.test(value);

    if (selectedDimensions["e2"] == false && !onlyNumbers) {
      updatedDim["e2"] = true;
    }
    if (selectedDimensions["e2"] == true && onlyNumbers) {
      updatedDim["e2"] = false;
    }
    setSelectedDimensions(updatedDim);
  };

  const handleOnChangeQsol = (e) => {
    const updatedSoli = { ...solicitation, Qsol: !checkedSoli };
    if (!checkedSoli) {
      setCheckedSoli(!checkedSoli);
    } else {
      setCheckedSoli(!checkedSoli);
    }
    setSolicitation(updatedSoli);
  };

  const handleOnChangeQsolValue = (e) => {
    const { value } = e.target;
    const onlyNumbers = regex.test(value);
    const updatedSoli = {
      ...solicitation,
      QsoValue: value,
      errorMsg: !onlyNumbers,
    };

    setSolicitation(updatedSoli);
  };
  console.log(selectedDimensions);

  const handleOnChangeWoDim = (e) => {
    const updatedDim = {
      ...selectedDimensions,
      withoutDim: !checkedStateWoDim,
    };

    if (!checkedStateWoDim) {
      setCheckedStateWoDim(!checkedStateWoDim);
    } else {
      setCheckedStateWoDim(!checkedStateWoDim);
    }
    setSelectedDimensions(updatedDim);
  };

  const handleChanges = (newDimensions, newSolicitation) => {
    updateProjectValues({
      ...projectValues,
      dimensions: { ...newDimensions },
      solicitation: { ...newSolicitation },
    });
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
                checked={selectedDimensions["lengthIter"]}
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
                checked={selectedDimensions["diamIter"]}
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
                  checked={solicitation["Qsol"]}
                  onChange={handleOnChangeQsol}
                />
                <label>Calcular en base a una solicitación de carga</label>
              </div>
              <div className={styles.QsolInput}>
                <label>
                  Ingrese el valor de la solicitación ({units["unitForce"]})
                </label>
                <input
                  className={styles.inputs}
                  disabled={!checkedSoli}
                  value={solicitation["QsolValue"]}
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
                checked={selectedDimensions["withoutDim"]}
                disabled={
                  !solicitation["Qsol"] || checkedStateLen || checkedStateDiam
                }
                onChange={handleOnChangeWoDim}
              />
              <label>Hallar ambas dimensiones y minimizar el volumen</label>
            </div>
          </li>
          <li>
            <div className={styles.errorDiv}>
              <label className={styles.error}>
                {inputValidation(solicitation["errorMsg"])}
              </label>
            </div>
          </li>
          <hr className={styles.hr}></hr>
          <li>
            <div className={styles.divForm}>
              <label className={styles.diam}>
                Diámetro ({units["unitLength"]})
              </label>
              <input
                className={styles.input_diam}
                disabled={checkedStateDiam || checkedStateWoDim}
                onChange={(e) => handleDiamChange(e)}
                value={selectedDimensions["diamValue"]}
              ></input>
            </div>
          </li>
          <li>
            <div className={styles.divForm}>
              <label className={styles.fust}>
                Longitud del fuste ({units["unitLength"]})
              </label>
              <input
                className={styles.input_fust}
                disabled={checkedStateLen || checkedStateWoDim}
                onChange={(e) => handleLengthChange(e)}
                value={selectedDimensions["lengthValue"]}
              ></input>
            </div>
          </li>
          <li>
            <div className={styles.errorDiv}>
              <label className={styles.error}>
                {inputValidation(
                  selectedDimensions["e1"] || selectedDimensions["e2"]
                )}
              </label>
            </div>
          </li>
          <li>
            <div className={styles.btn}>
              <button
                onClick={() => {
                  handleRequired(selectedDimensions, solicitation);
                  handleChanges(selectedDimensions, solicitation);
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
