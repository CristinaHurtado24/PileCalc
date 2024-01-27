import React, { useState } from "react";
import styles from "./Units.modules.css";

export default function Units(props) {
  //AGREGAR CAMBIO DE UNIDADES
  const units = [
    {
      value: "0",
      label: "--",
    },
    {
      value: "1",
      label: "Kgf y cm",
    },
    {
      value: "2",
      label: "Ton y m",
    },
  ];
  const [selectedUnits, setSelectedUnits] = useState(props.list);

  const handleChangedUnits = (e) => {
    let value = e.target.value;

    const list = [...selectedUnits];
    units.map((unit) => {
      if (unit.value === value) {
        list[0]["unitValue"] = unit.value;
        list[0]["unitLabel"] = unit.label;
      }
    });
    if (value === "Kgf y cm") {
      list[0]["unitValue"] = "1";
      list[0]["unitLabel"] = "Kgf y cm";
      list[0]["unitForce"] = "kgf";
      list[0]["unitLength"] = "cm";
      list[0]["unitPeso"] = "kgf/cm3";
      list[0]["unitCohesion"] = "kgf/cm2";
    } else if (value === "Ton y m") {
      list[0]["unitValue"] = "2";
      list[0]["unitLabel"] = "Ton y m";
      list[0]["unitForce"] = "ton";
      list[0]["unitLength"] = "m";
      list[0]["unitPeso"] = "ton/ m3";
      list[0]["unitCohesion"] = "ton/ m2";
    }

    setSelectedUnits(list);
  };

  return (
    <div className={styles.container}>
      <h3>Seleccione las unidades</h3>
      <form>
        <ul>
          <li>
            <div className={styles.units_dropdown}>
              <select
                className={styles.select_test}
                defaultValue={"--"}
                value={selectedUnits[0]["unitLabel"]}
                onChange={(e) => handleChangedUnits(e)}
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.label}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </li>
          <li>
            <div className={styles.btn}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  props.callback(selectedUnits);
                }}
              >
                Aceptar
              </button>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
}
