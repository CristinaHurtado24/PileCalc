import React, { useState, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./Profile.modules.css";

export default function Profile() {
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const soilTypes = [
    {
      value: "0",
      label: "Seleccione un tipo de suelo",
    },
    {
      value: "1",
      label: "Relleno compacto",
    },
    {
      value: "2",
      label: "Relleno suelto",
    },
    {
      value: "3",
      label: "Grava mal gradada (GP)",
    },
    {
      value: "4",
      label: "Grava bien gradada (GW)",
    },
    {
      value: "5",
      label: "Arena mal gradada (SP)",
    },
    {
      value: "6",
      label: "Arena bien gradada (SW)",
    },
    {
      value: "7",
      label: "Arcilla alta plasticidad (CH)",
    },
    {
      value: "8",
      label: "Arcilla baja plasticidad (CL)",
    },
    {
      value: "9",
      label: "Limo alta plasticidad (MH)",
    },
    {
      value: "10",
      label: "Limo baja plasticidad (ML)",
    },
    {
      value: "11",
      label: "Materia orgánica (O)",
    },
    {
      value: "12",
      label: "Grava Limosa (GM)",
    },
    {
      value: "13",
      label: "Grava mal gradada limosa (GP-GM)",
    },
    {
      value: "14",
      label: "Grava bien gradada limosa (GW-GM)",
    },
    {
      value: "15",
      label: "Grava arcillosa (GC)",
    },
    {
      value: "16",
      label: "Grava mal gradada arcillosa (GP-GC)",
    },
    {
      value: "17",
      label: "Grava bien gradada arcillosa (GW-GC)",
    },
    {
      value: "18",
      label: "Grava limo-arcillosa (GM-GC)",
    },
    {
      value: "19",
      label: "Grava mal gradada limo-arcillosa (GP-GM-GC)",
    },
    {
      value: "20",
      label: "Grava bien gradada limo-arcillosa (GW-GM-GC)",
    },
    {
      value: "21",
      label: "Arena Limosa (SM)",
    },
    {
      value: "22",
      label: "Arena mal gradada limosa (SP-SM)",
    },
    {
      value: "23",
      label: "Arena bien gradada limosa (SW-SM)",
    },
    {
      value: "24",
      label: "Arena arcillosa (SC)",
    },
    {
      value: "25",
      label: "Arena mal gradada arcillosa (SP-SC)",
    },
    {
      value: "26",
      label: "Arena bien gradada arcillosa (SW-SC)",
    },
    {
      value: "27",
      label: "Arena limo-arcillosa (SM-SC)",
    },
    {
      value: "28",
      label: "Arena mal gradada limo-arcillosa (SP-SM-SC)",
    },
    {
      value: "29",
      label: "Arena bien gradada limo-arcillosa (SW-SM-SC)",
    },
    {
      value: "30",
      label: "Limo arenoso (ML)",
    },
    {
      value: "31",
      label: "Limo arcilloso (ML-CL)",
    },
    {
      value: "32",
      label: "Arcilla arenosa (CL)",
    },
    {
      value: "33",
      label: "Esquisto (SR: Granular)",
    },
    {
      value: "34",
      label: "Esquisto (SR: Fino)",
    },
    {
      value: "35",
      label: "Gneiss",
    },
    {
      value: "36",
      label: "Arenisca",
    },
    {
      value: "37",
      label: "Lutita",
    },
  ];
  const [soilList, setSoilList] = useState(projectValues.soilList);
  const [NF, setNF] = useState(projectValues.freatico);
  const [checkedNF, setCheckedNF] = useState(projectValues.freatico["NF"]);
  const [units, setUnits] = useState(projectValues.units);

  //funcion regex para validar que solo se ingresen numeros positivos y con punto como separador decimal
  const regex = /^[0-9]*[.]?[0-9]*$/;

  console.log(soilList);
  console.log(NF);

  const inputValidation = (badInput) => {
    if (badInput > 0) {
      return "Debe ingresar caracteres numéricos, positivos y utilizar punto (.) como separador decimal";
    } else {
      return "";
    }
  };

  const handleLayerAdd = () => {
    const updatedSoilList = [
      ...soilList,
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
    ];
    setSoilList(updatedSoilList);
    updateProjectValues({ ...projectValues, soilList: updatedSoilList });
  };

  const handleLayerRemove = (index) => {
    const updatedSoilList = [...soilList];
    updatedSoilList.splice(index, 1);
    setSoilList(updatedSoilList);
    updateProjectValues({ ...projectValues, soilList: updatedSoilList });
  };

  const handleEspesorChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["espesor"] = value;
    const onlyNumbers = regex.test(value);
    if (list[index]["e1"] == false && !onlyNumbers) {
      list[index]["e1"] = true;
    }
    if (list[index]["e1"] == true && onlyNumbers) {
      list[index]["e1"] = false;
    }
    setSoilList(list);
  };

  const handlePesoChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["peso"] = value;
    const onlyNumbers = regex.test(value);
    if (list[index]["e3"] == false && !onlyNumbers) {
      list[index]["e3"] = true;
    }
    if (list[index]["e3"] == true && onlyNumbers) {
      list[index]["e3"] = false;
    }
    setSoilList(list);
  };

  const handleNgpChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["ngp"] = value;
    const onlyNumbers = regex.test(value);
    if (list[index]["e2"] == false && !onlyNumbers) {
      list[index]["e2"] = true;
    }
    if (list[index]["e2"] == true && onlyNumbers) {
      list[index]["e2"] = false;
    }

    setSoilList(list);
  };

  const handleCohesionChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["cohesion"] = value;
    const onlyNumbers = regex.test(value);
    if (list[index]["e4"] == false && !onlyNumbers) {
      list[index]["e4"] = true;
    }
    if (list[index]["e4"] == true && onlyNumbers) {
      list[index]["e4"] = false;
    }
    setSoilList(list);
  };

  const handleNFValue = (e) => {
    const { value } = e.target;

    const updatedNF = { ...NF, NFStart: value };
    const onlyNumbers = regex.test(value);
    if (NF["errorMsg"] == false && !onlyNumbers) {
      updatedNF["errorMsg"] = true;
    }
    if (NF["errorMsg"] == true && onlyNumbers) {
      updatedNF["errorMsg"] = false;
    }

    setNF(updatedNF);
    updateProjectValues({ ...projectValues, freatico: updatedNF });
  };

  const handleOnChangeNFCheck = (e) => {
    if (!checkedNF) {
      const updatedNF = { ...NF, NF: !checkedNF };
      setCheckedNF(!checkedNF);
      setNF(updatedNF);
      updateProjectValues({ ...projectValues, freatico: updatedNF });
    } else {
      const updatedNF = { ...NF, NF: !checkedNF };
      setCheckedNF(!checkedNF);
      setNF(updatedNF);
      updateProjectValues({ ...projectValues, freatico: updatedNF });
    }
  };

  const handlePhiChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["phi"] = value;
    const onlyNumbers = regex.test(value);
    if (list[index]["e5"] == false && !onlyNumbers) {
      list[index]["e5"] = true;
    }
    if (list[index]["e5"] == true && onlyNumbers) {
      list[index]["e5"] = false;
    }
    setSoilList(list);
  };

  const handleOnChangeSoil = (e, index) => {
    debugger;
    const value = e.target.value;
    const list = [...soilList];
    list[index]["typeValue"] = value;
    soilTypes.map((soil) => {
      if (soil.value == value) {
        list[index]["typeDescription"] = soil.label;
      }
      if (value == 1 || value == 2) {
        list[index]["isRelleno"] = true;
      } else {
        list[index]["isRelleno"] = false;
      }
    }, []);
    setSoilList(list);
  };

  const handleRequired = (soilList, NF) => {
    const list = [...soilList];
    let count = 0;
    let countE = 0;
    list.map((soil) => {
      console.log(soil);
      if (soil["typeValue"] == 1 || soil["typeValue"] == 2) {
        if (soil["espesor"] == "") {
          count += 1;
        }
      }
      if (soil["e1"] || soil["e2"] || soil["e3"] || soil["e4"] || soil["e5"]) {
        countE += 1;
      } else {
        if (
          soil["espesor"] == "" ||
          soil["ngp"] == "" ||
          soil["peso"] == "" ||
          soil["cohesion"] == "" ||
          soil["phi"] == ""
        ) {
          count += 1;
        }
      }
    });
    if (NF["NF"] && NF["NFStart"] == "") {
      count += 1;
    }
    if (count > 0) {
      electronApi.notificationApi.sendNotification(
        "Debe completar todos los campos e ingresar los datos correctamente"
      );
      return "";
    }
    if (countE > 0) {
      electronApi.notificationApi.sendNotification(
        "Por favor ingrese los datos correctamente"
      );
      return "";
    } else {
      return "";
    }
  };

  const handleChanges = (newNf, newSoilList) => {
    updateProjectValues({ ...projectValues, freatico: newNf });
    updateProjectValues({ ...projectValues, soilList: newSoilList });
  };
  return (
    <div className={styles.div_container}>
      <div className={styles.form}>
        <h3>Ingrese el perfil del suelo</h3>
        <div className={styles.labels}>
          <ul>
            <li>
              <label className={styles.type}>Tipo de suelo</label>
            </li>
            <li>
              <label className={styles.espesor}>Espesor</label>
            </li>
            <li>
              <label className={styles.ngp}>Ngp</label>
            </li>
            <li>
              <label className={styles.peso}>γ</label>
            </li>
            <li>
              <label className={styles.cohesion}>C</label>
            </li>
            <li>
              <label className={styles.phi}>Φ </label>
              <label className={styles.uPhi}>({units["unitGrade"]})</label>
            </li>
          </ul>
        </div>
        <div className={styles.units}>
          <ul>
            <li>
              <label className={styles.uType}></label>
            </li>
            <li>
              <label className={styles.uEspesor}>({units["unitLength"]})</label>
            </li>
            <li>
              <label className={styles.uNgp}></label>
            </li>
            <li>
              <label className={styles.uPeso}>({units["unitPeso"]})</label>
            </li>
            <li>
              <label className={styles.uCohesion}>
                ({units["unitCohesion"]})
              </label>
            </li>
          </ul>
        </div>
        {soilList.map((singleSoil, index) => (
          <div key={index} className={styles.contComp}>
            <div className={styles.comp}>
              <ul>
                <li>
                  <select
                    className={styles.select_test}
                    value={singleSoil.typeValue}
                    onChange={(e) => handleOnChangeSoil(e, index)}
                  >
                    {soilTypes.map((soil) => (
                      <option key={soil.value} value={soil.value}>
                        {soil.label}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <div className={styles.divInputs}>
                    <input
                      className={styles.inputs}
                      value={singleSoil.espesor}
                      onChange={(e) => handleEspesorChange(e, index)}
                    ></input>
                  </div>
                </li>
                <li>
                  <div className={styles.divInputs}>
                    <input
                      className={styles.inputs}
                      value={singleSoil.ngp}
                      onChange={(e) => handleNgpChange(e, index)}
                    ></input>
                  </div>
                </li>
                <li>
                  <div className={styles.divInputs}>
                    <input
                      className={styles.inputs}
                      value={singleSoil.peso}
                      onChange={(e) => handlePesoChange(e, index)}
                    ></input>
                  </div>
                </li>
                <li>
                  <div className={styles.divInputs}>
                    <input
                      className={styles.inputs}
                      value={singleSoil.cohesion}
                      onChange={(e) => handleCohesionChange(e, index)}
                    ></input>
                  </div>
                </li>
                <li>
                  <div className={styles.divInputs}>
                    <input
                      className={styles.inputs}
                      value={singleSoil.phi}
                      onChange={(e) => handlePhiChange(e, index)}
                    ></input>
                  </div>
                </li>
                <li>
                  {soilList.length == 1 && (
                    <div className={styles.divInputsA}></div>
                  )}
                </li>
                <li>
                  {soilList.length > 1 && (
                    <div className={styles.divInputs}>
                      <button
                        className={styles.xBtn}
                        onClick={() => handleLayerRemove(index)}
                      >
                        X
                      </button>
                    </div>
                  )}
                </li>
              </ul>
            </div>
            <div className={styles.errorDiv}>
              <label className={styles.error}>
                {inputValidation(
                  singleSoil.e1 ||
                    singleSoil.e2 ||
                    singleSoil.e3 ||
                    singleSoil.e4 ||
                    singleSoil.e5
                )}
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.NF}>
        <div className={styles.inputDiv}>
          <input
            type="checkbox"
            name="NivelFreatico"
            value="NivelFreatico"
            checked={NF["NF"]}
            onChange={handleOnChangeNFCheck}
          />
          <label>Presencia de Nivel Freático</label>
        </div>
        <div className={styles.NFInput}>
          <label className={styles.NfUbic}>
            Ubicación ({units["unitLength"]}):{" "}
          </label>
          <input
            className={styles.inputs}
            disabled={!checkedNF}
            value={NF["NFStart"]}
            onChange={(e) => handleNFValue(e)}
          ></input>
        </div>
      </div>
      <div className={styles.errorDiv}>
        <label className={styles.error}>
          {inputValidation(NF["errorMsg"])}
        </label>
      </div>

      <div className={styles.buttons}>
        <ul>
          <li>
            <div className={styles.add}>
              <button className={styles.addBtn} onClick={handleLayerAdd}>
                Agregar otro estrato
              </button>
            </div>
          </li>
          <li>
            <div className={styles.accept}>
              <button
                className={styles.addBtn}
                onClick={() => {
                  handleRequired(soilList, NF);
                  handleChanges(NF, soilList);
                  debugger;
                }}
              >
                Aceptar
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
