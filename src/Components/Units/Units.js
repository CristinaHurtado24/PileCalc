import React, { useState } from "react";
import styles from "./Units.modules.css";
import Select from "react-select";

export default function Units() {
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

  const handleChangedUnits = (Obj) => {
    setSelectedUnits(Obj.value);
  };

  const [selectedUnits, setSelectedUnits] = useState(0);
  return (
    <div className={styles.container}>
      <h3>Seleccione las unidades</h3>
      <form>
        <ul>
          <li>
            <div className={styles.units_dropdown}>
              <Select
                className={styles.select_dropdown}
                placeholder="Unidades"
                options={units}
                onChange={handleChangedUnits}
              />
            </div>
          </li>
          <li>
            <div className={styles.btn}>
              <button>Aceptar</button>
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
}
