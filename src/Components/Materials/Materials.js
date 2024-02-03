import React, { useState, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./Materials.modules.css";

export default function Materials() {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const [userMaterials, setUserMaterials] = useState(projectValues.materials);

  const handleChanges = (newValues) => {
    updateProjectValues({ ...projectValues, materials: newValues });
  };
  const handleFcChange = (e) => {
    const { value } = e.target;
    const updatedMaterials = { ...userMaterials, fc: value };
    const onlyNumbers = regex.test(value);
    if (userMaterials["e1"] == false && !onlyNumbers) {
      updatedMaterials["e1"] = true;
    }
    if (userMaterials["e1"] == true && onlyNumbers) {
      updatedMaterials["e1"] = false;
    }
    setUserMaterials(updatedMaterials);
  };

  const handleFyChange = (e) => {
    const { value } = e.target;
    const onlyNumbers = regex.test(value);
    const updatedMaterials = { ...userMaterials, fy: value };
    if (userMaterials["e2"] == false && !onlyNumbers) {
      updatedMaterials["e2"] = true;
    }
    if (userMaterials["e2"] == true && onlyNumbers) {
      updatedMaterials["e2"] = false;
    }
    setUserMaterials(updatedMaterials);
  };

  const showValue = (value) => {
    if (value === "") {
      return "";
    } else {
      return value;
    }
  };
  const handleRequired = (userMaterials) => {
    let count = 0;
    let countE = 0;

    if (userMaterials["e1"] || userMaterials["e2"]) {
      countE += 1;
    } else {
      if (userMaterials["fc"] == "" || userMaterials["fy"] == "") {
        count += 1;
      }
    }
    if (count > 0) {
      electronApi.notificationApi.sendNotification(
        "Debe completar todos los campos"
      );
      return "";
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

  //funcion regex para validar que solo se ingresen numeros positivos y con punto como separador decimal
  const regex = /^[0-9]*[.]?[0-9]*$/;

  const inputValidation = (badInput) => {
    if (badInput) {
      return "Debe ingresar caracteres numéricos, positivos y utilizar punto (.) como separador decimal";
    } else {
      return "";
    }
  };

  return (
    <div className={styles.container}>
      <h3>Materiales</h3>
      <div className={styles.form}>
        <ul>
          <li>
            <div className={styles.divForm}>
              <label className={styles.fc}>F'c (kg/cm2)</label>
              <input
                className={styles.input_fc}
                onChange={(e) => handleFcChange(e)}
                value={showValue(userMaterials["fc"])}
              ></input>
            </div>
          </li>
          <li>
            <div className={styles.divForm}>
              <label className={styles.fy}>Fy (kg/cm2)</label>
              <input
                className={styles.input_fy}
                onChange={(e) => handleFyChange(e)}
                value={showValue(userMaterials["fy"])}
              ></input>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.errorDiv}>
        <label className={styles.error}>
          {inputValidation(userMaterials["e1"] || userMaterials["e2"])}
        </label>
      </div>
      <div className={styles.btn}>
        <button
          onClick={() => {
            handleRequired(userMaterials);
            handleChanges(userMaterials);
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
