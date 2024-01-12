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
    {
      diamIter: false,
      diamValue: "",
      lengthIter: false,
      lengthValue: "",
      withoutDim: false,
      errorMsg: false,
    },
  ]);

  const [materials, setMaterials] = useState([
    { fc: "", fy: "", errorMsg: false },
  ]);

  const [NF, setNF] = useState([{ NF: false, NFStart: "", errorMsg: false }]);

  const [Qsol, setQsol] = useState([
    { Qsol: false, QsolValue: "", errorMsg: false },
  ]);
  const [soilList, setSoilList] = useState([
    {
      typeValue: "",
      typeDescription: "",
      espesor: "",
      ngp: "",
      peso: "",
      cohesion: "",
      phi: "",
      isRelleno: false,
      errorMsg: false
    },
  ]);

  const [unitsSelected, setUnitsSelected] = useState([
    {
      unitValue: "",
      unitLabel: "",
      unitForce: "",
      unitLength: "",
      unitPeso: "",
      unitCohesion: "",
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

  const toDimensions = (list, list2) => {
    try {
      setDimensionsConditions(list);
      setQsol(list2);
    } catch (error) {
      console.log("error in toDimensions");
      console.log(error);
    }
  };

  console.log(Qsol);
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
        if (
          index === 2 &&
          checkedState[index] &&
          unitsSelected[0]["unitValue"] !== "" &&
          methodSelected[0]["methodValue"] !== ""
        ) {
          return (
            <Profile
              soil={soilList}
              NF={NF}
              units={unitsSelected}
              callback={toProfile}
            ></Profile>
          );
        }
        if (
          index === 2 &&
          checkedState[index] &&
          (unitsSelected[0]["unitValue"] == "" ||
            methodSelected[0]["methodValue"] == "")
        ) {
          return window.alert(
            "Debe seleccionar las unidades y/o el método de cálculo antes de continuar"
          );
        }
        if (
          index === 3 &&
          checkedState[index] &&
          unitsSelected[0]["unitValue"] !== ""
        ) {
          return (
            <Dimensions
              list={dimensionsConditions}
              units={unitsSelected}
              solicitation={Qsol}
              callback={toDimensions}
            ></Dimensions>
          );
        }
        if (
          index === 3 &&
          checkedState[index] &&
          unitsSelected[0]["unitValue"] == ""
        ) {
          return window.alert(
            "Debe seleccionar las unidades antes de continuar"
          );
        }
        if (index === 4 && checkedState[index]) {
          return (
            <Materials list={materials} callback={toMaterials}></Materials>
          );
        }
        if (
          index === 5 &&
          checkedState[index] &&
          unitsSelected[0]["unitValue"] !== "" &&
          methodSelected[0]["methodValue"] !== "" &&
          soilList[0]["typeValue"] !== "" &&
          materials[0]["fc"] !== "" &&
          materials[0]["fy"] !== "" &&
          (dimensionsConditions[0]["diamValue"] !== "" ||
            dimensionsConditions[0]["lengthValue"] !== "" ||
            dimensionsConditions[0]["diamIter"] === true ||
            dimensionsConditions[0]["lengthIter"] === true ||
            dimensionsConditions[0]["withoutDim"] === true)
        ) {
          return (
            <Run
              soilList={soilList}
              units={unitsSelected}
              dimensions={dimensionsConditions}
              solicitation={Qsol}
              NF={NF}
              materials={materials}
              method={methodSelected}
            ></Run>
          );
        }
        if (
          index === 5 &&
          checkedState[index] &&
          (unitsSelected[0]["unitValue"] == "" ||
            methodSelected[0]["methodValue"] == "" ||
            soilList[0]["typeValue"] == "" ||
            materials[0]["fc"] == "" ||
            materials[0]["fy"] == "" ||
            dimensionsConditions[0]["diamValue"] == "" ||
            dimensionsConditions[0]["lengthValue"] == "" ||
            dimensionsConditions[0]["diamIter"] === false ||
            dimensionsConditions[0]["lengthIter"] === false ||
            dimensionsConditions[0]["withoutDim"] === false ||
            dimensionsConditions[0]["diamIter"] === true ||
            dimensionsConditions[0]["lengthIter"] === true ||
            dimensionsConditions[0]["withoutDim"] === true ||
            Qsol[0]["Qsol"] === true)
        ) {
          if (index === 5 && unitsSelected[0]["unitValue"] == "") {
            return window.alert(
              "Debe seleccionar las unidades en las que desea trabajar"
            );
          }
          if (index === 5 && methodSelected[0]["methodValue"] == "") {
            return window.alert("Debe seleccionar un método de cálculo");
          }
          if (index === 5 && soilList[0]["typeValue"] == "") {
            return window.alert("Debe ingresar el perfil del suelo");
          }
          if (
            index === 5 &&
            dimensionsConditions[0]["diamIter"] === false &&
            dimensionsConditions[0]["lengthIter"] === false &&
            dimensionsConditions[0]["withoutDim"] === false &&
            Qsol[0]["Qsol"] === false &&
            (dimensionsConditions[0]["diamValue"] == "" ||
              dimensionsConditions[0]["lengthValue"] == "")
          ) {
            return window.alert(
              "Debe ingresar las dimensiones del pilote o seleccionar iterar sobre alguna de ellas"
            );
          }
          if (
            index === 5 &&
            dimensionsConditions[0]["diamIter"] === true &&
            dimensionsConditions[0]["lengthValue"] == ""
          ) {
            return window.alert("Debe ingresar la longitud del pilote");
          }
          if (
            index === 5 &&
            dimensionsConditions[0]["lengthIter"] === true &&
            dimensionsConditions[0]["diamValue"] == ""
          ) {
            return window.alert("Debe ingresar el diámetro del pilote");
          }
          if (
            index === 5 &&
            Qsol[0]["Qsol"] === true &&
            Qsol[0]["QsolValue"] == ""
          ) {
            return window.alert("Debe ingresar la solicitación del pilote");
          }
          if (
            (index === 5 &&
              dimensionsConditions[0]["withoutDim"] === false &&
              Qsol[0]["Qsol"] === true &&
              dimensionsConditions[0]["lengthValue"] == "") ||
            dimensionsConditions[0]["diamValue"] == ""
          ) {
            return window.alert("Debe ingresar las dimensiones del pilote");
          }
          if (index === 5 && NF[0]["NF"] === true && NF[0]["NFStart"] == "") {
            return window.alert(
              "Debe ingresar la ubicación del nivel freático"
            );
          }
          if (index === 5 && materials[0]["fc"] == "") {
            return window.alert("Debe ingresar la resistencia del concreto");
          }
          if (index === 5 && materials[0]["fy"] == "") {
            return window.alert("Debe ingresar la resistencia del acero");
          }
        }
      })}
    </div>
  );
}
