import React, { useState, useContext } from "react";
import { ProjectContext } from "../../Context/ProjectContext";
import styles from "./Units.modules.css";

export default function Units() {
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
  const { projectValues, updateProjectValues } = useContext(ProjectContext);
  const [selectedValue, setSelectedValue] = useState(
    projectValues.units.unitValue
  );
  const [selectedUnits, setSelectedUnits] = useState(projectValues.units);
  const handleChanges = (newValues) => {
    updateProjectValues({ ...projectValues, units: newValues });
  };
  const handleChangedUnits = (e) => {
    let value = e.target.value;
    setSelectedValue(value);
    units.map((unit) => {
      if (unit.value === value) {
        selectedUnits["unitValue"] = unit.value;
        selectedUnits["unitLabel"] = unit.label;
      }
    });
    if (value === "1") {
      selectedUnits["unitValue"] = "1";
      selectedUnits["unitLabel"] = "Kgf y cm";
      selectedUnits["unitForce"] = "kgf";
      selectedUnits["unitLength"] = "cm";
      selectedUnits["unitPeso"] = "kgf/cm3";
      selectedUnits["unitCohesion"] = "kgf/cm2";
    } else if (value === "2") {
      selectedUnits["unitValue"] = "2";
      selectedUnits["unitLabel"] = "Ton y m";
      selectedUnits["unitForce"] = "ton";
      selectedUnits["unitLength"] = "m";
      selectedUnits["unitPeso"] = "ton/ m3";
      selectedUnits["unitCohesion"] = "ton/ m2";
    }

    setSelectedUnits(selectedUnits);
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
                value={selectedValue}
                onChange={(e) => handleChangedUnits(e)}
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
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
                  handleChanges(selectedUnits);
                  debugger;
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
