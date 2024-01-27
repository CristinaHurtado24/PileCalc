import React from "react";
import styles from "./Run.modules.css";
import Result from "./Result";
import ResultQsol from "./ResultQsol";
import Scene from "../3dModel/Scene";
import graphicStyles from "../3dModel/3dModel.modules.css";

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
    <div>
      {props.method[0]["methodValue"] === "1" &&
        !props.method[0]["comparison"] && (
          <div>
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={bothDimMeyer}
                      ></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={bothDimMeyer}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={diamIterMeyer}
                      ></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={diamIterMeyer}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={lenIterMeyer}
                      ></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={lenIterMeyer}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimMeyerhof}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={QsolWTDimMeyerhof}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={MeyerhofLenIterQsol1}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={MeyerhofLenIterQsol1}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={MeyerhofDiamIterQsol1}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={MeyerhofDiamIterQsol1}
                    ></Scene>
                  </div>
                </div>
              )}
          </div>
        )}
      {props.method[0]["methodValue"] === "1" &&
        props.method[0]["comparison"] && (
          <div>
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={bothDimMeyer}
                      ></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <Result
                        units={props.units}
                        result={bothDimKerisel}
                      ></Result>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <Result units={props.units} result={bothDimPGC}></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={bothDimMeyer}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={diamIterMeyer}
                      ></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <Result
                        units={props.units}
                        result={diamIterKerisel}
                      ></Result>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <Result units={props.units} result={diamIterPGC}></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={diamIterMeyer}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={lenIterMeyer}
                      ></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <Result
                        units={props.units}
                        result={lenIterKerisel}
                      ></Result>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <Result units={props.units} result={lenIterPGC}></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={lenIterMeyer}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimMeyerhof}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimKerisel}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimPGC}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={QsolWTDimMeyerhof}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={MeyerhofLenIterQsol1}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <ResultQsol
                        units={props.units}
                        result={CKLenIterQsol}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <ResultQsol
                        units={props.units}
                        result={PGCLenIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={MeyerhofLenIterQsol1}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1976) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={MeyerhofDiamIterQsol1}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <ResultQsol
                        units={props.units}
                        result={CKDiamIterQsol}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <ResultQsol
                        units={props.units}
                        result={PGCDiameIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={MeyerhofDiamIterQsol1}
                    ></Scene>
                  </div>
                </div>
              )}
          </div>
        )}
      {props.method[0]["methodValue"] === "2" &&
        !props.method[0]["comparison"] && (
          <div>
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={bothDimKerisel}
                      ></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={bothDimKerisel}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={diamIterKerisel}
                      ></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={diamIterKerisel}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={lenIterKerisel}
                      ></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={lenIterKerisel}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimKerisel}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={QsolWTDimKerisel}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={CKLenIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={CKLenIterQsol}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={CKDiamIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={CKDiamIterQsol}
                    ></Scene>
                  </div>
                </div>
              )}
          </div>
        )}
      {props.method[0]["methodValue"] === "2" &&
        props.method[0]["comparison"] && (
          <div>
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={bothDimKerisel}
                      ></Result>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <Result
                        units={props.units}
                        result={bothDimMeyer}
                      ></Result>

                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <Result units={props.units} result={bothDimPGC}></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={bothDimKerisel}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={diamIterKerisel}
                      ></Result>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <Result
                        units={props.units}
                        result={diamIterMeyer}
                      ></Result>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <Result units={props.units} result={diamIterPGC}></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={diamIterKerisel}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result
                        units={props.units}
                        result={lenIterKerisel}
                      ></Result>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <Result
                        units={props.units}
                        result={lenIterMeyer}
                      ></Result>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <Result units={props.units} result={lenIterPGC}></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={lenIterKerisel}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimKerisel}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimMeyerhof}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimPGC}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={QsolWTDimKerisel}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={CKLenIterQsol}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <ResultQsol
                        units={props.units}
                        result={MeyerhofLenIterQsol1}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <ResultQsol
                        units={props.units}
                        result={PGCLenIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={CKLenIterQsol}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1961) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={CKDiamIterQsol}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <ResultQsol
                        units={props.units}
                        result={MeyerhofDiamIterQsol1}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                      <ResultQsol
                        units={props.units}
                        result={PGCDiameIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={CKDiamIterQsol}
                    ></Scene>
                  </div>
                </div>
              )}
          </div>
        )}
      {props.method[0]["methodValue"] === "3" &&
        !props.method[0]["comparison"] && (
          <div>
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result units={props.units} result={bothDimPGC}></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={bothDimPGC}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result units={props.units} result={diamIterPGC}></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={diamIterPGC}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result units={props.units} result={lenIterPGC}></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={lenIterPGC}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimPGC}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={QsolWTDimPGC}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={PGCLenIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={PGCLenIterQsol}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={PGCDiameIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={PGCDiameIterQsol}
                    ></Scene>
                  </div>
                </div>
              )}
          </div>
        )}
      {props.method[0]["methodValue"] === "3" &&
        props.method[0]["comparison"] && (
          <div>
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result units={props.units} result={bothDimPGC}></Result>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <Result
                        units={props.units}
                        result={bothDimMeyer}
                      ></Result>

                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <Result
                        units={props.units}
                        result={bothDimKerisel}
                      ></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={bothDimPGC}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result units={props.units} result={diamIterPGC}></Result>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <Result
                        units={props.units}
                        result={diamIterMeyer}
                      ></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>

                      <Result
                        units={props.units}
                        result={diamIterKerisel}
                      ></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={diamIterPGC}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              !props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result units={props.units} result={lenIterPGC}></Result>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <Result
                        units={props.units}
                        result={lenIterMeyer}
                      ></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <Result
                        units={props.units}
                        result={lenIterKerisel}
                      ></Result>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={lenIterPGC}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimPGC}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimMeyerhof}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <ResultQsol
                        units={props.units}
                        result={QsolWTDimKerisel}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={QsolWTDimPGC}
                    ></Scene>
                  </div>
                </div>
              )}
            {!props.dimensions[0]["diamIter"] &&
              props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={PGCLenIterQsol}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <ResultQsol
                        units={props.units}
                        result={MeyerhofLenIterQsol1}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <ResultQsol
                        units={props.units}
                        result={CKLenIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={PGCLenIterQsol}
                    ></Scene>
                  </div>
                </div>
              )}
            {props.dimensions[0]["diamIter"] &&
              !props.dimensions[0]["lengthIter"] &&
              !props.dimensions[0]["withoutDim"] &&
              props.solicitation[0]["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación Pérez Guerra-Carrillo (1981) (Solución
                      Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol
                        units={props.units}
                        result={PGCDiameIterQsol}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1976)</h3>
                      <ResultQsol
                        units={props.units}
                        result={MeyerhofDiamIterQsol1}
                      ></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1961)</h3>
                      <ResultQsol
                        units={props.units}
                        result={CKDiamIterQsol}
                      ></ResultQsol>
                    </div>
                  </div>

                  <div className={graphicStyles.container}>
                    <Scene
                      units={props.units}
                      soil={props.soilList}
                      result={PGCDiameIterQsol}
                    ></Scene>
                  </div>
                </div>
              )}
          </div>
        )}
    </div>
  );
}
