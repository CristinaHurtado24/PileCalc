import React, { useState } from "react";
import Select from "react-select";
import styles from "./Profile.modules.css";

export default function Profile(props) {
  const soilTypes = [
    {
      value: "1",
      label: "Relleno (Fin)",
    },
    {
      value: "2",
      label: "Arena (Sand)",
    },
    {
      value: "3",
      label: "Grava (Gravel)",
    },
    {
      value: "4",
      label: "Arcilla (Clay)",
    },
    {
      value: "5",
      label: "Limo (Mud)",
    },
    {
      value: "6",
      label: "Arcilla de alta plasticidad",
    },
    {
      value: "7",
      label: "Limo arenoso",
    },
    {
      value: "8",
      label: "Limo arcilloso",
    },
    {
      value: "9",
      label: "Arena limosa",
    },
    {
      value: "10",
      label: "Arena arcillosa",
    },
  ];
  const [soilList, setSoilList] = useState(
    props.soil
  );
  const [selectedValue, setSelectedValue] = useState(0); //Almacena valor del dropdown

  const [changedValue, setChangedValue] = useState(false);

  console.log(soilList);

  const handleLayerAdd = () => {
    setSoilList([
      ...soilList,
      { type: "", espesor: "", ngp: "", peso: "", cohesion: "", phi: "" },
    ]);
  };

  const handleLayerRemove = (index) => {
    const list = [...soilList];
    list.splice(index, 1);
    setSoilList(list);
  };

  const handleEspesorChange = (e, index) => {
    console.log(index);
    const { value } = e.target;
    const list = [...soilList];
    list[index]["espesor"] = value;
    if (changedValue) {
      list[index]["type"] = selectedValue;
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
      list[index]["type"] = selectedValue;
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
      list[index]["type"] = selectedValue;
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
      list[index]["type"] = selectedValue;
      setSoilList(list);
      setChangedValue(false);
    } else {
      setSoilList(list);
    }
  };

  const handlePhiChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["phi"] = value;
    if (changedValue) {
      list[index]["type"] = selectedValue;
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
              <label className={styles.phi}>Φ</label>
            </li>
          </ul>
        </div>
        {soilList.map((singleSoil, index) => (
          <div key={index} className={styles.comp}>
            <ul>
              <li>
                <Select
                  className={styles.select_soil}
                  placeholder="Seleccione un tipo de suelo"
                  options={soilTypes}
                  onChange={handleSelectedValue}
                />
              </li>
              <li>
                <div className={styles.divInputs}>
                  <input
                    className={styles.inputs}
                    value={singleSoil.start}
                    onChange={(e) => handleEspesorChange(e, index)}
                  ></input>
                </div>
              </li>
              <li>
                <div className={styles.divInputs}>
                  <input
                    className={styles.inputs}
                    onChange={(e) => handleNgpChange(e, index)}
                  ></input>
                </div>
              </li>
              <li>
                <div className={styles.divInputs}>
                  <input
                    className={styles.inputs}
                    onChange={(e) => handlePesoChange(e, index)}
                  ></input>
                </div>
              </li>
              <li>
                <div className={styles.divInputs}>
                  <input
                    className={styles.inputs}
                    onChange={(e) => handleCohesionChange(e, index)}
                  ></input>
                </div>
              </li>
              <li>
                <div className={styles.divInputs}>
                  <input
                    className={styles.inputs}
                    onChange={(e) => handlePhiChange(e, index)}
                  ></input>
                </div>
              </li>
              <li>
                {soilList.length == 1 && (
                  <div className={styles.divInputsA}>
                  </div>
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
                onClick={props.callback(soilList)}
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
