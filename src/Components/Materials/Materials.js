import React, { useState } from "react";
import styles from "./Materials.modules.css";

export default function Materials(props) {
  const [userMaterials, setUserMaterials] = useState(props.list);

  const handleFcChange = (e) => {
    const { value } = e.target;
    const list = [...userMaterials];
    list[0]["fc"] = value;
    const onlyNumbers = regex.test(value);
    if (list[0]["e1"] == false && !onlyNumbers) {
      list[0]["e1"] = true;
    }
    if (list[0]["e1"] == true && onlyNumbers) {
      list[0]["e1"] = false;
    }
    setUserMaterials(list);
  };

  const handleFyChange = (e) => {
    const { value } = e.target;
    const list = [...userMaterials];
    const onlyNumbers = regex.test(value);
    list[0]["fy"] = value;
    if (list[0]["e2"] == false && !onlyNumbers) {
      list[0]["e2"] = true;
    }
    if (list[0]["e2"] == true && onlyNumbers) {
      list[0]["e2"] = false;
    }
    setUserMaterials(list);
  };

  const showValue = (value) => {
    if (value === "") {
      return "";
    } else {
      return value;
    }
  };
  const handleRequired = (userMaterials) => {
   
    const list = [...userMaterials];
    let count = 0;
    let countE = 0;

    if (list[0]["e1"] || list[0]["e2"]) {
      countE += 1;
    } else {
      if (list[0]["fc"] == "" || list[0]["fy"] == "") {
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
          {inputValidation(userMaterials[0]["e1"] || userMaterials[0]["e2"])}
        </label>
      </div>
      <div className={styles.btn}>
        <button
          onClick={() => {
            handleRequired(userMaterials);
            props.callback(userMaterials);
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
