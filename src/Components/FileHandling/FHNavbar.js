import React, { useState, useEffect, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./HFNavbar.modules.css";
import { Save } from "../../NBIcons/save";
import { SaveAs } from "../../NBIcons/SaveAs";
import { Open } from "../../NBIcons/Open";

export default function FHNavbar() {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const buttons = [
    { name: <Save /> },
    { name: <SaveAs /> },
    { name: <Open /> },
  ];
  const [checkedStates, setCheckedStates] = useState(
    new Array(buttons.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedStates.map((item, index) =>
      index === position ? !item : false
    );
    setCheckedStates(updatedCheckedState);
  };

  let variable2 = JSON.stringify(projectValues);
  console.log("variable2: " + variable2);
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
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
      {checkedStates.map(({ value }, index) => {
        console.log(checkedStates[index]);
        if (index === 0 && checkedStates[index]) {
          electronApi.saveFile(variable2);
        }
        if (index === 1 && checkedStates[index]) {
          electronApi.saveFile(variable2);
        }
        if (index === 2 && checkedStates[index]) {
          electronApi.openFile();
          electronApi.receiveFileData((filePath, fileData) => {
            console.log("fileData: " + fileData);
            let variable = JSON.parse(fileData);
            console.log("variable: " + variable);
            updateProjectValues(variable);
          });
        }
      })}
    </div>
  );
}
