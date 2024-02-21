import React, { useState, useEffect, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./Navbar.modules.css";
import Units from "../Units/Units";
import Profile from "../Profile/Profile";
import Dimensions from "../Dimensions/Dimensions";
import MethodSelect from "../MethodSelect/MethodSelect";
import Materials from "../Materials/Materials";
import Run from "../Run/Run";

export default function Navbar() {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const buttons = [
    { name: "Unidades" },
    { name: "Métodos" },
    { name: "Perfil" },
    { name: "Dimensiones" },
    { name: "Materiales" },
    { name: "Run" },
  ];

  const [checkedState, setCheckedState] = useState(
    new Array(buttons.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : false
    );
    setCheckedState(updatedCheckedState);
  };


  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <ul className={styles.list}>
          {buttons.map(({ name }, index) => {
            return (
              <li>
                <div className={styles.marg}>
                  <button
                    onClick={() => {
                      handleOnChange(index);
                    }}
                  >
                    {name}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {checkedState.map(({ value }, index) => {
        if (index === 0 && checkedState[index]) {
          return <Units></Units>;
        }
        if (index === 1 && checkedState[index]) {
          return <MethodSelect></MethodSelect>;
        }
        if (
          index === 2 &&
          checkedState[index] &&
          projectValues.units["unitValue"] !== "0" &&
          projectValues.methods["methodValue"] !== "0"
        ) {
          return <Profile></Profile>;
        }
        if (
          index === 2 &&
          checkedState[index] &&
          (projectValues.units["unitValue"] == "0" ||
            projectValues.methods["methodValue"] == "0")
        ) {
          electronApi.notificationApi.sendNotification(
            "Debe seleccionar las unidades y/o el método de cálculo antes de continuar"
          );
          return "";
        }
        if (
          index === 3 &&
          checkedState[index] &&
          projectValues.units["unitValue"] !== "0"
        ) {
          return <Dimensions></Dimensions>;
        }
        if (
          index === 3 &&
          checkedState[index] &&
          projectValues.units["unitValue"] == "0"
        ) {
          electronApi.notificationApi.sendNotification(
            "Debe seleccionar las unidades antes de continuar"
          );
          return "";
        }
        if (index === 4 && checkedState[index]) {
          return <Materials></Materials>;
        }
        if (
          index === 5 &&
          checkedState[index] &&
          projectValues.units["unitValue"] !== "0" &&
          projectValues.methods["methodValue"] !== "0" &&
          projectValues.soilList[0]["typeValue"] !== "" &&
          projectValues.materials["fc"] !== "" &&
          projectValues.materials["fy"] !== "" &&
          (projectValues.dimensions["diamValue"] !== "" ||
            projectValues.dimensions["lengthValue"] !== "" ||
            projectValues.dimensions["diamIter"] === true ||
            projectValues.dimensions["lengthIter"] === true ||
            projectValues.dimensions["withoutDim"] === true)
        ) {
          return <Run></Run>;
        }
        if (
          index === 5 &&
          checkedState[index] &&
          (projectValues.units["unitValue"] == "0" ||
            projectValues.methods["methodValue"] == "0" ||
            projectValues.soilList[0]["typeValue"] == "" ||
            projectValues.materials["fc"] == "" ||
            projectValues.materials["fy"] == "" ||
            projectValues.dimensions["diamValue"] == "" ||
            projectValues.dimensions["lengthValue"] == "" ||
            projectValues.dimensions["diamIter"] === false ||
            projectValues.dimensions["lengthIter"] === false ||
            projectValues.dimensions["withoutDim"] === false ||
            projectValues.dimensions["diamIter"] === true ||
            projectValues.dimensions["lengthIter"] === true ||
            projectValues.dimensions["withoutDim"] === true ||
            projectValues.solicitation["Qsol"] === true)
        ) {
          if (index === 5 && projectValues.units["unitValue"] == "0") {
            electronApi.notificationApi.sendNotification(
              "Debe seleccionar las unidades y/o el método de cálculo antes de continuar"
            );
            return "";
          }
          if (index === 5 && projectValues.methods["methodValue"] == "0") {
            electronApi.notificationApi.sendNotification(
              "Debe seleccionar un método de cálculo"
            );
            return "";
          }
          if (index === 5 && projectValues.soilList[0]["typeValue"] == "") {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar el perfil del suelo antes de continuar"
            );
            return "";
          }
          if (
            index === 5 &&
            projectValues.dimensions["diamIter"] === false &&
            projectValues.dimensions["lengthIter"] === false &&
            projectValues.dimensions["withoutDim"] === false &&
            projectValues.solicitation["Qsol"] === false &&
            (projectValues.dimensions["diamValue"] == "" ||
              projectValues.dimensions["lengthValue"] == "")
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar las dimensiones del pilote o seleccionar iterar sobre alguna de ellas"
            );
            return "";
          }
          if (
            index === 5 &&
            projectValues.dimensions["diamIter"] === true &&
            projectValues.dimensions["lengthValue"] == ""
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la longitud del pilote"
            );
            return "";
          }
          if (
            index === 5 &&
            projectValues.dimensions["lengthIter"] === true &&
            projectValues.dimensions["diamValue"] == ""
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar el diámetro del pilote"
            );
            return "";
          }
          if (
            index === 5 &&
            projectValues.solicitation["Qsol"] === true &&
            projectValues.solicitation["QsolValue"] == ""
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la solicitación del pilote"
            );
            return "";
          }
          if (
            (index === 5 &&
              projectValues.dimensions["withoutDim"] === false &&
              projectValues.solicitation["Qsol"] === true &&
              projectValues.dimensions["lengthValue"] == "") ||
            projectValues.dimensions["diamValue"] == ""
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar las dimensiones del pilote"
            );
            return "";
          }
          if (
            index === 5 &&
            projectValues.freatico["NF"] === true &&
            projectValues.freatico["NFStart"] == ""
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la ubicación del nivel freático"
            );
            return "";
          }
          if (index === 5 && projectValues.materials["fc"] == "") {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la resistencia del concreto"
            );
            return "";
          }
          if (index === 5 && projectValues.materials["fy"] == "") {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la resistencia del acero"
            );
            return "";
          }
        }
      })}
    </div>
  );
}
