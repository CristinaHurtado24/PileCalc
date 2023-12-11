import React, { useState } from "react";
import styles from "./Navbar.modules.css";
import Units from "../Units/Units";
import Profile from "../Profile/Profile";
import Dimensions from "../Dimensions/Dimensions";
import MethodSelect from "../MethodSelect/MethodSelect";

export default function Navbar(props) {
  const buttons = [
    { name: "Units" },
    { name: "Methods" },
    { name: "Profile" },
    { name: "Dimensions" },
    { name: "Run" },
  ];

  const [checkedState, setCheckedState] = useState(
    new Array(buttons.length).fill(false)
  );

  const [dimensionsConditions, setDimensionsConditions] = useState([
    { diamIter: false, diamValue: "", lengthIter: false, lengthValue: "" },
  ]);

  const toDimensions = (list) => {
    try {
      setDimensionsConditions(list);
    } catch (error) {
      console.log("error in toDimensions");
      console.log(error);
    }
  };

  console.log(dimensionsConditions);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : false
    );
    setCheckedState(updatedCheckedState);
  };

  const [soilList, setSoilList] = useState([
    {
      typeValue: "",
      typeDescription: "",
      espesor: "",
      ngp: "",
      peso: "",
      cohesion: "",
      phi: "",
    },
  ]);

  const toProfile = (list) => {
    try {
      setSoilList(list);
    } catch (error) {
      console.log("error in toProfile");
      console.log(error);
    }
  };

  console.log(soilList);

  const [unitsSelected, setUnitsSelected] = useState([
    {
      unitValue: "",
      unitLabel: "",
    },
  ]);

  const toUnits = (list) => {
    try {
      setUnitsSelected(list);
    } catch (error) {
      console.log("error in toUnits");
      console.log(error);
    }
  };

  console.log(unitsSelected);

  const [methodSelected, setMethodSelected] = useState([
    {
      methodValue: "",
      methodLabel: "",
    },
  ]);

  const toMethods = (list) => {
    try {
      setMethodSelected(list);
    } catch (error) {
      console.log("error in toUnits");
      console.log(error);
    }
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
          return <Units list={unitsSelected} callback={toUnits}></Units>;
        }
        if (index === 1 && checkedState[index]) {
          return (
            <MethodSelect
              list={methodSelected}
              callback={toMethods}
            ></MethodSelect>
          );
        }
        if (index === 2 && checkedState[index]) {
          return <Profile soil={soilList} callback={toProfile}></Profile>;
        }
        if (index === 3 && checkedState[index]) {
          return (
            <Dimensions
              list={dimensionsConditions}
              callback={toDimensions}
            ></Dimensions>
          );
        }
        if (index === 4 && checkedState[index]) {
          return <Run></Run>;
        }
      })}
    </div>
  );
}
