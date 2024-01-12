import React, { useState } from "react";
import styles from "./Materials.modules.css";

export default function Materials(props) {
  const [userMaterials, setUserMaterials] = useState(props.list);

  const handleFcChange = (e) => {
    const { value } = e.target;
    const list = [...userMaterials];
    const onlyNumbers = regex.test(value);
    list[0]["errorMsg"] = !onlyNumbers;
    list[0]["fc"] = value;
    setUserMaterials(list);
  };

  const handleFyChange = (e) => {
    const { value } = e.target;
    const list = [...userMaterials];
    const onlyNumbers = regex.test(value);
    list[0]["errorMsg"] = !onlyNumbers;
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
                value={showValue(userMaterials[0]["fc"])}
              ></input>
            </div>
          </li>
          <li>
            <div className={styles.divForm}>
              <label className={styles.fy}>Fy (kg/cm2)</label>
              <input
                className={styles.input_fy}
                onChange={(e) => handleFyChange(e)}
                value={showValue(userMaterials[0]["fy"])}
              ></input>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.errorDiv}>
        <label className={styles.error}>
          {inputValidation(userMaterials[0]["errorMsg"])}
        </label>
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
