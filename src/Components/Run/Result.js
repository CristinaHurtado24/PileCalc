import React from "react";
import styles from "./Run.modules.css";

export default function Result(props) {
  const checkError = (props) => {
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
