import React, { useState, useEffect } from "react";
import styles from "./Navbar.modules.css";
import Units from "../Units/Units";
import Profile from "../Profile/Profile";
import Dimensions from "../Dimensions/Dimensions";
import MethodSelect from "../MethodSelect/MethodSelect";
import Materials from "../Materials/Materials";
import Run from "../Run/Run";

export default function Navbar(props) {
  const buttons = [
    { name: "Unidades" },
    { name: "Métodos" },
    { name: "Perfil" },
    { name: "Dimensiones" },
    { name: "Materiales" },
    { name: "Run" },
  ];

  const [data, setData] = useState("");

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
      e1: false,
      e2: false,
    },
  ]);

  const [count, setCount] = useState(0);
  let auxArray = [];

  const [materials, setMaterials] = useState([
    { fc: "", fy: "", e1: false, e2: false },
  ]);

  const [NF, setNF] = useState([
    { NF: false, NFStart: "", errorMsg: false, cont: 0 },
  ]);

  const [Qsol, setQsol] = useState([
    { Qsol: false, QsolValue: "", errorMsg: false },
  ]);

  const [soilList, setSoilList] = useState([
    [
      {
        typeValue: "",
        typeDescription: "",
        espesor: "",
        ngp: "",
        peso: "",
        cohesion: "",
        phi: "",
        isRelleno: false,
        e1: false,
        e2: false,
        e3: false,
        e4: false,
        e5: false,
      },
    ],
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
      methodValue: "--",
      methodLabel: "",
      comparison: false,
    },
  ]);
  console.log(materials);

  const toMaterials = (list) => {
    try {
      setCount(count + 1);
      setMaterials(list);
    } catch (error) {
      console.log("error in toMaterials");
      console.log(error);
    }
  };

  const toDimensions = (list, list2) => {
    try {
      setCount(count + 1);
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
      setCount(count + 1);
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
      setCount(count + 1);
      setUnitsSelected(list);
    } catch (error) {
      console.log("error in toUnits");
      console.log(error);
    }
  };

  console.log(unitsSelected);

  console.log("count: " + count);
  const toMethods = (list) => {
    try {
      setCount(count + 1);
      setMethodSelected(list);
    } catch (error) {
      console.log("error in toUnits");
      console.log(error);
    }
  };

  let variable = "";
  const serializarObjetos = (objeto) => {
    let v = "";
    v += "[";
    for (let i = 0; i < objeto.length; i++) {
      v += JSON.stringify(objeto[i]);
      v += ",";
    }
    v = v.slice(0, -1);
    v += "]";
    v += ",";

    return v;
  };

  const returnJsonString = (
    variable,
    units,
    method,
    soil,
    Nf,
    dimensions,
    solici,
    materials
  ) => {
    console.log("returnJsonString: " + soil);
    variable += serializarObjetos(units);

    variable += serializarObjetos(method);

    variable += serializarObjetos(soil);

    variable += serializarObjetos(Nf);

    variable += serializarObjetos(dimensions);

    variable += serializarObjetos(solici);

    variable += serializarObjetos(materials);

    console.log("variable: " + variable);
    return variable;
  };
  const serialization = () => {
    const data = returnJsonString(
      variable,
      unitsSelected,
      methodSelected,
      soilList,
      NF,
      dimensionsConditions,
      Qsol,
      materials
    );
    setData(data);
  };

  console.log("data: " + data);

  electronApi.receiveBool((event, booleano) => {
    if (booleano) {
      const serial = JSON.stringify([
        unitsSelected,
        methodSelected,
        soilList,
        NF,
        dimensionsConditions,
        Qsol,
        materials,
      ]);
      console.log("serial: " + serial);
      electronApi.saveFile(serial);
    }
  });

  electronApi.receiveBoolOpen((event, booleano) => {
    if (booleano) {
      electronApi.openFile();
      electronApi.receiveFileData((filePath, fileData) => {
        console.log("fileData: " + fileData);
        setUnitsSelected(JSON.parse(fileData)[0]);
        setMethodSelected(JSON.parse(fileData)[1]);
        setSoilList(JSON.parse(fileData)[2]);
        setNF(JSON.parse(fileData)[3]);
        setDimensionsConditions(JSON.parse(fileData)[4]);
        setQsol(JSON.parse(fileData)[5]);
        setMaterials(JSON.parse(fileData)[6]);
      });
    }
  });

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
              count={count}
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
              count={count}
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
          electronApi.notificationApi.sendNotification(
            "Debe seleccionar las unidades y/o el método de cálculo antes de continuar"
          );
          return "";
        }
        if (
          index === 3 &&
          checkedState[index] &&
          unitsSelected[0]["unitValue"] !== ""
        ) {
          return (
            <Dimensions
              count={count}
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
          electronApi.notificationApi.sendNotification(
            "Debe seleccionar las unidades antes de continuar"
          );
          return "";
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
              count={count}
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
            electronApi.notificationApi.sendNotification(
              "Debe seleccionar las unidades y/o el método de cálculo antes de continuar"
            );
            return "";
          }
          if (index === 5 && methodSelected[0]["methodValue"] == "") {
            electronApi.notificationApi.sendNotification(
              "Debe seleccionar un método de cálculo"
            );
            return "";
          }
          if (index === 5 && soilList[0]["typeValue"] == "") {
            electronApi.notificationApi.sendNotification(
              "Debe seleccionar un método de cálculo"
            );
            return "";
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
            electronApi.notificationApi.sendNotification(
              "Debe ingresar las dimensiones del pilote o seleccionar iterar sobre alguna de ellas"
            );
            return "";
          }
          if (
            index === 5 &&
            dimensionsConditions[0]["diamIter"] === true &&
            dimensionsConditions[0]["lengthValue"] == ""
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la longitud del pilote"
            );
            return "";
          }
          if (
            index === 5 &&
            dimensionsConditions[0]["lengthIter"] === true &&
            dimensionsConditions[0]["diamValue"] == ""
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar el diámetro del pilote"
            );
            return "";
          }
          if (
            index === 5 &&
            Qsol[0]["Qsol"] === true &&
            Qsol[0]["QsolValue"] == ""
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la solicitación del pilote"
            );
            return "";
          }
          if (
            (index === 5 &&
              dimensionsConditions[0]["withoutDim"] === false &&
              Qsol[0]["Qsol"] === true &&
              dimensionsConditions[0]["lengthValue"] == "") ||
            dimensionsConditions[0]["diamValue"] == ""
          ) {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar las dimensiones del pilote"
            );
            return "";
          }
          if (index === 5 && NF[0]["NF"] === true && NF[0]["NFStart"] == "") {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la ubicación del nivel freático"
            );
            return "";
          }
          if (index === 5 && materials[0]["fc"] == "") {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la resistencia del concreto"
            );
            return "";
          }
          if (index === 5 && materials[0]["fy"] == "") {
            electronApi.notificationApi.sendNotification(
              "Debe ingresar la resistencia del acero"
            );
            return "";
          }
        }
      })}
    </div>
  );
}
