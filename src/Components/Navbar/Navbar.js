import React, { useState } from "react";
import styles from "./Navbar.modules.css";
import Units from "../Units/Units";
import Profile from "../Profile/Profile";
import Dimensions from "../Dimensions/Dimensions";
import MethodSelect from "../MethodSelect/MethodSelect";
import Materials from "../Materials/Materials";
import Run from "../Run/Run";
import { unit } from "mathjs";

export default function Navbar(props) {
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

  const [dimensionsConditions, setDimensionsConditions] = useState([
    { diamIter: false, diamValue: "", lengthIter: false, lengthValue: "", withoutDim: false },
  ]);

  const [materials, setMaterials] = useState([{ fc: "", fy: "" }]);

  const [NF, setNF] = useState([{ NF: false, NFStart: "" }]);

  const [Qsol, setQsol] = useState([{ Qsol: false, QsolValue: "" }]);
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

  const [unitsSelected, setUnitsSelected] = useState([
    {
      unitValue: "",
      unitLabel: "",
      unitForce: "",
      unitLength: "",
      unitPeso: '',
      unitCohesion: '',
      unitGrade: "°",
    },
  ]);

  const [methodSelected, setMethodSelected] = useState([
    {
      methodValue: "",
      methodLabel: "",
      comparison: false,
    },
  ]);
  console.log(materials);

  const toMaterials = (list) => {
    try {
      setMaterials(list);
    } catch (error) {
      console.log("error in toMaterials");
      console.log(error);
    }
  };

  const toDimensions = (list,list2) => {
    try {
      setDimensionsConditions(list);
      setQsol(list2);
    } catch (error) {
      console.log("error in toDimensions");
      console.log(error);
    }
  };

  console.log(Qsol)
  console.log(dimensionsConditions);
  console.log(NF);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : false
    );
    setCheckedState(updatedCheckedState);
  };

  const toProfile = (list, list2) => {
    try {
      setSoilList(list);
      setNF(list2);
    } catch (error) {
      console.log("error in toProfile");
      console.log(error);
    }
  };

  console.log(soilList);

  const toUnits = (list) => {
    try {
      setUnitsSelected(list);
    } catch (error) {
      console.log("error in toUnits");
      console.log(error);
    }
  };

  console.log(unitsSelected);

  const toMethods = (list) => {
    try {
      setMethodSelected(list);
    } catch (error) {
      console.log("error in toUnits");
      console.log(error);
    }
  };

  console.log(methodSelected);

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
              units={unitsSelected}
              callback={toMethods}
            ></MethodSelect>
          );
        }
        if (index === 2 && checkedState[index]) {
          return (
            <Profile soil={soilList} NF={NF} units={unitsSelected} callback={toProfile}></Profile>
          );
        }
        if (index === 3 && checkedState[index]) {
          return (
            <Dimensions
              list={dimensionsConditions}
              units={unitsSelected}
              solicitation={Qsol}
              callback={toDimensions}
            ></Dimensions>
          );
        }
        if (index === 4 && checkedState[index]) {
          return (
            <Materials list={materials} callback={toMaterials}></Materials>
          );
        }
        if (index === 5 && checkedState[index]) {
          return (
            <Run
              soilList={soilList}
              units={unitsSelected}
              dimensions={dimensionsConditions}
              method={methodSelected}
            ></Run>
          );
        }
      })}
    </div>
  );
}
