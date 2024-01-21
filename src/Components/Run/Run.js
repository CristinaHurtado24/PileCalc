import React from "react";
import styles from "./Run.modules.css";
import Result from "./Result";
import ResultQsol from "./ResultQsol";

import {
  MeyerhoffBothDim,
  MeyerhofDiamIter,
  MeyerhofLenIter,
  MeyerhofQsolWth,
  MeyerhofDiamIterQsol,
  MeyerhofLenIterQsol,
} from "../../Methods/Methods";

import {
  PGCBothDim,
  PGCLenIter,
  PGCDiamIter,
  PGCQsolWth,
  PGCLenInterQsol,
  PGCDiamIterQsol,
} from "../../Methods/Methods";

import {
  CaquotKeriselBD,
  CaquotKeriselLenIter,
  CaquotKeriselDiamIter,
  CaquotKeriselQsolWth,
  CaquotKeriselDiamIterQsol,
  CaquotKeriselLenIterQsol,
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

  const bothDimPGC = PGCBothDim(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.NF
  );

  const diamIterPGC = PGCDiamIter(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.NF
  );

  const lenIterPGC = PGCLenIter(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.NF
  );

  const QsolWTDimPGC = PGCQsolWth(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.solicitation,
    props.NF
  );

  const PGCLenIterQsol = PGCLenInterQsol(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.solicitation,
    props.NF
  );

  const PGCDiameIterQsol = PGCDiamIterQsol(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.solicitation,
    props.NF
  );

  const MeyerhofDiamIterQsol1 = MeyerhofDiamIterQsol(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.solicitation
  );

  const MeyerhofLenIterQsol1 = MeyerhofLenIterQsol(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.solicitation
  );

  const CKDiamIterQsol = CaquotKeriselDiamIterQsol(
    props.soilList,
    props.units,
    props.dimensions,
    props.materials,
    props.solicitation
  );

  const CKLenIterQsol = CaquotKeriselLenIterQsol(
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
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <ResultQsol
                  units={props.units}
                  result={MeyerhofLenIterQsol1}
                ></ResultQsol>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <ResultQsol
                  units={props.units}
                  result={MeyerhofDiamIterQsol1}
                ></ResultQsol>
              )}
          </div>
        )}
      {props.method[0]["methodValue"] === "2" &&
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
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <ResultQsol
                  units={props.units}
                  result={CKLenIterQsol}
                ></ResultQsol>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <ResultQsol
                  units={props.units}
                  result={CKDiamIterQsol}
                ></ResultQsol>
              )}
          </div>
        )}
      {props.method[0]["methodValue"] === "3" &&
        !props.method[0]["comparison"] && (
          <div className={styles.cont}>
            <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <Result units={props.units} result={bothDimPGC}></Result>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <Result units={props.units} result={diamIterPGC}></Result>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <Result units={props.units} result={lenIterPGC}></Result>
              )}
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <ResultQsol
                  units={props.units}
                  result={QsolWTDimPGC}
                ></ResultQsol>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <ResultQsol
                  units={props.units}
                  result={PGCLenIterQsol}
                ></ResultQsol>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <ResultQsol
                  units={props.units}
                  result={PGCDiameIterQsol}
                ></ResultQsol>
              )}
          </div>
        )}
    </div>
  );
}
