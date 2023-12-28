import React, { useState } from "react";
import Select from "react-select";
import styles from "./Profile.modules.css";

export default function Profile(props) {
  const soilTypes = [
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
      label: "Materia orgánica alta plasticidad (OH)",
    },
    {
      value: "12",
      label: "Materia orgánica baja plasticidad (OL)",
    },
    {
      value: "13",
      label: "Grava Limosa (GM)",
    },
    {
      value: "14",
      label: "Grava arcillosa (GC)",
    },
    {
      value: "15",
      label: "Grava limo-arcillosa (GM-GC)",
    },
    {
      value: "16",
      label: "Grava arenosa (GS)",
    },
    {
      value: "17",
      label: "Arena Limosa (SM)",
    },
    {
      value: "18",
      label: "Arena arcillosa (SC)",
    },
    {
      value: "19",
      label: "Arena limo-arcillosa (SM-SC)",
    },
    {
      value: "20",
      label: "Grava Limosa (GP-GM)",
    },
    {
      value: "21",
      label: "Grava arcillosa (GP-GC)",
    },
    {
      value: "22",
      label: "Grava limo-arcillosa (GP-GM-GC)",
    },
    {
      value: "23",
      label: "Grava Limosa (GW-GM)",
    },
    {
      value: "24",
      label: "Grava arcillosa (GW-GC)",
    },
    {
      value: "25",
      label: "Grava limo-arcillosa (GW-GM-GC)",
    },
    {
      value: "26",
      label: "Arena Limosa (SP-SM)",
    },
    {
      value: "27",
      label: "Arena arcillosa (SP-SC)",
    },
    {
      value: "28",
      label: "Arena limo-arcillosa (SP-SM-SC)",
    },
    {
      value: "29",
      label: "Arena Limosa (SW-SM)",
    },
    {
      value: "30",
      label: "Arena arcillosa (SW-SC)",
    },
    {
      value: "31",
      label: "Arena limo-arcillosa (SW-SM-SC)",
    },
    {
      value: "32",
      label: "Limo arenoso (MS)",
    },
    {
      value: "33",
      label: "Limo arcilloso (MC)",
    },
    {
      value: "34",
      label: "Arcilla arenosa (CS)",
    },
    {
      value: "35",
      label: "Arcilla limosa (CM)",
    },
    {
      value: "36",
      label: "Roca descompuesta",
    },
    {
      value: "37",
      label: "Roca meteorizada",
    },
    {
      value: "38",
      label: "Roca fresca",
    },
  ];
  const [soilList, setSoilList] = useState(props.soil);
  const [NF, setNF] = useState(props.NF);
  const [checkedNF, setCheckedNF] = useState(props.NF[0]["NF"]);
  const [units, setUnits] = useState(props.units);
  const [selectedValue, setSelectedValue] = useState(0); //Almacena valor del dropdown

  const [changedValue, setChangedValue] = useState(false);

  console.log(soilList);

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
    if (changedValue) {
      list[index]["typeValue"] = selectedValue;
      soilTypes.map((soil) => {
        if (soil.value == selectedValue) {
          list[index]["typeDescription"] = soil.label;
        }
      }, []);
      setSoilList(list);
      setChangedValue(false);
    } else {
      setSoilList(list);
    }
  };

  const handlePesoChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["peso"] = value;
    if (changedValue) {
      list[index]["typeValue"] = selectedValue;
      soilTypes.map((soil) => {
        if (soil.value == selectedValue) {
          list[index]["typeDescription"] = soil.label;
        }
      }, []);
      setSoilList(list);
      setChangedValue(false);
    } else {
      setSoilList(list);
    }
  };

  const handleNgpChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["ngp"] = value;
    if (changedValue) {
      list[index]["typeValue"] = selectedValue;
      soilTypes.map((soil) => {
        if (soil.value == selectedValue) {
          list[index]["typeDescription"] = soil.label;
        }
      }, []);
      setSoilList(list);
      setChangedValue(false);
    } else {
      setSoilList(list);
    }
  };

  const handleCohesionChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["cohesion"] = value;
    if (changedValue) {
      list[index]["typeValue"] = selectedValue;
      soilTypes.map((soil) => {
        if (soil.value == selectedValue) {
          list[index]["typeDescription"] = soil.label;
        }
      }, []);
      setSoilList(list);
      setChangedValue(false);
    } else {
      setSoilList(list);
    }
  };

  const showSelection = (typeDescription) => {
    if (typeDescription === "") {
      return "Seleccione un tipo de suelo";
    } else {
      return typeDescription;
    }
  };

  const handleNFValue = (e) => {
    const { value } = e.target;
    const list = [...NF];
    list[0]["NFStart"] = value;
    setNF(list);
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
    if (changedValue) {
      list[index]["typeValue"] = selectedValue;
      soilTypes.map((soil) => {
        if (soil.value == selectedValue) {
          list[index]["typeDescription"] = soil.label;
        }
      }, []);
      setSoilList(list);
      setChangedValue(false);
    } else {
      setSoilList(list);
    }
  };
  const handleSelectedValue = (Obj) => {
    setSelectedValue(Obj.value);
    setChangedValue(true);
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
          <div key={index} className={styles.comp}>
            <ul>
              <li>
                <Select
                  className={styles.select_soil}
                  placeholder={showSelection(singleSoil.typeDescription)}
                  options={soilTypes}
                  onChange={handleSelectedValue}
                />
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
          <label className={styles.NfUbic}>Ubicación ({units[0]['unitLength']}): </label>
          <input
            className={styles.inputs}
            disabled={!checkedNF}
            value={NF[0]["NFStart"]}
            onChange={(e) => handleNFValue(e)}
          ></input>
        </div>
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
