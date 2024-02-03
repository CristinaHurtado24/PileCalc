import React, { useState, useEffect, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./Navbar.modules.css";
import Units from "../Units/Units";
import Profile from "../Profile/Profile";
import Dimensions from "../Dimensions/Dimensions";
import MethodSelect from "../MethodSelect/MethodSelect";
import Materials from "../Materials/Materials";
import Run from "../Run/Run";

export default function Navbar() {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const buttons = [
    { name: "Unidades" },
    { name: "Métodos" },
    { name: "Perfil" },
    { name: "Dimensiones" },
    { name: "Materiales" },
    { name: "Run" },
  ];

  const [checkedState, setCheckedState] = useState(
    new Array(buttons.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : false
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
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
      {checkedState.map(({ value }, index) => {
        console.log(checkedState[index]);
        if (index === 0 && checkedState[index]) {
          return <Units></Units>;
        }
        if (index === 1 && checkedState[index]) {
          return <MethodSelect></MethodSelect>;
        }
        if (index === 2 && checkedState[index]) {
          return <Profile></Profile>;
        }

        if (index === 3 && checkedState[index]) {
          return <Dimensions></Dimensions>;
        }
        if (index === 4 && checkedState[index]) {
          return <Materials></Materials>;
        }
        if (index === 5 && checkedState[index]) {
          return <Run></Run>;
        }
      })}
    </div>
  );
}
