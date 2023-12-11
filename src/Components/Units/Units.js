import React, { useState } from "react";
import styles from "./Units.modules.css";
import Select from "react-select";

export default function Units(props) {
  //AGREGAR CAMBIO DE UNIDADES
  const units = [
    {
      value: "1",
      label: "Kgf/cm",
    },
    {
      value: "2",
      label: "Ton/m",
    },
  ];
  const [selectedUnits, setSelectedUnits] = useState(props.list);

  const handleChangedUnits = (Obj) => {
    const list = [...selectedUnits];
    units.map((unit) => {
      if (unit.value === Obj.value) {
        list[0]["unitValue"] = unit.value;
        list[0]["unitLabel"] = unit.label;
      }
    });
    setSelectedUnits(list);
  };
  const showSelection = (unitsDescription) => {
    if (unitsDescription === "") {
      return "Unidades";
    } else {
      return unitsDescription;
    }
  };

  return (
    <div className={styles.container}>
      <h3>Seleccione las unidades</h3>
      <form>
        <ul>
          <li>
            <div className={styles.units_dropdown}>
              <Select
                className={styles.select_dropdown}
                placeholder={showSelection(selectedUnits[0]["unitLabel"])}
                options={units}
                onChange={handleChangedUnits}
              />
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
