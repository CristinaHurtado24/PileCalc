import React from "react";
import styles from "./Run.modules.css";
import Result from "./Result";
import ResultQsol from "./ResultQsol";

import {
  MeyerhoffBothDim,
  MeyerhofDiamIter,
  MeyerhofLenIter,
  MeyerhofQsolWth,
} from "../../Methods/Methods";

import {
  CaquotKeriselBD,
  CaquotKeriselLenIter,
  CaquotKeriselDiamIter,
  CaquotKeriselQsolWth,
} from "../../Methods/Methods";

export default function Run(props) {
  const bothDimMeyer = MeyerhoffBothDim(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials
  );

  const diamIterMeyer = MeyerhofDiamIter(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials
  );

  const lenIterMeyer = MeyerhofLenIter(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials
  );

  const bothDimKerisel = CaquotKeriselBD(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials
  );

  const diamIterKerisel = CaquotKeriselDiamIter(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials
  );

  const lenIterKerisel = CaquotKeriselLenIter(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials
  );

  const QsolWTDimKerisel = CaquotKeriselQsolWth(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.solicitation
  );

  const QsolWTDimMeyerhof = MeyerhofQsolWth(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.solicitation
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.titulo}>Resultados</h3>
      <hr></hr>
      {props.method[0]["methodValue"] === "1" &&
        !props.method[0]["comparison"] && (
          <div className={styles.cont}>
            <h3>Meyerhof (1976)</h3>
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <Result units={props.units} result={bothDimMeyer}></Result>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <Result units={props.units} result={diamIterMeyer}></Result>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <Result units={props.units} result={lenIterMeyer}></Result>
              )}
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <ResultQsol
                  units={props.units}
                  result={QsolWTDimMeyerhof}
                ></ResultQsol>
              )}
          </div>
        )}
      {props.method[0]["methodValue"] === "2" &&
        !props.method[0]["comparison"] && (
          <div className={styles.cont}>
            <h3>Lymon Reese</h3>
          </div>
        )}
      {props.method[0]["methodValue"] === "3" &&
        !props.method[0]["comparison"] && (
          <div className={styles.cont}>
            <h3>Caquot y Kerisel (1961)</h3>
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <Result units={props.units} result={bothDimKerisel}></Result>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <Result units={props.units} result={diamIterKerisel}></Result>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <Result units={props.units} result={lenIterKerisel}></Result>
              )}
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <ResultQsol
                  units={props.units}
                  result={QsolWTDimKerisel}
                ></ResultQsol>
              )}
          </div>
        )}
    </div>
  );
}
