import React, { useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
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

export default function Run() {
  const props = useContext(ProjectContext);
  const bothDimMeyer = MeyerhoffBothDim(props[2], props[0], props[4], props[6]);

  const diamIterMeyer = MeyerhofDiamIter(
    props[2],
    props[0],
    props[4],
    props[6]
  );

  const lenIterMeyer = MeyerhofLenIter(props[2], props[0], props[4], props[6]);

  const bothDimKerisel = CaquotKeriselBD(
    props[2],
    props[0],
    props[4],
    props[6]
  );

  const diamIterKerisel = CaquotKeriselDiamIter(
    props[2],
    props[0],
    props[4],
    props[6]
  );

  const lenIterKerisel = CaquotKeriselLenIter(
    props[2],
    props[0],
    props[4],
    props[6]
  );

  const QsolWTDimKerisel = CaquotKeriselQsolWth(
    props[2],
    props[0],
    props[4],
    props[6],
    props[5]
  );

  const QsolWTDimMeyerhof = MeyerhofQsolWth(
    props[2],
    props[0],
    props[4],
    props[6],
    props[5]
  );

  const bothDimPGC = PGCBothDim(
    props[2],
    props[0],
    props[4],
    props[6],
    props[3]
  );

  const diamIterPGC = PGCDiamIter(
    props[2],
    props[0],
    props[4],
    props[6],
    props[3]
  );

  const lenIterPGC = PGCLenIter(
    props[2],
    props[0],
    props[4],
    props[6],
    props[3]
  );

  const QsolWTDimPGC = PGCQsolWth(
    props[2],
    props[0],
    props[4],
    props[6],
    props[5],
    props[3]
  );

  const PGCLenIterQsol = PGCLenInterQsol(
    props[2],
    props[0],
    props[4],
    props[6],
    props[5],
    props[3]
  );

  const PGCDiameIterQsol = PGCDiamIterQsol(
    props[2],
    props[0],
    props[4],
    props[6],
    props[5],
    props[3]
  );

  const MeyerhofDiamIterQsol1 = MeyerhofDiamIterQsol(
    props[2],
    props[0],
    props[4],
    props[6],
    props[5]
  );

  const MeyerhofLenIterQsol1 = MeyerhofLenIterQsol(
    props[2],
    props[0],
    props[4],
    props[6],
    props[5]
  );

  const CKDiamIterQsol = CaquotKeriselDiamIterQsol(
    props[2],
    props[0],
    props[4],
    props[6],
    props[5]
  );

  const CKLenIterQsol = CaquotKeriselLenIterQsol(
    props[2],
    props[0],
    props[4],
    props[6],
    props[5]
  );

  return (
    <div>
      {props[1][0]["methodValue"] === "1" && !props[1][0]["comparison"] && (
        <div>
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={bothDimMeyer}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={bothDimMeyer}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={diamIterMeyer}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={diamIterMeyer}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={lenIterMeyer}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={lenIterMeyer}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimMeyerhof}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={QsolWTDimMeyerhof}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={MeyerhofLenIterQsol1}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={MeyerhofLenIterQsol1}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={MeyerhofDiamIterQsol1}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={MeyerhofDiamIterQsol1}
                  ></Scene>
                </div>
              </div>
            )}
        </div>
      )}
      {props[1][0]["methodValue"] === "1" && props[1][0]["comparison"] && (
        <div>
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={bothDimMeyer}></Result>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <Result units={props[0]} result={bothDimKerisel}></Result>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <Result units={props[0]} result={bothDimPGC}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={bothDimMeyer}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={diamIterMeyer}></Result>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <Result units={props[0]} result={diamIterKerisel}></Result>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <Result units={props[0]} result={diamIterPGC}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={diamIterMeyer}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={lenIterMeyer}></Result>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <Result units={props[0]} result={lenIterKerisel}></Result>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <Result units={props[0]} result={lenIterPGC}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={lenIterMeyer}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimMeyerhof}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimKerisel}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimPGC}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={QsolWTDimMeyerhof}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={MeyerhofLenIterQsol1}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={CKLenIterQsol}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={PGCLenIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={MeyerhofLenIterQsol1}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Meyerhof (1976) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={MeyerhofDiamIterQsol1}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={CKDiamIterQsol}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={PGCDiameIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={MeyerhofDiamIterQsol1}
                  ></Scene>
                </div>
              </div>
            )}
        </div>
      )}
      {props[1][0]["methodValue"] === "2" && !props[1][0]["comparison"] && (
        <div>
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={bothDimKerisel}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={bothDimKerisel}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={diamIterKerisel}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={diamIterKerisel}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={lenIterKerisel}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={lenIterKerisel}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimKerisel}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={QsolWTDimKerisel}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={CKLenIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={CKLenIterQsol}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={CKDiamIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={CKDiamIterQsol}
                  ></Scene>
                </div>
              </div>
            )}
        </div>
      )}
      {props[1][0]["methodValue"] === "2" && props[1][0]["comparison"] && (
        <div>
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={bothDimKerisel}></Result>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <Result units={props[0]} result={bothDimMeyer}></Result>

                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <Result units={props[0]} result={bothDimPGC}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={bothDimKerisel}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={diamIterKerisel}></Result>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <Result units={props[0]} result={diamIterMeyer}></Result>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <Result units={props[0]} result={diamIterPGC}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={diamIterKerisel}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={lenIterKerisel}></Result>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <Result units={props[0]} result={lenIterMeyer}></Result>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <Result units={props[0]} result={lenIterPGC}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={lenIterKerisel}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimKerisel}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimMeyerhof}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimPGC}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={QsolWTDimKerisel}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={CKLenIterQsol}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={MeyerhofLenIterQsol1}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={PGCLenIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={CKLenIterQsol}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Caquot y Kerisel (1961) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={CKDiamIterQsol}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={MeyerhofDiamIterQsol1}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Compilación Pérez Guerra-Carrillo (1981)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={PGCDiameIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={CKDiamIterQsol}
                  ></Scene>
                </div>
              </div>
            )}
        </div>
      )}
      {props[1][0]["methodValue"] === "3" && !props[1][0]["comparison"] && (
        <div>
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={bothDimPGC}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={bothDimPGC}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={diamIterPGC}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={diamIterPGC}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={lenIterPGC}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={lenIterPGC}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimPGC}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={QsolWTDimPGC}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={PGCLenIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={PGCLenIterQsol}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={PGCDiameIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={PGCDiameIterQsol}
                  ></Scene>
                </div>
              </div>
            )}
        </div>
      )}
      {props[1][0]["methodValue"] === "3" && props[1][0]["comparison"] && (
        <div>
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={bothDimPGC}></Result>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <Result units={props[0]} result={bothDimMeyer}></Result>

                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <Result units={props[0]} result={bothDimKerisel}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={bothDimPGC}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={diamIterPGC}></Result>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <Result units={props[0]} result={diamIterMeyer}></Result>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>

                    <Result units={props[0]} result={diamIterKerisel}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={diamIterPGC}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            !props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <Result units={props[0]} result={lenIterPGC}></Result>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <Result units={props[0]} result={lenIterMeyer}></Result>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <Result units={props[0]} result={lenIterKerisel}></Result>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={lenIterPGC}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimPGC}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimMeyerhof}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={QsolWTDimKerisel}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={QsolWTDimPGC}
                  ></Scene>
                </div>
              </div>
            )}
          {!props[4][0]["diamIter"] &&
            props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={PGCLenIterQsol}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={MeyerhofLenIterQsol1}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={CKLenIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
                    result={PGCLenIterQsol}
                  ></Scene>
                </div>
              </div>
            )}
          {props[4][0]["diamIter"] &&
            !props[4][0]["lengthIter"] &&
            !props[4][0]["withoutDim"] &&
            props[5][0]["Qsol"] && (
              <div>
                <div className={styles.container}>
                  <h3 className={styles.titulo}>Resultados</h3>
                  <hr></hr>
                  <h3 className={styles.method}>
                    Compilación Pérez Guerra-Carrillo (1981) (Solución Gráfica)
                  </h3>
                  <div className={styles.cont}>
                    <ResultQsol
                      units={props[0]}
                      result={PGCDiameIterQsol}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Meyerhof (1976)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={MeyerhofDiamIterQsol1}
                    ></ResultQsol>
                    <hr></hr>
                    <h3>Caquot y Kerisel (1961)</h3>
                    <ResultQsol
                      units={props[0]}
                      result={CKDiamIterQsol}
                    ></ResultQsol>
                  </div>
                </div>

                <div className={graphicStyles.container}>
                  <Scene
                    units={props[0]}
                    soil={props[2]}
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
