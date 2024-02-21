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

const checkError = (result) => {
  try {
    if (typeof result[0]["Qadm"] === "string") {
      return true;
    } else if (result[0]["Qadm"] == 0) {
      result[0]["Qadm"] =
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
export default function Run() {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const bothDimMeyer = MeyerhoffBothDim(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials
  );

  const diamIterMeyer = MeyerhofDiamIter(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials
  );

  const lenIterMeyer = MeyerhofLenIter(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials
  );

  const bothDimKerisel = CaquotKeriselBD(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials
  );

  const diamIterKerisel = CaquotKeriselDiamIter(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials
  );

  const lenIterKerisel = CaquotKeriselLenIter(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials
  );

  const QsolWTDimKerisel = CaquotKeriselQsolWth(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.solicitation
  );

  const QsolWTDimMeyerhof = MeyerhofQsolWth(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.solicitation
  );

  const bothDimPGC = PGCBothDim(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.freatico
  );

  const diamIterPGC = PGCDiamIter(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.freatico
  );

  const lenIterPGC = PGCLenIter(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.freatico
  );

  const QsolWTDimPGC = PGCQsolWth(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.solicitation,
    projectValues.freatico
  );

  const PGCLenIterQsol = PGCLenInterQsol(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.solicitation,
    projectValues.freatico
  );

  const PGCDiameIterQsol = PGCDiamIterQsol(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.solicitation,
    projectValues.freatico
  );

  const MeyerhofDiamIterQsol1 = MeyerhofDiamIterQsol(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.solicitation
  );

  const MeyerhofLenIterQsol1 = MeyerhofLenIterQsol(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.solicitation
  );

  const CKDiamIterQsol = CaquotKeriselDiamIterQsol(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.solicitation
  );

  const CKLenIterQsol = CaquotKeriselLenIterQsol(
    projectValues.soilList,
    projectValues.units,
    projectValues.dimensions,
    projectValues.materials,
    projectValues.solicitation
  );

  return (
    <div>
      {projectValues.methods["methodValue"] === "1" &&
        !projectValues.methods["comparison"] && (
          <div>
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={bothDimMeyer}></Result>
                    </div>
                  </div>
                  {checkError(bothDimMeyer) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={bothDimMeyer}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={diamIterMeyer}></Result>
                    </div>
                  </div>

                  {checkError(diamIterMeyer) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={diamIterMeyer}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={lenIterMeyer}></Result>
                    </div>
                  </div>

                  {checkError(lenIterMeyer) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={lenIterMeyer}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={QsolWTDimMeyerhof}></ResultQsol>
                    </div>
                  </div>

                  {checkError(QsolWTDimMeyerhof) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={QsolWTDimMeyerhof}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={MeyerhofLenIterQsol1}></ResultQsol>
                    </div>
                  </div>
                  {checkError(MeyerhofLenIterQsol1) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={MeyerhofLenIterQsol1}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={MeyerhofDiamIterQsol1}></ResultQsol>
                    </div>
                  </div>

                  {checkError(MeyerhofDiamIterQsol1) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={MeyerhofDiamIterQsol1}></Scene>
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
      {projectValues.methods["methodValue"] === "1" &&
        projectValues.methods["comparison"] && (
          <div>
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={bothDimMeyer}></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <Result result={bothDimKerisel}></Result>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <Result result={bothDimPGC}></Result>
                    </div>
                  </div>
                  {checkError(bothDimMeyer) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={bothDimMeyer}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={diamIterMeyer}></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <Result result={diamIterKerisel}></Result>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <Result result={diamIterPGC}></Result>
                    </div>
                  </div>

                  {checkError(diamIterMeyer) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={diamIterMeyer}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={lenIterMeyer}></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <Result result={lenIterKerisel}></Result>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <Result result={lenIterPGC}></Result>
                    </div>
                  </div>
                  {checkError(lenIterMeyer) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={lenIterMeyer}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={QsolWTDimMeyerhof}></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <ResultQsol result={QsolWTDimKerisel}></ResultQsol>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <ResultQsol result={QsolWTDimPGC}></ResultQsol>
                    </div>
                  </div>
                  {checkError(QsolWTDimMeyerhof) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={QsolWTDimMeyerhof}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={MeyerhofLenIterQsol1}></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <ResultQsol result={CKLenIterQsol}></ResultQsol>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <ResultQsol result={PGCLenIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(<Scene result={MeyerhofLenIterQsol1}></Scene>) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={MeyerhofLenIterQsol1}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Meyerhof (1945) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={MeyerhofDiamIterQsol1}></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <ResultQsol result={CKDiamIterQsol}></ResultQsol>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <ResultQsol result={PGCDiameIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(MeyerhofDiamIterQsol1) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={MeyerhofDiamIterQsol1}></Scene>
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
      {projectValues.methods["methodValue"] === "2" &&
        !projectValues.methods["comparison"] && (
          <div>
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={bothDimKerisel}></Result>
                    </div>
                  </div>
                  {checkError(bothDimKerisel) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={bothDimKerisel}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={diamIterKerisel}></Result>
                    </div>
                  </div>
                  {checkError(diamIterKerisel) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={diamIterKerisel}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={lenIterKerisel}></Result>
                    </div>
                  </div>
                  {checkError(lenIterKerisel) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={lenIterKerisel}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={QsolWTDimKerisel}></ResultQsol>
                    </div>
                  </div>
                  {checkError(QsolWTDimKerisel) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={QsolWTDimKerisel}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={CKLenIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(CKLenIterQsol) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={CKLenIterQsol}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={CKDiamIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(CKDiamIterQsol) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={CKDiamIterQsol}></Scene>
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
      {projectValues.methods["methodValue"] === "2" &&
        projectValues.methods["comparison"] && (
          <div>
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={bothDimKerisel}></Result>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <Result result={bothDimMeyer}></Result>

                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <Result result={bothDimPGC}></Result>
                    </div>
                  </div>
                  {checkError(bothDimKerisel) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={bothDimKerisel}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={diamIterKerisel}></Result>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <Result result={diamIterMeyer}></Result>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <Result result={diamIterPGC}></Result>
                    </div>
                  </div>
                  {checkError(diamIterKerisel) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={diamIterKerisel}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={lenIterKerisel}></Result>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <Result result={lenIterMeyer}></Result>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <Result result={lenIterPGC}></Result>
                    </div>
                  </div>
                  {checkError(lenIterKerisel) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={lenIterKerisel}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={QsolWTDimKerisel}></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <ResultQsol result={QsolWTDimMeyerhof}></ResultQsol>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <ResultQsol result={QsolWTDimPGC}></ResultQsol>
                    </div>
                  </div>
                  {checkError(QsolWTDimKerisel) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={QsolWTDimKerisel}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={CKLenIterQsol}></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <ResultQsol result={MeyerhofLenIterQsol1}></ResultQsol>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <ResultQsol result={PGCLenIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(CKLenIterQsol) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={CKLenIterQsol}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Caquot y Kerisel (1954) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={CKDiamIterQsol}></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <ResultQsol result={MeyerhofDiamIterQsol1}></ResultQsol>
                      <hr></hr>
                      <h3>Compilación de Pedro Carrillo (2008)</h3>
                      <ResultQsol result={PGCDiameIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(CKDiamIterQsol) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={CKDiamIterQsol}></Scene>
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
      {projectValues.methods["methodValue"] === "3" &&
        !projectValues.methods["comparison"] && (
          <div>
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={bothDimPGC}></Result>
                    </div>
                  </div>
                  {checkError(bothDimPGC) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={bothDimPGC}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={diamIterPGC}></Result>
                    </div>
                  </div>
                  {checkError(diamIterPGC) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={diamIterPGC}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={lenIterPGC}></Result>
                    </div>
                  </div>
                  {checkError(lenIterPGC) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={lenIterPGC}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={QsolWTDimPGC}></ResultQsol>
                    </div>
                  </div>
                  {checkError(QsolWTDimPGC) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={QsolWTDimPGC}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={PGCLenIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(PGCLenIterQsol) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={PGCLenIterQsol}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={PGCDiameIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(PGCDiameIterQsol) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={PGCDiameIterQsol}></Scene>
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
      {projectValues.methods["methodValue"] === "3" &&
        projectValues.methods["comparison"] && (
          <div>
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={bothDimPGC}></Result>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <Result result={bothDimMeyer}></Result>

                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <Result result={bothDimKerisel}></Result>
                    </div>
                  </div>
                  {checkError(bothDimPGC) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={bothDimPGC}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={diamIterPGC}></Result>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <Result result={diamIterMeyer}></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>

                      <Result result={diamIterKerisel}></Result>
                    </div>
                  </div>
                  {checkError(diamIterPGC) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={diamIterPGC}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              !projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <Result result={lenIterPGC}></Result>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <Result result={lenIterMeyer}></Result>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <Result result={lenIterKerisel}></Result>
                    </div>
                  </div>
                  {checkError(lenIterPGC) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={lenIterPGC}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={QsolWTDimPGC}></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <ResultQsol result={QsolWTDimMeyerhof}></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <ResultQsol result={QsolWTDimKerisel}></ResultQsol>
                    </div>
                  </div>
                  {checkError(QsolWTDimPGC) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={QsolWTDimPGC}></Scene>
                    </div>
                  )}
                </div>
              )}
            {!projectValues.dimensions["diamIter"] &&
              projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={PGCLenIterQsol}></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <ResultQsol result={MeyerhofLenIterQsol1}></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <ResultQsol result={CKLenIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(PGCLenIterQsol) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={PGCLenIterQsol}></Scene>
                    </div>
                  )}
                </div>
              )}
            {projectValues.dimensions["diamIter"] &&
              !projectValues.dimensions["lengthIter"] &&
              !projectValues.dimensions["withoutDim"] &&
              projectValues.solicitation["Qsol"] && (
                <div>
                  <div className={styles.container}>
                    <h3 className={styles.titulo}>Resultados</h3>
                    <hr></hr>
                    <h3 className={styles.method}>
                      Compilación de Pedro Carrillo (2008) (Solución Gráfica)
                    </h3>
                    <div className={styles.cont}>
                      <ResultQsol result={PGCDiameIterQsol}></ResultQsol>
                      <hr></hr>
                      <h3>Meyerhof (1945)</h3>
                      <ResultQsol result={MeyerhofDiamIterQsol1}></ResultQsol>
                      <hr></hr>
                      <h3>Caquot y Kerisel (1954)</h3>
                      <ResultQsol result={CKDiamIterQsol}></ResultQsol>
                    </div>
                  </div>
                  {checkError(PGCDiameIterQsol) ? (
                    <div></div>
                  ) : (
                    <div className={graphicStyles.container}>
                      <Scene result={PGCDiameIterQsol}></Scene>
                    </div>
                  )}
                </div>
              )}
          </div>
        )}
    </div>
  );
}
