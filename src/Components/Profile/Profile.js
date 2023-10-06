import React, { useState } from "react";
import Select from "react-select";
import styles from "./Profile.modules.css";

export default function Profile({ callback }) {
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
  const [soilList, setSoilList] = useState([
    { type: "", start: "", end: "", ngp: "" },
  ]);
  const [selectedValue, setSelectedValue] = useState(0); //Almacena valor del dropdown

  const [changedValue, setChangedValue] = useState(false);

  console.log(soilList);

  const handleLayerAdd = () => {
    setSoilList([...soilList, { type: "", start: "", end: "", ngp: "" }]);
  };

  const handleLayerRemove = (index) => {
    const list = [...soilList];
    list.splice(index, 1);
    setSoilList(list);
  };

  const handleStartChange = (e, index) => {
    console.log(index);
    const { value } = e.target;
    const list = [...soilList];
    list[index]["start"] = value;
    if (changedValue) {
      list[index]["type"] = selectedValue;
      setSoilList(list);
      setChangedValue(false);
    } else {
      setSoilList(list);
    }
  };

  const handleEndChange = (e, index) => {
    const { value } = e.target;
    const list = [...soilList];
    list[index]["end"] = value;
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

  const handleSelectedValue = (Obj) => {
    setSelectedValue(Obj.value);
    setChangedValue(true);
  };

  /*   const handleTypeChange = (index) => {
    console.log(index);
    const list = [...soilList];
    list[index]["type"] = selectedValue;
    setSoilList(list);
    setChangedValue(false);
  }; */

  const show = false;
  return (
    <div className={styles.div_container}>
      <div className={styles.nav}>
        <ul>
          <li>
            <button
              className={styles.xBtn}
              onClick={() => {
                callback(show, soilList);
              }}
            >
              X
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.form}>
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
                <div>
                  <label>Inicio</label>
                  <input
                    value={singleSoil.start}
                    onChange={(e) => handleStartChange(e, index)}
                  ></input>
                </div>
              </li>
              <li>
                <div>
                  <label>Fin</label>
                  <input onChange={(e) => handleEndChange(e, index)}></input>
                </div>
              </li>
              <li>
                <div>
                  <label>Num G/P</label>
                  <input onChange={(e) => handleNgpChange(e, index)}></input>
                </div>
              </li>
              <li>
                {soilList.length > 1 && (
                  <div>
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
              <button className={styles.addBtn}>Aceptar</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
