import React, { useState } from "react";
import Select from "react-select";
import styles from "./MethodSelect.modules.css";

export default function MethodSelect() {
  const [selectedValue, setSelectedValue] = useState(0);
  const handleChange = (Obj) => {
    setSelectedValue(Obj.value);
  };

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
  return (
    <div className={styles.container}>
      <h3>Seleccione un método de cálculo</h3>
      <form>
        <ul>
          <li>
            <div className={styles.dropdown}>
              <Select
                className={styles.select_dropdown}
                placeholder="Seleccione un Método"
                options={methods}
                onChange={handleChange}
              />
            </div>
          </li>
        </ul>
      </form>
    </div>
  );
}
