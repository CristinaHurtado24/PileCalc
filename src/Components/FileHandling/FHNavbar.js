import React, { useState, useEffect, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./HFNavbar.modules.css";
import { Save } from "../../NBIcons/save";
import { SaveAs } from "../../NBIcons/SaveAs";
import { Open } from "../../NBIcons/Open";

export default function FHNavbar() {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);

  let variable2 = JSON.stringify(projectValues);

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <ul className={styles.list}>
          <li>
            <div className={styles.marg}>
              <button
                onClick={() => {
                  electronApi.saveFile(variable2);
                }}
              >
                <SaveAs></SaveAs>
              </button>
            </div>
          </li>
          <li>
            <div className={styles.marg}>
              <button
                onClick={() => {
                  electronApi.saveFile(variable2);
                }}
              >
                <Save></Save>
              </button>
            </div>
          </li>
          <li>
            <div className={styles.marg}>
              <button
                onClick={() => {
                  electronApi.openFile();
                  electronApi.receiveFileData((filePath, fileData) => {
                    let variable = JSON.parse(fileData);

                    updateProjectValues(variable);
                  });
                }}
              >
                <Open></Open>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
