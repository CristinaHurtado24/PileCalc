import React, { useState } from "react";
import Select from "react-select";
import styles from "./MethodSelect.modules.css";

export default function MethodSelect(props) {
  const [selectedMethod, setSelectedMethod] = useState(props.list);

  const methods = [
    {
      value: "1",
      label: "Meyerhof (Suelo Granular)",
    },
    {
      value: "2",
      label: "L. Reese (Suelo Granular)",
    },
    {
      value: "3",
      label: "Caquot y Kérisel (Suelo Cohesivo)",
    },
    {
      value: "4",
      label: "L. Reese (Suelo Cohesivo)",
    },
  ];

  const handleChangedMethod = (Obj) => {
    const list = [...selectedMethod];
    methods.map((unit) => {
      if (unit.value === Obj.value) {
        list[0]["methodValue"] = unit.value;
        list[0]["methodLabel"] = unit.label;
      }
    });
    setSelectedMethod(list);
  };
  const showSelection = (unitsDescription) => {
    if (unitsDescription === "") {
      return "Métodos";
    } else {
      return unitsDescription;
    }
  };

  return (
    <div className={styles.container}>
      <h3>Seleccione un método de cálculo</h3>
      <form>
        <ul>
          <li>
            <div className={styles.dropdown}>
              <Select
                className={styles.select_dropdown}
                placeholder={showSelection(selectedMethod[0]["methodLabel"])}
                options={methods}
                onChange={handleChangedMethod}
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
