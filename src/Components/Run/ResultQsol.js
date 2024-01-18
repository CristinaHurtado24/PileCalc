import React from "react";
import styles from "./Run.modules.css";

export default function ResultQsol(props) {
  const checkError = (props) => {
    console.log(props.result);
    if (typeof props.result[0]["Qadm"] === "string") {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className={styles.cont}>
      {checkError(props) ? (
        <p>{props.result[0]["Qadm"]}</p>
      ) : (
        <div className={styles.cont}>
          <p>
            Qsol ({props.units[0]["unitForce"]}): {props.result[0]["Qsol"]}
          </p>
          <p>
            Qadm ({props.units[0]["unitForce"]}): {props.result[0]["Qadm"]}
          </p>
          <p>
            Qestructural ({props.units[0]["unitForce"]}):{" "}
            {props.result[0]["Qest"]}
          </p>
          <p>
            Diámetro ({props.units[0]["unitLength"]}): {props.result[0]["diam"]}
          </p>
          <p>
            Longitud ({props.units[0]["unitLength"]}):{" "}
            {props.result[0]["length"]}
          </p>
          <p>
            Volumen ({props.units[0]["unitLength"]}3): {props.result[0]["vol"]}
          </p>
        </div>
      )}
    </div>
  );
}
