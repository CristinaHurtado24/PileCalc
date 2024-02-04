import React, { useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./Run.modules.css";

export default function ResultQsol(props) {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const checkError = (props) => {
    try {
      if (typeof props.result[0]["Qadm"] === "string") {
        return true;
      } else if (props.result[0]["Qadm"] == 0) {
        props.result[0]["Qadm"] =
          "No se encontraron soluciones. Intente con otro material o dimensiones.";
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return true;
    }
  };
  return (
    <div className={styles.cont}>
      {checkError(props) ? (
        <p>{props.result[0]["Qadm"]}</p>
      ) : (
        <div className={styles.cont}>
          <p>
            Qsol ({projectValues.units["unitForce"]}): {props.result[0]["Qsol"]}
          </p>
          <p>
            Qadm ({projectValues.units["unitForce"]}): {props.result[0]["Qadm"]}
          </p>
          <p>
            Qestructural ({projectValues.units["unitForce"]}):{" "}
            {props.result[0]["Qest"]}
          </p>
          <p>
            Diámetro ({projectValues.units["unitLength"]}):{" "}
            {props.result[0]["diam"]}
          </p>
          <p>
            Longitud ({projectValues.units["unitLength"]}):{" "}
            {props.result[0]["length"]}
          </p>
          <p>
            Volumen ({projectValues.units["unitLength"]}3):{" "}
            {props.result[0]["vol"]}
          </p>
        </div>
      )}
    </div>
  );
}
