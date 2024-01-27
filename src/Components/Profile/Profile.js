import React, { useState } from "react";
import Select from "react-select";
import styles from "./Profile.modules.css";

export default function Profile(props) {
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
      label: "Grava Limpia (GP)",
    },
    {
      value: "4",
      label: "Grava Limpia (GW)",
    },
    {
      value: "5",
      label: "Arena Limpia (SP)",
    },
    {
      value: "6",
      label: "Arena Limpia (SW)",
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
      label: "Materia orgánica",
    },
    {
      value: "12",
      label: "Grava Limosa (GP-GM)",
    },
    {
      value: "13",
      label: "Grava Limosa (GW-GM)",
    },
    {
      value: "14",
      label: "Grava arcillosa (GP-GC)",
    },
    {
      value: "15",
      label: "Grava arcillosa (GW-GC)",
    },
    {
      value: "16",
      label: "Grava limo-arcillosa (GP-GM-GC)",
    },
    {
      value: "17",
      label: "Grava limo-arcillosa (GW-GM-GC)",
    },
    {
      value: "18",
      label: "Arena Limosa (SP-SM)",
    },
    {
      value: "19",
      label: "Arena Limosa (SW-SM)",
    },
    {
      value: "20",
      label: "Arena arcillosa (SP-SC)",
    },
    {
      value: "21",
      label: "Arena arcillosa (SW-SC)",
    },
    {
      value: "22",
      label: "Arena limo-arcillosa (SP-SM-SC)",
    },
    {
      value: "23",
      label: "Arena limo-arcillosa (SW-SM-SC)",
    },
    {
      value: "24",
      label: "Limo arenoso (MS)",
    },
    {
      value: "25",
      label: "Limo arcilloso (MC)",
    },
    {
      value: "26",
      label: "Arcilla arenosa (CS)",
    },
    {
      value: "27",
      label: "Arcilla limosa (CM)",
    },
    {
      value: "28",
      label: "Esquisto (SR: Granular)",
    },
    {
      value: "29",
      label: "Esquisto (SR: Fino)",
    },
    {
      value: "30",
      label: "Gneiss",
    },
    {
      value: "31",
      label: "Arenisca",
    },
    {
      value: "32",
      label: "Lutita",
    },
  ];
  const [soilList, setSoilList] = useState(props.soil);
  const [NF, setNF] = useState(props.NF);
  const [checkedNF, setCheckedNF] = useState(props.NF[0]["NF"]);
  const [units, setUnits] = useState(props.units);
  const [selectedValue, setSelectedValue] = useState(0); //Almacena valor del dropdown
  const [changedIndex, setChangedIndex] = useState(0); //Almacena el indice del dropdown que se cambio

  const [changedValue, setChangedValue] = useState(false);

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
    setSoilList([
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
    ]);
  };

  const handleLayerRemove = (index) => {
    const list = [...soilList];
    list.splice(index, 1);
    setSoilList(list);
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
    const list = [...NF];
    list[0]["NFStart"] = value;
    const onlyNumbers = regex.test(value);
    if (list[0]["errorMsg"] == false && !onlyNumbers) {
      list[0]["errorMsg"] = true;
    }
    if (list[0]["errorMsg"] == true && onlyNumbers) {
      list[0]["errorMsg"] = false;
    }
    setSoilList(list);
  };

  const handleOnChangeNFCheck = (e) => {
    const list = [...NF];
    if (!checkedNF) {
      list[0]["NF"] = !checkedNF;
      setCheckedNF(!checkedNF);
    } else {
      list[0]["NF"] = !checkedNF;
      setCheckedNF(!checkedNF);
    }
    setNF(list);
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
    if (NF[0]["NF"] && NF[0]["NFStart"] == "") {
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
              <label className={styles.uPhi}>({units[0]["unitGrade"]})</label>
            </li>
          </ul>
        </div>
        <div className={styles.units}>
          <ul>
            <li>
              <label className={styles.uType}></label>
            </li>
            <li>
              <label className={styles.uEspesor}>
                ({units[0]["unitLength"]})
              </label>
            </li>
            <li>
              <label className={styles.uNgp}></label>
            </li>
            <li>
              <label className={styles.uPeso}>({units[0]["unitPeso"]})</label>
            </li>
            <li>
              <label className={styles.uCohesion}>
                ({units[0]["unitCohesion"]})
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
                    defaultValue={"33"}
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
            checked={NF[0]["NF"]}
            onChange={handleOnChangeNFCheck}
          />
          <label>Presencia de Nivel Freático</label>
        </div>
        <div className={styles.NFInput}>
          <label className={styles.NfUbic}>
            Ubicación ({units[0]["unitLength"]}):{" "}
          </label>
          <input
            className={styles.inputs}
            disabled={!checkedNF}
            value={NF[0]["NFStart"]}
            onChange={(e) => handleNFValue(e)}
          ></input>
        </div>
      </div>
      <div className={styles.errorDiv}>
        <label className={styles.error}>
          {inputValidation(NF[0]["errorMsg"])}
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
                  props.callback(soilList, NF);
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
