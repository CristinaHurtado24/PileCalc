import React, { useState } from "react";
import styles from "./Units.modules.css";
import Select from "react-select";

export default function Units(props) {
  //AGREGAR CAMBIO DE UNIDADES
  const units = [
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

  const handleChangedUnits = (Obj) => {
    const list = [...selectedUnits];
    units.map((unit) => {
      if (unit.value === Obj.value) {
        list[0]["unitValue"] = unit.value;
        list[0]["unitLabel"] = unit.label;
      }
    });
    if (Obj.value === "1") {
      list[0]["unitForce"] = "kgf";
      list[0]["unitLength"] = "cm";
      list[0]["unitPeso"] = "kgf/cm3";
      list[0]["unitCohesion"] = "kgf/cm2";
    } else {
      list[0]["unitForce"] = "ton";
      list[0]["unitLength"] = "m";
      list[0]["unitPeso"] = "ton/ m3";
      list[0]["unitCohesion"] = "ton/ m2";
    }

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
